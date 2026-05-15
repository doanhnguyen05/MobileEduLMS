import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { AlertTriangle, CheckCircle, Home, ArrowRight, FileText } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { getDefaultPathForRole, useAuth } from '../../../features/auth';

export function ReportSuccessGeneral() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const reportData = location.state || {
    reportedItem: 'Khóa học React Native',
    reason: 'Nội dung không phù hợp',
    reportType: 'course',
    reportId: undefined
  };
  const reportDetailPath = reportData.reportId ? `/my-reports/${reportData.reportId}` : '/my-reports';
  const primaryActionLabel = reportData.reportId ? 'Xem chi tiết báo cáo' : 'Xem báo cáo của tôi';

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
            Báo cáo đã được gửi! 📋
          </h1>
          <p className="text-gray-600">
            Cảm ơn bạn đã giúp chúng tôi cải thiện cộng đồng
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-6"
        >
          <h2 className="font-bold text-gray-900 mb-4 text-center">Thông tin báo cáo</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Đối tượng báo cáo</p>
                <p className="font-semibold text-gray-900">{reportData.reportedItem}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-2xl border border-orange-200">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-orange-600 mb-1 font-medium">Lý do báo cáo</p>
                <p className="text-gray-900">{reportData.reason}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200 mb-6"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 mb-1">Hành động tiếp theo</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Đội ngũ kiểm duyệt sẽ xem xét trong 24-48 giờ</li>
                <li>• Bạn sẽ nhận thông báo khi có kết quả</li>
                <li>• Báo cáo sai có thể ảnh hưởng đến tài khoản của bạn</li>
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
            onClick={() => navigate(reportDetailPath)}
            className="w-full h-14 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-2xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            {primaryActionLabel}
          </Button>

          <Button
            onClick={() => navigate(getDefaultPathForRole(user?.role))}
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
            Mã báo cáo: <span className="font-mono font-medium text-gray-700">{reportData.reportId || 'Đang cập nhật'}</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Thời gian: {new Date().toLocaleString('vi-VN')}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
