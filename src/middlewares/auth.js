
// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//     const tokenHeader = req.header("Authorization");
//     if (!tokenHeader) {
//         return res.status(401).json({ message: "Access denied. No token provided." });
//     }

//     const token = tokenHeader.split(" ")[1]; // Get the token from 'Bearer <token>'
//     if (!token) {
//         return res.status(401).json({ message: "Access denied. Token format incorrect." });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the correct key here
//         req.user = decoded; 
//         next();
//     } catch (error) {
//         if (error.name === "TokenExpiredError") {
//             return res.status(401).json({ message: "Token expired. Please log in again." });
//         }
//         res.status(400).json({ message: "Invalid token." });
//     }
// };
// module.exports = authMiddleware;




// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// const authMiddleware = async (req, res, next) => {
//     try {
//         const token = req.header("Authorization");

//         if (!token) {
//             return res.status(401).json({ message: "Unauthorized. No token provided." });
//         }

//         const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
//         req.user = decoded; // ✅ Email set kar rahe hain

//         const user = await User.findOne({ email: req.user.email });

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         req.user.role = user.role; // ✅ Role bhi set kar diya
//         next(); // ✅ User authenticated hai, aage badho
//     } catch (error) {
//         return res.status(401).json({ message: "Invalid token", error });
//     }
// };

// module.exports = authMiddleware;




// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// const authMiddleware = async (req, res, next) => {
//     try {
//         const token = req.header("Authorization");

//         if (!token) {
//             return res.status(401).json({ message: "Unauthorized. No token provided." });
//         }

//         const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
//         req.user = decoded; // ✅ Email set kar rahe hain

//         const user = await User.findOne({ email: req.user.email });

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         req.user.role = user.role; // ✅ Role set kar diya

//         // If needed, you can add admin validation here itself
//         if (req.user.role !== "admin") {
//             return res.status(403).json({ message: "Access denied. Admins only." });
//         }

//         next(); // ✅ User authenticated and authorized
//     } catch (error) {
//         return res.status(401).json({ message: "Invalid token", error });
//     }
// };

// module.exports = authMiddleware;







// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// const authMiddleware = async (req, res, next) => {
//     try {
//         const token = req.header("Authorization");
//         if (!token) {
//             return res.status(401).json({ message: "Unauthorized. No token provided." });
//         }
        
//         const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
//         req.user = decoded;
    
//         const user = await User.findOne({ email: req.user.email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Set user role
//         req.user.role = user.role;

//         next(); // Allow all authenticated users (including admins)
//     } catch (error) {
//         console.log("JWT Error: ", error);
//         return res.status(401).json({ message: "Invalid token", error });
//     }
// }

// module.exports = authMiddleware;



// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// const authMiddleware = async (req, res, next) => {
//     try {
//         const token = req.header("Authorization");
//         if (!token) {
//             return res.status(401).json({ message: "Unauthorized. No token provided." });
//         }

//         const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
//         req.user = decoded;

//         const user = await User.findOne({ email: req.user.email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Store role in request
//         req.user.role = user.role;

//         next();
//     } catch (error) {
//         console.log("JWT Error: ", error);
//         return res.status(401).json({ message: "Invalid token", error });
//     }
// };

// module.exports = authMiddleware;




// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//     const token = req.header("Authorization")?.split(" ")[1];
//     console.log("Token received:", token); // Extract Bearer token
//     if (!token) {
//         return res.status(401).json({ message: "No token provided" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
//         req.user = { userId: decoded.userId, email: decoded.email }; 
//         console.log("Decoded User:", req.user);
// // ✅ Store both userId & email
//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Invalid token" });
//     }
// };

// module.exports = authMiddleware;


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// const jwt = require("jsonwebtoken");
// const authMiddleware = (req, res, next) => {
//     const token = req.header("Authorization")?.split(" ")[1];  
//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = { userId: decoded.userId, email: decoded.email }; 
//         req.user = decoded;  
//         console.log("Decoded Token User:", req.user);
//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Unauthorized: Invalid token" });
//     }
// };

// module.exports = authMiddleware;

// 33333333333333333333333333333333333333
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

