import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Components/Layout';
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

// Private Route Component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect if logged in)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/dashboard" /> : children;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

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
      <Layout>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />

          {/* Private Routes */}
          <Route path="/" element={
            <PrivateRoute>
              
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/create" element={
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          } />
          <Route path="/read/:id" element={
            <PrivateRoute>
              <Read />
            </PrivateRoute>
          } />
          <Route path="/edit/:id" element={
            <PrivateRoute>
              <Edit />
            </PrivateRoute>
          } />
          <Route path="/attendance" element={
            <PrivateRoute>
              <Attendance />
            </PrivateRoute>
          } />
          <Route path="/payroll" element={
            <PrivateRoute>
              <Payroll />
            </PrivateRoute>
          } />
          <Route path="/reports" element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>
          } />
          <Route path="/company" element={
            <PrivateRoute>
              <Company />
            </PrivateRoute>
          } />
          <Route path="/settings" element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          } />
          <Route path="/help" element={
            <PrivateRoute>
              <Help />
            </PrivateRoute>
          } />
          <Route path="/privacy" element={
            <PrivateRoute>
              <Privacy />
            </PrivateRoute>
          } />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      </Layout>
      </BrowserRouter>
  );
}

export default App;