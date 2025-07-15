// models/applicantAuth.js
import mongoose from "mongoose";

const applicantAuthSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const ApplicantAuth = mongoose.model("ApplicantAuth", applicantAuthSchema);
export default ApplicantAuth;
