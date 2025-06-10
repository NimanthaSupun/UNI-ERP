import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import RoleSelection from './pages/RoleSelection.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';

// Component to handle authenticated user redirects
const AuthenticatedRedirect = ({ children }) => {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              <AuthenticatedRedirect>
                <RoleSelection />
              </AuthenticatedRedirect>
            } 
          />
          <Route 
            path="/login/:role" 
            element={
              <AuthenticatedRedirect>
                <Login />
              </AuthenticatedRedirect>
            } 
          />
          <Route 
            path="/register/:role" 
            element={
              <AuthenticatedRedirect>
                <Register />
              </AuthenticatedRedirect>
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/\" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;