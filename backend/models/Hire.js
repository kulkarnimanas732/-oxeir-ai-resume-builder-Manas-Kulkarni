import mongoose from "mongoose";

const hireSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: "Applicant" },
  hireDate: { type: Date, default: Date.now },
});

const Hire = mongoose.model("Hire", hireSchema);
export default Hire;
