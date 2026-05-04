import { AboutApp, Certificates, EditProfile, Profile, SecuritySettings, Settings, SettingsDetail, Subscription } from '../../features/profile';
import { PaymentBankTransfer, PaymentManual, PaymentMethod, PaymentQR, PaymentSuccess } from '../../features/payments';
import { MyReportDetail, MyReports, ReportSuccessGeneral, StudentReportViolation } from '../../features/reports';
import { Bookmarks } from '../../screens/Bookmarks';
import { CourseDetail } from '../../screens/CourseDetail';
import { CourseList } from '../../screens/CourseList';
import { LessonPlayer } from '../../screens/LessonPlayer';
import { MessageDetail } from '../../screens/MessageDetail';
import { Messages } from '../../screens/Messages';
import { Notifications } from '../../screens/Notifications';
import { Progress } from '../../screens/Progress';
import { QuizScreen } from '../../screens/QuizScreen';
import { RateCourse } from '../../screens/RateCourse';
import { SearchAdvanced } from '../../screens/SearchAdvanced';
import { StudentCourseReviews } from '../../screens/StudentCourseReviews';
import { StudentHome } from '../../screens/StudentHome';
import { HelpCenterNew } from '../../screens/HelpCenterNew';
import { SupportRequest } from '../../screens/SupportRequest';
import { SupportRequestSuccess } from '../../screens/SupportRequestSuccess';
import type { AppRouteDefinition } from './types';

export const studentRoutes: AppRouteDefinition[] = [
  { path: '/home', element: <StudentHome />, requiresAuth: true },
  { path: '/courses', element: <CourseList />, requiresAuth: true },
  { path: '/course/:id', element: <CourseDetail />, requiresAuth: true },
  { path: '/lesson/:id', element: <LessonPlayer />, requiresAuth: true },
  { path: '/quiz/:id', element: <QuizScreen />, requiresAuth: true },
  { path: '/notifications', element: <Notifications />, requiresAuth: true },
  { path: '/messages', element: <Messages />, requiresAuth: true },
  { path: '/messages/:id', element: <MessageDetail />, requiresAuth: true },
  { path: '/progress', element: <Progress />, requiresAuth: true },
  { path: '/search', element: <SearchAdvanced />, requiresAuth: true },
  { path: '/bookmarks', element: <Bookmarks />, requiresAuth: true },
  { path: '/course/:id/rate', element: <RateCourse />, requiresAuth: true },
  { path: '/course/:id/reviews', element: <StudentCourseReviews />, requiresAuth: true },
  { path: '/profile', element: <Profile />, requiresAuth: true },
  { path: '/edit-profile', element: <EditProfile />, requiresAuth: true },
  { path: '/settings', element: <Settings />, requiresAuth: true },
  { path: '/settings/:settingId', element: <SettingsDetail />, requiresAuth: true },
  { path: '/security', element: <SecuritySettings />, requiresAuth: true },
  { path: '/subscription', element: <Subscription />, requiresAuth: true },
  { path: '/certificates', element: <Certificates />, requiresAuth: true },
  { path: '/about', element: <AboutApp />, requiresAuth: true },
  { path: '/help', element: <HelpCenterNew />, requiresAuth: true },
  { path: '/help/support-request', element: <SupportRequest />, requiresAuth: true },
  { path: '/help/support-success', element: <SupportRequestSuccess />, requiresAuth: true },
  { path: '/report-violation', element: <StudentReportViolation />, requiresAuth: true },
  { path: '/report-success', element: <ReportSuccessGeneral />, requiresAuth: true },
  { path: '/my-reports', element: <MyReports />, requiresAuth: true },
  { path: '/my-reports/:id', element: <MyReportDetail />, requiresAuth: true },
  { path: '/payment/method/:id', element: <PaymentMethod />, requiresAuth: true },
  { path: '/payment/qr/:id', element: <PaymentQR />, requiresAuth: true },
  { path: '/payment/manual/:id', element: <PaymentManual />, requiresAuth: true },
  { path: '/payment/bank-transfer/:id', element: <PaymentBankTransfer />, requiresAuth: true },
  { path: '/payment/success/:id', element: <PaymentSuccess />, requiresAuth: true },
];
