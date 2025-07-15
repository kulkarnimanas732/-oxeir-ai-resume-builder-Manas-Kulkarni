<<<<<<< HEAD

import mongoose from "mongoose";
import Job from "../models/Job.js";

=======
import mongoose from "mongoose";
import Job from "../models/Job.js";
import Applicant from "../models/Applicant.js";
import Hire from "../models/Hire.js";
>>>>>>> 05092c1 (inital commit)

export const getEmployerStats = async (req, res) => {
  try {
    const employerId = req.user.id;
<<<<<<< HEAD

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
=======
    const jobs = await Job.find({ employerId });

    const perJobStats = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await Applicant.find({ jobId: job._id }).select(
          "_id applicantName email skillScore resumeLink"
        );

        const hires = await Hire.find({ jobId: job._id });

        // ✅ Only count unique applicant IDs
        const hiredApplicantIds = new Set(hires.map((h) => h.applicantId.toString()));

        const applicantsWithStatus = applicants.map((a) => ({
          _id: a._id,
          applicantName: a.applicantName,
          email: a.email,
          skillScore: a.skillScore,
          resumeLink: a.resumeLink,
          isHired: hiredApplicantIds.has(a._id.toString()),
        }));

        const avgScore =
          applicants.reduce((sum, cur) => sum + (cur.skillScore || 0), 0) /
          (applicants.length || 1);

        return {
          jobId: job._id,
          jobTitle: job.title,
          numApplicants: applicants.length,
          numHires: hiredApplicantIds.size, // ✅ correct unique hire count
          averageSkillScore: avgScore || 0,
          applicants: applicantsWithStatus,
        };
      })
    );

    const totalJobs = perJobStats.length;
    const totalApplicants = perJobStats.reduce((acc, job) => acc + job.numApplicants, 0);
    const totalHires = perJobStats.reduce((acc, job) => acc + job.numHires, 0);
    const avgSkillScore =
      totalJobs > 0
        ? Math.round(
            perJobStats.reduce((sum, job) => sum + (job.averageSkillScore || 0), 0) / totalJobs
          )
        : 0;

    res.json({
      totalJobs,
      totalApplicants,
      totalHires,
      avgSkillScore,
      perJobStats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

>>>>>>> 05092c1 (inital commit)
