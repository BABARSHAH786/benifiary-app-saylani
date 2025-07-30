// // backend/controller/beneficiary.controller.js
// import { v4 as uuidv4 } from "uuid";
// import Admin from "../model/adminModelAb.js";

// // ✅ Register new beneficiary
// export const registerBeneficiary = async (req, res) => {
//   try {
//     const { cnic, name, phone, address, purpose, department } = req.body;

//     if (!cnic || !name || !purpose || !department) {
//       return res.status(400).json({ message: "Required fields missing" });
//     }

//     const exists = await Admin.findOne({ cnic });
//     if (exists) {
//       return res.status(400).json({ message: "Admin already registered" });
//     }

//     const token = uuidv4().slice(0, 8).toUpperCase();

//     const admin = await Admin.create({
//       cnic,
//       name,
//       phone,
//       address,
//       purpose,
//       department,
//       token,
//       createdBy: req.user?._id || null,
//     });

//     res.status(201).json({
//       message: "Admin registered successfully",
//       token: admin.token,
//       admin,
//     });
//   } catch (error) {
//     console.error("Register Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // ✅ Get beneficiary by CNIC
// export const getBeneficiaryByCNIC = async (req, res) => {
//   try {
//     const { cnic } = req.params;

//     const admin = await Admin.findOne({ cnic });

//     if (!admin) {
//       return res.status(404).json({ message: "Admin not found" });
//     }

//     res.status(200).json({ admin });
//   } catch (error) {
//     console.error("Fetch Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // ✅ Dummy placeholder for future route
// export const getAllBeneficiaries = async (req, res) => {
//   try {
//     const beneficiaries = await Admin.find({});
//     res.status(200).json({ beneficiaries });
//   } catch (error) {
//     console.error("Fetch All Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };




// new
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { v4 as uuidv4 } from "uuid";
// import Admin from "../model/adminModelAb.js";

// // ✅ Register Admin (with CNIC & token)
// export const registerAdmin = async (req, res) => {
//   try {
//     const { cnic, name, email, password, phone, address, purpose, department } = req.body;

//     if (!cnic || !name || !email || !password) {
//       return res.status(400).json({ message: "Required fields missing" });
//     }

//     const exists = await Admin.findOne({ $or: [{ email }, { cnic }] });
//     if (exists) {
//       return res.status(400).json({ message: "Admin already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const token = uuidv4().slice(0, 8).toUpperCase();

//     const admin = await Admin.create({
//       cnic,
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       address,
//       purpose,
//       department,
//       token,
//     });

//     res.status(201).json({
//       message: "Admin registered successfully",
//       token: admin.token,
//       admin,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

// // ✅ Login Admin
// export const loginAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const admin = await Admin.findOne({ email });
//     if (!admin) return res.status(404).json({ message: "Admin not found" });

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: admin._id, role: "admin" },
//       process.env.JWT_SECRET || "secret",
//       { expiresIn: "1d" }
//     );

//     res.json({ message: "Login successful", token, admin });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

// // ✅ Get all Admins
// export const getAllAdmins = async (req, res) => {
//   try {
//     const admins = await Admin.find({});
//     res.status(200).json({ admins });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };



// error solve requirend input field
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { v4 as uuidv4 } from "uuid";
// // Ensure this path is correct relative to adminAb.js
// import Admin from "../model/adminModelAb.js"; 

// // ✅ Register Admin (with CNIC & token)
// export const registerAdmin = async (req, res) => {
//   try {
//     const { cnic, name, email, password, phone, address, purpose, department } = req.body;

//     // Backend validation: Ensure all required fields are present
//     if (!cnic || !name || !email || !password) {
//       return res.status(400).json({ message: "Required fields missing: CNIC, Name, Email, and Password are mandatory." });
//     }

//     // Check if admin already exists by email or CNIC
//     const exists = await Admin.findOne({ $or: [{ email }, { cnic }] });
//     if (exists) {
//       return res.status(400).json({ message: "Admin with this email or CNIC is already registered" });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);
//     // Generate a unique token
//     const token = uuidv4().slice(0, 8).toUpperCase();

//     // Create the new admin document
//     const admin = await Admin.create({
//       cnic,
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       address,
//       purpose,
//       department,
//       token, // Store the generated token
//     });

//     // Respond with success message, token, and admin details
//     res.status(201).json({
//       message: "Admin registered successfully",
//       token: admin.token,
//       admin: {
//         _id: admin._id,
//         cnic: admin.cnic,
//         name: admin.name,
//         email: admin.email,
//         phone: admin.phone,
//         address: admin.address,
//         purpose: admin.purpose,
//         department: admin.department,
//       }, // Return a subset of admin data for security
//     });
//   } catch (error) {
//     console.error("Error during admin registration:", error); // Log the full error for debugging
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

// // ✅ Login Admin
// export const loginAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find admin by email
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//         return res.status(404).json({ message: "Admin not found with this email" });
//     }

//     // Compare provided password with hashed password
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//         return res.status(401).json({ message: "Invalid credentials: Password does not match" });
//     }

//     // Generate JWT token for authentication
//     const token = jwt.sign(
//       { id: admin._id, role: "admin" },
//       process.env.JWT_SECRET || "your_jwt_secret_key", // Use a strong secret from environment variables
//       { expiresIn: "1d" } // Token expires in 1 day
//     );

//     // Respond with success message, JWT token, and admin details
//     res.json({
//       message: "Login successful",
//       token,
//       admin: {
//         _id: admin._id,
//         cnic: admin.cnic,
//         name: admin.name,
//         email: admin.email,
//         phone: admin.phone,
//         address: admin.address,
//         purpose: admin.purpose,
//         department: admin.department,
//       },
//     });
//   } catch (error) {
//     console.error("Error during admin login:", error); // Log the full error for debugging
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

// // ✅ Get all Admins
// export const getAllAdmins = async (req, res) => {
//   try {
//     const admins = await Admin.find({}); // Fetch all admin documents
//     res.status(200).json({ admins });
//   } catch (error) {
//     console.error("Error getting all admins:", error); // Log the full error for debugging
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };




// logout admin
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
// Ensure this path is correct relative to adminAb.js
import Admin from "../models/adminModelAb.js";

// ✅ Register Admin (with CNIC & token)
export const registerAdmin = async (req, res) => {
  try {
    const { cnic, name, email, password, phone, address, purpose, department } = req.body;

    // Backend validation: Ensure all required fields are present
    if (!cnic || !name || !email || !password) {
      return res.status(400).json({ message: "Required fields missing: CNIC, Name, Email, and Password are mandatory." });
    }

    // Check if admin already exists by email or CNIC
    const exists = await Admin.findOne({ $or: [{ email }, { cnic }] });
    if (exists) {
      return res.status(400).json({ message: "Admin with this email or CNIC is already registered" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate a unique token
    const token = uuidv4().slice(0, 8).toUpperCase();

    // Create the new admin document
    const admin = await Admin.create({
      cnic,
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      purpose,
      department,
      token, // Store the generated token
    });

    // Respond with success message, token, and admin details
    res.status(201).json({
      message: "Admin registered successfully",
      token: admin.token,
      admin: {
        _id: admin._id,
        cnic: admin.cnic,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        address: admin.address,
        purpose: admin.purpose,
        department: admin.department,
      }, // Return a subset of admin data for security
    });
  } catch (error) {
    console.error("Error during admin registration:", error); // Log the full error for debugging
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// ✅ Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
        return res.status(404).json({ message: "Admin not found with this email" });
    }

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials: Password does not match" });
    }

    // Generate JWT token for authentication
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET || "your_jwt_secret_key", // Use a strong secret from environment variables
      { expiresIn: "1d" } // Token expires in 1 day
    );

    // Respond with success message, JWT token, and admin details
    res.json({
      message: "Login successful",
      token,
      admin: {
        _id: admin._id,
        cnic: admin.cnic,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        address: admin.address,
        purpose: admin.purpose,
        department: admin.department,
      },
    });
  } catch (error) {
    console.error("Error during admin login:", error); // Log the full error for debugging
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// ✅ Get all Admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}); // Fetch all admin documents
    res.status(200).json({ admins });
  } catch (error) {
    console.error("Error getting all admins:", error); // Log the full error for debugging
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// ✅ Logout Admin
export const logoutAdmin = (req, res) => {
  try {
    // For JWT, backend invalidation is often not strictly necessary as tokens are stateless.
    // The client will simply discard the token.
    // However, you can send a success message to confirm the logout request.
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during admin logout:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};