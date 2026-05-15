import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getDefaultPathForRole, useAuth } from '../../features/auth';
import type { UserRole } from '../../entities/user';
import { canAccessRoute } from './routeAccess';

export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles?: UserRole[];
}) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (!canAccessRoute(user?.role, allowedRoles)) {
    return <Navigate to={getDefaultPathForRole(user?.role)} replace />;
  }

  return <>{children}</>;
}
