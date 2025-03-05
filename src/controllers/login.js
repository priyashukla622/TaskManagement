const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  userModel= require('../models/userModel');

const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
};
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    try {
        const user = await userModel.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user)
        if (user.role !== 'admin' && user.role !== 'user') {
            return res.status(403).json({ message: "Access denied for this role" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },  
            process.env.JWT_SECRET, 
            { expiresIn: '1h' },
        );
        console.log("JWT Secret:", process.env.JWT_SECRET); 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  

        res.status(200).json({
            message: "Login successful",
            token,
            userId: user._id,  
            role: user.role
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};
module.exports = { login };
