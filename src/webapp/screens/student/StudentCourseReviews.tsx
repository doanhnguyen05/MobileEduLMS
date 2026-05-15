import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, ThumbsUp, Filter, Edit } from 'lucide-react';
import { TopBar } from '../../components/TopBar';
import { Button } from '../../components/ui/button';

export function StudentCourseReviews() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all');

  // Giả sử học viên đã hoàn thành khóa học này
  const hasCompleted = true;
  const hasReviewed = false; // Thay đổi thành true nếu đã đánh giá

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
      isHelpful: false,
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
      isHelpful: false,
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
      isHelpful: false,
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
      isHelpful: false,
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
      isHelpful: true,
      reply: {
        text: 'Rất vui khi khóa học giúp ích được cho bạn! Chúc bạn thành công!',
        date: '09/04/2026'
      }
    },
    {
      id: 6,
      user: {
        name: 'Vũ Thị F',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student6'
      },
      rating: 4,
      date: '05/04/2026',
      comment: 'Khóa học tốt, giảng viên nhiệt tình. Tuy nhiên cần cập nhật một số phần theo phiên bản mới.',
      helpful: 34,
      isHelpful: false,
      reply: {
        text: 'Cảm ơn bạn! Mình sẽ cập nhật nội dung sớm nhất có thể.',
        date: '06/04/2026'
      }
    },
    {
      id: 7,
      user: {
        name: 'Đặng Văn G',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student7'
      },
      rating: 5,
      date: '02/04/2026',
      comment: 'Quá tuyệt vời! Từ zero đến hero. Giờ mình đã tự tin làm app rồi.',
      helpful: 102,
      isHelpful: false,
      reply: null
    },
    {
      id: 8,
      user: {
        name: 'Bùi Thị H',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student8'
      },
      rating: 4,
      date: '28/03/2026',
      comment: 'Nội dung chất lượng, giá hợp lý. Recommend cho người mới bắt đầu.',
      helpful: 56,
      isHelpful: true,
      reply: {
        text: 'Cảm ơn bạn đã tin tưởng và ủng hộ khóa học!',
        date: '29/03/2026'
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

  const handleHelpful = (reviewId: number) => {
    console.log('Mark review as helpful:', reviewId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Đánh giá khóa học" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-6 mb-6 text-white"
        >
          <h2 className="text-xl font-bold mb-2">{course.title}</h2>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-bold">{course.rating}</span>
            </div>
            <span className="text-blue-100">({course.totalReviews} đánh giá)</span>
          </div>

          {hasCompleted && !hasReviewed && (
            <Button
              onClick={() => navigate(`/course/${id}/rate`)}
              className="w-full h-12 bg-white text-blue-600 rounded-2xl flex items-center justify-center gap-2 font-medium hover:bg-blue-50 transition-colors"
            >
              <Edit className="w-5 h-5" />
              Viết đánh giá của bạn
            </Button>
          )}

          {hasReviewed && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <p className="text-sm text-blue-100 mb-2">Bạn đã đánh giá khóa học này</p>
              <button
                onClick={() => navigate(`/course/${id}/rate`)}
                className="text-white text-sm font-medium underline hover:text-blue-100"
              >
                Chỉnh sửa đánh giá
              </button>
            </div>
          )}
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
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-500"
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
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
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
                <button
                  onClick={() => handleHelpful(review.id)}
                  className={`flex items-center gap-1 text-sm transition-colors ${
                    review.isHelpful
                      ? 'text-blue-600 font-medium'
                      : 'text-gray-500 hover:text-blue-600'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${review.isHelpful ? 'fill-blue-600' : ''}`} />
                  <span>{review.helpful}</span>
                  <span className="ml-1">{review.isHelpful ? 'Đã hữu ích' : 'Hữu ích'}</span>
                </button>
              </div>

              {review.reply && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 ml-8 p-4 bg-blue-50 rounded-2xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">GV</span>
                    </div>
                    <p className="font-semibold text-blue-900 text-sm">Giảng viên</p>
                    <span className="text-blue-600 text-xs">• {review.reply.date}</span>
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
