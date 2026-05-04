import { ForgotPassword } from '../../screens/ForgotPassword';
import { Login } from '../../screens/Login';
import { Onboarding } from '../../screens/Onboarding';
import { Register } from '../../screens/Register';
import { Splash } from '../../screens/Splash';
import type { AppRouteDefinition } from './types';

export const publicRoutes: AppRouteDefinition[] = [
  { path: '/', element: <Splash /> },
  { path: '/onboarding', element: <Onboarding /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
];
