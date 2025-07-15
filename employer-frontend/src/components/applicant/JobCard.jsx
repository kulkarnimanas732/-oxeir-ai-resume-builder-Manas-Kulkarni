// File: src/components/applicant/JobCard.jsx
import React from 'react';
import { Calendar } from 'lucide-react';

const JobCard = ({ job, onApply }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex justify-between items-start mb-4">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
        <p className="text-gray-600 mt-2">{job.description}</p>
      </div>
    </div>
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Calendar className="h-4 w-4" />
        <span>Posted recently</span>
      </div>
      <button
        onClick={() => onApply(job)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Apply Now
      </button>
    </div>
  </div>
);

export default JobCard;