import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProtectedLayout from "./Components/ProtectedLayout";
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Create from './Components/Create';
import Read from './Components/Read';
import Edit from './Components/Update';
import Attendance from './Components/Attendance';
import Payroll from './Components/Payroll';
import Reports from './Components/Reports';
import Company from './Components/Company';
import Settings from './Components/Settings';
import Help from './Components/Help';
import Privacy from './Components/Privacy';

// Main App Component
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - No Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Private Routes - With Layout */}
        <Route path="/*" element={<PrivateRoutes />} />
        
        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

// Private Routes Component
function PrivateRoutes() {
  const location = useLocation();
  const token = localStorage.getItem('token');

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If token exists, render Layout with protected routes
  return (
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/company" element={<Company />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;