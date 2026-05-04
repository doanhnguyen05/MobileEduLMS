import { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, BookOpen, DollarSign, Calendar, Download, Percent, Activity } from 'lucide-react';
import { TopBar } from '../components/TopBar';

export function AdminGrowthReport() {
  const [timeRange, setTimeRange] = useState<'1' | '3' | '6' | '12'>('6');

  const growthData = [
    { month: 'T1', userGrowth: 8.5, courseGrowth: 12.3, revenueGrowth: 15.2 },
    { month: 'T2', userGrowth: 10.2, courseGrowth: 14.5, revenueGrowth: 16.8 },
    { month: 'T3', userGrowth: 12.8, courseGrowth: 16.2, revenueGrowth: 18.5 },
    { month: 'T4', userGrowth: 14.5, courseGrowth: 18.7, revenueGrowth: 20.3 },
    { month: 'T5', userGrowth: 16.2, courseGrowth: 20.5, revenueGrowth: 22.8 },
    { month: 'T6', userGrowth: 18.3, courseGrowth: 22.8, revenueGrowth: 25.5 },
  ];

  const getFilteredData = () => {
    const months = parseInt(timeRange);
    return growthData.slice(-months);
  };

  const filteredData = getFilteredData();
  const maxValue = 30;

  const timeRanges = [
    { value: '1' as const, label: '1 tháng' },
    { value: '3' as const, label: '3 tháng' },
    { value: '6' as const, label: '6 tháng' },
    { value: '12' as const, label: '12 tháng' }
  ];

  const avgUserGrowth = (filteredData.reduce((sum, d) => sum + d.userGrowth, 0) / filteredData.length).toFixed(1);
  const avgCourseGrowth = (filteredData.reduce((sum, d) => sum + d.courseGrowth, 0) / filteredData.length).toFixed(1);
  const avgRevenueGrowth = (filteredData.reduce((sum, d) => sum + d.revenueGrowth, 0) / filteredData.length).toFixed(1);

  const stats = [
    {
      label: 'Người dùng',
      value: `+${avgUserGrowth}%`,
      trend: 'Tăng đều',
      color: 'from-blue-500 to-cyan-400',
      icon: Users
    },
    {
      label: 'Khóa học',
      value: `+${avgCourseGrowth}%`,
      trend: 'Tăng mạnh',
      color: 'from-purple-500 to-pink-400',
      icon: BookOpen
    },
    {
      label: 'Doanh thu',
      value: `+${avgRevenueGrowth}%`,
      trend: 'Tăng cao',
      color: 'from-green-500 to-emerald-400',
      icon: DollarSign
    },
    {
      label: 'Hoạt động',
      value: '+15.8%',
      trend: 'Ổn định',
      color: 'from-orange-500 to-red-400',
      icon: Activity
    }
  ];

  const milestones = [
    {
      date: '15/04/2026',
      title: 'Đạt 15,000 người dùng',
      description: 'Vượt mốc 15K người dùng đăng ký',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      date: '20/03/2026',
      title: 'Ra mắt 150 khóa học',
      description: 'Cột mốc 150 khóa học trên nền tảng',
      icon: BookOpen,
      color: 'bg-purple-500'
    },
    {
      date: '05/03/2026',
      title: 'Doanh thu 2 tỷ đồng',
      description: 'Đạt mốc doanh thu 2 tỷ đồng',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      date: '18/02/2026',
      title: 'Tăng trưởng 100%',
      description: 'Tăng trưởng 100% so với quý trước',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const predictions = [
    {
      metric: 'Người dùng dự kiến',
      current: '15,420',
      predicted: '22,500',
      period: '3 tháng tới',
      growth: '+46%'
    },
    {
      metric: 'Khóa học dự kiến',
      current: '156',
      predicted: '235',
      period: '3 tháng tới',
      growth: '+51%'
    },
    {
      metric: 'Doanh thu dự kiến',
      current: '2.45B đ',
      predicted: '3.8B đ',
      period: '3 tháng tới',
      growth: '+55%'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Báo cáo tăng trưởng" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Tăng trưởng</h2>
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

        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-5 shadow-sm"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-green-600 text-xs font-medium">{stat.trend}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Biểu đồ tăng trưởng (%)</h3>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{timeRange} tháng</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex gap-4 justify-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs text-gray-600">Người dùng</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-xs text-gray-600">Khóa học</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-600">Doanh thu</span>
              </div>
            </div>

            <div className="relative h-48">
              <div className="absolute inset-0 flex items-end justify-between gap-2">
                {filteredData.map((data, index) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <div className="w-full flex gap-1 items-end" style={{ height: `${(Math.max(data.userGrowth, data.courseGrowth, data.revenueGrowth) / maxValue) * 100}%` }}>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.userGrowth / maxValue) * 100}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="flex-1 bg-blue-500 rounded-t"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.courseGrowth / maxValue) * 100}%` }}
                        transition={{ delay: index * 0.1 + 0.1, duration: 0.5 }}
                        className="flex-1 bg-purple-500 rounded-t"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.revenueGrowth / maxValue) * 100}%` }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                        className="flex-1 bg-green-500 rounded-t"
                      />
                    </div>
                    <span className="text-gray-600 text-xs mt-2">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-2xl p-3 text-center">
              <Percent className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600 mb-0.5">TB User</p>
              <p className="text-lg font-bold text-blue-600">+{avgUserGrowth}%</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-3 text-center">
              <Percent className="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600 mb-0.5">TB Course</p>
              <p className="text-lg font-bold text-purple-600">+{avgCourseGrowth}%</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-3 text-center">
              <Percent className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600 mb-0.5">TB Revenue</p>
              <p className="text-lg font-bold text-green-600">+{avgRevenueGrowth}%</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <h3 className="font-bold text-gray-900 mb-4">Cột mốc quan trọng</h3>
          <div className="space-y-3">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-2xl"
                >
                  <div className={`w-10 h-10 ${milestone.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{milestone.title}</p>
                    <p className="text-gray-600 text-xs mb-1">{milestone.description}</p>
                    <p className="text-gray-500 text-xs">{milestone.date}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl shadow-sm p-6 text-white"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6" />
            <h3 className="font-bold">Dự báo tăng trưởng</h3>
          </div>
          <div className="space-y-4">
            {predictions.map((prediction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4"
              >
                <p className="text-blue-100 text-sm mb-2">{prediction.metric}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold mb-1">{prediction.predicted}</p>
                    <p className="text-blue-100 text-xs">Hiện tại: {prediction.current}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-300">{prediction.growth}</p>
                    <p className="text-blue-100 text-xs">{prediction.period}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
