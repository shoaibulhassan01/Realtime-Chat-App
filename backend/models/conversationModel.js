const mongoose = require("mongoose");

const conversationModel = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }]
}, { timestamps: true });

// Ensure this line is exactly correct
module.exports = mongoose.model("Conversation", conversationModel);
