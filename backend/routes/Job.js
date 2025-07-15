import express from "express";
<<<<<<< HEAD
import { createJob } from "../controllers/jobController.js";
=======
import { createJob ,getJobs } from "../controllers/jobController.js";
>>>>>>> 05092c1 (inital commit)
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();
router.post("/", verifyToken, createJob);
<<<<<<< HEAD

=======
router.get("/", verifyToken, getJobs); // 👈 add this
>>>>>>> 05092c1 (inital commit)
export default router;
