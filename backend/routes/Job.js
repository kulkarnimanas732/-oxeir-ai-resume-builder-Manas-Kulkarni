import express from "express";
import { createJob ,getJobs } from "../controllers/jobController.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();
router.post("/", verifyToken, createJob);
router.get("/", verifyToken, getJobs); // 👈 add this
export default router;
