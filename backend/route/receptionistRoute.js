// import express from 'express';
// import Beneficiary from '../model/beneficiaryModel.js'; // adjust path as needed

// const router = express.Router();

// // POST /api/receptionist/register
// router.post('/register', async (req, res) => {
//   try {
//     const { cnic, name, phone, gender, address, familyMembers, department } = req.body;

//     // Check if CNIC already exists
//     const existing = await Beneficiary.findOne({ cnic });
//     if (existing) {
//       return res.status(400).json({ message: 'CNIC already registered' });
//     }

//     const beneficiary = await Beneficiary.create({
//       cnic,
//       name,
//       phone,
//       gender,
//       address,
//       familyMembers,
//       department,
//       visitDate: new Date(),
//       createdBy: req.user?._id, // If using auth middleware
//     });

//     res.status(201).json({ message: 'Beneficiary registered', beneficiary });
//   } catch (error) {
//     console.error('Registration error:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// export default router;



// new
// route/receptionistRoute.js
import express from "express";
import Beneficiary from "../models/Beneficiary.js";

const router = express.Router();

// POST /api/receptionist/register
router.post("/register", async (req, res) => {
  try {
    const { cnic, name, phone, gender, address, familyMembers, department } = req.body;

    const existing = await Beneficiary.findOne({ cnic });
    if (existing) {
      return res.status(400).json({ message: "CNIC already registered" });
    }

    const beneficiary = await Beneficiary.create({
      cnic,
      name,
      phone,
      gender,
      address,
      familyMembers,
      department,
      visitDate: new Date(),
      createdBy: null, // will be added later
    });

    res.status(201).json({ message: "Beneficiary registered", beneficiary });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET /api/receptionist/stats/today
router.get("/stats/today", async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const count = await Beneficiary.countDocuments({
      visitDate: { $gte: today, $lt: tomorrow },
    });

    res.status(200).json({ todayCount: count });
  } catch (error) {
    console.error("Error in stats/today:", error);
    res.status(500).json({ message: "Failed to fetch today's stats" });
  }
});

export default router;
