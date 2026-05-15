import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, X, Clock, TrendingUp, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { courses } from '../../data/mockData';
import { useSmartBack } from '../../hooks/useSmartBack';

export function SearchAdvanced() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'React Native',
    'Flutter',
    'iOS Development',
    'Android Kotlin'
  ]);
  const navigate = useNavigate();
  const goBack = useSmartBack('/home');

  const trendingSearches = [
    'React Native Animation',
    'Flutter State Management',
    'SwiftUI MVVM',
    'Jetpack Compose'
  ];

  const suggestedCourses = courses.slice(0, 3);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query && !recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }
  };

  const removeRecentSearch = (search: string) => {
    setRecentSearches(recentSearches.filter(s => s !== search));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-blue-600 to-blue-500 px-6 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={goBack}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white text-xl font-bold">Tìm kiếm</h1>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Tìm kiếm khóa học, giảng viên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
            className="pl-12 h-14 rounded-2xl border-0 bg-white shadow-lg"
            autoFocus
          />
        </div>
      </div>

      <div className="p-6 -mt-2 relative z-10">
        {!searchQuery && (
          <>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">Tìm kiếm gần đây</h2>
                <button
                  onClick={() => setRecentSearches([])}
                  className="text-blue-600 text-sm font-medium"
                >
                  Xóa tất cả
                </button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm"
                  >
                    <button
                      onClick={() => setSearchQuery(search)}
                      className="flex items-center gap-3 flex-1"
                    >
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900">{search}</span>
                    </button>
                    <button
                      onClick={() => removeRecentSearch(search)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <h2 className="font-bold text-gray-900">Xu hướng tìm kiếm</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((search, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSearchQuery(search)}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-400 text-white rounded-full text-sm font-medium shadow-lg shadow-orange-500/30 hover:shadow-xl transition-shadow"
                  >
                    {search}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h2 className="font-bold text-gray-900">Gợi ý cho bạn</h2>
              </div>
              <div className="space-y-3">
                {suggestedCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-24 h-24 object-cover"
                      />
                      <div className="flex-1 py-3 pr-4">
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                          {course.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">{course.instructor}</p>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium">
                            {course.level}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {course.students.toLocaleString()} HV
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {searchQuery && (
          <div>
            <h2 className="font-bold text-gray-900 mb-4">
              Kết quả cho "{searchQuery}"
            </h2>
            <div className="space-y-3">
              {courses
                .filter(course =>
                  course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  course.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-24 h-24 object-cover"
                      />
                      <div className="flex-1 py-3 pr-4">
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                          {course.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-1">
                          {course.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium">
                            {course.level}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {course.students.toLocaleString()} HV
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
