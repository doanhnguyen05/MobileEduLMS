import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, TrendingUp, UserPlus, UserMinus, Calendar, Download, Filter } from 'lucide-react';
import { TopBar } from '../../components/TopBar';
import { Button } from '../../components/ui/button';

export function AdminUserReport() {
  const [timeRange, setTimeRange] = useState<'1' | '3' | '6' | '12'>('6');

  const userData = [
    { month: 'T1', newUsers: 450, activeUsers: 1200, inactiveUsers: 80 },
    { month: 'T2', newUsers: 520, activeUsers: 1350, inactiveUsers: 95 },
    { month: 'T3', newUsers: 680, activeUsers: 1580, inactiveUsers: 110 },
    { month: 'T4', newUsers: 750, activeUsers: 1820, inactiveUsers: 125 },
    { month: 'T5', newUsers: 890, activeUsers: 2100, inactiveUsers: 140 },
    { month: 'T6', newUsers: 980, activeUsers: 2450, inactiveUsers: 155 },
  ];

  const getFilteredData = () => {
    const months = parseInt(timeRange);
    return userData.slice(-months);
  };

  const filteredData = getFilteredData();
  const maxValue = Math.max(...filteredData.map(d => d.newUsers));

  const timeRanges = [
    { value: '1' as const, label: '1 tháng' },
    { value: '3' as const, label: '3 tháng' },
    { value: '6' as const, label: '6 tháng' },
    { value: '12' as const, label: '12 tháng' }
  ];

  const stats = [
    {
      label: 'Tổng người dùng',
      value: '15,420',
      change: '+12.5%',
      color: 'from-blue-500 to-cyan-400',
      icon: Users
    },
    {
      label: 'Người dùng mới',
      value: '4,270',
      change: '+18.3%',
      color: 'from-green-500 to-emerald-400',
      icon: UserPlus
    },
    {
      label: 'Hoạt động',
      value: '12,850',
      change: '+8.7%',
      color: 'from-purple-500 to-pink-400',
      icon: TrendingUp
    },
    {
      label: 'Ngưng hoạt động',
      value: '705',
      change: '-5.2%',
      color: 'from-orange-500 to-red-400',
      icon: UserMinus
    }
  ];

  const usersByRole = [
    { role: 'Học viên', count: 12450, percent: 81, color: 'bg-blue-600' },
    { role: 'Giảng viên', count: 2320, percent: 15, color: 'bg-purple-600' },
    { role: 'Admin', count: 650, percent: 4, color: 'bg-red-600' }
  ];

  const topRegions = [
    { name: 'Hồ Chí Minh', users: 5680, percent: 37 },
    { name: 'Hà Nội', users: 4250, percent: 28 },
    { name: 'Đà Nẵng', users: 2150, percent: 14 },
    { name: 'Cần Thơ', users: 1340, percent: 9 },
    { name: 'Khác', users: 2000, percent: 12 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Báo cáo người dùng" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Người dùng</h2>
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
                  <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
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
            <h3 className="font-bold text-gray-900">Người dùng mới</h3>
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
                animate={{ height: `${(data.newUsers / maxValue) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-xl flex items-end justify-center pb-2">
                  <span className="text-white text-xs font-medium">{data.newUsers}</span>
                </div>
                <span className="text-gray-600 text-xs">{data.month}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-2xl p-3 text-center">
              <p className="text-xs text-gray-600 mb-0.5">Tổng mới</p>
              <p className="text-lg font-bold text-blue-600">
                {filteredData.reduce((sum, d) => sum + d.newUsers, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-green-50 rounded-2xl p-3 text-center">
              <p className="text-xs text-gray-600 mb-0.5">TB/tháng</p>
              <p className="text-lg font-bold text-green-600">
                {Math.round(filteredData.reduce((sum, d) => sum + d.newUsers, 0) / filteredData.length)}
              </p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-3 text-center">
              <p className="text-xs text-gray-600 mb-0.5">Cao nhất</p>
              <p className="text-lg font-bold text-purple-600">{maxValue}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <h3 className="font-bold text-gray-900 mb-4">Phân bố theo vai trò</h3>
          <div className="space-y-4">
            {usersByRole.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-900 font-medium">{item.role}</span>
                  <span className="text-gray-600 text-sm">{item.count.toLocaleString()} ({item.percent}%)</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    className={`h-full ${item.color}`}
                  />
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
          <h3 className="font-bold text-gray-900 mb-4">Top khu vực</h3>
          <div className="space-y-3">
            {topRegions.map((region, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{region.name}</p>
                    <p className="text-gray-500 text-xs">{region.percent}% tổng người dùng</p>
                  </div>
                </div>
                <p className="text-blue-600 font-bold">{region.users.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
