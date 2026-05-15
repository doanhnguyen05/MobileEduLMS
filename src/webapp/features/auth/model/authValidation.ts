import type { UserRoleSelection } from '../../../entities/user';

export const LOGIN_PASSWORD_MIN_LENGTH = 6;

export interface LoginValidationInput {
  email: string;
  password: string;
  role: UserRoleSelection;
}

export interface LoginValidationErrors {
  email?: string;
  password?: string;
  role?: string;
}

export interface LoginValidationResult {
  isValid: boolean;
  errors: LoginValidationErrors;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginInput(input: LoginValidationInput): LoginValidationResult {
  const errors: LoginValidationErrors = {};
  const email = input.email.trim();
  const password = input.password.trim();

  if (!input.role) {
    errors.role = 'Vui lòng chọn vai trò đăng nhập.';
  }

  if (!email) {
    errors.email = 'Vui lòng nhập email.';
  } else if (!emailPattern.test(email)) {
    errors.email = 'Email không đúng định dạng.';
  }

  if (!password) {
    errors.password = 'Vui lòng nhập mật khẩu.';
  } else if (password.length < LOGIN_PASSWORD_MIN_LENGTH) {
    errors.password = `Mật khẩu cần ít nhất ${LOGIN_PASSWORD_MIN_LENGTH} ký tự.`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
