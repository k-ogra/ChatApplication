const mongoose = require('mongoose');

const chatModel = mongoose.Schema({
    chatName : {type : String},
    friends : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Friend"
        }
    ],
    mostRecent : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Chat"
    },
});

const Chat = mongoose.Model("Chat", chatModel);
module.exports = Chat;