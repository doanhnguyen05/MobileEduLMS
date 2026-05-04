import { motion } from 'motion/react';
import { DollarSign, TrendingUp, Calendar, Download, CreditCard, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { BottomNav } from '../components/BottomNav';

export function TeacherRevenue() {
  const navigate = useNavigate();
  const revenueData = [
    { month: 'T1', amount: 18000000 },
    { month: 'T2', amount: 21000000 },
    { month: 'T3', amount: 24500000 },
    { month: 'T4', amount: 28000000 },
    { month: 'T5', amount: 32000000 },
    { month: 'T6', amount: 36500000 },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.amount));

  const transactions = [
    {
      id: 1,
      date: '18/04/2026',
      course: 'React Native Cơ Bản',
      students: 25,
      amount: 12500000,
      status: 'completed'
    },
    {
      id: 2,
      date: '15/04/2026',
      course: 'React Native Nâng Cao',
      students: 18,
      amount: 9000000,
      status: 'completed'
    },
    {
      id: 3,
      date: '10/04/2026',
      course: 'React Native Cơ Bản',
      students: 30,
      amount: 15000000,
      status: 'pending'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar showBack title="Doanh thu" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-3xl p-6 text-white mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-green-100 mb-1">Tổng doanh thu</p>
              <h2 className="text-4xl font-bold">160M đ</h2>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3">
              <p className="text-green-100 text-sm mb-1">Tháng này</p>
              <p className="text-xl font-bold">36.5M đ</p>
              <div className="flex items-center gap-1 text-green-100 text-xs mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+14.3%</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3">
              <p className="text-green-100 text-sm mb-1">Tuần này</p>
              <p className="text-xl font-bold">8.2M đ</p>
              <div className="flex items-center gap-1 text-green-100 text-xs mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+8.1%</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Biểu đồ doanh thu</h3>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
              <Calendar className="w-4 h-4" />
              <span>6 tháng</span>
            </button>
          </div>

          <div className="flex items-end justify-between gap-2 h-48 mb-4">
            {revenueData.map((data, index) => (
              <motion.div
                key={data.month}
                initial={{ height: 0 }}
                animate={{ height: `${(data.amount / maxRevenue) * 100}%` }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="w-full bg-gradient-to-t from-green-600 to-emerald-400 rounded-xl flex items-end justify-center pb-2">
                  <span className="text-white text-xs font-medium">
                    {(data.amount / 1000000).toFixed(0)}M
                  </span>
                </div>
                <span className="text-gray-600 text-sm">{data.month}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600" />
              <span className="text-gray-600">Doanh thu</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-green-600 font-medium">+102.5%</span>
            </div>
          </div>
        </motion.div>

        <div className="bg-white rounded-3xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Giao dịch gần đây</h3>
            <button className="text-blue-600 text-sm font-medium">Xem tất cả</button>
          </div>

          <div className="space-y-3">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-0.5">{transaction.course}</h4>
                    <p className="text-gray-600 text-sm">{transaction.students} học viên • {transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600 mb-0.5">
                    +{(transaction.amount / 1000000).toFixed(1)}M đ
                  </p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.status === 'completed'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {transaction.status === 'completed' ? 'Hoàn thành' : 'Chờ xử lý'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <button
            onClick={() => navigate('/teacher/withdraw')}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl flex items-center justify-center gap-2 font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl transition-shadow"
          >
            <CreditCard className="w-5 h-5" />
            <span>Rút tiền</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/teacher/bank-accounts')}
              className="h-12 border-2 border-gray-200 text-gray-700 rounded-2xl flex items-center justify-center gap-2 font-medium hover:bg-gray-50 transition-colors"
            >
              <CreditCard className="w-4 h-4" />
              <span>Tài khoản</span>
            </button>

            <button className="h-12 border-2 border-gray-200 text-gray-700 rounded-2xl flex items-center justify-center gap-2 font-medium hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Xuất báo cáo</span>
            </button>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
