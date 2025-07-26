// import express from "express";
// import { authenticate } from "../middleware/authorize.js";
// import { authorizeRoles } from "../middleware/role.js";
// import { registerBeneficiary } from "../controller/beneficiary.controller.js";

// const router = express.Router();

// // Receptionist only
// router.post(
//   "/register",
//   authenticate,
//   authorizeRoles("receptionist", "admin"),
//   registerBeneficiary
// );

// export default router;


import express from 'express';
import {
  registerBeneficiary,
  getAllBeneficiaries,
  getBeneficiaryByCNIC,
} from '../controller/beneficiary.controller.js';

const router = express.Router();

// 🔧 TEMPORARY: Removed verifyToken and checkRole middleware for testing
router.post('/register', registerBeneficiary);
router.get('/all', getAllBeneficiaries);
router.get('/cnic/:cnic', getBeneficiaryByCNIC);

export default router;
