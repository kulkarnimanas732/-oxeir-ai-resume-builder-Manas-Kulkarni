import React from 'react';

const JobCard = ({ job, onApply }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
      <p className="text-gray-600 mb-4">{job.description}</p>
      <button
        onClick={() => onApply(job)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
