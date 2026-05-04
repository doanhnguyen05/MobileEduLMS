export type UserRole = 'student' | 'teacher' | 'admin';

export type UserRoleSelection = UserRole | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone: string;
  bio: string;
  location: string;
  birthdate: string;
  website: string;
}
