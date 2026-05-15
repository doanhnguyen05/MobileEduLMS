import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { TrendingUp, Clock, Award, CheckCircle2, PlayCircle, Calendar, BarChart3 } from 'lucide-react';
import { TopBar } from '../../components/TopBar';

export function StudentCourseStats() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');

  const studentStats = {
    name: 'Nguyễn Văn A',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    courseName: 'React Native Cơ Bản',
    enrolledDate: '20/01/2026',
    completionRate: 85,
    totalLessons: 24,
    completedLessons: 20,
    inProgressLessons: 3,
    lockedLessons: 1,
    totalHours: 24.5,
    avgScore: 92,
    quizzesTaken: 8,
    quizzesPassed: 7,
    lastActive: '2 giờ trước',
    weeklyActivity: [
      { day: 'T2', hours: 2.5 },
      { day: 'T3', hours: 3.2 },
      { day: 'T4', hours: 1.8 },
      { day: 'T5', hours: 4.1 },
      { day: 'T6', hours: 2.9 },
      { day: 'T7', hours: 3.5 },
      { day: 'CN', hours: 1.5 }
    ],
    lessonsProgress: [
      { id: '1', title: 'Giới thiệu React Native', status: 'completed', score: 95, timeSpent: '18 phút' },
      { id: '2', title: 'Cài đặt môi trường', status: 'completed', score: 88, timeSpent: '32 phút' },
      { id: '3', title: 'Components cơ bản', status: 'completed', score: 92, timeSpent: '45 phút' },
      { id: '4', title: 'State và Props', status: 'in-progress', score: null, timeSpent: '15 phút' },
      { id: '5', title: 'Styling với StyleSheet', status: 'locked', score: null, timeSpent: null }
    ]
  };

  const maxHours = Math.max(...studentStats.weeklyActivity.map(d => d.hours));

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Thống kê học tập" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <img
              src={studentStats.avatar}
              alt={studentStats.name}
              className="w-16 h-16 rounded-full bg-gray-200"
            />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{studentStats.name}</h3>
              <p className="text-blue-600 text-sm">{studentStats.courseName}</p>
              <p className="text-gray-500 text-xs">Đăng ký: {studentStats.enrolledDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div className="bg-blue-50 rounded-2xl p-3 text-center">
              <TrendingUp className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-xl font-bold text-blue-600">{studentStats.completionRate}%</p>
              <p className="text-gray-600 text-xs">Tiến độ</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-3 text-center">
              <Award className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <p className="text-xl font-bold text-green-600">{studentStats.avgScore}</p>
              <p className="text-gray-600 text-xs">Điểm TB</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-3 text-center">
              <Clock className="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <p className="text-xl font-bold text-purple-600">{studentStats.totalHours}h</p>
              <p className="text-gray-600 text-xs">Giờ học</p>
            </div>
            <div className="bg-orange-50 rounded-2xl p-3 text-center">
              <CheckCircle2 className="w-5 h-5 text-orange-600 mx-auto mb-1" />
              <p className="text-xl font-bold text-orange-600">{studentStats.completedLessons}</p>
              <p className="text-gray-600 text-xs">Hoàn thành</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-900">Hoạt động tuần này</h3>
          </div>

          <div className="flex items-end justify-between gap-2 h-40 mb-4">
            {studentStats.weeklyActivity.map((data, index) => (
              <motion.div
                key={data.day}
                initial={{ height: 0 }}
                animate={{ height: `${(data.hours / maxHours) * 100}%` }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-xl flex items-end justify-center pb-2">
                  <span className="text-white text-xs font-medium">{data.hours}h</span>
                </div>
                <span className="text-gray-600 text-xs">{data.day}</span>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Hoạt động gần nhất:</span>
            </div>
            <span className="font-medium text-gray-900">{studentStats.lastActive}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <h3 className="font-bold text-gray-900 mb-4">Tổng quan bài học</h3>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-green-50 rounded-2xl p-3 text-center">
              <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-green-600">{studentStats.completedLessons}</p>
              <p className="text-gray-600 text-xs">Hoàn thành</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-3 text-center">
              <PlayCircle className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-lg font-bold text-blue-600">{studentStats.inProgressLessons}</p>
              <p className="text-gray-600 text-xs">Đang học</p>
            </div>
            <div className="bg-gray-100 rounded-2xl p-3 text-center">
              <div className="w-5 h-5 bg-gray-400 rounded-full mx-auto mb-1 flex items-center justify-center">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <p className="text-lg font-bold text-gray-600">{studentStats.lockedLessons}</p>
              <p className="text-gray-600 text-xs">Chưa mở</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700">Bài kiểm tra đã làm</span>
              <span className="font-bold text-blue-600">
                {studentStats.quizzesPassed}/{studentStats.quizzesTaken} đạt
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-sm p-6"
        >
          <h3 className="font-bold text-gray-900 mb-4">Chi tiết bài học</h3>

          <div className="space-y-3">
            {studentStats.lessonsProgress.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className={`flex items-center gap-3 p-3 rounded-2xl ${
                  lesson.status === 'completed'
                    ? 'bg-green-50'
                    : lesson.status === 'in-progress'
                    ? 'bg-blue-50'
                    : 'bg-gray-50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    lesson.status === 'completed'
                      ? 'bg-green-100'
                      : lesson.status === 'in-progress'
                      ? 'bg-blue-100'
                      : 'bg-gray-200'
                  }`}
                >
                  {lesson.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : lesson.status === 'in-progress' ? (
                    <PlayCircle className="w-5 h-5 text-blue-600" />
                  ) : (
                    <span className="text-gray-400 text-lg">🔒</span>
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">{lesson.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    {lesson.timeSpent && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{lesson.timeSpent}</span>
                      </div>
                    )}
                    {lesson.score !== null && (
                      <div className="flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        <span className="font-semibold text-green-600">{lesson.score} điểm</span>
                      </div>
                    )}
                  </div>
                </div>

                {lesson.status === 'completed' && lesson.score && (
                  <div className="text-right">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lesson.score >= 90
                          ? 'bg-green-100 text-green-600'
                          : lesson.score >= 70
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {lesson.score >= 90 ? 'Xuất sắc' : lesson.score >= 70 ? 'Tốt' : 'Trung bình'}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
