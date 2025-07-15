<<<<<<< HEAD
import express from "express";
import { loginEmployer ,registerEmployer} from "../controllers/authController.js";

const router = express.Router();
router.post("/login", loginEmployer);
router.post("/register", registerEmployer);
=======
// import express from "express";
// import { loginEmployer ,registerEmployer} from "../controllers/authController.js";

// const router = express.Router();
// router.post("/login", loginEmployer);
// router.post("/register", registerEmployer);
// export default router;
import express from "express"
import { loginEmployer, registerEmployer, loginApplicant, registerApplicant } from "../controllers/authController.js";

const router = express.Router();

// Existing employer routes
router.post("/login", loginEmployer);
router.post("/register", registerEmployer);

// ✅ New applicant routes
router.post("/applicant/login", loginApplicant);
router.post("/applicant/register", registerApplicant);

>>>>>>> 05092c1 (inital commit)
export default router;
