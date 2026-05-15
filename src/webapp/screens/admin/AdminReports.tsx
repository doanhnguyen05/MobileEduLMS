import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, BookOpen, DollarSign, Calendar, Download, BarChart3 } from 'lucide-react';
import { TopBar } from '../../components/TopBar';
import { BottomNav } from '../../components/BottomNav';

export function AdminReports() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<'1' | '3' | '6' | '12'>('6');

  const monthlyData = [
    { month: 'T1', users: 1200, courses: 45, revenue: 180 },
    { month: 'T2', users: 1350, courses: 52, revenue: 210 },
    { month: 'T3', users: 1580, courses: 58, revenue: 245 },
    { month: 'T4', users: 1820, courses: 63, revenue: 280 },
    { month: 'T5', users: 2100, courses: 70, revenue: 320 },
    { month: 'T6', users: 2450, courses: 78, revenue: 365 },
  ];

  const getFilteredData = () => {
    const months = parseInt(timeRange);
    return monthlyData.slice(-months);
  };

  const filteredData = getFilteredData();
  const maxValue = Math.max(...filteredData.map(d => d.users));

  const reports = [
    { icon: Users, label: 'Báo cáo người dùng', color: 'from-blue-500 to-cyan-400', value: '15,420', route: '/admin/reports/users' },
    { icon: BookOpen, label: 'Báo cáo khóa học', color: 'from-purple-500 to-pink-400', value: '156', route: '/admin/reports/courses' },
    { icon: DollarSign, label: 'Báo cáo doanh thu', color: 'from-green-500 to-emerald-400', value: '2.45B', route: '/admin/reports/revenue' },
    { icon: TrendingUp, label: 'Báo cáo tăng trưởng', color: 'from-orange-500 to-red-400', value: '+12.5%', route: '/admin/reports/growth' },
  ];

  const timeRanges = [
    { value: '1' as const, label: '1 tháng' },
    { value: '3' as const, label: '3 tháng' },
    { value: '6' as const, label: '6 tháng' },
    { value: '12' as const, label: '12 tháng' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar showBack title="Báo cáo & Thống kê" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Tổng quan</h2>
            <p className="text-gray-600 text-sm">{timeRange} tháng gần nhất</p>
          </div>
          <button className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                timeRange === range.value
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Tăng trưởng người dùng</h3>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{timeRange} tháng</span>
            </div>
          </div>

          <div className="flex items-end justify-between gap-2 h-48 mb-4">
            {filteredData.map((data, index) => (
              <motion.div
                key={data.month}
                initial={{ height: 0 }}
                animate={{ height: `${(data.users / maxValue) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-xl flex items-end justify-center pb-2">
                  <span className="text-white text-xs font-medium">{(data.users / 1000).toFixed(1)}k</span>
                </div>
                <span className="text-gray-600 text-xs">{data.month}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-2xl p-3 text-center">
              <TrendingUp className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600 mb-0.5">Tăng trưởng</p>
              <p className="text-lg font-bold text-blue-600">+75%</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-3 text-center">
              <Users className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600 mb-0.5">TB/tháng</p>
              <p className="text-lg font-bold text-green-600">+350</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-3 text-center">
              <BarChart3 className="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600 mb-0.5">Cao nhất</p>
              <p className="text-lg font-bold text-purple-600">2.45K</p>
            </div>
          </div>
        </motion.div>

        <div>
          <h3 className="font-bold text-gray-900 mb-4">Báo cáo chi tiết</h3>
          <div className="grid grid-cols-2 gap-4">
            {reports.map((report, index) => {
              const Icon = report.icon;
              return (
                <motion.button
                  key={index}
                  onClick={() => navigate(report.route)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-gradient-to-br ${report.color} rounded-3xl p-6 text-white text-left shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <Icon className="w-10 h-10 mb-3" />
                  <p className="text-2xl font-bold mb-1">{report.value}</p>
                  <p className="text-sm text-white/90">{report.label}</p>
                </motion.button>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-white rounded-3xl shadow-sm p-6"
        >
          <h3 className="font-bold text-gray-900 mb-4">Top khóa học</h3>
          <div className="space-y-3">
            {[
              { name: 'React Native Cơ Bản', students: 1250, revenue: '45M' },
              { name: 'Flutter Advanced', students: 980, revenue: '38M' },
              { name: 'Swift UI Fundamentals', students: 750, revenue: '28M' },
            ].map((course, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{course.name}</p>
                    <p className="text-gray-500 text-xs">{course.students.toLocaleString()} học viên</p>
                  </div>
                </div>
                <p className="text-green-600 font-bold">{course.revenue}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
