import type { UserRole } from '../../entities/user';

export function canAccessRoute(userRole: UserRole | undefined, allowedRoles?: UserRole[]) {
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  return !!userRole && allowedRoles.includes(userRole);
}
