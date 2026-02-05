import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getStoredToken, hasAnyRole } from '../utils/auth';

interface ProtectedRouteProps {
  allowedRoles?: string[];
  children: ReactNode;
}

export default function ProtectedRoute({ allowedRoles = [], children }: ProtectedRouteProps) {
  const token = getStoredToken();
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !hasAnyRole(allowedRoles)) {
    return <Navigate to="/viewer/dashboard" replace />;
  }

  return <>{children}</>;
}
