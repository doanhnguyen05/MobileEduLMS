import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Star, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { courses } from '../../data/mockData';
import { BottomNav } from '../../components/BottomNav';
import { TopBar } from '../../components/TopBar';
import { Input } from '../../components/ui/input';

export function CourseList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const levels = ['all', 'Cơ bản', 'Trung bình', 'Nâng cao'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar title="Khóa học" />

      <div className="p-6 space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 rounded-2xl border-gray-200 bg-white"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedLevel === level
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {level === 'all' ? 'Tất cả' : level}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/course/${course.id}`)}
              className="bg-white rounded-3xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                      {course.level}
                    </span>
                    {course.enrolled && (
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                        Đã đăng ký
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-bold text-lg">{course.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium text-gray-900">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">{course.instructor}</span>
                  {course.enrolled ? (
                    <div className="text-blue-600 font-medium text-sm">
                      {course.progress}% hoàn thành
                    </div>
                  ) : (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                      Đăng ký
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
