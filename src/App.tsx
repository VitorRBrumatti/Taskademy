import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Calendar } from './pages/Calendar';
import { Whiteboard } from './pages/Whiteboard';
import { Login } from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <>
                    <Navbar />
                    <Dashboard />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <PrivateRoute>
                  <>
                    <Navbar />
                    <Calendar />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/subjects/:subjectId/tasks"
              element={
                <PrivateRoute>
                  <>
                    <Navbar />
                    <Whiteboard />
                  </>
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}