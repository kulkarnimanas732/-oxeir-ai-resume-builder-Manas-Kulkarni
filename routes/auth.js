import express from "express";
import { loginEmployer ,registerEmployer} from "../controllers/authController.js";

const router = express.Router();
router.post("/login", loginEmployer);
router.post("/register", registerEmployer);
export default router;
