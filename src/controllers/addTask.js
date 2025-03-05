const Task = require("../models/taskModel");
const userModel = require("../models/userModel");
const addTasks = async (req, res) => {
    try {
        const { title, description, priority, status, completed, category } = req.body;
        const userId = req.user?.userId; 
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
        console.error("Error while adding task:", error);  
        res.status(500).json({ message: "Error adding task", error: error.message });
    }
};
module.exports = { addTasks };
