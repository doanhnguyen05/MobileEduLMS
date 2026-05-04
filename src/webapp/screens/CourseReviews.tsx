import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ThumbsUp, MessageCircle, Send, Filter } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export function CourseReviews() {
  const { id } = useParams();
  const [selectedFilter, setSelectedFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const course = {
    id: id,
    title: 'React Native Cơ Bản',
    rating: 4.8,
    totalReviews: 342
  };

  const reviews = [
    {
      id: 1,
      user: {
        name: 'Trần Văn A',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student1'
      },
      rating: 5,
      date: '15/04/2026',
      comment: 'Khóa học rất chi tiết và dễ hiểu. Giảng viên nhiệt tình, hỗ trợ tốt! Tôi đã học được rất nhiều kiến thức thực tế.',
      helpful: 45,
      reply: null
    },
    {
      id: 2,
      user: {
        name: 'Lê Thị B',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student2'
      },
      rating: 4,
      date: '14/04/2026',
      comment: 'Nội dung hay, nhưng một số bài giảng hơi nhanh. Cần thêm ví dụ thực tế.',
      helpful: 23,
      reply: {
        text: 'Cảm ơn bạn đã góp ý! Mình sẽ bổ sung thêm ví dụ trong các bài update tiếp theo.',
        date: '14/04/2026'
      }
    },
    {
      id: 3,
      user: {
        name: 'Phạm Văn C',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student3'
      },
      rating: 5,
      date: '12/04/2026',
      comment: 'Xuất sắc! Đã học được rất nhiều kiến thức thực tế. Recommend!',
      helpful: 67,
      reply: {
        text: 'Cảm ơn bạn rất nhiều! Chúc bạn học tập tốt!',
        date: '13/04/2026'
      }
    },
    {
      id: 4,
      user: {
        name: 'Nguyễn Thị D',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student4'
      },
      rating: 3,
      date: '10/04/2026',
      comment: 'Khóa học tạm ổn nhưng giá hơi cao so với nội dung.',
      helpful: 12,
      reply: null
    },
    {
      id: 5,
      user: {
        name: 'Hoàng Văn E',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student5'
      },
      rating: 5,
      date: '08/04/2026',
      comment: 'Giảng viên giảng rất hay, dễ hiểu. Mình đã có thể làm app sau khi học xong.',
      helpful: 89,
      reply: {
        text: 'Rất vui khi khóa học giúp ích được cho bạn! Chúc bạn thành công!',
        date: '09/04/2026'
      }
    }
  ];

  const ratingStats = [
    { stars: 5, count: 245, percent: 72 },
    { stars: 4, count: 68, percent: 20 },
    { stars: 3, count: 20, percent: 6 },
    { stars: 2, count: 6, percent: 2 },
    { stars: 1, count: 3, percent: 1 }
  ];

  const filters = [
    { value: 'all' as const, label: 'Tất cả' },
    { value: '5' as const, label: '5⭐' },
    { value: '4' as const, label: '4⭐' },
    { value: '3' as const, label: '3⭐' },
    { value: '2' as const, label: '2⭐' },
    { value: '1' as const, label: '1⭐' }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleReply = (reviewId: number) => {
    if (replyText.trim()) {
      console.log('Replying to review:', reviewId, 'Message:', replyText);
      setReplyText('');
      setReplyingTo(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Đánh giá khóa học" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-600 to-purple-500 rounded-3xl p-6 mb-6 text-white"
        >
          <h2 className="text-xl font-bold mb-2">{course.title}</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-bold">{course.rating}</span>
            </div>
            <span className="text-purple-100">({course.totalReviews} đánh giá)</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <h3 className="font-bold text-gray-900 mb-4">Thống kê đánh giá</h3>
          <div className="space-y-3">
            {ratingStats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm font-medium text-gray-700">{stat.stars}</span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.percent}%` }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-purple-600 to-purple-500"
                  />
                </div>
                <span className="text-sm text-gray-600 w-16 text-right">
                  {stat.count} ({stat.percent}%)
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedFilter(filter.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedFilter === filter.value
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-3xl shadow-sm p-5"
            >
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={review.user.avatar}
                  alt={review.user.name}
                  className="w-10 h-10 rounded-full bg-gray-100"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-900">{review.user.name}</p>
                    <span className="text-gray-500 text-xs">{review.date}</span>
                  </div>
                  {renderStars(review.rating)}
                </div>
              </div>

              <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>

              <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{review.helpful}</span>
                </div>
                {!review.reply && (
                  <button
                    onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                    className="flex items-center gap-1 text-purple-600 text-sm font-medium hover:text-purple-700"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Phản hồi</span>
                  </button>
                )}
              </div>

              <AnimatePresence>
                {replyingTo === review.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-100"
                  >
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Nhập phản hồi của bạn..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="flex-1 h-10"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleReply(review.id);
                          }
                        }}
                      />
                      <Button
                        onClick={() => handleReply(review.id)}
                        className="h-10 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {review.reply && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 ml-8 p-4 bg-purple-50 rounded-2xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">GV</span>
                    </div>
                    <p className="font-semibold text-purple-900 text-sm">Giảng viên</p>
                    <span className="text-purple-600 text-xs">• {review.reply.date}</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{review.reply.text}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
