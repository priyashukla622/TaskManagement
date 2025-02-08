// const express = require('express');
// const mongoose = require('mongoose');
// const cors=require("cors")
// require('dotenv').config();
// const app = express();
// const userRouter = require('./src/routes/userRouter');
// const port=process.env.PORT||4000;

// mongoose.connect("mongodb+srv://priyashukla22:ViblLezj9bb2pKim@test-pro-db.kshgj.mongodb.net/Task-Managements?retryWrites=true&w=majority&appName=cluster0")
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// app.use(cors());
// app.use(express.json());

// app.use("/users",userRouter)

// app.listen(port,() =>{
//     console.log(`Server running on port  ${port}`)
// });



const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
// require('dotenv').config();
require('dotenv').config({path:'./.env'})
const app=express();
const userRouter = require('./src/routes/userRouter');
// const userRouter=require("./src/routes/userRouter");
const port=process.env.PORT||3000;
mongoose.connect("mongodb+srv://priyashukla22:ViblLezj9bb2pKim@test-pro-db.kshgj.mongodb.net/Task-Managements?retryWrites=true&w=majority&appName=cluster0")

app.use(express.json())
app.use(cors());

app.use("/users",userRouter)
app.listen(port,()=>{
  console.log(`server is running on port ${port}`)
})