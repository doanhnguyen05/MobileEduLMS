import type { ReactNode } from 'react';
import type { UserRole } from '../../entities/user';

export interface AppRouteDefinition {
  path: string;
  element: ReactNode;
  requiresAuth?: boolean;
  allowedRoles?: UserRole[];
}
