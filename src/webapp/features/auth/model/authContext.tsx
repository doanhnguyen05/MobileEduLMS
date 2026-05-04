import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { createDefaultUser, type User, type UserRoleSelection } from '../../../entities/user';
import { readStoredUser, writeStoredUser } from './authStorage';
import type { AuthContextValue } from './types';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function resolveLoginUser(email: string, role: UserRoleSelection) {
  const normalizedEmail = email.trim() || `user-${role || 'student'}@edumobile.vn`;
  const storedUser = readStoredUser();

  if (storedUser && storedUser.email === normalizedEmail && storedUser.role === (role || 'student')) {
    return storedUser;
  }

  return createDefaultUser(normalizedEmail, role);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readStoredUser());

  useEffect(() => {
    writeStoredUser(user);
  }, [user]);

  const login: AuthContextValue['login'] = (email, password, role) => {
    void password;
    setUser(resolveLoginUser(email, role));
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile: AuthContextValue['updateProfile'] = (updates) => {
    setUser((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      return {
        ...currentUser,
        ...updates,
      };
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
