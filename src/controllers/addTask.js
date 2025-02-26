// const taskModel=require("../models/taskModel")

// const addTasks = async (req, res) => {
//   const { title, description, completed, priority, status, dueDate } = req.body;
//   const userId = req.user.id; 
//   try {
//     const newTask = new taskModel({
//       title,
//       description,
//       completed,
//       priority,
//       status,
//       userId, 
//       dueDate,
//     });
//     await newTask.save();
//     res.status(201).json({ message: 'Task created successfully', task: newTask });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
// module.exports={addTasks}






// const Task = require("../models/taskModel");
// const userModel = require("../models/userModel");

// const addTasks = async (req, res) => {
//     try {
//         const { title, description, priority, status,category,completed} = req.body;
//         const {email}=req.body;
//         const user = await userModel.findOne({email:email });

//         if (!user) {
//             return res.status(404).json({ message: "User not found with this email" });
//         }
//         const task = new Task({ 
//             title, 
//             description, 
//             priority, 
//             status,
//             email,
//             category,
//             completed,
//         });

//         await task.save();

//         res.status(201).json({ message: "Task added successfully", task });
//     } catch (error) {
//         res.status(500).json({ message: "Error adding task", error });
//     }
// };
// module.exports = { addTasks };






// const Task = require("../models/taskModel");
// const userModel = require("../models/userModel");

// const addTasks = async (req, res) => {
//     try {
//         console.log("Received Data:", req.body); 

//         const {email, title, description, priority, status, completed, category} = req.body;

//         if (!email) {
//             return res.status(400).json({ message: "Email is required" });
//         }

//         const user = await userModel.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: "User not found with this email" });
//         }

//         const task = new Task({ email, title, description, priority, status, completed, category});

//         await task.save();
//         res.status(201).json({ message: "Task added successfully", task });

//     } catch (error) {
//         console.error("Error adding task:", error);
//         res.status(500).json({ message: "Error adding task", error });
//     }
// };
// module.exports = { addTasks };



// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2

// const Task = require("../models/taskModel");
// const userModel = require("../models/userModel");
// const addTasks = async (req, res) => {
//     try {
//         // The email is already available on req.user after authorization
//         const { email } = req.user;
//         const { title, description, priority, status, completed, category } = req.body;

//         // Ensure the user exists in the database
//         const user = await userModel.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Create a new task and save it to the database
//         const task = new Task({ email, title, description, priority, status, completed, category });
//         await task.save();

//         res.status(201).json({ message: "Task added successfully", task });

//     } catch (error) {
//         console.error("Error adding task:", error);
//         res.status(500).json({ message: "Error adding task", error: error.message });
//     }
// };
// module.exports = { addTasks };





// const Task = require("../models/taskModel");
// const userModel = require("../models/userModel");
// const addTasks = async (req, res) => {
//     try {
//         const { title, description, priority, status, completed, category } = req.body;

//         // ✅ `userId` Token me se milega (AuthMiddleware ke through)
//         const userId = req.user.id; 

//         // ✅ Naya task create karna
//         const task = new Task({ userId, title, description, priority, status, completed, category });
//         await task.save();

//         res.status(201).json({ message: "Task added successfully", task });

//     } catch (error) {
//         console.error("Error adding task:", error);
//         res.status(500).json({ message: "Error adding task", error: error.message });
//     }
// };

// module.exports = { addTasks };


const Task = require("../models/taskModel");
const userModel = require("../models/userModel");
const addTasks = async (req, res) => {
    try {
        const { title, description, priority, status, completed, category } = req.body;
        const userId = req.user?.userId; // ✅ Check karo ki userId aa raha hai ya nahi
        console.log("Received Data:", req.body);
        console.log("Authenticated User ID:", userId);

        if (!title || !description || !priority || !status || completed === undefined || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User ID not found in token" });
        }

        const newTask = new Task({
            title,
            description,
            priority,
            status,
            completed,
            category,
            userId,
        });

        await newTask.save();
        res.status(201).json({ message: "Task added successfully", task: newTask });

    } catch (error) {
        console.error("🔥 Error while adding task:", error);  // ✅ PRINT FULL ERROR
        res.status(500).json({ message: "Error adding task", error: error.message });
    }
};
module.exports = { addTasks };
