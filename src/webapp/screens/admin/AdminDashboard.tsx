import { motion } from 'motion/react';
import { Users, BookOpen, DollarSign, TrendingUp, Activity, LogOut, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth';
import { adminStats } from '../../data/mockData';
import { BottomNav } from '../../components/BottomNav';

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      logout();
      navigate('/login');
    }
  };

  const stats = [
    {
      label: 'Tổng người dùng',
      value: adminStats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'from-blue-500 to-cyan-400',
      change: adminStats.userGrowth
    },
    {
      label: 'Khóa học',
      value: adminStats.totalCourses.toString(),
      icon: BookOpen,
      color: 'from-purple-500 to-pink-400',
      change: adminStats.courseGrowth
    },
    {
      label: 'Doanh thu',
      value: '2.45B đ',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-400',
      change: adminStats.revenueGrowth
    },
    {
      label: 'Hoạt động',
      value: adminStats.activeUsers.toLocaleString(),
      icon: Activity,
      color: 'from-orange-500 to-red-400',
      change: '+5.2%'
    }
  ];

  const recentActivities = [
    { user: 'Nguyễn Văn A', action: 'đã đăng ký khóa học React Native', time: '5 phút trước' },
    { user: 'Trần Thị B', action: 'đã hoàn thành khóa Flutter', time: '12 phút trước' },
    { user: 'Lê Văn C', action: 'đã tạo khóa học mới', time: '30 phút trước' },
    { user: 'Phạm Thị D', action: 'đã nâng cấp tài khoản Premium', time: '1 giờ trước' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 px-6 pt-12 pb-24 rounded-b-[3rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-blue-100 mb-1">Admin Dashboard</p>
              <h1 className="text-white text-2xl font-bold">{user?.name}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <LogOut className="w-5 h-5 text-white" />
              </button>
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <img src={user?.avatar} alt="Avatar" className="w-full h-full rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-6 -mt-16 relative z-10">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-5 shadow-xl"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  <span className="text-green-600 text-xs font-medium">{stat.change}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Hoạt động gần đây</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium text-sm">
                    {activity.user.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 text-sm">
                    <span className="font-semibold">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/admin/users')}
            className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-6 text-white text-left shadow-lg shadow-blue-500/30"
          >
            <Users className="w-10 h-10 mb-3" />
            <p className="font-bold text-lg">Quản lý</p>
            <p className="text-sm">Người dùng</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/admin/content')}
            className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl p-6 text-white text-left shadow-lg shadow-purple-500/30"
          >
            <BookOpen className="w-10 h-10 mb-3" />
            <p className="font-bold text-lg">Quản lý</p>
            <p className="text-sm">Nội dung</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/admin/report-management')}
            className="bg-gradient-to-br from-orange-600 to-red-500 rounded-3xl p-6 text-white text-left shadow-lg shadow-orange-500/30"
          >
            <AlertTriangle className="w-10 h-10 mb-3" />
            <p className="font-bold text-lg">Báo cáo</p>
            <p className="text-sm">Vi phạm</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/admin/reports')}
            className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-3xl p-6 text-white text-left shadow-lg shadow-green-500/30"
          >
            <TrendingUp className="w-10 h-10 mb-3" />
            <p className="font-bold text-lg">Báo cáo</p>
            <p className="text-sm">Thống kê</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/settings')}
            className="bg-gradient-to-br from-gray-600 to-gray-500 rounded-3xl p-6 text-white text-left shadow-lg shadow-gray-500/30"
          >
            <Activity className="w-10 h-10 mb-3" />
            <p className="font-bold text-lg">Hệ thống</p>
            <p className="text-sm">Cài đặt</p>
          </motion.button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
