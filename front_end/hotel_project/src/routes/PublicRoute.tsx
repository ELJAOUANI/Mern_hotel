// src/routes/PublicRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token'); // or use Redux or Context if you prefer

  return token ? <Navigate to="/" replace /> : <>{children}</>;
};

export default PublicRoute;
