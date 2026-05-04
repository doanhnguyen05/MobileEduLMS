import { useState } from 'react';
import { motion } from 'motion/react';
import { DollarSign, TrendingUp, CreditCard, Wallet, Calendar, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { TopBar } from '../components/TopBar';

export function AdminRevenueReport() {
  const [timeRange, setTimeRange] = useState<'1' | '3' | '6' | '12'>('6');

  const revenueData = [
    { month: 'T1', revenue: 180, withdrawals: 120, profit: 60 },
    { month: 'T2', revenue: 210, withdrawals: 145, profit: 65 },
    { month: 'T3', revenue: 245, withdrawals: 170, profit: 75 },
    { month: 'T4', revenue: 280, withdrawals: 195, profit: 85 },
    { month: 'T5', revenue: 320, withdrawals: 225, profit: 95 },
    { month: 'T6', revenue: 365, withdrawals: 255, profit: 110 },
  ];

  const getFilteredData = () => {
    const months = parseInt(timeRange);
    return revenueData.slice(-months);
  };

  const filteredData = getFilteredData();
  const maxValue = Math.max(...filteredData.map(d => d.revenue));

  const timeRanges = [
    { value: '1' as const, label: '1 tháng' },
    { value: '3' as const, label: '3 tháng' },
    { value: '6' as const, label: '6 tháng' },
    { value: '12' as const, label: '12 tháng' }
  ];

  const totalRevenue = filteredData.reduce((sum, d) => sum + d.revenue, 0);
  const totalWithdrawals = filteredData.reduce((sum, d) => sum + d.withdrawals, 0);
  const totalProfit = filteredData.reduce((sum, d) => sum + d.profit, 0);

  const stats = [
    {
      label: 'Tổng doanh thu',
      value: '2.45B đ',
      change: '+15.8%',
      color: 'from-green-500 to-emerald-400',
      icon: DollarSign
    },
    {
      label: 'Đã rút',
      value: '1.71B đ',
      change: '+12.3%',
      color: 'from-blue-500 to-cyan-400',
      icon: ArrowUpRight
    },
    {
      label: 'Lợi nhuận',
      value: '740M đ',
      change: '+18.5%',
      color: 'from-purple-500 to-pink-400',
      icon: TrendingUp
    },
    {
      label: 'TB/tháng',
      value: '408M đ',
      change: '+8.2%',
      color: 'from-orange-500 to-red-400',
      icon: Wallet
    }
  ];

  const topInstructors = [
    { name: 'Nguyễn Thị Mai', revenue: '450M', courses: 12, students: 3250 },
    { name: 'Trần Văn Long', revenue: '380M', courses: 8, students: 2890 },
    { name: 'Lê Minh Tuấn', revenue: '320M', courses: 10, students: 2450 },
    { name: 'Phạm Thị Hương', revenue: '285M', courses: 7, students: 2180 },
    { name: 'Nguyễn Văn A', revenue: '240M', courses: 6, students: 1920 }
  ];

  const paymentMethods = [
    { method: 'QR Code', amount: '1.2B đ', percent: 49, transactions: 8450 },
    { method: 'Thẻ tín dụng', amount: '780M đ', percent: 32, transactions: 5230 },
    { method: 'Chuyển khoản', amount: '470M đ', percent: 19, transactions: 3120 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Báo cáo doanh thu" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Doanh thu</h2>
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
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Biểu đồ doanh thu</h3>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{timeRange} tháng</span>
            </div>
          </div>

          <div className="flex items-end justify-between gap-2 h-48 mb-4">
            {filteredData.map((data, index) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-1 items-center justify-end" style={{ height: '100%' }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.revenue / maxValue) * 100}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="w-full bg-gradient-to-t from-green-600 to-emerald-400 rounded-t-xl flex items-start justify-center pt-1"
                  >
                    <span className="text-white text-xs font-medium">{data.revenue}M</span>
                  </motion.div>
                </div>
                <span className="text-gray-600 text-xs">{data.month}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-green-50 rounded-2xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
                <p className="text-xs text-gray-600">Tổng thu</p>
              </div>
              <p className="text-lg font-bold text-green-600">{totalRevenue}M</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <ArrowDownRight className="w-4 h-4 text-blue-600" />
                <p className="text-xs text-gray-600">Đã rút</p>
              </div>
              <p className="text-lg font-bold text-blue-600">{totalWithdrawals}M</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <p className="text-xs text-gray-600">Lợi nhuận</p>
              </div>
              <p className="text-lg font-bold text-purple-600">{totalProfit}M</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <h3 className="font-bold text-gray-900 mb-4">Top giảng viên</h3>
          <div className="space-y-3">
            {topInstructors.map((instructor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">#{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">{instructor.name}</p>
                  <p className="text-gray-500 text-xs">
                    {instructor.courses} khóa học • {instructor.students.toLocaleString()} HV
                  </p>
                </div>
                <p className="text-green-600 font-bold">{instructor.revenue}</p>
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
          <h3 className="font-bold text-gray-900 mb-4">Phương thức thanh toán</h3>
          <div className="space-y-4">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-900 font-medium">{method.method}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 font-bold text-sm">{method.amount}</p>
                    <p className="text-gray-500 text-xs">{method.transactions.toLocaleString()} GD</p>
                  </div>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${method.percent}%` }}
                    transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-green-600 to-emerald-400"
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
