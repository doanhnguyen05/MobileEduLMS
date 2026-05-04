import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CreditCard, Lock, AlertCircle } from 'lucide-react';
import { TopBar } from '../../../components/TopBar';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { getPurchaseItem } from '../data/paymentCatalog';
import { useAuth } from '../../auth';

export function PaymentManual() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const item = getPurchaseItem(id);

  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    email: user?.email || '',
    saveCard: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const formatted = numbers.match(/.{1,4}/g)?.join(' ') || '';
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
    }
    return numbers;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;

    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setFormData({ ...formData, [field]: formattedValue });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Số thẻ không hợp lệ';
    }

    if (!formData.cardName || formData.cardName.length < 3) {
      newErrors.cardName = 'Tên chủ thẻ không hợp lệ';
    }

    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Ngày hết hạn không hợp lệ';
    } else {
      const [month, year] = formData.expiryDate.split('/').map(Number);
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (month < 1 || month > 12) {
        newErrors.expiryDate = 'Tháng không hợp lệ';
      } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiryDate = 'Thẻ đã hết hạn';
      }
    }

    if (!formData.cvv || formData.cvv.length !== 3) {
      newErrors.cvv = 'CVV không hợp lệ';
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      navigate(`/payment/success/${id}`);
    }
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 pb-8">
        <TopBar showBack title="Thanh toán thẻ" fallbackPath="/home" />
        <div className="p-6">
          <div className="bg-white rounded-3xl shadow-sm p-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy đơn thanh toán</h2>
            <p className="text-gray-600 mb-6">Mục bạn muốn thanh toán hiện không tồn tại.</p>
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
      <TopBar showBack title="Thanh toán thẻ" fallbackPath={id ? `/payment/method/${id}` : '/home'} />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl p-6 text-white mb-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />

          <div className="relative z-10">
            <CreditCard className="w-10 h-10 mb-4" />
            <div className="mb-6">
              <p className="text-purple-100 text-sm mb-1">Số thẻ</p>
              <p className="text-2xl font-bold tracking-wider">
                {formData.cardNumber || '•••• •••• •••• ••••'}
              </p>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-purple-100 text-xs mb-1">Chủ thẻ</p>
                <p className="font-semibold">
                  {formData.cardName || 'TÊN CHỦ THẺ'}
                </p>
              </div>
              <div>
                <p className="text-purple-100 text-xs mb-1">Hết hạn</p>
                <p className="font-semibold">
                  {formData.expiryDate || 'MM/YY'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-sm p-6"
          >
            <h3 className="font-bold text-gray-900 mb-4">Thông tin thanh toán</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số thẻ
                </label>
                <Input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  className={`h-12 ${errors.cardNumber ? 'border-red-500' : ''}`}
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên chủ thẻ
                </label>
                <Input
                  type="text"
                  placeholder="NGUYEN VAN A"
                  value={formData.cardName}
                  onChange={(e) => handleInputChange('cardName', e.target.value.toUpperCase())}
                  className={`h-12 ${errors.cardName ? 'border-red-500' : ''}`}
                />
                {errors.cardName && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.cardName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày hết hạn
                  </label>
                  <Input
                    type="text"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    className={`h-12 ${errors.expiryDate ? 'border-red-500' : ''}`}
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.expiryDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <Input
                    type="text"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    className={`h-12 ${errors.cvv ? 'border-red-500' : ''}`}
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.cvv}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email nhận hóa đơn
                </label>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`h-12 ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.saveCard}
                  onChange={(e) => setFormData({ ...formData, saveCard: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">Lưu thẻ cho lần thanh toán sau</span>
              </label>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-sm p-6"
          >
            <h3 className="font-bold text-gray-900 mb-4">Chi tiết đơn hàng</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">{item.title}</span>
                <span className="font-medium">{formatPrice(item.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{item.secondaryLabel}</span>
                <span className="font-medium">{item.secondaryValue}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                <span className="font-bold text-lg">Tổng cộng</span>
                <span className="font-bold text-2xl text-blue-600">{formatPrice(item.price)}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-100 flex items-start gap-3"
          >
            <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 mb-1">Thanh toán an toàn</p>
              <p className="text-sm text-gray-600">
                {item.notice}
              </p>
            </div>
          </motion.div>

          <Button
            type="submit"
            className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-2xl shadow-lg shadow-purple-500/30"
          >
            Thanh toán {formatPrice(item.price)}
          </Button>
        </form>
      </div>
    </div>
  );
}
