import express from "express";
import verifyToken from "../utils/verifyToken.js";
import { getEmployerStats } from "../controllers/statsControllers.js";
<<<<<<< HEAD

const router = express.Router();
router.get("/stats", verifyToken, getEmployerStats);
=======
import { getMyApplications } from "../controllers/getMyApplications.js";
const router = express.Router();
router.get("/stats", verifyToken, getEmployerStats);
router.get("/", verifyToken, getMyApplications);

>>>>>>> 05092c1 (inital commit)

export default router;
