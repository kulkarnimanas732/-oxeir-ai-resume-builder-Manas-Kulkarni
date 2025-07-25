import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import statsRoute from "./routes/stats.js";
import authRoute from "./routes/auth.js";
import crypto from 'crypto';
import jobRoutes from "./routes/Job.js";
import applicantRoutes from "./routes/applicant.js";
import hireRoutes from "./routes/hire.js";
<<<<<<< HEAD
=======
import path from 'path';

>>>>>>> 05092c1 (inital commit)

dotenv.config();
const app = express();

const secret = crypto.randomBytes(64).toString('hex');

<<<<<<< HEAD

=======
>>>>>>> 05092c1 (inital commit)
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("DB connection error:", err));

app.use("/api/employer", authRoute);
app.use("/api/employer", statsRoute);
app.use("/api/jobs", jobRoutes);
app.use("/api/applicants", applicantRoutes);
app.use("/api/hires", hireRoutes);
<<<<<<< HEAD

=======
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));
>>>>>>> 05092c1 (inital commit)
app.get("/", (req, res) => {
  res.send(" Employer Stats API is running");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

