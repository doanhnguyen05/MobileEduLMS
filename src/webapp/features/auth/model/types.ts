import type { User, UserRoleSelection } from '../../../entities/user';

export interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string, role: UserRoleSelection) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
}
