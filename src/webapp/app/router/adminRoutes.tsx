import { AdminReportDetail, AdminReportManagement } from '../../features/admin/reports';
import { AddAdminUser } from '../../screens/AddAdminUser';
import { AdminContent } from '../../screens/AdminContent';
import { AdminCourseDetail } from '../../screens/AdminCourseDetail';
import { AdminCourseReport } from '../../screens/AdminCourseReport';
import { AdminDashboard } from '../../screens/AdminDashboard';
import { AdminGrowthReport } from '../../screens/AdminGrowthReport';
import { AdminReports } from '../../screens/AdminReports';
import { AdminRevenueReport } from '../../screens/AdminRevenueReport';
import { AdminUserReport } from '../../screens/AdminUserReport';
import { AdminUsers } from '../../screens/AdminUsers';
import { CourseWarningSuccess } from '../../screens/CourseWarningSuccess';
import { EditAdminUser } from '../../screens/EditAdminUser';
import { UserCreatedSuccess } from '../../screens/UserCreatedSuccess';
import { UserPermissions } from '../../screens/UserPermissions';
import type { AppRouteDefinition } from './types';

const adminAllowedRoles: AppRouteDefinition['allowedRoles'] = ['admin'];

export const adminRoutes: AppRouteDefinition[] = [
  { path: '/admin/dashboard', element: <AdminDashboard />, requiresAuth: true },
  { path: '/admin/users', element: <AdminUsers />, requiresAuth: true },
  { path: '/admin/users/add', element: <AddAdminUser />, requiresAuth: true },
  { path: '/admin/users/created-success', element: <UserCreatedSuccess />, requiresAuth: true },
  { path: '/admin/users/:id/edit', element: <EditAdminUser />, requiresAuth: true },
  { path: '/admin/users/:id/permissions', element: <UserPermissions />, requiresAuth: true },
  { path: '/admin/content', element: <AdminContent />, requiresAuth: true },
  { path: '/admin/content/:id', element: <AdminCourseDetail />, requiresAuth: true },
  { path: '/admin/content/warning-success', element: <CourseWarningSuccess />, requiresAuth: true },
  { path: '/admin/reports', element: <AdminReports />, requiresAuth: true },
  { path: '/admin/reports/users', element: <AdminUserReport />, requiresAuth: true },
  { path: '/admin/reports/courses', element: <AdminCourseReport />, requiresAuth: true },
  { path: '/admin/reports/revenue', element: <AdminRevenueReport />, requiresAuth: true },
  { path: '/admin/reports/growth', element: <AdminGrowthReport />, requiresAuth: true },
  { path: '/admin/report-management', element: <AdminReportManagement />, requiresAuth: true },
  { path: '/admin/report-detail/:id', element: <AdminReportDetail />, requiresAuth: true },
].map((route) => ({
  ...route,
  allowedRoles: adminAllowedRoles,
}));
