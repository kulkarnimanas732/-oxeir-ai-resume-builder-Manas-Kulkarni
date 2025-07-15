
// File: src/components/applicant/ApplyModal.jsx
import React from 'react';

const ApplyModal = ({ jobTitle, applicationForm, setApplicationForm, onClose, onSubmit }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Apply for {jobTitle}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={applicationForm.phone}
              onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Education
            </label>
            <input
              type="text"
              required
              value={applicationForm.education}
              onChange={(e) => setApplicationForm({ ...applicationForm, education: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Bachelor's in Computer Science"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resume (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              required
              onChange={(e) => setApplicationForm({ ...applicationForm, resume: e.target.files[0] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Our AI will analyze your resume and provide a skill score
            </p>
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default ApplyModal;
