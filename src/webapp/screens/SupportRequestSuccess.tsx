import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle, Home, MessageCircle, Clock, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';

export function SupportRequestSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const ticketData = location.state || {
    ticketId: 'SUP-12345678',
    category: 'Vấn đề kỹ thuật',
    subject: 'Không thể truy cập khóa học'
  };

  useEffect(() => {
    const duration = 2000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      if (typeof (window as any).confetti !== 'undefined') {
        (window as any).confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#3B82F6', '#60A5FA', '#93C5FD']
        });
        (window as any).confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#3B82F6', '#60A5FA', '#93C5FD']
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-6">
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
          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Yêu cầu đã được gửi! 🎉
          </h1>
          <p className="text-gray-600">
            Cảm ơn bạn đã liên hệ với chúng tôi
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-gray-900">Thông tin yêu cầu</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
              <p className="text-sm text-blue-600 mb-1 font-medium">Mã yêu cầu</p>
              <p className="font-mono font-bold text-gray-900 text-lg">{ticketData.ticketId}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl">
              <p className="text-sm text-gray-600 mb-1">Danh mục</p>
              <p className="font-semibold text-gray-900">{ticketData.category}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl">
              <p className="text-sm text-gray-600 mb-1">Tiêu đề</p>
              <p className="font-semibold text-gray-900">{ticketData.subject}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border-2 border-blue-200 mb-6"
        >
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Thời gian phản hồi</p>
                <p className="text-sm text-gray-700">Đội ngũ hỗ trợ sẽ phản hồi trong vòng 24 giờ làm việc</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Thông báo</p>
                <p className="text-sm text-gray-700">Bạn sẽ nhận email khi có phản hồi mới</p>
              </div>
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
            onClick={() => navigate('/help')}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Quay lại trung tâm hỗ trợ
          </Button>

          <Button
            onClick={() => navigate('/home')}
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
          <p className="text-xs text-gray-400">
            Thời gian gửi: {new Date().toLocaleString('vi-VN')}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
