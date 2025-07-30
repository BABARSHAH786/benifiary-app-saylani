// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import Admin from '../models/adminModelAb.js'; // Your Admin model

// Middleware to protect routes and identify the admin
const protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key'); // Use the same secret as in login

      // Find admin by ID from the token payload and attach to request
      // Select -password to exclude password from the returned admin object
      req.admin = await Admin.findById(decoded.id).select('-password');

      // Check if admin exists
      if (!req.admin) {
        return res.status(401).json({ message: 'Not authorized, admin not found' });
      }

      next(); // Proceed to the next middleware/controller
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check if the user is an admin (optional, if you have different roles)
const admin = (req, res, next) => {
  if (req.admin && req.admin.role === 'admin') { // Assuming your Admin model has a 'role' field
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

export { protect, admin };
