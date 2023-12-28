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
        ref : "Message"
        },
    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;