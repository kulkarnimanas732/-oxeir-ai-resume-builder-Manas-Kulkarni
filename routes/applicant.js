import express from "express";
import { createApplicant } from "../controllers/applicantController.js";

const router = express.Router();
router.post("/", createApplicant);

export default router;
