import express from "express";
const router = express.Router()

import adminRouteAb from "./adminRouteAb.js";

router.use('/api/admin', adminRouteAb)

export default router;
