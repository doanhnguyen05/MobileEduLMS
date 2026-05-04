import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, Send, X } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { Button } from '../components/ui/button';

export function RateCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const course = {
    id: id,
    title: 'React Native Cơ Bản',
    instructor: 'Nguyễn Thị Mai',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop'
  };

  const ratingLabels = [
    '',
    'Rất tệ',
    'Tệ',
    'Tạm được',
    'Tốt',
    'Xuất sắc'
  ];

  const suggestions = [
    'Nội dung rất chi tiết và dễ hiểu',
    'Giảng viên nhiệt tình',
    'Bài giảng hơi nhanh',
    'Cần thêm ví dụ thực tế',
    'Chất lượng video tốt',
    'Hỗ trợ tốt'
  ];

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Vui lòng chọn số sao đánh giá');
      return;
    }

    if (comment.trim().length < 10) {
      alert('Vui lòng nhập ít nhất 10 ký tự cho đánh giá');
      return;
    }

    console.log('Submitting review:', { courseId: id, rating, comment });
    navigate(`/course/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Đánh giá khóa học" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-start gap-4 mb-6">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-20 h-20 rounded-2xl object-cover bg-gray-100"
            />
            <div className="flex-1">
              <h2 className="font-bold text-gray-900 mb-1">{course.title}</h2>
              <p className="text-gray-600 text-sm">Giảng viên: {course.instructor}</p>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-600 mb-4">Bạn cảm thấy khóa học này như thế nào?</p>
            <div className="flex items-center justify-center gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform"
                >
                  <Star
                    className={`w-12 h-12 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    } transition-colors`}
                  />
                </motion.button>
              ))}
            </div>
            {(hoveredRating || rating) > 0 && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-semibold text-purple-600"
              >
                {ratingLabels[hoveredRating || rating]}
              </motion.p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <h3 className="font-bold text-gray-900 mb-4">Viết đánh giá của bạn</h3>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Chia sẻ trải nghiệm của bạn về khóa học... (tối thiểu 10 ký tự)"
            className="w-full h-32 p-4 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            maxLength={500}
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-500 text-sm">{comment.length}/500 ký tự</p>
            {comment.length >= 10 && (
              <p className="text-green-600 text-sm flex items-center gap-1">
                <Star className="w-4 h-4 fill-green-600" />
                Đủ độ dài
              </p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <h3 className="font-bold text-gray-900 mb-4">Gợi ý nhanh</h3>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  if (comment) {
                    setComment(comment + (comment.endsWith('.') || comment.endsWith(',') ? ' ' : '. ') + suggestion);
                  } else {
                    setComment(suggestion);
                  }
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-purple-50 text-gray-700 hover:text-purple-600 rounded-full text-sm transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200 mb-6"
        >
          <p className="text-sm text-gray-700">
            💡 <span className="font-semibold">Lưu ý:</span> Đánh giá của bạn sẽ giúp các học viên khác có cái nhìn chân thực về khóa học. Hãy chia sẻ thật lòng!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3"
        >
          <Button
            type="button"
            onClick={() => navigate(`/course/${id}`)}
            variant="outline"
            className="flex-1 h-14 rounded-2xl flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            Bỏ qua
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 h-14 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white rounded-2xl shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Gửi đánh giá
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
