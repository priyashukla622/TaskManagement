// // ✅ **User Dashboard (Sirf Apne Tasks)**
// const Task = require("../models/taskModel");
// const userModel = require("../models/userModel");
// const getUserTasks = async (req, res) => {
//     const{email}=req.query;
//     try {
//         const user = await userModel.findOne({email:email});
//         if(!user){
//             return res.status(404).json({message:"User not found with this email"})
//         }
//         const task=await Task.find()
//         if(!task){
//             return res.status(404).json({message:"Task not found with this email"})
//         }
//         res.status(200).json(task);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching tasks", error });
//     }
// };



// // ✅ **Admin Dashboard (Sabke Tasks)**
// const getAllTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find(); 
//         res.status(200).json(tasks);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching tasks", error });
//     }
// };

// module.exports = {getUserTasks, getAllTasks };



// const Task = require("../models/taskModel");
// const User = require("../models/userModel");

// const getUserTasks = async (req, res) => {
//     const { email } = req.query; // 🛠 Email le rahe hain

//     try {
//         // ✅ Pehle user ko email se find karenge
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: "User not found with this email" });
//         }

//         // ✅ Ab sirf iss user ke tasks fetch karenge
//         const tasks = await Task.find({ userId: user._id });

//         if (tasks.length === 0) {
//             return res.status(404).json({ message: "No tasks found for this user" });
//         }

//         res.status(200).json(tasks);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching tasks", error });
//     }
// };

// // admin can see all tasks
// const getAllTasks = async (req, res) => {
//     const { email } = req.query; 
//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: "User not found with this email" });
//         }
//         if (user.role !== "admin") {
//             return res.status(403).json({ message: "Access denied. Only admin can view all tasks." });
//         }
//         const tasks = await Task.find();

//         res.status(200).json(tasks);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching tasks", error });
//     }
// };
// module.exports = {getUserTasks, getAllTasks};




// const Task = require("../models/taskModel");
// const User = require("../models/userModel");

// // For User: Fetch only their tasks
// const getUserTasks = async (req, res) => {
//     const { email } = req.query; // 🛠 Email received from query

//     try {
//         // ✅ Fetch the user by email
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: "User not found with this email" });
//         }

//         // ✅ Fetch tasks only for the logged-in user
//         const tasks = await Task.find({ userId: user._id });

//         if (tasks.length === 0) {
//             return res.status(404).json({ message: "No tasks found for this user" });
//         }

//         res.status(200).json(tasks); // Return the user's tasks
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching tasks", error });
//     }
// };

// // For Admin: Fetch all tasks from all users
// const getAllTasks = async (req, res) => {
//     const { email } = req.query; // 🛠 Email received from query
    
//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: "User not found with this email" });
//         }

//         // Admin can access all tasks
//         if (user.role !== "admin") {
//             return res.status(403).json({ message: "Access denied. Only admin can view all tasks." });
//         }

//         // Fetch all tasks if user is an admin
//         const tasks = await Task.find();
//         res.status(200).json(tasks); // Return all tasks to admin
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching tasks", error });
//     }
// };
// module.exports = { getUserTasks, getAllTasks };







// const Task = require("../models/taskModel");
// const User = require("../models/userModel");

// // 🟢 Fetch tasks for a normal user (Only their own tasks)
// const getUserTasks = async (req, res) => {
//     const { email } = req.query; // 🛠 Email received from query

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: "User not found with this email" });
//         }

//         // ✅ Fetch only this user's tasks
//         const tasks = await Task.find({ userId: user._id });

//         if (!tasks.length) {
//             return res.status(404).json({ message: "No tasks found for this user" });
//         }

//         res.status(200).json(tasks);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching tasks", error });
//     }
// };

// // 🔴 Fetch all tasks for admin (Including user email)
// const getAllTasks = async (req, res) => {
//     const { email } = req.query; // 🛠 Admin's email received from query
    
//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: "User not found with this email" });
//         }

//         // 🔐 Only Admin can access all tasks
//         if (user.role !== "admin") {
//             return res.status(403).json({ message: "Access denied. Only admin can view all tasks." });
//         }

//         // ✅ Fetch all tasks + Join with user details
//         const tasks = await Task.find().populate("userId", "email");

//         if (!tasks.length) {
//             return res.status(404).json({ message: "No tasks found in the database" });
//         }

//         // 🔹 Format tasks to include user email
//         const formattedTasks = tasks.map(task => ({
//             title: task.title,
//             description: task.description,
//             priority: task.priority,
//             status: task.status,
//             category: task.category,
//             completed: task.completed,
//             assignedTo: task.userId?.email || "Unknown" // ✅ Add assigned user email
//         }));

//         res.status(200).json(formattedTasks);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching tasks", error });
//     }
// };

// module.exports = { getUserTasks, getAllTasks };







// 235625797009=-9=094
const Task = require("../models/taskModel");
const getUserTasks = async (req, res) => {
    try {
        console.log("User ID from Token:", req.user.userId); 
        const tasks = await Task.find({ userId: req.user.userId });
        console.log("Fetched Tasks:", tasks);  
        if (!tasks.length) {
            return res.status(200).json({ message: "No tasks found for this user.", tasks: [] });
        }
        res.status(200).json({ tasks });
    } catch (error) {
        console.error("Error fetching user tasks:", error);
        res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
};
const getAllTasks = async (req, res) => {
    try {
        console.log("API started"); 
        console.log("Decoded User in Admin API:", req.user);
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        console.log("Fetching tasks..."); 
        const tasks = await Task.find().populate("userId", "email"); 

        if (!tasks || tasks.length === 0) {
            console.log("No tasks found in database.");
            return res.status(404).json({ message: "No tasks available." });
        }

        console.log("Fetched Admin Tasks:", tasks); 

        res.status(200).json({ tasks });
    } catch (error) {
        console.error("Error fetching all tasks:", error);
        res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
};
module.exports = { getUserTasks, getAllTasks };




