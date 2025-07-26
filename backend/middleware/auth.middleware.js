// working code admin and receptionist
// export const verifyToken = (req, res, next) => {
//   console.log('🔒 Dummy verifyToken middleware');
//   next();
// };

// export const checkRole = (roles) => (req, res, next) => {
//   console.log('🛡️ Dummy checkRole middleware', roles);
//   next();
// };





//new 
import jwt from 'jsonwebtoken';

// Middleware: Verify JWT Token
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: Token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "yourSecretKey"; // fallback if env not set

    const decoded = jwt.verify(token, secret);
    req.user = decoded; // attach user data to request

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

// Middleware: Check Role (e.g., Admin, Receptionist, Staff)
export const checkRole = (roles) => (req, res, next) => {
  try {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }

    next();
  } catch (error) {
    console.error("Role Check Error:", error.message);
    return res.status(500).json({ message: "Server error while checking role" });
  }
};
