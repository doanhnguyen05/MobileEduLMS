import { useLayoutEffect, type ReactNode } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
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

function ScrollReset({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const reset = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    reset();
    const r1 = requestAnimationFrame(reset);
    const r2 = requestAnimationFrame(() => requestAnimationFrame(reset));
    const t = setTimeout(reset, 80);
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      clearTimeout(t);
    };
  }, []);
  return <>{children}</>;
}

export function AppRouter() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      {routeRegistry.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ScrollReset>
              {route.requiresAuth ? (
                <ProtectedRoute allowedRoles={route.allowedRoles}>{route.element}</ProtectedRoute>
              ) : (
                route.element
              )}
            </ScrollReset>
          }
        />
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
