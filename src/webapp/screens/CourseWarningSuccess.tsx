import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { AlertTriangle, CheckCircle, BookOpen, User, MessageSquare, ArrowRight, Home } from 'lucide-react';
import { Button } from '../components/ui/button';

export function CourseWarningSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  // Dữ liệu từ trang gửi cảnh báo
  const warningData = location.state || {
    courseTitle: 'React Native Cơ Bản',
    instructorName: 'Nguyễn Thị Mai',
    instructorEmail: 'nguyenthimai@email.com',
    reason: 'Nội dung khóa học có phần không phù hợp với chính sách',
    courseId: '1'
  };

  useEffect(() => {
    // Warning shake effect với màu vàng
    const duration = 2000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      // Tạo confetti màu vàng/cam
      if (typeof (window as any).confetti !== 'undefined') {
        (window as any).confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FCD34D', '#FBBF24', '#F59E0B']
        });
        (window as any).confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FCD34D', '#FBBF24', '#F59E0B']
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1
          }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50"
            >
              <AlertTriangle className="w-14 h-14 text-white" />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-4 border-white"
            >
              <CheckCircle className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Cảnh báo đã được gửi! ⚠️
          </h1>
          <p className="text-gray-600">
            Giảng viên sẽ nhận được thông báo qua email và trong hệ thống.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-6"
        >
          <h2 className="font-bold text-gray-900 mb-4 text-center">Chi tiết cảnh báo</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Khóa học</p>
                <p className="font-semibold text-gray-900">{warningData.courseTitle}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Giảng viên</p>
                <p className="font-semibold text-gray-900">{warningData.instructorName}</p>
                <p className="text-sm text-gray-500 mt-0.5">{warningData.instructorEmail}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-2xl border border-orange-200">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-orange-600 mb-1 font-medium">Lý do cảnh báo</p>
                <p className="text-gray-900 leading-relaxed">{warningData.reason}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-yellow-50 rounded-2xl p-4 border-2 border-yellow-200 mb-6"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 mb-1">Hành động tiếp theo</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Email cảnh báo đã được gửi đến giảng viên</li>
                <li>• Giảng viên có 7 ngày để chỉnh sửa nội dung</li>
                <li>• Nếu không tuân thủ, khóa học sẽ bị tạm khóa</li>
                <li>• Bạn sẽ nhận được thông báo khi giảng viên phản hồi</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <Button
            onClick={() => navigate(`/admin/content/${warningData.courseId}`)}
            className="w-full h-14 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-2xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Xem chi tiết khóa học
          </Button>

          <Button
            onClick={() => navigate('/admin/content')}
            variant="outline"
            className="w-full h-12 rounded-2xl flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            Về quản lý nội dung
          </Button>

          <Button
            onClick={() => navigate('/admin/dashboard')}
            variant="outline"
            className="w-full h-12 rounded-2xl flex items-center justify-center gap-2 text-gray-600"
          >
            <Home className="w-5 h-5" />
            Về trang chủ
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-500">
            Mã cảnh báo: <span className="font-mono font-medium text-gray-700">WRN-{Date.now().toString().slice(-8)}</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Thời gian: {new Date().toLocaleString('vi-VN')}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
