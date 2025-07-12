import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const employerId = req.user.id; // From JWT token
    const { title, description } = req.body;

    const job = await Job.create({ title, description, employerId });

    res.status(201).json({ job });
  } catch (err) {
    res.status(500).json({ msg: "Error", error: err.message });
  }
};
