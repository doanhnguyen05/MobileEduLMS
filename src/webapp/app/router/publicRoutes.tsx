import { ForgotPassword } from '../../screens/common/ForgotPassword';
import { Login } from '../../screens/common/Login';
import { Onboarding } from '../../screens/common/Onboarding';
import { Register } from '../../screens/common/Register';
import { Splash } from '../../screens/common/Splash';
import type { AppRouteDefinition } from './types';

export const publicRoutes: AppRouteDefinition[] = [
  { path: '/', element: <Splash /> },
  { path: '/onboarding', element: <Onboarding /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
];
