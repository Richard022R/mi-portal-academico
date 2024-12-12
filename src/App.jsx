import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ProtectedRoute from './components/ProtectedRoute'; // We'll create this
import DashboardSecre from './components/Admin/DashboardSecre';
import Dashboard from './components/Dashboard'; // Asumiendo que tienes un componente Dashboard

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/secretaria" element={<DashboardSecre />} />
        {/* Redirige a login por defecto */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;