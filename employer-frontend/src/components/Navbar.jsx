

// File: src/components/Navbar.jsx
import React from 'react';
import { LogOut, Building, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, userType, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center">
          <Building className="h-8 w-8 text-blue-600 mr-2" />
          <span className="text-xl font-bold text-gray-900">Oxeir AI</span>
        </div>
        {user && (
          <div className="flex items-center space-x-4">
            <User className="h-5 w-5 text-gray-500" />
            <span>{user.email}</span>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{userType}</span>
            <button onClick={logout} className="text-red-600 hover:underline flex items-center">
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;