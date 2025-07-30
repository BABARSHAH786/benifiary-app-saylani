import express from 'express';
import { verifyToken, checkRole } from "../middleware/auth.middleware.js";
import Student from '../models/student.js';

import {
  registerBeneficiary,
  getAllBeneficiaries,
  getBeneficiaryByCNIC,
} from '../controllers/student.js';

const router = express.Router(); // ✅ This was missing

// Register a beneficiary (No auth middleware for now)
router.post('/register', registerBeneficiary);

// Get all beneficiaries (you can later protect this route with middleware)
router.get('/all', getAllBeneficiaries);

// Get a single beneficiary by CNIC
router.get('/cnic/:cnic', getBeneficiaryByCNIC);

// Get stats (only Admin)
router.get("/stats", verifyToken, checkRole(["Admin"]), async (req, res) => {
  try {
    const total = await Student.countDocuments();
    const today = await Student.countDocuments({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
    });

    res.json({
      total,
      today,
      tokens: 0,      // Add actual token count when model ready
      completed: 0,   // Add actual completed services count when model ready
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;


