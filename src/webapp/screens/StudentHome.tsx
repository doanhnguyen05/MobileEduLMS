import { motion } from 'motion/react';
import { BookOpen, Clock, Trophy, TrendingUp, Play, Star, Search, Bookmark, Bell, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth';
import { courses } from '../data/mockData';
import { BottomNav } from '../components/BottomNav';

export function StudentHome() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const myCourses = courses.filter(c => c.enrolled);
  const continueLearning = myCourses[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 px-6 pt-12 pb-32 rounded-b-[3rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-blue-100 mb-1">Xin chào,</p>
              <h1 className="text-white text-2xl font-bold">{user?.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/search')}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Search className="w-5 h-5 text-white" />
              </button>
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
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center"
            >
              <BookOpen className="w-6 h-6 text-white mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{myCourses.length}</p>
              <p className="text-blue-100 text-xs">Khóa học</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center"
            >
              <Clock className="w-6 h-6 text-white mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">24</p>
              <p className="text-blue-100 text-xs">Giờ học</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center"
            >
              <Trophy className="w-6 h-6 text-white mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-blue-100 text-xs">Hoàn thành</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="px-6 -mt-24 relative z-10">
        {continueLearning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => navigate(`/course/${continueLearning.id}`)}
            className="bg-white rounded-3xl shadow-xl p-5 mb-6 cursor-pointer"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                <Play className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-blue-600 text-sm font-medium mb-1">Tiếp tục học</p>
                <h3 className="font-bold text-gray-900 mb-2">{continueLearning.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{continueLearning.duration}</span>
                  <span>•</span>
                  <span>{continueLearning.lessons} bài học</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tiến độ</span>
                <span className="text-blue-600 font-medium">{continueLearning.progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${continueLearning.progress}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                />
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Khóa học của tôi</h2>
          <button
            onClick={() => navigate('/courses')}
            className="text-blue-600 text-sm font-medium"
          >
            Xem tất cả
          </button>
        </div>

        <div className="space-y-4">
          {myCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => navigate(`/course/${course.id}`)}
              className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                <div className="w-28 h-28 flex-shrink-0 relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="flex-1 py-3 pr-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{course.title}</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-yellow-500" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-1">{course.instructor}</p>
                  <div className="space-y-1.5">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${course.progress}%` }}
                        className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                      />
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">{course.progress}% hoàn thành</span>
                      <span className="text-blue-600 font-medium">{course.lessons} bài</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl p-6 text-white"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Thử thách tuần này!</h3>
              <p className="text-white/90 text-sm">Hoàn thành 3 bài học để nhận badge</p>
            </div>
            <TrendingUp className="w-8 h-8" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '66%' }}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-full bg-white rounded-full"
              />
            </div>
            <span className="font-bold">2/3</span>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
