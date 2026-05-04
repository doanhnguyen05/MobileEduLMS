import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  BookOpen,
  Users,
  Star,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle,
  XCircle,
  PlayCircle,
  FileText
} from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { Button } from '../components/ui/button';

export function AdminCourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const course = {
    id: id,
    title: 'React Native Cơ Bản',
    instructor: {
      name: 'Nguyễn Thị Mai',
      email: 'nguyenthimai@email.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1'
    },
    status: 'approved',
    submitDate: '10/03/2026',
    approvedDate: '12/03/2026',
    description: 'Khóa học React Native từ cơ bản đến nâng cao, giúp bạn xây dựng ứng dụng mobile đa nền tảng.',
    price: 1490000,
    students: 1250,
    rating: 4.8,
    totalReviews: 342,
    totalLessons: 24,
    totalDuration: 18.5,
    category: 'Mobile Development',
    level: 'Cơ bản',
    language: 'Tiếng Việt',
    requirements: [
      'Kiến thức JavaScript cơ bản',
      'Hiểu biết về React',
      'Máy tính có cài Node.js'
    ],
    outcomes: [
      'Xây dựng ứng dụng React Native',
      'Làm việc với API và State Management',
      'Xuất bản ứng dụng lên App Store và Play Store'
    ]
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
      comment: 'Khóa học rất chi tiết và dễ hiểu. Giảng viên nhiệt tình, hỗ trợ tốt!',
      helpful: 45,
      reported: false
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
      reported: false
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
      reported: false
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
      reported: true
    }
  ];

  const [selectedTab, setSelectedTab] = useState<'info' | 'reviews'>('info');

  const handleApprove = () => {
    if (confirm(`Phê duyệt khóa học "${course.title}"?`)) {
      console.log('Approving course:', id);
      navigate('/admin/content');
    }
  };

  const handleReject = () => {
    const reason = prompt(`Nhập lý do từ chối khóa học "${course.title}":`);
    if (reason) {
      console.log('Rejecting course:', id, 'Reason:', reason);
      navigate('/admin/content');
    }
  };

  const handleWarn = () => {
    const warning = prompt(`Nhập cảnh báo cho khóa học "${course.title}":`);
    if (warning) {
      console.log('Warning course:', id, 'Warning:', warning);
      navigate('/admin/content/warning-success', {
        state: {
          courseTitle: course.title,
          instructorName: course.instructor.name,
          instructorEmail: course.instructor.email,
          reason: warning,
          courseId: id
        }
      });
    }
  };

  const handleDeleteReview = (reviewId: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
      console.log('Deleting review:', reviewId);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Chi tiết khóa học" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-6 mb-6 text-white"
        >
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-6 h-6" />
            <h2 className="text-xl font-bold">{course.title}</h2>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-10 h-10 rounded-full bg-white"
            />
            <div>
              <p className="font-medium">{course.instructor.name}</p>
              <p className="text-blue-100 text-sm">{course.instructor.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
              <Users className="w-5 h-5 mx-auto mb-1" />
              <p className="text-lg font-bold">{course.students}</p>
              <p className="text-blue-100 text-xs">Học viên</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
              <Star className="w-5 h-5 mx-auto mb-1" />
              <p className="text-lg font-bold">{course.rating}</p>
              <p className="text-blue-100 text-xs">Đánh giá</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
              <PlayCircle className="w-5 h-5 mx-auto mb-1" />
              <p className="text-lg font-bold">{course.totalLessons}</p>
              <p className="text-blue-100 text-xs">Bài học</p>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setSelectedTab('info')}
            className={`flex-1 h-12 rounded-2xl font-medium transition-all ${
              selectedTab === 'info'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-white text-gray-600'
            }`}
          >
            Thông tin
          </button>
          <button
            onClick={() => setSelectedTab('reviews')}
            className={`flex-1 h-12 rounded-2xl font-medium transition-all ${
              selectedTab === 'reviews'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-white text-gray-600'
            }`}
          >
            Đánh giá ({course.totalReviews})
          </button>
        </div>

        {selectedTab === 'info' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Trạng thái duyệt</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Trạng thái</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course.status === 'approved'
                        ? 'bg-green-100 text-green-600'
                        : course.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {course.status === 'approved'
                      ? 'Đã duyệt'
                      : course.status === 'pending'
                      ? 'Chờ duyệt'
                      : 'Từ chối'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Ngày gửi</span>
                  <span className="font-medium text-gray-900">{course.submitDate}</span>
                </div>
                {course.status === 'approved' && (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-600">Ngày duyệt</span>
                    <span className="font-medium text-gray-900">{course.approvedDate}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Thông tin khóa học</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Mô tả</p>
                  <p className="text-gray-900">{course.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Giá</p>
                    <p className="font-bold text-blue-600">{course.price.toLocaleString()}đ</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Thời lượng</p>
                    <p className="font-medium text-gray-900">{course.totalDuration} giờ</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Danh mục</p>
                    <p className="font-medium text-gray-900">{course.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Cấp độ</p>
                    <p className="font-medium text-gray-900">{course.level}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Yêu cầu</h3>
              <ul className="space-y-2">
                {course.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Kết quả đầu ra</h3>
              <ul className="space-y-2">
                {course.outcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <Award className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {selectedTab === 'reviews' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-3xl shadow-sm p-5 ${
                  review.reported ? 'border-2 border-red-200' : ''
                }`}
              >
                {review.reported && (
                  <div className="flex items-center gap-2 mb-3 text-red-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">Đã bị báo cáo</span>
                  </div>
                )}

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

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <span>{review.helpful} người thấy hữu ích</span>
                  </div>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-red-600 text-sm font-medium hover:text-red-700"
                  >
                    Xóa đánh giá
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 space-y-3"
        >
          {course.status === 'pending' && (
            <>
              <Button
                onClick={handleApprove}
                className="w-full h-14 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-2xl shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Phê duyệt khóa học
              </Button>
              <Button
                onClick={handleReject}
                variant="outline"
                className="w-full h-12 border-2 border-red-200 text-red-600 rounded-2xl hover:bg-red-50 flex items-center justify-center gap-2"
              >
                <XCircle className="w-4 h-4" />
                Từ chối khóa học
              </Button>
            </>
          )}

          {course.status === 'approved' && (
            <Button
              onClick={handleWarn}
              variant="outline"
              className="w-full h-12 border-2 border-orange-200 text-orange-600 rounded-2xl hover:bg-orange-50 flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              Gửi cảnh báo vi phạm
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
