const mongoose = require('mongoose');
const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');
const { getReceiverSocketId, getIO } = require('../socket/socket'); // Use getIO instead of direct io

const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;

        const senderObjectId = new mongoose.Types.ObjectId(senderId);
        const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderObjectId, receiverObjectId] }
        });

        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [senderObjectId, receiverObjectId]
            });
        }

        const newMessage = await Message.create({
            senderId: senderObjectId,
            receiverId: receiverObjectId,
            message
        });

        if (newMessage) {
            gotConversation.messages.push(newMessage._id);
            await gotConversation.save();
        }

        // Use getIO() to ensure io is initialized
        const io = getIO();
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (io && receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        return res.status(201).json({ newMessage });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error });
    }
};

const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;

        const senderObjectId = new mongoose.Types.ObjectId(senderId);
        const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

        const conversation = await Conversation.findOne({
            participants: { $all: [senderObjectId, receiverObjectId] }
        }).populate("messages");

        return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred", error });
    }
};

module.exports = { sendMessage, getMessage };
