// chatName
// isGroupChat
// users
// admin

const mongoose = require('mongoose');

const chatModel = new mongoose.Schema({
    chatName: {
        type: String,
        required: true,
        trim: true,
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    users : [{  // array of users
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
});

const chat = mongoose.model('Chat', chatModel);

module.exports = chat;