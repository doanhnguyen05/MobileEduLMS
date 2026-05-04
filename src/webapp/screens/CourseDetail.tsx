import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play, Lock, CheckCircle2, Star, Users, Clock, BookOpen, Target, Award, List, MessageSquare, Edit } from 'lucide-react';
import { courses, lessons } from '../data/mockData';
import { TopBar } from '../components/TopBar';
import { Button } from '../components/ui/button';

export function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === id);
  const courseLessons = lessons.filter(l => l.courseId === id);

  if (!course) return null;

  const completedLessons = courseLessons.filter(l => l.completed).length;
  const hasCompletedCourse = course.enrolled && course.progress === 100;

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack />

      <div className="relative h-64">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-6 left-6 right-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
              {course.level}
            </span>
            <div className="flex items-center gap-1 text-white">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              <span className="font-medium">{course.rating}</span>
            </div>
          </div>
          <h1 className="text-white text-2xl font-bold mb-2">{course.title}</h1>
          <p className="text-white/90 text-sm">{course.instructor}</p>
        </motion.div>
      </div>

      <div className="px-6 -mt-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-6"
        >
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{course.lessons}</p>
              <p className="text-gray-500 text-xs">Bài học</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{course.duration.split(' ')[0]}</p>
              <p className="text-gray-500 text-xs">Giờ</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{Math.floor(course.students / 1000)}K</p>
              <p className="text-gray-500 text-xs">Học viên</p>
            </div>
          </div>

          {course.enrolled && (
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tiến độ học tập</span>
                <span className="text-blue-600 font-medium">{course.progress}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                />
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="font-bold text-gray-900 mb-2">Mô tả</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{course.description}</p>
          </div>

          {course.requirements && course.requirements.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <List className="w-5 h-5 text-blue-600" />
                <h2 className="font-bold text-gray-900">Yêu cầu</h2>
              </div>
              <ul className="space-y-2">
                {course.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {course.outcomes && course.outcomes.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-purple-600" />
                <h2 className="font-bold text-gray-900">Bạn sẽ học được gì</h2>
              </div>
              <ul className="space-y-2">
                {course.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                    <Award className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {course.syllabus && course.syllabus.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-orange-600" />
                <h2 className="font-bold text-gray-900">Chương trình học</h2>
              </div>
              <div className="space-y-2">
                {course.syllabus.map((section, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-orange-600 font-bold text-sm">{index + 1}</span>
                      </div>
                      <span className="font-medium text-gray-900">{section.title}</span>
                    </div>
                    <span className="text-gray-500 text-sm">{section.lessons} bài</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <h2 className="font-bold text-gray-900">Đánh giá</h2>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <span className="font-bold text-lg">{course.rating}</span>
                <span className="text-sm">/ 5.0</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => navigate(`/course/${id}/reviews`)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">Xem tất cả đánh giá</span>
                </div>
                <span className="text-gray-500 text-sm">342 đánh giá</span>
              </button>

              {hasCompletedCourse && (
                <button
                  onClick={() => navigate(`/course/${id}/rate`)}
                  className="w-full flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl hover:from-yellow-100 hover:to-orange-100 transition-colors"
                >
                  <Edit className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-orange-600">Viết đánh giá của bạn</span>
                </button>
              )}
            </div>
          </div>

          {!course.enrolled && (
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border-2 border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Giá khóa học</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-medium text-sm">Truy cập vĩnh viễn</p>
                  <p className="text-gray-500 text-xs">Học mọi lúc, mọi nơi</p>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={() => course.enrolled ? navigate(`/lesson/${courseLessons[0]?.id}`) : navigate(`/payment/method/${id}`)}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30"
          >
            {course.enrolled ? 'Tiếp tục học' : 'Đăng ký khóa học'}
          </Button>
        </motion.div>

        <div className="bg-white rounded-3xl shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-4">Nội dung khóa học</h2>
          <div className="space-y-3">
            {courseLessons.map((lesson, index) => {
              const isLocked = !course.enrolled && index > 2;
              const Icon = lesson.completed ? CheckCircle2 : isLocked ? Lock : Play;

              return (
                <motion.button
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => !isLocked && navigate(`/lesson/${lesson.id}`)}
                  disabled={isLocked}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    isLocked
                      ? 'bg-gray-50 opacity-50 cursor-not-allowed'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      lesson.completed
                        ? 'bg-green-100'
                        : isLocked
                        ? 'bg-gray-200'
                        : 'bg-blue-100'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        lesson.completed
                          ? 'text-green-600'
                          : isLocked
                          ? 'text-gray-400'
                          : 'text-blue-600'
                      }`}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-gray-900 mb-1">{lesson.title}</h3>
                    <p className="text-gray-500 text-sm">{lesson.duration}</p>
                  </div>
                  <span className="text-gray-400 text-sm">Bài {index + 1}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
