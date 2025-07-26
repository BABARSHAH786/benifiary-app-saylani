// // route/receptionist.js
// import express from "express";
// import Token from "../model/Token.js";
// import Beneficiary from "../model/Beneficiary.js";
// import authMiddleware from "../middleware/auth.js"; // ✅ Only this needed

// const router = express.Router();

// // GET /api/receptionist/stats/today
// router.get(
//   "/stats/today",
//   authMiddleware(["receptionist"]), // ✅ Check if role is 'receptionist'
//   async (req, res) => {
//     try {
//       const today = new Date().toISOString().split("T")[0];
//       const startOfDay = new Date(`${today}T00:00:00.000Z`);

//       const beneficiariesToday = await Beneficiary.countDocuments({
//         createdAt: { $gte: startOfDay },
//       });
//       const tokensIssued = await Token.countDocuments({
//         createdAt: { $gte: startOfDay },
//       });
//       const pendingTokens = await Token.countDocuments({
//         status: "pending",
//         createdAt: { $gte: startOfDay },
//       });
//       const completedTokens = await Token.countDocuments({
//         status: "completed",
//         createdAt: { $gte: startOfDay },
//       });

//       res.json({
//         beneficiariesToday,
//         tokensIssued,
//         pendingTokens,
//         completedTokens,
//       });
//     } catch (err) {
//       res.status(500).json({ error: "Failed to fetch stats" });
//     }
//   }
// );

// export default router;





// route/receptionist.js
import express from "express";
import Token from "../model/Token.js";
import Beneficiary from "../model/Beneficiary.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/stats/today",
  authMiddleware(["receptionist"]),
  async (req, res) => {
    try {
      // ... count logic
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  }
);

export default router;
