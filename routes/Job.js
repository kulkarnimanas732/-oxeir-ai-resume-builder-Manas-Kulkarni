import express from "express";
import { createJob } from "../controllers/jobController.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();
router.post("/", verifyToken, createJob);

export default router;
