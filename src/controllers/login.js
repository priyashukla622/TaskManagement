
// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const userModel = require("../models/userModel");

// const login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         if (!email || !password) {
//             return res.status(400).json({ error: "All fields are required!" });
//         }
//         const existingUser = await userModel.findOne({ email: email });
//         if (!existingUser) {
//             return res.status(400).json({ message: "Signup first" });
//         }
//         const matchPassword = await bcrypt.compare(password, existingUser.password);
//         if (!matchPassword) {
//             return res.status(400).json({ message: "Invalid password" });
//         }
//         console.log(process.env.SECRET_KEY);  
//         const token = jwt.sign({ email: existingUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
//         res.status(200).json({ message: "Login successfully", user: existingUser, token: token });
//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong", error: error.message });
//     }
// };
// module.exports = { login };




// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');  // Adjust the path as needed

// const validateEmail = (email) => {
//     const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//     return re.test(String(email).toLowerCase());
// };

// const login = async (req, res) => {
//     const { email, password } = req.body;

//     // Step 1: Validate email format
//     if (!validateEmail(email)) {
//         return res.status(400).json({ message: "Invalid email format" });
//     }

//     try {
//         // Step 2: Find the user by email
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         if (user.role !== 'admin' && user.role !== 'user') {
//             return res.status(403).json({ message: "Access denied for this role" });
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) {
//             return res.status(400).json({ message: "Incorrect password" });
//         }

//         // Step 5: Create JWT token with user ID, email, and role
//         const token = jwt.sign(
//             { userId: user._id, email: user.email, role: user.role },  
//             process.env.JWT_SECRET, 
//             { expiresIn: '1h' }
//         );

//         // Step 6: Send the response with the token
//         res.status(200).json({
//             message: "Login successful",
//             token
//         });
//     } catch (error) {
//         console.error("Login error:", error);
//         res.status(500).json({ message: "Error logging in", error: error.message });
//     }
// };
// module.exports = { login };






const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // ✅ Step 1: Validate email format
    if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        // ✅ Step 2: Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Step 3: Check user role
        if (user.role !== 'admin' && user.role !== 'user') {
            return res.status(403).json({ message: "Access denied for this role" });
        }

        // ✅ Step 4: Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // ✅ Step 5: Generate JWT Token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },  
            process.env.JWT_SECRET, 
            { expiresIn: '1h' },
        );
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // ✅ Decode the token
        console.log("Decoded Token:", decoded);
        console.log("Token Expiry:", new Date(decoded.exp * 1000));

        // ✅ Step 6: Send response with userId
        res.status(200).json({
            message: "Login successful",
            token,
            userId: user._id,  // ✅ Ye frontend me useful hoga
            role: user.role
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};
module.exports = { login };
