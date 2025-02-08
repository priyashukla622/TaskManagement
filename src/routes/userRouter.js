const express=require("express");
const {Signup} = require("../controllers/signup")
const {login}=require("../controllers/login")
const router = express.Router();

router.post("/signup",Signup)
router.post("/login",login)

module.exports= router;