// import express from 'express';
// import { verifyToken, checkRole } from "../middleware/auth.middleware.js";
// import Admin from '../model/adminModelAb.js';

// import {
//   registerBeneficiary,
//   getAllBeneficiaries,
//   getBeneficiaryByCNIC,
// } from '../controller/adminAb.js';

// const router = express.Router(); // ✅ This was missing

// // Register a beneficiary (No auth middleware for now)
// router.post('/register', registerBeneficiary);

// // Get all beneficiaries (you can later protect this route with middleware)
// router.get('/all', getAllBeneficiaries);

// // Get a single beneficiary by CNIC
// router.get('/cnic/:cnic', getBeneficiaryByCNIC);

// // Get stats (only Admin)
// router.get("/stats", verifyToken, checkRole(["Admin"]), async (req, res) => {
//   try {
//     const total = await Admin.countDocuments();
//     const today = await Admin.countDocuments({
//       createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
//     });

//     res.json({
//       total,
//       today,
//       tokens: 0,      // Add actual token count when model ready
//       completed: 0,   // Add actual completed services count when model ready
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch stats" });
//   }
// });

// export default router;




// New
import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  logoutAdmin
} from "../controller/adminAb.js";
import { verifyToken, checkRole } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post('/logout', logoutAdmin); // New logout route
router.get("/all", verifyToken, checkRole(["admin"]), getAllAdmins);

export default router;


