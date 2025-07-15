<<<<<<< HEAD
import express from "express";
import { createApplicant } from "../controllers/applicantController.js";

const router = express.Router();
router.post("/", createApplicant);
=======
// routes/applicantRoutes.js

// routes/applicant.js
import express from "express";
import { upload } from "../utils/upload.js";
import { createApplicant } from "../controllers/applicantController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// 👇 Since /api/applicants is already prefixed, use root "/"
router.post("/", verifyToken, upload.single("resume"), createApplicant);
>>>>>>> 05092c1 (inital commit)

export default router;
