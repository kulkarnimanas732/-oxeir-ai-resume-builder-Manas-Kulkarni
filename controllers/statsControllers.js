
import mongoose from "mongoose";
import Job from "../models/Job.js";


export const getEmployerStats = async (req, res) => {
  try {
    const employerId = req.user.id;

    const jobStats = await Job.aggregate([
      {
        $match: {
          employerId: new mongoose.Types.ObjectId(employerId),
        },
      },
      {
        $lookup: {
          from: "applicants",
          localField: "_id",
          foreignField: "jobId",
          as: "applicants",
        },
      },
      {
        $lookup: {
          from: "hires",
          localField: "_id",
          foreignField: "jobId",
          as: "hires",
        },
      },
      {
        $project: {
          jobTitle: "$title",
          numApplicants: { $size: "$applicants" },
          numHires: { $size: "$hires" },
          averageSkillScore: { $avg: "$applicants.skillScore" },
        },
      },
    ]);

    const totalStats = jobStats.reduce(
      (acc, job) => {
        acc.totalJobs += 1;
        acc.totalApplicants += job.numApplicants;
        acc.totalHires += job.numHires;
        acc.totalSkillScore += job.averageSkillScore || 0;
        return acc;
      },
      {
        totalJobs: 0,
        totalApplicants: 0,
        totalHires: 0,
        totalSkillScore: 0,
      }
    );

    const avgSkillScore = totalStats.totalJobs > 0
      ? Math.round(totalStats.totalSkillScore / totalStats.totalJobs)
      : 0;

    res.json({
      totalJobs: totalStats.totalJobs,
      totalApplicants: totalStats.totalApplicants,
      totalHires: totalStats.totalHires,
      avgSkillScore,
      perJobStats: jobStats,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};
