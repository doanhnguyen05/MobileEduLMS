import { motion } from 'motion/react';
import { Trophy, Target, Flame, Calendar, Award, TrendingUp, BookOpen, Clock } from 'lucide-react';
import { TopBar } from '../../components/TopBar';
import { BottomNav } from '../../components/BottomNav';

export function Progress() {
  const achievements = [
    { id: 1, title: 'Người mới bắt đầu', description: 'Hoàn thành bài học đầu tiên', icon: Trophy, unlocked: true, color: 'from-blue-500 to-cyan-400' },
    { id: 2, title: 'Học siêng năng', description: 'Học 7 ngày liên tiếp', icon: Flame, unlocked: true, color: 'from-orange-500 to-red-400' },
    { id: 3, title: 'Chuyên gia', description: 'Hoàn thành 5 khóa học', icon: Award, unlocked: false, color: 'from-purple-500 to-pink-400' },
    { id: 4, title: 'Thạc sĩ', description: 'Đạt 95% trở lên ở 10 bài kiểm tra', icon: Target, unlocked: false, color: 'from-green-500 to-emerald-400' }
  ];

  const weeklyStats = [
    { day: 'T2', hours: 2.5 },
    { day: 'T3', hours: 1.8 },
    { day: 'T4', hours: 3.2 },
    { day: 'T5', hours: 2.0 },
    { day: 'T6', hours: 2.8 },
    { day: 'T7', hours: 1.5 },
    { day: 'CN', hours: 3.5 }
  ];

  const maxHours = Math.max(...weeklyStats.map(s => s.hours));

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar showBack title="Tiến độ học tập" />

      <div className="p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-blue-100 mb-1">Tổng thời gian học</p>
              <h2 className="text-4xl font-bold">48.5 giờ</h2>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Clock className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
              <Flame className="w-6 h-6 text-orange-300 mx-auto mb-1" />
              <p className="text-2xl font-bold">7</p>
              <p className="text-blue-100 text-xs">Ngày liên tiếp</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
              <BookOpen className="w-6 h-6 text-green-300 mx-auto mb-1" />
              <p className="text-2xl font-bold">24</p>
              <p className="text-blue-100 text-xs">Bài hoàn thành</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
              <Trophy className="w-6 h-6 text-yellow-300 mx-auto mb-1" />
              <p className="text-2xl font-bold">12</p>
              <p className="text-blue-100 text-xs">Thành tích</p>
            </div>
          </div>
        </motion.div>

        <div className="bg-white rounded-3xl shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Hoạt động tuần này</h3>
          <div className="flex items-end justify-between gap-2 h-40">
            {weeklyStats.map((stat, index) => (
              <motion.div
                key={stat.day}
                initial={{ height: 0 }}
                animate={{ height: `${(stat.hours / maxHours) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-xl flex items-end justify-center pb-2">
                  <span className="text-white text-xs font-medium">{stat.hours}h</span>
                </div>
                <span className="text-gray-600 text-sm">{stat.day}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 mb-4">Thành tích</h3>
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-3xl p-5 shadow-sm ${
                    !achievement.unlocked ? 'opacity-50' : ''
                  }`}
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${achievement.color} rounded-2xl flex items-center justify-center mb-3`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                  <p className="text-gray-600 text-xs">{achievement.description}</p>
                  {achievement.unlocked && (
                    <div className="mt-2 text-green-600 text-xs font-medium">✓ Đã mở khóa</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl p-6 text-white"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Mục tiêu tháng này</h3>
              <p className="text-white/90 text-sm">Hoàn thành 3 khóa học</p>
            </div>
            <Target className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Tiến độ</span>
              <span className="font-bold">2/3</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '66%' }}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
