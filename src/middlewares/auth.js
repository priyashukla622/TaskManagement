const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; 
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        console.log("Decoded Token User:", req.user);
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
module.exports = authMiddleware;

