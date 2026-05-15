import { ReportStudent } from '../../features/reports';
import { AddBankAccount } from '../../screens/AddBankAccount';
import { BankAccountManagement } from '../../screens/BankAccountManagement';
import { CourseReviews } from '../../screens/CourseReviews';
import { CreateCourse } from '../../screens/CreateCourse';
import { EditBankAccount } from '../../screens/EditBankAccount';
import { EditCourse } from '../../screens/EditCourse';
import { StudentCourseStats } from '../../screens/StudentCourseStats';
import { StudentDetail } from '../../screens/StudentDetail';
import { TeacherCourseAnalytics } from '../../screens/TeacherCourseAnalytics';
import { TeacherCourses } from '../../screens/TeacherCourses';
import { TeacherDashboard } from '../../screens/TeacherDashboard';
import { TeacherRevenue } from '../../screens/TeacherRevenue';
import { TeacherStudents } from '../../screens/TeacherStudents';
import { WithdrawSuccess } from '../../screens/WithdrawSuccess';
import type { AppRouteDefinition } from './types';

const teacherAllowedRoles: AppRouteDefinition['allowedRoles'] = ['teacher'];

export const teacherRoutes: AppRouteDefinition[] = [
  { path: '/teacher/dashboard', element: <TeacherDashboard />, requiresAuth: true },
  { path: '/teacher/courses', element: <TeacherCourses />, requiresAuth: true },
  { path: '/teacher/students', element: <TeacherStudents />, requiresAuth: true },
  { path: '/teacher/create-course', element: <CreateCourse />, requiresAuth: true },
  { path: '/teacher/course/:id', element: <TeacherCourseAnalytics />, requiresAuth: true },
  { path: '/teacher/course/:id/edit', element: <EditCourse />, requiresAuth: true },
  { path: '/teacher/course/:id/analytics', element: <TeacherCourseAnalytics />, requiresAuth: true },
  { path: '/teacher/course/:id/reviews', element: <CourseReviews />, requiresAuth: true },
  { path: '/teacher/revenue', element: <TeacherRevenue />, requiresAuth: true },
  { path: '/teacher/bank-accounts', element: <BankAccountManagement />, requiresAuth: true },
  { path: '/teacher/add-bank-account', element: <AddBankAccount />, requiresAuth: true },
  { path: '/teacher/edit-bank-account/:id', element: <EditBankAccount />, requiresAuth: true },
  { path: '/teacher/withdraw', element: <WithdrawSuccess />, requiresAuth: true },
  { path: '/teacher/withdraw/success', element: <WithdrawSuccess />, requiresAuth: true },
  { path: '/teacher/student/:id/detail', element: <StudentDetail />, requiresAuth: true },
  { path: '/teacher/student/:id/stats', element: <StudentCourseStats />, requiresAuth: true },
  { path: '/teacher/student/:id/report', element: <ReportStudent />, requiresAuth: true },
].map((route) => ({
  ...route,
  allowedRoles: teacherAllowedRoles,
}));
