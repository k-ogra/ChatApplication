const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Friend = require("../models/friendModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    $and: [
      { friends: { $elemMatch: { $eq: req.user._id } } },
      { friends: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("friends", "-password")
    .populate("mostRecent");

  isChat = await Friend.populate(isChat, {
    path: "mostRecent.sender",
    select: "name",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      friends: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "friends",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const getChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ friends: { $elemMatch: { $eq: req.user._id } } })
      .populate("friends", "-password")
      .populate("mostRecent")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await Friend.populate(results, {
          path: "mostRecent.sender",
          select: "name",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

 
module.exports = {
  accessChat,
  getChats,
};