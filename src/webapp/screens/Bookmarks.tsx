import { motion } from 'motion/react';
import { Bookmark, Star, Clock, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { BottomNav } from '../components/BottomNav';
import { courses } from '../data/mockData';

export function Bookmarks() {
  const navigate = useNavigate();
  const bookmarkedCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar showBack title="Khóa học yêu thích" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-pink-500 to-rose-400 rounded-3xl p-6 text-white mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 mb-1">Đã lưu</p>
              <h2 className="text-4xl font-bold">{bookmarkedCourses.length}</h2>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Bookmark className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
        </motion.div>

        {bookmarkedCourses.length > 0 ? (
          <div className="space-y-4">
            {bookmarkedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-sm overflow-hidden"
              >
                <div className="relative h-40">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Bookmark className="w-5 h-5 text-white fill-white" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg">{course.title}</h3>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                      {course.level}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{course.instructor}</p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/course/${course.id}`)}
                      className="flex-1 h-11 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                    >
                      Xem chi tiết
                    </button>
                    <button className="h-11 w-11 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-12 h-12 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa có khóa học yêu thích</h3>
            <p className="text-gray-600 mb-6">Lưu các khóa học để học sau</p>
            <button
              onClick={() => navigate('/courses')}
              className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 transition-colors"
            >
              Khám phá khóa học
            </button>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
