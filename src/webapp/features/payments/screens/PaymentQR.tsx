import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Copy, Check, Clock, AlertCircle } from 'lucide-react';
import { TopBar } from '../../../components/TopBar';
import { Button } from '../../../components/ui/button';
import { getPurchaseItem } from '../data/paymentCatalog';
import techcombankQrImage from '../../../assets/payments/techcombank-qr-nguyen-viet-doanh.jpeg';

export function PaymentQR() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = getPurchaseItem(id);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900);
  const [paymentReference] = useState(() => {
    const prefix = id?.startsWith('plan-') ? 'SUB' : 'COURSE';
    return `${prefix} ${id ?? 'UNKNOWN'} ${Date.now().toString().slice(-6)}`;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const bankInfo = {
    bankName: 'Ngân hàng TMCP Kỹ thương Việt Nam (Techcombank)',
    accountNumber: '9625 5066 88',
    accountName: 'NGUYEN VIET DOANH',
    amount: item?.price ?? 0,
    content: paymentReference,
  };

  const copyText = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  const handleCopy = async (text: string) => {
    try {
      await copyText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
      window.prompt('Sao chép thủ công nội dung bên dưới:', text);
    }
  };

  const handleSimulatePayment = () => {
    navigate(`/payment/success/${id}`);
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 pb-8">
        <TopBar showBack title="Thanh toán QR" fallbackPath="/home" />
        <div className="p-6">
          <div className="bg-white rounded-3xl shadow-sm p-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy nội dung thanh toán</h2>
            <p className="text-gray-600 mb-6">Mã thanh toán hiện không hợp lệ hoặc đã bị thay đổi.</p>
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
      <TopBar showBack title="Thanh toán QR" fallbackPath={id ? `/payment/method/${id}` : '/home'} />

      <div className="p-6">
        {timeLeft > 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-4 mb-6 flex items-center gap-3"
          >
            <Clock className="w-6 h-6 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold mb-0.5">Mã QR hết hạn sau</p>
              <p className="text-2xl font-bold">{formatTime(timeLeft)}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-100 text-red-700 rounded-2xl p-4 mb-6 flex items-center gap-3"
          >
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold">Mã QR đã hết hạn</p>
              <p className="text-sm">Vui lòng tạo mã mới để tiếp tục</p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm p-5 mb-6"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-20 h-20 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.subtitle}</p>
              <p className="text-blue-600 font-semibold mt-2">{formatPrice(item.price)}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <h3 className="font-bold text-gray-900 text-center mb-4">Quét mã QR để thanh toán</h3>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-6 mb-6">
            <div className="mx-auto max-w-72 overflow-hidden rounded-2xl bg-white shadow-lg">
              <img
                src={techcombankQrImage}
                alt={`Mã QR chuyển khoản Techcombank cho ${bankInfo.accountName}`}
                className="h-auto w-full object-contain"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <span className="text-gray-600 text-sm">Số tiền</span>
              <span className="font-bold text-blue-600">{formatPrice(bankInfo.amount)}</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-600 text-sm">Ngân hàng</span>
                <button
                  onClick={() => handleCopy(bankInfo.bankName)}
                  className="text-blue-600 text-sm font-medium flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  Sao chép
                </button>
              </div>
              <p className="font-medium text-gray-900">{bankInfo.bankName}</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-600 text-sm">Số tài khoản</span>
                <button
                  onClick={() => handleCopy(bankInfo.accountNumber)}
                  className="text-blue-600 text-sm font-medium flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  Sao chép
                </button>
              </div>
              <p className="font-medium text-gray-900 text-lg">{bankInfo.accountNumber}</p>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-600 text-sm">Chủ tài khoản</span>
                <button
                  onClick={() => handleCopy(bankInfo.accountName)}
                  className="text-blue-600 text-sm font-medium flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  Sao chép
                </button>
              </div>
              <p className="font-medium text-gray-900">{bankInfo.accountName}</p>
            </div>

            <div className="p-3 bg-blue-50 rounded-xl border-2 border-blue-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-700 text-sm font-medium">Nội dung chuyển khoản</span>
                <button
                  onClick={() => handleCopy(bankInfo.content)}
                  className="text-blue-600 text-sm font-medium flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  Sao chép
                </button>
              </div>
              <p className="font-bold text-gray-900">{bankInfo.content}</p>
              <p className="text-xs text-red-600 mt-2">* Vui lòng nhập chính xác nội dung</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border-2 border-green-200 mb-6"
        >
          <h4 className="font-bold text-gray-900 mb-2">Hướng dẫn thanh toán</h4>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">1.</span>
              <span>Mở ứng dụng ngân hàng và chọn chức năng quét QR</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">2.</span>
              <span>Quét mã QR trên màn hình</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">3.</span>
              <span>Kiểm tra thông tin và xác nhận thanh toán</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-blue-600">4.</span>
              <span>Hệ thống sẽ tự động xác nhận sau khi nhận được tiền</span>
            </li>
          </ol>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-100 mb-6"
        >
          <p className="text-gray-700 text-sm leading-relaxed">
            <strong className="text-blue-600">Sau khi thanh toán:</strong> {item.notice}
          </p>
        </motion.div>

        <Button
          onClick={handleSimulatePayment}
          className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-2xl shadow-lg shadow-green-500/30"
        >
          Mô phỏng thanh toán thành công
        </Button>
      </div>
    </div>
  );
}
