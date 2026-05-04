import { motion } from 'motion/react';
import { User, BookOpen, Award, Settings, LogOut, ChevronRight, Lock, HelpCircle, Info, Crown, DollarSign, Edit, MapPin, Phone, Globe2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth';
import { BottomNav } from '../../../components/BottomNav';
import { TopBar } from '../../../components/TopBar';
import { getProfileShortcuts, getProfileStatusItems, getRoleFocusCard } from '../data/profileCatalog';

export function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const getStats = () => {
    if (user?.role === 'teacher') {
      return [
        { label: 'Khóa học', value: '2', icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
        { label: 'Học viên', value: '1,930', icon: User, color: 'bg-green-100 text-green-600' },
        { label: 'Doanh thu', value: '160M', icon: DollarSign, color: 'bg-purple-100 text-purple-600' }
      ];
    }

    if (user?.role === 'admin') {
      return [
        { label: 'Người dùng', value: '15K', icon: User, color: 'bg-blue-100 text-blue-600' },
        { label: 'Khóa học', value: '156', icon: BookOpen, color: 'bg-green-100 text-green-600' },
        { label: 'Doanh thu', value: '2.4B', icon: DollarSign, color: 'bg-purple-100 text-purple-600' }
      ];
    }

    return [
      { label: 'Khóa học', value: '8', icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
      { label: 'Hoàn thành', value: '12', icon: Award, color: 'bg-green-100 text-green-600' },
      { label: 'Giờ học', value: '48', icon: BookOpen, color: 'bg-purple-100 text-purple-600' }
    ];
  };

  const getMenuItems = () => {
    const baseItems = [
      { icon: Edit, label: 'Chỉnh sửa hồ sơ', action: () => navigate('/edit-profile') },
      { icon: Lock, label: 'Bảo mật', action: () => navigate('/security') },
      { icon: Settings, label: 'Cài đặt', action: () => navigate('/settings') },
      { icon: HelpCircle, label: 'Trợ giúp', action: () => navigate('/help') },
      { icon: Info, label: 'Về ứng dụng', action: () => navigate('/about') }
    ];

    if (user?.role === 'student') {
      return [
        { icon: Award, label: 'Chứng chỉ', action: () => navigate('/certificates') },
        { icon: Crown, label: 'Nâng cấp Premium', action: () => navigate('/subscription') },
        ...baseItems
      ];
    }

    if (user?.role === 'teacher') {
      return [
        { icon: DollarSign, label: 'Doanh thu', action: () => navigate('/teacher/revenue') },
        ...baseItems
      ];
    }

    return baseItems;
  };

  const stats = getStats();
  const menuItems = getMenuItems();
  const shortcuts = user?.role ? getProfileShortcuts(user.role) : [];
  const statusItems = user?.role ? getProfileStatusItems(user.role) : [];
  const focusCard = user?.role ? getRoleFocusCard(user.role) : null;
  const FocusIcon = focusCard?.icon;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar title="Tài khoản" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-6 mb-6 text-white"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm overflow-hidden">
              <img src={user?.avatar} alt={user?.name} className="w-full h-full" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
              <p className="text-blue-100">{user?.email}</p>
              <div className="flex flex-wrap items-center gap-3 text-blue-100 text-xs mt-2">
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  {user?.phone}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {user?.location}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-blue-100 text-xs">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm p-5 mb-6"
        >
          <h3 className="font-bold text-gray-900 mb-3">Giới thiệu</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{user?.bio}</p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{user?.location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Phone className="w-4 h-4 text-blue-600" />
              <span>{user?.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Globe2 className="w-4 h-4 text-blue-600" />
              <span className="truncate">{user?.website}</span>
            </div>
          </div>
        </motion.div>

        {focusCard && FocusIcon && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-3xl shadow-sm p-5 mb-6"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${focusCard.iconClass}`}>
                <FocusIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">{focusCard.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{focusCard.description}</p>
              </div>
            </div>
          </motion.div>
        )}

        {statusItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-sm p-5 mb-6"
          >
            <h3 className="font-bold text-gray-900 mb-4">Trạng thái tài khoản</h3>
            <div className="flex flex-wrap gap-3">
              {statusItems.map((item) => (
                <div key={item.label} className={`px-4 py-3 rounded-2xl ${item.toneClass}`}>
                  <p className="text-xs font-medium opacity-80 mb-1">{item.label}</p>
                  <p className="font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {shortcuts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-3xl shadow-sm p-5 mb-6"
          >
            <h3 className="font-bold text-gray-900 mb-4">Không gian làm việc</h3>
            <div className="space-y-3">
              {shortcuts.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => navigate(item.route)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.colorClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={item.action}
                className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <span className="flex-1 text-left font-medium text-gray-900">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
            );
          })}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full bg-red-50 text-red-600 rounded-2xl p-4 font-medium flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Đăng xuất
        </motion.button>

        <p className="text-center text-gray-400 text-sm mt-6">
          EduMobile v1.0.0
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
