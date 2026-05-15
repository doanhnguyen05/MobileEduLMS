import { describe, expect, it } from 'vitest';
import { getDefaultPathForRole } from './authRouting';
import { validateLoginInput } from './authValidation';

describe('validateLoginInput', () => {
  it('accepts a valid email, password, and role', () => {
    const result = validateLoginInput({
      email: 'student@edumobile.vn',
      password: '123456',
      role: 'student',
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('rejects missing and malformed credentials', () => {
    const result = validateLoginInput({
      email: 'invalid-email',
      password: '123',
      role: null,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBeDefined();
    expect(result.errors.password).toBeDefined();
    expect(result.errors.role).toBeDefined();
  });
});

describe('getDefaultPathForRole', () => {
  it.each([
    ['student', '/home'],
    ['teacher', '/teacher/dashboard'],
    ['admin', '/admin/dashboard'],
    [null, '/home'],
  ] as const)('returns %s home path', (role, expectedPath) => {
    expect(getDefaultPathForRole(role)).toBe(expectedPath);
  });
});
