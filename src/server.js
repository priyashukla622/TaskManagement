// const express=require("express");
// const mongoose=require("mongoose");
// const cors=require("cors");
// require('dotenv').config({path:"/src/.env"})
// const app=express();
// const userRouter = require('./routes/userRouter');

// const port=process.env.PORT;
// const path = require('path');
// // app.use(express.static(path.join(__dirname, 'public')));
// require('dotenv').config({ path: path.join(__dirname, '.env') });


// mongoose.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.error("MongoDB connection error:", err));

// app.use(express.json())
// app.use(cors());

// app.use("/users",userRouter)
// app.listen(port,()=>{
//   console.log(`server is running on port ${port}`)
// })



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); 
const app = express();
const userRouter = require("./routes/userRouter");
const path = require("path");

const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URL;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 50000, 
//     connectTimeoutMS: 60000,
}).then(() => {
    console.log("MongoDB Connected Successfully!");
    console.log("MongoDB URI:", process.env.MONGODB_URL);

}).catch((err) => {
    console.error("MongoDB Connection Error:", err);
});
mongoose.set("bufferCommands", false);


app.use(express.json());
// app.use(cors());
app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
