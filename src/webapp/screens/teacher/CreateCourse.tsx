import { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Image as ImageIcon, Plus, X } from 'lucide-react';
import { TopBar } from '../../components/TopBar';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useSmartBack } from '../../hooks/useSmartBack';

export function CreateCourse() {
  const navigate = useNavigate();
  const goBack = useSmartBack('/teacher/courses');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: 'basic',
    category: 'mobile',
    price: '',
    thumbnail: null
  });

  const [lessons, setLessons] = useState([
    { id: 1, title: '', duration: '' }
  ]);

  const addLesson = () => {
    setLessons([...lessons, { id: lessons.length + 1, title: '', duration: '' }]);
  };

  const removeLesson = (id: number) => {
    setLessons(lessons.filter(lesson => lesson.id !== id));
  };

  const handleSubmit = () => {
    navigate('/teacher/courses');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Tạo khóa học mới" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <h2 className="font-bold text-gray-900 mb-4">Thông tin cơ bản</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Tên khóa học
              </label>
              <Input
                type="text"
                placeholder="VD: React Native Cơ Bản"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="h-12 rounded-2xl"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Mô tả
              </label>
              <textarea
                placeholder="Mô tả chi tiết về khóa học..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full h-32 px-4 py-3 rounded-2xl border border-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Cấp độ
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full h-12 px-4 rounded-2xl border border-gray-200 bg-white"
                >
                  <option value="basic">Cơ bản</option>
                  <option value="intermediate">Trung bình</option>
                  <option value="advanced">Nâng cao</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Giá (VNĐ)
                </label>
                <Input
                  type="number"
                  placeholder="499,000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="h-12 rounded-2xl"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Ảnh bìa
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 text-sm mb-1">Nhấp để tải ảnh lên</p>
                <p className="text-gray-400 text-xs">PNG, JPG (tối đa 5MB)</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Nội dung khóa học</h2>
            <button
              onClick={addLesson}
              className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl"
              >
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <Input
                  type="text"
                  placeholder="Tiêu đề bài học"
                  className="flex-1 h-10 rounded-xl border-0 bg-white"
                />
                <Input
                  type="text"
                  placeholder="Thời lượng"
                  className="w-24 h-10 rounded-xl border-0 bg-white"
                />
                {lessons.length > 1 && (
                  <button
                    onClick={() => removeLesson(lesson.id)}
                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={goBack}
            className="flex-1 h-14 border-2 border-gray-200 text-gray-700 rounded-2xl font-medium hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <Button
            onClick={handleSubmit}
            className="flex-1 h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30"
          >
            Tạo khóa học
          </Button>
        </div>
      </div>
    </div>
  );
}
