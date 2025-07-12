import express from "express";
import verifyToken from "../utils/verifyToken.js";
import { getEmployerStats } from "../controllers/statsControllers.js";

const router = express.Router();
router.get("/stats", verifyToken, getEmployerStats);

export default router;
