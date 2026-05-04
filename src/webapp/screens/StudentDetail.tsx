import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Calendar, BookOpen, Award, Clock, TrendingUp, MessageCircle, Ban } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { Button } from '../components/ui/button';

export function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const student = {
    id: id,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123456789',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    location: 'Hồ Chí Minh',
    joinedDate: '15/01/2026',
    lastActive: '2 giờ trước',
    bio: 'Đam mê học lập trình mobile, mong muốn trở thành Mobile Developer chuyên nghiệp.',
    enrolledCourses: [
      {
        id: '1',
        name: 'React Native Cơ Bản',
        progress: 85,
        enrolledDate: '20/01/2026',
        completedLessons: 20,
        totalLessons: 24,
        totalHours: 24.5,
        lastAccess: '2 giờ trước',
        avgScore: 92
      },
      {
        id: '2',
        name: 'React Native Nâng Cao',
        progress: 45,
        enrolledDate: '10/02/2026',
        completedLessons: 14,
        totalLessons: 32,
        totalHours: 18.2,
        lastAccess: '1 ngày trước',
        avgScore: 88
      }
    ],
    stats: {
      totalCourses: 2,
      completedCourses: 0,
      totalHours: 42.7,
      avgCompletion: 65,
      certificates: 0
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Chi tiết học viên" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-6 text-white mb-6"
        >
          <div className="flex items-start gap-4 mb-6">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-20 h-20 rounded-full border-4 border-white/20 bg-white"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{student.name}</h2>
              <div className="space-y-1 text-blue-100 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{student.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
              <BookOpen className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xl font-bold">{student.stats.totalCourses}</p>
              <p className="text-blue-100 text-xs">Khóa học</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
              <Clock className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xl font-bold">{student.stats.totalHours}h</p>
              <p className="text-blue-100 text-xs">Giờ học</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
              <TrendingUp className="w-5 h-5 mx-auto mb-1" />
              <p className="text-xl font-bold">{student.stats.avgCompletion}%</p>
              <p className="text-blue-100 text-xs">TB hoàn thành</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <h3 className="font-bold text-gray-900 mb-3">Thông tin</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Ngày tham gia</span>
              <div className="flex items-center gap-2 text-gray-900">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{student.joinedDate}</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Hoạt động gần nhất</span>
              <span className="font-medium text-gray-900">{student.lastActive}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Chứng chỉ đã nhận</span>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-600" />
                <span className="font-medium text-gray-900">{student.stats.certificates}</span>
              </div>
            </div>
          </div>

          {student.bio && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-2">Giới thiệu</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{student.bio}</p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <h3 className="font-bold text-gray-900 mb-4">Khóa học đang tham gia</h3>
          <div className="space-y-4">
            {student.enrolledCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="border border-gray-200 rounded-2xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{course.name}</h4>
                    <p className="text-gray-500 text-sm">Đăng ký: {course.enrolledDate}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/teacher/student/${id}/stats?courseId=${course.id}`)}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    Xem chi tiết
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">Tiến độ</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-blue-600">{course.progress}%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">Điểm TB</p>
                    <p className="text-lg font-bold text-green-600">{course.avgScore}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <p className="text-gray-600 mb-0.5">Bài học</p>
                    <p className="font-semibold text-gray-900">
                      {course.completedLessons}/{course.totalLessons}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-0.5">Giờ học</p>
                    <p className="font-semibold text-gray-900">{course.totalHours}h</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-0.5">Truy cập</p>
                    <p className="font-semibold text-gray-900">{course.lastAccess}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <Button
            onClick={() => navigate(`/messages/${id}`)}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Nhắn tin cho học viên
          </Button>

          <Button
            onClick={() => navigate(`/teacher/student/${id}/report`)}
            variant="outline"
            className="w-full h-12 border-2 border-red-200 text-red-600 rounded-2xl hover:bg-red-50 flex items-center justify-center gap-2"
          >
            <Ban className="w-4 h-4" />
            Báo cáo vi phạm
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
