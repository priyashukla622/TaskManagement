const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const Signup = async (req, res) => {
    try {
        const { username, email, password, role, contact } = req.body;
        console.log("helloo", req.body);
        
        if (!username || !email || !password || !role || !contact) {
            return res.status(400).json({ error: "All fields are required!" });
        }
        const allowedRoles = ['user', 'admin'];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ error: "Invalid role!" });
        }
        const existingUser = await userModel.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists!" });
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Password must be at least 6 characters long, contain a number and a special character." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            username,
            email: email.toLowerCase(),
            contact,
            role,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({message: "User registered successfully!",user: { username, email, contact, role }
        });

    } catch (error) {
        console.error("Signup Error:", error.stack);
        res.status(500).json({ error: error.message || "Something went wrong!" });
    }
};
module.exports = { Signup };

