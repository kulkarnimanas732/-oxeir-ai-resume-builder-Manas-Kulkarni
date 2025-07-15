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
