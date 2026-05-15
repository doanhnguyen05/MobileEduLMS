import type { UserRoleSelection } from '../../../entities/user';

export function getDefaultPathForRole(role: UserRoleSelection | undefined) {
  switch (role) {
    case 'teacher':
      return '/teacher/dashboard';
    case 'admin':
      return '/admin/dashboard';
    case 'student':
    default:
      return '/home';
  }
}
