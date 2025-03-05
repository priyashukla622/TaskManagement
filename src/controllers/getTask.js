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




