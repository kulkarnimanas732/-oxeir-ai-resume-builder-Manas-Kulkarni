import express from "express";
import { createHire } from "../controllers/hireController.js";

const router = express.Router();
router.post("/", createHire);

export default router;
