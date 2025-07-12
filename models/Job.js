import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: "Employer" },
  title: String,
  description: String,
  postedDate: { type: Date, default: Date.now },
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
