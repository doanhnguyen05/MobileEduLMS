import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, Download, Home, DollarSign } from 'lucide-react';
import { Button } from '../../components/ui/button';

export function WithdrawSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const amount = searchParams.get('amount') || '10000000';

  useEffect(() => {
    const timer = setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.innerHTML = '💰';
      confetti.style.position = 'fixed';
      confetti.style.fontSize = '3rem';
      confetti.style.zIndex = '9999';
      document.body.appendChild(confetti);

      for (let i = 0; i < 20; i++) {
        const clone = confetti.cloneNode(true) as HTMLElement;
        clone.style.left = Math.random() * 100 + '%';
        clone.style.top = '-50px';
        clone.style.transition = 'all 2s ease-in-out';
        document.body.appendChild(clone);

        setTimeout(() => {
          clone.style.top = '100vh';
          clone.style.transform = `rotate(${Math.random() * 360}deg)`;
        }, 50);

        setTimeout(() => clone.remove(), 2100);
      }

      confetti.remove();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(price));
  };

  const transactionId = `WD${Date.now()}`;
  const transactionDate = new Date().toLocaleString('vi-VN');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pb-8 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/50"
        >
          <CheckCircle2 className="w-14 h-14 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-900 text-center mb-2"
        >
          Yêu cầu rút tiền thành công!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-center mb-8"
        >
          Tiền sẽ được chuyển vào tài khoản trong 1-3 ngày làm việc
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-6"
        >
          <div className="text-center mb-6 pb-6 border-b border-gray-100">
            <p className="text-gray-600 text-sm mb-2">Số tiền rút</p>
            <div className="flex items-center justify-center gap-2">
              <DollarSign className="w-8 h-8 text-green-600" />
              <p className="text-4xl font-bold text-green-600">{formatPrice(amount)}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Mã giao dịch</span>
              <span className="font-mono font-semibold text-gray-900">{transactionId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Thời gian</span>
              <span className="font-medium text-gray-900">{transactionDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Phương thức</span>
              <span className="font-medium text-gray-900">Chuyển khoản ngân hàng</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Trạng thái</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm font-medium">
                Đang xử lý
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border-2 border-blue-100"
        >
          <h4 className="font-bold text-gray-900 mb-3">Thông tin quan trọng</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Tiền sẽ được chuyển vào tài khoản ngân hàng đã đăng ký</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Kiểm tra email để xem chi tiết giao dịch</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600">•</span>
              <span>Liên hệ hỗ trợ nếu có thắc mắc</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <Button
            onClick={() => navigate('/teacher/revenue')}
            className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-2xl shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <DollarSign className="w-5 h-5" />
            Xem doanh thu
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => navigate('/teacher/dashboard')}
              variant="outline"
              className="h-12 rounded-2xl flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Về trang chủ
            </Button>

            <Button
              variant="outline"
              className="h-12 rounded-2xl flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Tải biên lai
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
