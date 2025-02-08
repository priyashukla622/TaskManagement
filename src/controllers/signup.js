// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const userModel= require("../models/userModel");
// const Signup=async (req, res) => {
//     try{
//         const { username, email, password,role,contact } = req.body;
//         if (!username || !email || !password || !role || !contact){
//             return res.status(400).json({error:"All fields are required!"})
//         }
//         // const existingUser=await userModel.findOne({email:email});
//         const existingUser = await userModel.findOne({ email: email.toLowerCase() });
//         if(existingUser){
//             return res.status(400).json({error:"User already exists!"})
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new userModel({ username, email: email.toLowerCase(), contact, role, password: hashedPassword });
//         await user.save();
//         res.status(201).json({ message: "User registered successfully!" });

//     }catch (error) {
//     res.status(400).json({ error: "User already exists!" });
//   }
// };
// module.exports= {Signup}



const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const Signup = async (req, res) => {
    try {
        const { username, email, password, role, contact } = req.body;
        
        if (!username || !email || !password || !role || !contact) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const existingUser = await userModel.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists!" });
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
        res.status(201).json({ message: "User registered successfully!",user });

    } catch (error) {
        console.error(error);  // Log actual error
        res.status(500).json({ error: error.message || "Something went wrong!" });
    }
};

module.exports = { Signup };



