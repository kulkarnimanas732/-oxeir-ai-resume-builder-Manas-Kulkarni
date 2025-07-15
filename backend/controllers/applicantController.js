// // // // // import Applicant from "../models/Applicant.js";
// // // // // import Job from "../models/Job.js";
// // // // // import { getSkillScoreFromResume } from "../utils/gemini.js"; // ✅ named import

// // // // // export const createApplicant = async (req, res) => {
// // // // //   try {
// // // // //     const { jobId, education, phone } = req.body;
// // // // //     const resumePath = req.file?.path;

// // // // //     const user = req.user;
// // // // //     const job = await Job.findById(jobId);
// // // // //     if (!job) return res.status(404).json({ msg: "Job not found" });

// // // // //     const resumeText = await extractTextFromPDF(resumePath); // Assumes PDF text extraction function
// // // // //     const skillScore = await getSkillScoreFromResume(resumeText, job.title); // ✅ fixed function call

// // // // //     const applicant = await Applicant.create({
// // // // //       jobId,
// // // // //       applicantName: user.name,
// // // // //       email: user.email,
// // // // //       phone,
// // // // //       resumeLink: resumePath,
// // // // //       education,
// // // // //       skillScore
// // // // //     });

// // // // //     res.status(201).json({ msg: "Applicant added", applicant });
// // // // //   } catch (err) {
// // // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // // //   }
// // // // // };
// // // // import Applicant from "../models/Applicant.js";
// // // // import Job from "../models/Job.js";
// // // // import { getSkillScoreFromResume } from "../utils/gemini.js";
// // // // import pdfParse from "pdf-parse";
// // // // import { extractTextFromGridFS } from "../utils/pdfParser.js";




// // // // export const createApplicant = async (req, res) => {
// // // //   try {
// // // //     const { jobId, education, phone } = req.body;
// // // //     const user = req.user;

// // // //     if (!req.file) return res.status(400).json({ msg: "Resume file is required" });

// // // //     const job = await Job.findById(jobId);
// // // //     if (!job) return res.status(404).json({ msg: "Job not found" });

// // // //     // 🧠 Extract resume text from file buffer
// // // //     const resumeBuffer = req.file.buffer;
// // // //     const parsed = await pdfParse(resumeBuffer);
// // // //     // const resumeText = parsed.text;
// // // // const resumeText = await extractTextFromGridFS(req.file.filename);
// // // //     const skillScore = await getSkillScoreFromResume(resumeText, job.title);

// // // //     const applicant = await Applicant.create({
// // // //       jobId,
// // // //       applicantName: user.name,
// // // //       email: user.email,
// // // //       phone,
// // // //       resumeLink: req.file.originalname,
// // // //       education,
// // // //       skillScore
// // // //     });

// // // //     res.status(201).json({ msg: "Applicant added", applicant });
// // // //   } catch (err) {
// // // //     res.status(500).json({ msg: "Server error", error: err.message });
// // // //   }
// // // // };
// // // import Applicant from "../models/Applicant.js";
// // // import Job from "../models/Job.js";
// // // import { getSkillScoreFromResume } from "../utils/gemini.js";
// // // import { extractTextFromGridFS } from "../utils/pdfParser.js";

// // // export const createApplicant = async (req, res) => {
// // //   try {
// // //     const { jobId, education, phone } = req.body;
// // //     const user = req.user;

// // //     if (!req.file) return res.status(400).json({ msg: "Resume file is required" });

// // //     const job = await Job.findById(jobId);
// // //     if (!job) return res.status(404).json({ msg: "Job not found" });

// // //     // ✅ Extract from GridFS only
// // //     const resumeText = await extractTextFromGridFS(req.file.filename);
// // //     const skillScore = await getSkillScoreFromResume(resumeText, job.title);

// // //     const applicant = await Applicant.create({
// // //       jobId,
// // //       applicantName: user.name,
// // //       email: user.email,
// // //       phone,
// // //       resumeLink: req.file.filename,
// // //       education,
// // //       skillScore
// // //     });

// // //     res.status(201).json({ msg: "Applicant added", applicant });
// // //   } catch (err) {
// // //     res.status(500).json({ msg: "Server error", error: err.message });
// // //   }
// // // };
// // import fs from "fs";
// // import path from "path";
// // import Applicant from "../models/Applicant.js";
// // import Job from "../models/Job.js";
// // // import pdf from "pdf-parse";
// // import { getSkillScoreFromResume } from "../utils/gemini.js";
// // import pdf from "pdf-parse";

// // export const createApplicant = async (req, res) => {
// //   try {
// //     const { jobId, education, phone } = req.body;
// //     const user = req.user;

// //     if (!req.file) return res.status(400).json({ msg: "Resume file is required" });

// //     const job = await Job.findById(jobId);
// //     if (!job) return res.status(404).json({ msg: "Job not found" });

// //     const filePath = path.join("uploads", req.file.filename);
// //     const fileBuffer = fs.readFileSync(filePath);
// //     const parsed = await pdf(fileBuffer);
// //     const resumeText = parsed.text;

// //     const skillScore = await getSkillScoreFromResume(resumeText, job.title);

// //     const applicant = await Applicant.create({
// //       jobId,
// //       applicantName: user.name,
// //       email: user.email,
// //       phone,
// //       resumeLink: req.file.filename,
// //       education,
// //       skillScore
// //     });

// //     res.status(201).json({ msg: "Applicant added", applicant });
// //   } catch (err) {
// //     res.status(500).json({ msg: "Server error", error: err.message });
// //   }
// // };
// import fs from "fs";
// import path from "path";
// import pdf from "pdf-parse";
// import Applicant from "../models/Applicant.js";
// import Job from "../models/Job.js";
// import { getSkillScoreFromResume } from "../utils/gemini.js";

// export const createApplicant = async (req, res) => {
//   try {
//     const { jobId, education, phone } = req.body;
//     const user = req.user;

//     if (!req.file) return res.status(400).json({ msg: "Resume file is required" });

//     const job = await Job.findById(jobId);
//     if (!job) return res.status(404).json({ msg: "Job not found" });

//     const filePath = path.join("uploads", req.file.filename);
//     const buffer = fs.readFileSync(filePath);
//     const parsed = await pdf(buffer);
//     const resumeText = parsed.text;

//     const skillScore = await getSkillScoreFromResume(resumeText, job.title);

//     const applicant = await Applicant.create({
//       jobId,
//       applicantName: user.name,           // ✅ Taken from JWT
//       email: user.email,                  // ✅ Taken from JWT
//       phone,
//       education,
//       resumeLink: req.file.filename,
//       skillScore                           // ✅ Calculated from resume
//     });

//     res.status(201).json({ msg: "Applicant added", applicant });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// };
import fs from "fs";
import path from "path";
import pdf from "pdf-parse";
import Applicant from "../models/Applicant.js";
import Job from "../models/Job.js";
import { getSkillScoreFromResume } from "../utils/gemini.js";

export const createApplicant = async (req, res) => {
  try {
    const { jobId, education, phone } = req.body;
    const user = req.user;

    if (!req.file) return res.status(400).json({ msg: "Resume file is required" });

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ msg: "Job not found" });

    const filePath = path.join("uploads", req.file.filename);
    const buffer = fs.readFileSync(filePath);
    const parsed = await pdf(buffer);
    const resumeText = parsed.text;

    const skillScore = await getSkillScoreFromResume(resumeText, job.title);

    const applicant = await Applicant.create({
      jobId,
      applicantName: user.name,
      email: user.email,
      phone,
      education,
      resumeLink: req.file.filename,
      skillScore
    });

    res.status(201).json({ msg: "Applicant added", applicant });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
