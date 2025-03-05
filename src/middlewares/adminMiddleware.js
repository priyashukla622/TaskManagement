const adminMiddleware = (req, res, next) => {
    console.log("User in adminMiddleware:", req.user); 
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Only admins can access this data." });
    }
    next();
};
module.exports = adminMiddleware;

