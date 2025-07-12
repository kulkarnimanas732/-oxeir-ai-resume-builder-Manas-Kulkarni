import Applicant from "../models/Applicant.js";

export const createApplicant = async (req, res) => {
  try {
    const { jobId, applicantName, skillScore } = req.body;

    const applicant = await Applicant.create({
      jobId,
      applicantName,
      skillScore,
    });

    res.status(201).json({ msg: "Applicant added", applicant });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
