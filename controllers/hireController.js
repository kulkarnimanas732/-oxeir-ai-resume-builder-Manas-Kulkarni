import Hire from "../models/Hire.js";

export const createHire = async (req, res) => {
  try {
    const { jobId, applicantId } = req.body;

    const hire = await Hire.create({
      jobId,
      applicantId,
    });

    res.status(201).json({ msg: "Hire recorded", hire });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
