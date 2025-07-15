
import Applicant from '../models/Applicant.js';
import Hire from '../models/Hire.js';
import Job from '../models/Job.js';

export const getMyApplications = async (req, res) => {
  try {
    const email = req.user.email;

    const applications = await Applicant.find({ email });

    const data = await Promise.all(
      applications.map(async (app) => {
        const job = await Job.findById(app.jobId);
        const hire = await Hire.findOne({ jobId: app.jobId, applicantId: app._id });

        return {
          jobTitle: job?.title || 'Unknown',
          appliedDate: app.appliedDate,
          skillScore: app.skillScore,
          isHired: !!hire, // ✅ True if hired
        };
      })
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

