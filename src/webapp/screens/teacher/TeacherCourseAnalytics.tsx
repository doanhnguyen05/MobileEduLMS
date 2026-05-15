import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Users, Star, DollarSign, TrendingUp, Calendar, Eye, BookOpen, Award } from 'lucide-react';
import { TopBar } from '../../components/TopBar';

export function TeacherCourseAnalytics() {
  const { id } = useParams();

  const courseAnalytics = {
    title: 'React Native Cơ Bản',
    totalStudents: 1250,
    activeStudents: 890,
    completionRate: 68,
    avgRating: 4.8,
    totalReviews: 342,
    revenue: 45000000,
    totalViews: 15420,
    enrollmentTrend: [
      { month: 'T1', students: 180 },
      { month: 'T2', students: 220 },
      { month: 'T3', students: 290 },
      { month: 'T4', students: 350 },
      { month: 'T5', students: 420 },
      { month: 'T6', students: 480 }
    ],
    topLessons: [
      { title: 'Components cơ bản', views: 1250, completion: 92 },
      { title: 'State và Props', views: 1180, completion: 88 },
      { title: 'Navigation cơ bản', views: 1050, completion: 85 }
    ],
    recentReviews: [
      { name: 'Nguyễn Văn A', rating: 5, comment: 'Khóa học rất hay và dễ hiểu', date: '2 ngày trước' },
      { name: 'Trần Thị B', rating: 4, comment: 'Nội dung chi tiết, giảng viên nhiệt tình', date: '3 ngày trước' },
      { name: 'Lê Văn C', rating: 5, comment: 'Tuyệt vời! Đã học được nhiều điều mới', date: '5 ngày trước' }
    ]
  };

  const stats = [
    {
      icon: Users,
      label: 'Tổng học viên',
      value: courseAnalytics.totalStudents.toLocaleString(),
      change: '+12.5%',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: Star,
      label: 'Đánh giá TB',
      value: courseAnalytics.avgRating.toString(),
      change: '+0.2',
      color: 'from-yellow-500 to-orange-400'
    },
    {
      icon: DollarSign,
      label: 'Doanh thu',
      value: `${(courseAnalytics.revenue / 1000000).toFixed(0)}M`,
      change: '+18.3%',
      color: 'from-green-500 to-emerald-400'
    },
    {
      icon: Eye,
      label: 'Lượt xem',
      value: courseAnalytics.totalViews.toLocaleString(),
      change: '+8.7%',
      color: 'from-purple-500 to-pink-400'
    }
  ];

  const maxEnrollment = Math.max(...courseAnalytics.enrollmentTrend.map(d => d.students));

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Thống kê khóa học" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{courseAnalytics.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{courseAnalytics.activeStudents} đang học</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              <span>{courseAnalytics.completionRate}% hoàn thành</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm p-4"
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-600 text-xs mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <div className="flex items-center gap-1 text-green-600 text-xs">
                  <TrendingUp className="w-3 h-3" />
                  <span>{stat.change}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Xu hướng đăng ký</h3>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
              <Calendar className="w-4 h-4" />
              <span>6 tháng</span>
            </button>
          </div>

          <div className="flex items-end justify-between gap-2 h-48 mb-4">
            {courseAnalytics.enrollmentTrend.map((data, index) => (
              <motion.div
                key={data.month}
                initial={{ height: 0 }}
                animate={{ height: `${(data.students / maxEnrollment) * 100}%` }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-xl flex items-end justify-center pb-2">
                  <span className="text-white text-xs font-medium">{data.students}</span>
                </div>
                <span className="text-gray-600 text-sm">{data.month}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-900">Bài học phổ biến</h3>
          </div>

          <div className="space-y-3">
            {courseAnalytics.topLessons.map((lesson, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{lesson.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{lesson.views} lượt xem</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      <span>{lesson.completion}% hoàn thành</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-3xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h3 className="font-bold text-gray-900">Đánh giá gần đây</h3>
            </div>
            <span className="text-sm text-gray-600">{courseAnalytics.totalReviews} đánh giá</span>
          </div>

          <div className="space-y-4">
            {courseAnalytics.recentReviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{review.name}</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">{review.comment}</p>
                <p className="text-gray-400 text-xs">{review.date}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
