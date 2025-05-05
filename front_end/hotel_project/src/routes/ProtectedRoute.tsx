

// import React from 'react';
import {  Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // if (!isAuthenticated) {
  //   // Redirect to login if not authenticated
  //   return <Navigate to="/login" replace />;
  // }

  // Render child routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
