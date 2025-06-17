// client/src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../authContext';

function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, user } = useContext(AuthContext);

  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute - user:', user);
  console.log('ProtectedRoute - adminOnly:', adminOnly);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && (!user || !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;