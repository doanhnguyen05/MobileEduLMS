import { describe, expect, it } from 'vitest';
import { canAccessRoute } from './routeAccess';

describe('canAccessRoute', () => {
  it('allows public routes without role restrictions', () => {
    expect(canAccessRoute(undefined)).toBe(true);
  });

  it('allows a user whose role is explicitly listed', () => {
    expect(canAccessRoute('teacher', ['teacher'])).toBe(true);
  });

  it('blocks cross-role access to protected areas', () => {
    expect(canAccessRoute('student', ['admin'])).toBe(false);
    expect(canAccessRoute('admin', ['teacher'])).toBe(false);
  });

  it('blocks unauthenticated access when a role is required', () => {
    expect(canAccessRoute(undefined, ['student'])).toBe(false);
  });
});
