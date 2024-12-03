import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Obtener el token del localStorage
  const token = localStorage.getItem('token');

  // Si no hay token, redirigir a la página de login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, mostrar el componente hijo (dashboard)
  return children;
};

export default ProtectedRoute;