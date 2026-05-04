import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, Download, Home, PlayCircle } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { getPurchaseItem } from '../data/paymentCatalog';

export function PaymentSuccess() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = getPurchaseItem(id);

  useEffect(() => {
    const timer = setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.innerHTML = '🎉';
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const transactionId = `EDU${Date.now()}`;
  const transactionDate = new Date().toLocaleString('vi-VN');

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pb-8 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy kết quả thanh toán</h2>
          <p className="text-gray-600 mb-6">Đơn thanh toán này không còn khả dụng để hiển thị chi tiết.</p>
          <Button onClick={() => navigate('/home')} className="w-full h-12 rounded-2xl">
            Về trang chủ
          </Button>
        </div>
      </div>
    );
  }

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
          {item.successTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-center mb-8"
        >
          {item.successDescription}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-6"
        >
          <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-20 h-20 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.subtitle}</p>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Mã giao dịch</span>
              <span className="font-mono font-semibold text-gray-900">{transactionId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Thời gian</span>
              <span className="font-medium text-gray-900">{transactionDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Số tiền</span>
              <span className="font-bold text-green-600">{formatPrice(item.price)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Trạng thái</span>
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                Thành công
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
          <h4 className="font-bold text-gray-900 mb-3">Bước tiếp theo</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            {item.successSteps.map((step) => (
              <li key={step} className="flex gap-2">
                <span className="text-blue-600">✓</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <Button
            onClick={() => navigate(item.primaryActionPath)}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
          >
            <PlayCircle className="w-5 h-5" />
            {item.primaryActionLabel}
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => navigate('/home')}
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
              Tải hóa đơn
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
