import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, BookOpen, Users, Star, MoreVertical, Edit, Trash2, Eye, Archive, Share2, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../../components/TopBar';
import { BottomNav } from '../../components/BottomNav';
import { teacherCourses } from '../../data/mockData';

export function TeacherCourses() {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [courses, setCourses] = useState(teacherCourses);

  const handleDeleteCourse = (courseId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
      return;
    }

    setCourses((currentCourses) => currentCourses.filter((course) => course.id !== courseId));
    setOpenMenuId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar title="Khóa học của tôi" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Quản lý khóa học</h2>
            <p className="text-gray-600 text-sm">{courses.length} khóa học</p>
          </div>
          <button
            onClick={() => navigate('/teacher/create-course')}
            className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-sm"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-gray-900">{course.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.status === 'active'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {course.status === 'active' ? 'Hoạt động' : 'Nháp'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.lessons} bài</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span>{course.avgRating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === course.id ? null : course.id)}
                      className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>

                    <AnimatePresence>
                      {openMenuId === course.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenMenuId(null)}
                          />
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            className="absolute right-0 top-12 z-20 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                          >
                            <button
                              onClick={() => {
                                navigate(`/teacher/course/${course.id}/edit`);
                                setOpenMenuId(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                            >
                              <Edit className="w-4 h-4 text-gray-600" />
                              <span className="text-gray-900">Chỉnh sửa</span>
                            </button>

                            <button
                              onClick={() => {
                                navigate(`/teacher/course/${course.id}/analytics`);
                                setOpenMenuId(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                            >
                              <Eye className="w-4 h-4 text-gray-600" />
                              <span className="text-gray-900">Thống kê</span>
                            </button>

                            <button
                              onClick={() => {
                                navigate(`/teacher/course/${course.id}/reviews`);
                                setOpenMenuId(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                            >
                              <MessageSquare className="w-4 h-4 text-gray-600" />
                              <span className="text-gray-900">Xem đánh giá</span>
                            </button>

                            <button
                              onClick={() => {
                                console.log('Share course');
                                setOpenMenuId(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                            >
                              <Share2 className="w-4 h-4 text-gray-600" />
                              <span className="text-gray-900">Chia sẻ</span>
                            </button>

                            <button
                              onClick={() => {
                                console.log('Disable course');
                                setOpenMenuId(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                            >
                              <Archive className="w-4 h-4 text-gray-600" />
                              <span className="text-gray-900">Vô hiệu hóa</span>
                            </button>

                            <div className="border-t border-gray-100">
                              <button
                                onClick={() => handleDeleteCourse(course.id)}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left"
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                                <span className="text-red-600">Xóa khóa học</span>
                              </button>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-blue-50 rounded-2xl p-3 text-center">
                    <p className="text-sm text-gray-600 mb-1">Học viên</p>
                    <p className="text-xl font-bold text-blue-600">{course.students.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-3 text-center">
                    <p className="text-sm text-gray-600 mb-1">Đánh giá</p>
                    <p className="text-xl font-bold text-green-600">{course.avgRating}</p>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-3 text-center">
                    <p className="text-sm text-gray-600 mb-1">Doanh thu</p>
                    <p className="text-lg font-bold text-purple-600">{Math.floor(parseInt(course.revenue.replace(/[^\d]/g, '')) / 1000000)}M</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => navigate(`/teacher/course/${course.id}/edit`)}
                    className="h-11 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Chỉnh sửa</span>
                  </button>
                  <button
                    onClick={() => navigate(`/teacher/course/${course.id}/analytics`)}
                    className="h-11 border-2 border-gray-200 text-gray-700 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Thống kê</span>
                  </button>
                  <button
                    onClick={() => navigate(`/teacher/course/${course.id}/reviews`)}
                    className="col-span-2 h-11 border-2 border-purple-200 text-purple-600 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-purple-50 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Xem đánh giá ({course.avgRating} ⭐)</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate('/teacher/create-course')}
          className="mt-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-6 text-white cursor-pointer hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Plus className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">Tạo khóa học mới</h3>
              <p className="text-white/90 text-sm">Chia sẻ kiến thức của bạn</p>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
