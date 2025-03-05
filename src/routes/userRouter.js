const express=require("express");
const {Signup} = require("../controllers/signup")
const {login}=require("../controllers/login")
const {addTasks}=require("../controllers/addTask")
const {getUserTasks, getAllTasks}=require("../controllers/getTask")

const authMiddleware=require("../middlewares/auth")
const router = express.Router();

router.post("/signup",Signup)
router.post("/login",login)
router.post("/tasks", authMiddleware,addTasks)
router.get("/user-tasks",authMiddleware, getUserTasks);
router.get("/all-tasks",authMiddleware, getAllTasks);

module.exports= router;