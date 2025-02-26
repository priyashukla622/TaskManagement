const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

require('dotenv').config({path:'./.env'})
const app=express();
const userRouter = require('./src/routes/userRouter');

const port=process.env.PORT;

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(process.env.MONGODB_URL)

app.use(express.json())
app.use(cors());

app.use("/users",userRouter)
app.listen(port,()=>{
  console.log(`server is running on port ${port}`)
})