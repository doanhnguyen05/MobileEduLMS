import { motion } from 'motion/react';
import { BookOpen, Users, TrendingUp, DollarSign, Plus, BarChart3, MessageCircle, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth';
import { teacherCourses } from '../data/mockData';
import { BottomNav } from '../components/BottomNav';

export function TeacherDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    { label: 'Tổng học viên', value: '1,930', icon: Users, color: 'from-blue-500 to-cyan-400', change: '+12%' },
    { label: 'Khóa học', value: '2', icon: BookOpen, color: 'from-purple-500 to-pink-400', change: '+1' },
    { label: 'Doanh thu', value: '77M', icon: DollarSign, color: 'from-green-500 to-emerald-400', change: '+8%' },
    { label: 'Đánh giá TB', value: '4.85', icon: BarChart3, color: 'from-orange-500 to-red-400', change: '+0.1' }
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
              <p className="text-blue-100 mb-1">Dashboard Giảng viên</p>
              <h1 className="text-white text-2xl font-bold">{user?.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/messages')}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors relative"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <button
                onClick={() => navigate('/notifications')}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors relative"
              >
                <Bell className="w-5 h-5 text-white" />
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
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <span className="text-green-600 text-xs font-medium">{stat.change}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Khóa học của tôi</h2>
          <button
            onClick={() => navigate('/teacher/create-course')}
            className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {teacherCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => navigate(`/teacher/course/${course.id}`)}
              className="bg-white rounded-3xl shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">{course.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()} HV</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons} bài</span>
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  course.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {course.status === 'active' ? 'Hoạt động' : 'Nháp'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-2xl p-3 text-center">
                  <p className="text-2xl font-bold text-blue-600">{course.avgRating}</p>
                  <p className="text-gray-600 text-xs">Đánh giá</p>
                </div>
                <div className="bg-green-50 rounded-2xl p-3 text-center">
                  <p className="text-lg font-bold text-green-600">{course.revenue}</p>
                  <p className="text-gray-600 text-xs">Doanh thu</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl p-6 text-white"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Tạo khóa học mới</h3>
              <p className="text-white/90 text-sm mb-4">Chia sẻ kiến thức của bạn với hàng nghìn học viên</p>
              <button
                onClick={() => navigate('/teacher/create-course')}
                className="px-6 py-3 bg-white text-purple-600 rounded-xl font-medium hover:bg-gray-100 transition-colors"
              >
                Bắt đầu ngay
              </button>
            </div>
            <TrendingUp className="w-16 h-16 text-white/30" />
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
