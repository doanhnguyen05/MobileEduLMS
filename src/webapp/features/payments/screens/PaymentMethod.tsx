import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { QrCode, CreditCard, ChevronRight, Building2 } from 'lucide-react';
import { TopBar } from '../../../components/TopBar';
import { Button } from '../../../components/ui/button';
import { getPurchaseItem } from '../data/paymentCatalog';

export function PaymentMethod() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = getPurchaseItem(id);
  const fallbackPath = id?.startsWith('plan-') ? '/subscription' : id ? `/course/${id}` : '/home';

  const paymentMethods = [
    {
      id: 'qr',
      icon: QrCode,
      title: 'Thanh toán QR',
      desc: 'Quét mã QR bằng ứng dụng ngân hàng',
      color: 'from-blue-600 to-cyan-500',
      action: () => navigate(`/payment/qr/${id}`)
    },
    {
      id: 'manual',
      icon: CreditCard,
      title: 'Thẻ tín dụng / Ghi nợ',
      desc: 'Nhập thông tin thẻ để thanh toán',
      color: 'from-purple-600 to-pink-500',
      action: () => navigate(`/payment/manual/${id}`)
    },
    {
      id: 'bank-transfer',
      icon: Building2,
      title: 'Chuyển khoản ngân hàng',
      desc: 'Chuyển khoản thủ công và upload chứng từ',
      color: 'from-green-600 to-emerald-500',
      action: () => navigate(`/payment/bank-transfer/${id}`)
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 pb-8">
        <TopBar showBack title="Phương thức thanh toán" fallbackPath="/home" />
        <div className="p-6">
          <div className="bg-white rounded-3xl shadow-sm p-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy đơn thanh toán</h2>
            <p className="text-gray-600 mb-6">Mục bạn chọn không còn khả dụng hoặc đã bị thay đổi.</p>
            <Button onClick={() => navigate('/home')} className="w-full h-12 rounded-2xl">
              Về trang chủ
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Phương thức thanh toán" fallbackPath={fallbackPath} />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-6 text-white mb-6"
        >
          <div className="flex items-start gap-4 mb-4">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-20 h-20 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <h2 className="font-bold mb-1">{item.title}</h2>
              <p className="text-blue-100 text-sm">{item.subtitle}</p>
            </div>
          </div>

          <div className="border-t border-white/20 pt-4 mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-100">{item.summaryLabel}</span>
              <span className="font-medium">{formatPrice(item.price)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-100">{item.secondaryLabel}</span>
              <span className="font-medium text-green-300">{item.secondaryValue}</span>
            </div>
            <div className="border-t border-white/20 pt-2 mt-2 flex justify-between items-center">
              <span className="font-bold text-lg">Tổng thanh toán</span>
              <span className="font-bold text-2xl">{formatPrice(item.price)}</span>
            </div>
          </div>
        </motion.div>

        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Chọn phương thức thanh toán</h3>
          <div className="space-y-3">
            {paymentMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.button
                  key={method.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={method.action}
                  className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-all"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-gray-900 mb-0.5">{method.title}</h4>
                    <p className="text-gray-600 text-sm">{method.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </motion.button>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-100"
        >
          <p className="text-gray-700 text-sm leading-relaxed">
            <strong className="text-blue-600">Lưu ý:</strong> {item.notice}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
