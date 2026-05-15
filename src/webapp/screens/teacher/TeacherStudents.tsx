import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Users, TrendingUp, Award, Filter, Mail, MoreVertical, Eye, BarChart3, AlertTriangle, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../../components/TopBar';
import { BottomNav } from '../../components/BottomNav';
import { Input } from '../../components/ui/input';

export function TeacherStudents() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const courses = [
    { id: '1', name: 'React Native Cơ Bản' },
    { id: '2', name: 'React Native Nâng Cao' }
  ];

  const students = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      courseId: '1',
      courseName: 'React Native Cơ Bản',
      completionRate: 85,
      lastActive: '2 giờ trước',
      totalHours: 24.5
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      courseId: '2',
      courseName: 'React Native Nâng Cao',
      completionRate: 92,
      lastActive: '1 ngày trước',
      totalHours: 18.2
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@email.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
      courseId: '1',
      courseName: 'React Native Cơ Bản',
      completionRate: 67,
      lastActive: '5 giờ trước',
      totalHours: 32.8
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      email: 'phamthid@email.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
      courseId: '2',
      courseName: 'React Native Nâng Cao',
      completionRate: 78,
      lastActive: '3 giờ trước',
      totalHours: 15.3
    },
    {
      id: 5,
      name: 'Hoàng Văn E',
      email: 'hoangvane@email.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
      courseId: '1',
      courseName: 'React Native Cơ Bản',
      completionRate: 95,
      lastActive: '1 giờ trước',
      totalHours: 28.5
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || student.courseId === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const avgCompletion = Math.round(
    filteredStudents.reduce((sum, s) => sum + s.completionRate, 0) / filteredStudents.length
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar title="Học viên" />

      <div className="p-6">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-4 shadow-sm text-center"
          >
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{filteredStudents.length}</p>
            <p className="text-gray-600 text-xs">Tổng HV</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-4 shadow-sm text-center"
          >
            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{avgCompletion}%</p>
            <p className="text-gray-600 text-xs">TB hoàn thành</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-4 shadow-sm text-center"
          >
            <Award className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">4.8</p>
            <p className="text-gray-600 text-xs">Đánh giá</p>
          </motion.div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Lọc theo khóa học</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full h-12 px-4 border border-gray-200 rounded-2xl bg-white"
          >
            <option value="all">Tất cả khóa học</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Tìm kiếm học viên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-2xl border-gray-200 bg-white"
          />
        </div>

        <div className="space-y-3">
          {filteredStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-3xl shadow-sm p-4"
            >
              <div className="flex items-start gap-4">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-14 h-14 rounded-2xl bg-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{student.name}</h3>
                      <p className="text-gray-500 text-sm truncate">{student.email}</p>
                      <p className="text-blue-600 text-xs mt-1">{student.courseName}</p>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === student.id ? null : student.id)}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>

                      <AnimatePresence>
                        {openMenuId === student.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setOpenMenuId(null)}
                            />
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              className="absolute right-0 top-10 z-20 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                            >
                              <button
                                onClick={() => {
                                  navigate(`/teacher/student/${student.id}/detail`);
                                  setOpenMenuId(null);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                              >
                                <Eye className="w-4 h-4 text-gray-600" />
                                <span className="text-gray-900">Xem chi tiết</span>
                              </button>

                              <button
                                onClick={() => {
                                  navigate(`/teacher/student/${student.id}/stats?courseId=${student.courseId}`);
                                  setOpenMenuId(null);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                              >
                                <BarChart3 className="w-4 h-4 text-gray-600" />
                                <span className="text-gray-900">Xem thống kê</span>
                              </button>

                              <button
                                onClick={() => {
                                  navigate(`/messages/${student.id}`);
                                  setOpenMenuId(null);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                              >
                                <MessageCircle className="w-4 h-4 text-gray-600" />
                                <span className="text-gray-900">Nhắn tin</span>
                              </button>

                              <div className="border-t border-gray-100">
                                <button
                                  onClick={() => {
                                    navigate(`/teacher/student/${student.id}/report`);
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left"
                                >
                                  <AlertTriangle className="w-4 h-4 text-red-600" />
                                  <span className="text-red-600">Báo cáo vi phạm</span>
                                </button>
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-green-50 rounded-xl p-2 text-center">
                      <p className="text-xs text-gray-600 mb-0.5">Hoàn thành</p>
                      <p className="text-sm font-bold text-green-600">{student.completionRate}%</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-2 text-center">
                      <p className="text-xs text-gray-600 mb-0.5">Giờ học</p>
                      <p className="text-sm font-bold text-purple-600">{student.totalHours}h</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-gray-500 text-xs">Hoạt động: {student.lastActive}</p>
                    <button
                      onClick={() => navigate(`/messages/${student.id}`)}
                      className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
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
