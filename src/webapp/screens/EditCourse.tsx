import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Save, X, Upload, Plus, Trash2, GripVertical } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: 'React Native Cơ Bản',
    description: 'Học xây dựng ứng dụng mobile với React Native từ đầu. Khóa học cung cấp kiến thức nền tảng về React Native.',
    category: 'Mobile Development',
    level: 'Cơ bản',
    price: '499000',
    duration: '12',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop'
  });

  const [lessons, setLessons] = useState([
    { id: '1', title: 'Giới thiệu React Native', duration: '15', order: 1 },
    { id: '2', title: 'Cài đặt môi trường', duration: '25', order: 2 },
    { id: '3', title: 'Components cơ bản', duration: '30', order: 3 },
    { id: '4', title: 'State và Props', duration: '35', order: 4 }
  ]);

  const [requirements, setRequirements] = useState([
    'Kiến thức cơ bản về JavaScript',
    'Hiểu biết về HTML & CSS',
    'Máy tính cài đặt Node.js'
  ]);

  const [outcomes, setOutcomes] = useState([
    'Xây dựng ứng dụng mobile hoàn chỉnh',
    'Làm chủ React Native Components',
    'Tích hợp API và quản lý State'
  ]);

  const handleSave = () => {
    console.log('Saving course...', formData, lessons, requirements, outcomes);
    navigate('/teacher/courses');
  };

  const addLesson = () => {
    const newLesson = {
      id: Date.now().toString(),
      title: '',
      duration: '',
      order: lessons.length + 1
    };
    setLessons([...lessons, newLesson]);
  };

  const removeLesson = (id: string) => {
    setLessons(lessons.filter(l => l.id !== id));
  };

  const updateLesson = (id: string, field: string, value: string) => {
    setLessons(lessons.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const updateRequirement = (index: number, value: string) => {
    setRequirements(requirements.map((r, i) => i === index ? value : r));
  };

  const addOutcome = () => {
    setOutcomes([...outcomes, '']);
  };

  const removeOutcome = (index: number) => {
    setOutcomes(outcomes.filter((_, i) => i !== index));
  };

  const updateOutcome = (index: number, value: string) => {
    setOutcomes(outcomes.map((o, i) => i === index ? value : o));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar
        showBack
        title="Chỉnh sửa khóa học"
        actions={
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/teacher/courses')}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              <span>Lưu</span>
            </button>
          </div>
        }
      />

      <div className="p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm p-6"
        >
          <h3 className="font-bold text-gray-900 mb-4">Thông tin cơ bản</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ảnh bìa khóa học
              </label>
              <div className="relative">
                <img
                  src={formData.thumbnail}
                  alt="Thumbnail"
                  className="w-full h-48 object-cover rounded-2xl"
                />
                <button className="absolute bottom-4 right-4 px-4 py-2 bg-white rounded-xl shadow-lg flex items-center gap-2 font-medium hover:bg-gray-50">
                  <Upload className="w-4 h-4" />
                  <span>Thay đổi</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên khóa học
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="h-12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-12 px-4 border border-gray-200 rounded-xl"
                >
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="iOS Development">iOS Development</option>
                  <option value="Android Development">Android Development</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cấp độ
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full h-12 px-4 border border-gray-200 rounded-xl"
                >
                  <option value="Cơ bản">Cơ bản</option>
                  <option value="Trung bình">Trung bình</option>
                  <option value="Nâng cao">Nâng cao</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giá (VND)
                </label>
                <Input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thời lượng (giờ)
                </label>
                <Input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="h-12"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Bài học</h3>
            <button
              onClick={addLesson}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center gap-2 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm bài</span>
            </button>
          </div>

          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                <GripVertical className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Tên bài học"
                    value={lesson.title}
                    onChange={(e) => updateLesson(lesson.id, 'title', e.target.value)}
                    className="h-10"
                  />
                  <Input
                    placeholder="Thời lượng (phút)"
                    value={lesson.duration}
                    onChange={(e) => updateLesson(lesson.id, 'duration', e.target.value)}
                    className="h-10"
                  />
                </div>
                <button
                  onClick={() => removeLesson(lesson.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Yêu cầu</h3>
            <button
              onClick={addRequirement}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center gap-2 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm</span>
            </button>
          </div>

          <div className="space-y-2">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={req}
                  onChange={(e) => updateRequirement(index, e.target.value)}
                  className="h-10"
                  placeholder="Nhập yêu cầu"
                />
                <button
                  onClick={() => removeRequirement(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Kết quả học tập</h3>
            <button
              onClick={addOutcome}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center gap-2 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm</span>
            </button>
          </div>

          <div className="space-y-2">
            {outcomes.map((outcome, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={outcome}
                  onChange={(e) => updateOutcome(index, e.target.value)}
                  className="h-10"
                  placeholder="Nhập kết quả học tập"
                />
                <button
                  onClick={() => removeOutcome(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
