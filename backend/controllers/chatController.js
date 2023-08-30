const asyncHandler = require('express-async-handler');
const Chat = require('../models/chatModel.js');
const User = require('../models/userModel.js');

const accessChat = asyncHandler(async (req, res) => {
    //id here is the id of the user with whom the current user wants to chat
    const { id } = req.body;


    if (!id) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    var isChat = await Chat.find(
        {
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: id } } }

                //Both the above conditions should be true
                //First one checks if the user is present in the users array
                //Second one checks if the user is present in the users array
            ]
        }
    ).populate('users', '-password')
        .populate('latestMessage');

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    }
    else {
        const newChat = new Chat({
            chatName: 'sender',
            users: [req.user._id, id],
            isGroupChat: false
        });

        try {
            const createdChat = await Chat.create(newChat);

            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );

            res.status(201).json(FullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error);
        }
    }
});

const fetchChats = asyncHandler(async (req, res) => {
    try {
        const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate('groupAdmin')
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email",
                });
                res.status(200).json(chats);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

const createGroupChat = asyncHandler(async (req, res) => {

    if (!req.body.users || !req.body.chatName) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    var users = JSON.parse(req.body.users);

    if (users.length < 1) {
        res.status(400);
        throw new Error('Please add atleast one user');
    }

    users.push(req.user._id);

    try {
        const groupChat = new Chat({
            chatName: req.body.chatName,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user._id
        });

        const createdGroupChat = await Chat.create(groupChat);

        const FullChat = await Chat.findOne({ _id: createdGroupChat._id }).populate(
            "users",
            "-password"
        ).populate('groupAdmin', '-password');

        res.json(FullChat);
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
})

const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    if (!chatId || !chatName) {
        res.status(400);
        throw new Error('Please enter all fields');
    }

    try {
        const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatName: chatName }, { new: true })
            .populate("users", "-password")
            .populate('groupAdmin', '-password');

        res.status(200).json(updatedChat);
    }
    catch (error) {
        res.status(400);
        throw new Error(error);
    }
});

const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    try {

        const chat = await Chat.findById(chatId);
        if (chat.users.includes(userId)) {
            return res.status(400).json({ message: "User is already in the group." });
        }


        const added = await Chat.findByIdAndUpdate(
            chatId,
            {
                $push: { users: userId },
            },
            {
                new: true,
            }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        
        res.status(200).json(added);
    } catch (error) {
        res.status(400);
        throw new Error(`Error adding user to group: ${error.message}`);
    }

});

const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const removed = await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { users: userId } },
        { new: true }
    ).populate("users", "-password")
        .populate('groupAdmin', '-password');

    if (!removed) {
        res.status(400);
        throw new Error('User not added');
    }

    res.status(200).json(added);
});

module.exports = { removeFromGroup, addToGroup, accessChat, fetchChats, createGroupChat, renameGroup };