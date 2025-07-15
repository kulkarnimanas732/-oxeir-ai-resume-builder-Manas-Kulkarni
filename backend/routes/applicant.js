// routes/applicantRoutes.js

// routes/applicant.js
import express from "express";
import { upload } from "../utils/upload.js";
import { createApplicant } from "../controllers/applicantController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// 👇 Since /api/applicants is already prefixed, use root "/"
router.post("/", verifyToken, upload.single("resume"), createApplicant);

export default router;
