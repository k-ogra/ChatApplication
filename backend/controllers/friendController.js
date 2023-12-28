const FriendModel = require("../models/friendModel");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require('../tokens/generateToken');

const loginController = expressAsyncHandler(async(req,res) => {
    const {name, password} = req.body;
    const friend = await FriendModel.findOne({name});

    if (friend && (await friend.matchPassword(password))) {
        const response = {
            _id : friend._id,
            name: friend.name,
            token: generateToken(friend._id),
        };
        res.json(response);
    } else {
        res.status(401);
        throw new Error("Invalid username or password")
    }
});

const registerController = expressAsyncHandler(async (req, res) => {
    const {name, password} = req.body;
    if (!name || !password) {
        res.send(400);
        throw new Error("No username or password provided");
    }

    const friendExist = await FriendModel.findOne({name});
    if (friendExist) {
        throw new Error("Friend already exists");
    }

    const friend = await FriendModel.create({name, password});  
    if (friend) {
        res.status(201).json({
            _id : friend._id,
            name : friend.name,
            token : generateToken(friend._id),
        });
    } else {
        res.status(400);
        throw new Error("Registration issue");
    }
});

const getFriendsController = expressAsyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await FriendModel.find(keyword).find({
      _id: { $ne: req.user._id },
    });
    res.send(users);
  });

module.exports = {loginController, registerController, getFriendsController};
