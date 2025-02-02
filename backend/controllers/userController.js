const express = require("express");
const router = express.Router(); // Add this line to define the router
require('dotenv').config();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// Register Function
const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender, email } = req.body;
        // Check if all fields are filled
        if (!fullName || !username || !password || !confirmPassword || !gender || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // Password and confirmPassword match check
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        // Check if username or email already exists
        let user = await User.findOne({ $or: [{ username }, { email }] });
        if (user) {
            return res.status(400).json({ message: "Username or Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Get Profile Photo
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create user with email
        user = await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender,
            email
        });

        const token = await new Token({
            userId:user._id,
            token:crypto.randomBytes(32).toString("hex")
        }).save();

        const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);

        return res.status(201).json({
            message: "Account created successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

router.get("/:id/verify/:token", async (req,res)=> {
    try {
        const user =  await User.findOne({_id:req.params.id});
        if(!user) return res.status(400).send({message:"Invalid Link"});
        
        const token = await Token.findOne({
            userId:user._id,
            token:req.params.token
        });
        if(!token) return res.status(400).send({message:"Invalid link"});
        
        await User.updateOne({_id:user._id, verified:true});
        await token.remove();
        res.status(200).send({message:"Email Verified"});
    } catch (error) {
        res.status(500).send({message:"Internal server error"});
    }
});

// Login Function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if both email and password fields are filled
        if (!email || !password) {
            return res.status(400).json({ message: "Both email and password are required." });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        // Verify the password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        // Generate JWT token
        const tokenData = { userId: user._id };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        // Send the token in an HTTP-only cookie (secure)
        return res.status(200).cookie("token", token, { 
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure flag in production
            sameSite: 'strict' // Same site policy for CSRF protection
        }).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePhoto: user.profilePhoto,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Logout Function
const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout successful",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get Other Users
const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    register,
    login,
    logout,
    getOtherUsers,
    router // Export the router
};
