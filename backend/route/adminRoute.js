// // route/adminRoute.js
// import express from "express";
// import User from "../model/User.js";
// import bcrypt from "bcrypt";
// import verifyAdmin from "../middleware/verifyAdmin.js";

// const router = express.Router();

// // POST /api/admin/register-receptionist
// router.post("/register-receptionist", verifyAdmin, async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: "Email already registered" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const receptionist = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: "receptionist",
//     });

//     res.status(201).json({ message: "Receptionist registered", receptionist });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;
