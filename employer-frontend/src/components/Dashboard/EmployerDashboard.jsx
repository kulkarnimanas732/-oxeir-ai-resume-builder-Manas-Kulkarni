import React, { useState, useEffect } from 'react';
import {
  Briefcase, Plus, TrendingUp, User, CheckCircle, LogOut,
} from 'lucide-react';
import { apiCall } from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../Shared/StatCard';
import toast, { Toaster } from 'react-hot-toast';

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [newJob, setNewJob] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await apiCall('/employer/stats');
      setStats(response);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const createJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiCall('/jobs', {
        method: 'POST',
        body: JSON.stringify(newJob),
      });
      setNewJob({ title: '', description: '' });
      setActiveTab('stats');
      fetchStats();
    } catch (err) {
      console.error('Error creating job:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleHire = async (jobId, applicantId) => {
    try {
      await apiCall('/hires', {
        method: 'POST',
        body: JSON.stringify({ jobId, applicantId }),
      });

      toast.success('Hired successfully ✅');

      setStats(prev => {
        const updated = { ...prev };
        updated.perJobStats = updated.perJobStats.map(job => {
          if (job.jobId === jobId) {
            const updatedApplicants = job.applicants.map(applicant => {
              if (applicant._id === applicantId) {
                return { ...applicant, isHired: true };
              }
              return applicant;
            });
            return {
              ...job,
              applicants: updatedApplicants,
              numHires: job.numHires + 1,
            };
          }
          return job;
        });
        updated.totalHires += 1;
        return updated;
      });

    } catch (err) {
      toast.error('Error hiring: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Briefcase className="w-8 h-8 text-blue-500 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">JobPortal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
              <button onClick={logout} className="flex items-center text-red-600 hover:text-red-700">
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex space-x-8 mb-8">
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'stats' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === 'jobs' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Job
          </button>
        </nav>

        {/* Dashboard View */}
        {activeTab === 'stats' && (
          <>
            {!stats ? (
              <div className="text-center text-gray-500 py-10">Loading stats...</div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <StatCard title="Total Jobs" value={stats.totalJobs} icon={Briefcase} color="bg-blue-500" />
                  <StatCard title="Total Applicants" value={stats.totalApplicants} icon={User} color="bg-green-500" />
                  <StatCard title="Total Hires" value={stats.totalHires} icon={CheckCircle} color="bg-purple-500" />
                  <StatCard title="Avg Skill Score" value={stats.avgSkillScore} icon={TrendingUp} color="bg-orange-500" />
                </div>

                <div className="bg-white rounded-lg shadow-md">
                  <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-medium text-gray-900">Job Performance</h3>
                  </div>
                  <div className="p-6 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicants</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hires</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Score</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {stats.perJobStats.map((job, index) => (
                          <React.Fragment key={index}>
                            <tr>
                              <td className="px-6 py-4 text-sm font-medium text-gray-900">{job.jobTitle}</td>
                              <td className="px-6 py-4 text-sm text-gray-500">{job.numApplicants}</td>
                              <td className="px-6 py-4 text-sm text-gray-500">{job.numHires}</td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                {job.averageSkillScore ? job.averageSkillScore.toFixed(1) : 'N/A'}
                              </td>
                            </tr>

                            {job.applicants?.map((applicant) => (
                              <tr key={applicant._id} className="bg-gray-50">
                                <td colSpan={4} className="px-6 py-3">
                                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                                    <div>
                                      <p className="font-medium text-gray-800">{applicant.applicantName}</p>
                                      <p className="text-sm text-gray-600">Email: {applicant.email}</p>
                                      <p className="text-sm text-gray-600">Score: {applicant.skillScore}</p>
                                    </div>
                                    <div className="flex gap-3">
                                      <a
                                        href={`http://localhost:5000/uploads/${applicant.resumeLink}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                      >
                                        View Resume
                                      </a>
                                      {applicant.isHired ? (
                                        <span className="text-green-600 font-semibold">Hired</span>
                                      ) : (
                                        <button
                                          onClick={() => handleHire(job.jobId, applicant._id)}
                                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                        >
                                          Hire
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Create Job Form */}
        {activeTab === 'jobs' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Job</h2>
              <form onSubmit={createJob} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Frontend Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                  <textarea
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the job requirements, responsibilities, and qualifications..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? 'Creating Job...' : 'Create Job'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
