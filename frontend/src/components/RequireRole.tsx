import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getStoredToken, hasAnyRole } from '../utils/auth';

interface RequireRoleProps {
  allowedRoles: string[];
  children: ReactNode;
}

export default function RequireRole({ allowedRoles, children }: RequireRoleProps) {
  const token = getStoredToken();
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!hasAnyRole(allowedRoles)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
