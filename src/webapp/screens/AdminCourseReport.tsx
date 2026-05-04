import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, TrendingUp, Star, Users, Calendar, Download, Award } from 'lucide-react';
import { TopBar } from '../components/TopBar';

export function AdminCourseReport() {
  const [timeRange, setTimeRange] = useState<'1' | '3' | '6' | '12'>('6');

  const courseData = [
    { month: 'T1', newCourses: 8, totalCourses: 45, enrollments: 1200 },
    { month: 'T2', newCourses: 12, totalCourses: 52, enrollments: 1580 },
    { month: 'T3', newCourses: 10, totalCourses: 58, enrollments: 1850 },
    { month: 'T4', newCourses: 15, totalCourses: 63, enrollments: 2100 },
    { month: 'T5', newCourses: 18, totalCourses: 70, enrollments: 2450 },
    { month: 'T6', newCourses: 20, totalCourses: 78, enrollments: 2800 },
  ];

  const getFilteredData = () => {
    const months = parseInt(timeRange);
    return courseData.slice(-months);
  };

  const filteredData = getFilteredData();
  const maxValue = Math.max(...filteredData.map(d => d.newCourses));

  const timeRanges = [
    { value: '1' as const, label: '1 tháng' },
    { value: '3' as const, label: '3 tháng' },
    { value: '6' as const, label: '6 tháng' },
    { value: '12' as const, label: '12 tháng' }
  ];

  const stats = [
    {
      label: 'Tổng khóa học',
      value: '156',
      change: '+15.2%',
      color: 'from-purple-500 to-pink-400',
      icon: BookOpen
    },
    {
      label: 'Khóa học mới',
      value: '83',
      change: '+22.5%',
      color: 'from-blue-500 to-cyan-400',
      icon: TrendingUp
    },
    {
      label: 'Đánh giá TB',
      value: '4.7',
      change: '+0.3',
      color: 'from-yellow-500 to-orange-400',
      icon: Star
    },
    {
      label: 'Lượt đăng ký',
      value: '12.3K',
      change: '+18.7%',
      color: 'from-green-500 to-emerald-400',
      icon: Users
    }
  ];

  const topCourses = [
    {
      name: 'React Native Cơ Bản',
      instructor: 'Nguyễn Thị Mai',
      students: 1250,
      rating: 4.8,
      revenue: '45M'
    },
    {
      name: 'Flutter Advanced',
      instructor: 'Trần Văn Long',
      students: 980,
      rating: 4.7,
      revenue: '38M'
    },
    {
      name: 'Swift UI Fundamentals',
      instructor: 'Lê Minh Tuấn',
      students: 750,
      rating: 4.6,
      revenue: '28M'
    },
    {
      name: 'Kotlin State Management',
      instructor: 'Phạm Thị Hương',
      students: 680,
      rating: 4.5,
      revenue: '25M'
    },
    {
      name: 'React Native Navigation',
      instructor: 'Nguyễn Văn A',
      students: 620,
      rating: 4.7,
      revenue: '22M'
    }
  ];

  const categories = [
    { name: 'Mobile Development', count: 68, percent: 44 },
    { name: 'Web Development', count: 42, percent: 27 },
    { name: 'Backend', count: 28, percent: 18 },
    { name: 'UI/UX Design', count: 18, percent: 11 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Báo cáo khóa học" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Khóa học</h2>
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
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <span className="text-green-600 text-xs font-medium">{stat.change}</span>
                </div>
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
            <h3 className="font-bold text-gray-900">Khóa học mới</h3>
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
                animate={{ height: `${(data.newCourses / maxValue) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="w-full bg-gradient-to-t from-purple-600 to-pink-400 rounded-xl flex items-end justify-center pb-2">
                  <span className="text-white text-xs font-medium">{data.newCourses}</span>
                </div>
                <span className="text-gray-600 text-xs">{data.month}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-purple-50 rounded-2xl p-3 text-center">
              <p className="text-xs text-gray-600 mb-0.5">Tổng mới</p>
              <p className="text-lg font-bold text-purple-600">
                {filteredData.reduce((sum, d) => sum + d.newCourses, 0)}
              </p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-3 text-center">
              <p className="text-xs text-gray-600 mb-0.5">TB/tháng</p>
              <p className="text-lg font-bold text-blue-600">
                {Math.round(filteredData.reduce((sum, d) => sum + d.newCourses, 0) / filteredData.length)}
              </p>
            </div>
            <div className="bg-green-50 rounded-2xl p-3 text-center">
              <p className="text-xs text-gray-600 mb-0.5">Cao nhất</p>
              <p className="text-lg font-bold text-green-600">{maxValue}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <h3 className="font-bold text-gray-900 mb-4">Top khóa học</h3>
          <div className="space-y-3">
            {topCourses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">#{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{course.name}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span>{course.instructor}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-bold text-sm">{course.revenue}</p>
                  <p className="text-gray-500 text-xs">{course.students} HV</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-3xl shadow-sm p-6"
        >
          <h3 className="font-bold text-gray-900 mb-4">Phân bố danh mục</h3>
          <div className="space-y-4">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-900 font-medium">{category.name}</span>
                  <span className="text-gray-600 text-sm">{category.count} ({category.percent}%)</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${category.percent}%` }}
                    transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-400"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
