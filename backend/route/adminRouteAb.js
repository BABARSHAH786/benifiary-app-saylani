import express from "express";
import { LoginAdmin } from "../controller/adminAb.js";  


const router = express.Router();

router.post("/login", LoginAdmin);

// ✅ Use ES module export
export default router;
