import React, { useState, useEffect } from 'react';
import { Briefcase, LogOut, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ApplicantDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationForm, setApplicationForm] = useState({
    education: '',
    phone: '',
    resume: null,
  });
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || 'Failed to fetch jobs');
      setJobs(data.jobs || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/applicants`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('jobId', selectedJob._id);
      formData.append('education', applicationForm.education);
      formData.append('phone', applicationForm.phone);
      formData.append('resume', applicationForm.resume);

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/applicants`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        setSelectedJob(null);
        setApplicationForm({ education: '', phone: '', resume: null });
        fetchApplications(); // ✅ Refresh applications after apply
      }
    } catch (err) {
      console.error('Error applying:', err);
    } finally {
      setLoading(false);
    }
  };

  const JobCard = ({ job }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
      <p className="text-gray-600 mb-4">{job.description}</p>
      <button
        onClick={() => setSelectedJob(job)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Apply Now
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Briefcase className="w-8 h-8 text-blue-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">JobPortal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="flex items-center text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Jobs</h2>
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">My Applications</h2>
            <div className="space-y-4">
              
              {applications.map((app, index) => (
  <div key={index} className="bg-white rounded-lg shadow-md p-4">
    <h3 className="font-medium text-gray-900">{app.jobTitle}</h3>
    <p className="text-sm text-gray-500">
      Applied: {new Date(app.appliedDate).toLocaleDateString()}
    </p>
    <p className="text-sm text-gray-500">Score: {app.skillScore}</p>

    {app.isHired ? (
      <span className="inline-block mt-2 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
        ✅ Hired
      </span>
    ) : (
      <span className="inline-block mt-2 bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
        ⏳ Pending
      </span>
    )}
  </div>
))}

              {applications.length === 0 && (
                <p className="text-gray-500 text-center py-8">No applications yet</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Apply for {selectedJob.title}
              </h3>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                <input
                  type="text"
                  value={applicationForm.education}
                  onChange={(e) => setApplicationForm({ ...applicationForm, education: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., B.Tech in Computer Science"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={applicationForm.phone}
                  onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resume (PDF)</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setApplicationForm({ ...applicationForm, resume: e.target.files[0] })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Applying...' : 'Apply'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantDashboard;

