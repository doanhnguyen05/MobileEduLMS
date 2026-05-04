import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { adminRoutes } from './adminRoutes';
import { publicRoutes } from './publicRoutes';
import { studentRoutes } from './studentRoutes';
import { teacherRoutes } from './teacherRoutes';
import type { AppRouteDefinition } from './types';

const routeRegistry: AppRouteDefinition[] = [
  ...publicRoutes,
  ...studentRoutes,
  ...teacherRoutes,
  ...adminRoutes,
];

export function AppRouter() {
  return (
    <Routes>
      {routeRegistry.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.requiresAuth ? <ProtectedRoute>{route.element}</ProtectedRoute> : route.element
          }
        />
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
