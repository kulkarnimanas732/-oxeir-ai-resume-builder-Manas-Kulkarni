import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
<<<<<<< HEAD
  jobId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Job", 
    required: true 
  },
  applicantName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: false 
  },
  phone: { 
    type: String, 
    required: false 
  },
  resumeLink: { 
    type: String, 
    required: false
  },
  skillScore: { 
    type: Number, 
    required: true 
  },
  appliedDate: { 
    type: Date, 
    default: Date.now 
  },
});


const Applicant = mongoose.model("Applicant", applicantSchema);

=======
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  applicantName: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: false },
  resumeLink: { type: String, required: false },
  education: { type: String, required: false },
  skillScore: { type: Number, required: true },
  appliedDate: { type: Date, default: Date.now }
});

const Applicant = mongoose.model("Applicant", applicantSchema);
>>>>>>> 05092c1 (inital commit)
export default Applicant;
