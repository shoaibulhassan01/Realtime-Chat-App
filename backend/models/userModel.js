const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    fullName: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    profilePhoto: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        require: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'] // Email validation regex
    },
    verified: {
        type:Boolean, default: false
    }
},{timestamps:true})

module.exports = mongoose.model("User", userModel)