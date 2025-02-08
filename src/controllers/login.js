// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const userModel = require("../models/userModel");
// SECRET_KEY="priyashukl22";
// const login=async (req,res)=>{
//     const{email, password}=req.body;
//     try{
//         if(!email || !password){
//             return res.status(400).json({error:"All fields are required!"})
//         }
//         const existingUser=await userModel.findOne({email:email})
//         if(!existingUser){
//             return res.status(400).json({message:"signup first"})
//         }
//         const matchPassword=await bcrypt.compare(password,existingUser.password);
//         if(!matchPassword){
//             return res.status(400).json({message:"Invalid password"})
//         }
//         const token=jwt.sign({email:existingUser._id},process.env.SECRET_KEY,{expiresIn:'1h'})
//         res.status(200).json({message:"Login successfully", user:existingUser, token:token})
//     }catch(error){
//         res.status(500).json({message:"something went wrong",error:error.message})
//     }

// }
// module.exports={login}


// require('dotenv').config(); 

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required!" });
        }
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({ message: "Signup first" });
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Ensure process.env.SECRET_KEY is defined
        console.log(process.env.SECRET_KEY);  // For debugging

        const token = jwt.sign({ email: existingUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: "Login successfully", user: existingUser, token: token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

module.exports = { login };
