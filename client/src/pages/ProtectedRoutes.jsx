import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  // Redirect to login page if token is not present
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
