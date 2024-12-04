import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogOut, BookOpen } from 'lucide-react';

export const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-green-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-green-600" />
            <span className="text-xl font-semibold text-green-700">StudyTracker</span>
          </Link>
          
          {user && (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-600 hover:text-green-600 transition-colors">
                Dashboard
              </Link>
              <Link to="/subjects" className="text-gray-600 hover:text-green-600 transition-colors">
                Subjects
              </Link>
              <button
                onClick={signOut}
                className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};