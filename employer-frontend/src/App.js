import React from 'react';
import { useAuth } from './context/AuthContext';
import Login from './components/auth/Login';
import EmployerDashboard from './components/Dashboard/EmployerDashboard';
import ApplicantDashboard from './components/Dashboard/ApplicantDashboard';

const App = () => {
  const { user, userType, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return userType === 'employer' ? <EmployerDashboard /> : <ApplicantDashboard />;
};

export default App;
