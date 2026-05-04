import type { User } from '../../../entities/user';

const USER_STORAGE_KEY = 'mobileEduLMS.currentUser';

export function readStoredUser(): User | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const rawValue = window.localStorage.getItem(USER_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as User;
  } catch (error) {
    console.error('Could not parse stored user:', error);
    return null;
  }
}

export function writeStoredUser(user: User | null) {
  if (typeof window === 'undefined') {
    return;
  }

  if (!user) {
    window.localStorage.removeItem(USER_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}
