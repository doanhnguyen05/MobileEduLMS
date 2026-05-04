import { Home, BookOpen, User, Bell, LayoutDashboard, Users, Award, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth';

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const getNavItems = () => {
    if (user?.role === 'teacher') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/teacher/dashboard' },
        { icon: BookOpen, label: 'Khóa học', path: '/teacher/courses' },
        { icon: Users, label: 'Học viên', path: '/teacher/students' },
        { icon: User, label: 'Tài khoản', path: '/profile' }
      ];
    }

    if (user?.role === 'admin') {
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Users, label: 'Người dùng', path: '/admin/users' },
        { icon: BookOpen, label: 'Nội dung', path: '/admin/content' },
        { icon: BarChart3, label: 'Báo cáo', path: '/admin/reports' }
      ];
    }

    return [
      { icon: Home, label: 'Trang chủ', path: '/home' },
      { icon: BookOpen, label: 'Khóa học', path: '/courses' },
      { icon: Award, label: 'Tiến độ', path: '/progress' },
      { icon: User, label: 'Tài khoản', path: '/profile' }
    ];
  };

  const navItems = getNavItems();

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 pb-safe z-50"
    >
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center flex-1 relative"
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0
                }}
                className="relative"
              >
                <Icon
                  className={`w-6 h-6 ${
                    isActive ? 'text-blue-600' : 'text-gray-400'
                  }`}
                />
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"
                  />
                )}
              </motion.div>
              <span
                className={`text-xs mt-1 ${
                  isActive ? 'text-blue-600 font-medium' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
