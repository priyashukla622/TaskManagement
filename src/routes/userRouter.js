const express=require("express");
const {Signup} = require("../controllers/signup")
const {login}=require("../controllers/login")
const {addTasks}=require("../controllers/addTask")
const {taskUpdated}=require("../controllers/updateTask")
const {getUserTasks, getAllTasks}=require("../controllers/getTask")
// const {getTasks}=require("../controllers/getTask")
const {deleteTask}=require("../controllers/deleteTask")

// const adminMiddleware = require("../middlewares/adminMiddleware");
const authMiddleware=require("../middlewares/auth")
const router = express.Router();

router.post("/signup",Signup)
router.post("/login",login)
router.post("/tasks", authMiddleware,addTasks)
router.put("/update-task",taskUpdated)
router.get("/user-tasks",authMiddleware, getUserTasks);
// router.get("/all-tasks",adminMiddleware, getAllTasks)
router.get("/all-tasks",authMiddleware, getAllTasks);
router.delete("/delete-task", deleteTask)

module.exports= router;