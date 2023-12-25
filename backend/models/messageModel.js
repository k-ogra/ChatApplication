const mongoose = require('mongoose');

const messageModel = mongoose.Schema({
    sender : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Friend"
    },
    receiver : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Friend"
    },
    chat : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Chat"
    },
    },
    {
        time: true,
    });

    const Message = mongoose.Model("Message", messageModel);