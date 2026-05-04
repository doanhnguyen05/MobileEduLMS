import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Building2, Upload, CheckCircle, AlertCircle, Camera } from 'lucide-react';
import { TopBar } from '../../../components/TopBar';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { getPurchaseItem } from '../data/paymentCatalog';

export function PaymentBankTransfer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = getPurchaseItem(id);
  const [paymentReference] = useState(() => {
    const prefix = id?.startsWith('plan-') ? 'SUB' : 'COURSE';
    return `${prefix}-${id ?? 'UNKNOWN'}-${Date.now().toString().slice(-6)}`;
  });

  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    accountName: '',
    transferAmount: '',
    transferDate: '',
    transferTime: '',
    reference: '',
    note: ''
  });

  const [proofImage, setProofImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const bankList = [
    'Vietcombank - Ngân hàng TMCP Ngoại thương Việt Nam',
    'VietinBank - Ngân hàng TMCP Công thương Việt Nam',
    'BIDV - Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
    'ACB - Ngân hàng TMCP Á Châu',
    'Techcombank - Ngân hàng TMCP Kỹ thương Việt Nam',
    'MBBank - Ngân hàng TMCP Quân đội',
    'VPBank - Ngân hàng TMCP Việt Nam Thịnh Vượng',
    'Agribank - Ngân hàng Nông nghiệp và Phát triển Nông thôn',
    'SacomBank - Ngân hàng TMCP Sài Gòn Thương Tín',
    'TPBank - Ngân hàng TMCP Tiên Phong',
    'Ngân hàng khác'
  ];

  const receiverInfo = {
    bankName: 'Ngân hàng TMCP Á Châu (ACB)',
    accountNumber: '123456789',
    accountName: 'CONG TY EDUMOBILE',
    branch: 'Chi nhánh Hồ Chí Minh',
    content: paymentReference,
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.bankName) {
      newErrors.bankName = 'Vui lòng chọn ngân hàng';
    }

    if (!formData.accountNumber || formData.accountNumber.length < 6) {
      newErrors.accountNumber = 'Số tài khoản không hợp lệ';
    }

    if (!formData.accountName || formData.accountName.length < 3) {
      newErrors.accountName = 'Tên tài khoản không hợp lệ';
    }

    if (!formData.transferAmount) {
      newErrors.transferAmount = 'Vui lòng nhập số tiền';
    } else if (parseInt(formData.transferAmount.replace(/\D/g, '')) !== item?.price) {
      newErrors.transferAmount = `Số tiền phải là ${formatPrice(item?.price ?? 0)}`;
    }

    if (!formData.transferDate) {
      newErrors.transferDate = 'Vui lòng chọn ngày chuyển khoản';
    }

    if (!formData.transferTime) {
      newErrors.transferTime = 'Vui lòng chọn giờ chuyển khoản';
    }

    if (!proofImage) {
      newErrors.proof = 'Vui lòng tải lên ảnh chứng từ';
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

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return new Intl.NumberFormat('vi-VN').format(parseInt(numbers || '0'));
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 pb-8">
        <TopBar showBack title="Chuyển khoản ngân hàng" fallbackPath="/home" />
        <div className="p-6">
          <div className="bg-white rounded-3xl shadow-sm p-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy đơn thanh toán</h2>
            <p className="text-gray-600 mb-6">Đơn hàng hoặc gói đăng ký này hiện không còn khả dụng.</p>
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
      <TopBar showBack title="Chuyển khoản ngân hàng" fallbackPath={id ? `/payment/method/${id}` : '/home'} />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-6 text-white mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-8 h-8" />
            <div>
              <h3 className="font-bold text-lg">Thông tin người nhận</h3>
              <p className="text-blue-100 text-sm">Vui lòng chuyển khoản đến tài khoản sau</p>
            </div>
          </div>

          <div className="space-y-3 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex justify-between">
              <span className="text-blue-100">Ngân hàng:</span>
              <span className="font-semibold">{receiverInfo.bankName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-100">Số tài khoản:</span>
              <span className="font-mono font-bold text-lg">{receiverInfo.accountNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-100">Chủ tài khoản:</span>
              <span className="font-semibold">{receiverInfo.accountName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-100">Chi nhánh:</span>
              <span className="font-medium">{receiverInfo.branch}</span>
            </div>
            <div className="border-t border-white/20 pt-3 mt-3 flex justify-between items-center">
              <span className="text-blue-100">Số tiền:</span>
              <span className="font-bold text-2xl">{formatPrice(item.price)}</span>
            </div>
            <div className="border-t border-white/20 pt-3 mt-3">
              <span className="text-blue-100 text-sm">Nội dung chuyển khoản</span>
              <p className="font-semibold mt-1 break-all">{receiverInfo.content}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-3xl shadow-sm p-5"
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-sm p-6"
          >
            <h3 className="font-bold text-gray-900 mb-4">Thông tin người chuyển</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngân hàng <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.bankName}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                  className={`w-full h-12 px-4 border rounded-xl bg-white ${
                    errors.bankName ? 'border-red-500' : 'border-gray-200'
                  }`}
                >
                  <option value="">Chọn ngân hàng</option>
                  {bankList.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
                {errors.bankName && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.bankName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số tài khoản <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Nhập số tài khoản"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value.replace(/\D/g, ''))}
                  className={`h-12 ${errors.accountNumber ? 'border-red-500' : ''}`}
                />
                {errors.accountNumber && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.accountNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên chủ tài khoản <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="NGUYEN VAN A"
                  value={formData.accountName}
                  onChange={(e) => handleInputChange('accountName', e.target.value.toUpperCase())}
                  className={`h-12 ${errors.accountName ? 'border-red-500' : ''}`}
                />
                {errors.accountName && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.accountName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số tiền chuyển khoản <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="500,000"
                    value={formatCurrency(formData.transferAmount)}
                    onChange={(e) => handleInputChange('transferAmount', e.target.value)}
                    className={`h-12 pr-12 ${errors.transferAmount ? 'border-red-500' : ''}`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">đ</span>
                </div>
                {errors.transferAmount && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.transferAmount}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày chuyển <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={formData.transferDate}
                    onChange={(e) => handleInputChange('transferDate', e.target.value)}
                    className={`h-12 ${errors.transferDate ? 'border-red-500' : ''}`}
                  />
                  {errors.transferDate && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.transferDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giờ chuyển <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="time"
                    value={formData.transferTime}
                    onChange={(e) => handleInputChange('transferTime', e.target.value)}
                    className={`h-12 ${errors.transferTime ? 'border-red-500' : ''}`}
                  />
                  {errors.transferTime && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.transferTime}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mã giao dịch (nếu có)
                </label>
                <Input
                  type="text"
                  placeholder="Nhập mã giao dịch"
                  value={formData.reference}
                  onChange={(e) => handleInputChange('reference', e.target.value)}
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú
                </label>
                <textarea
                  placeholder="Thêm ghi chú nếu cần..."
                  value={formData.note}
                  onChange={(e) => handleInputChange('note', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none"
                  rows={3}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-sm p-6"
          >
            <h3 className="font-bold text-gray-900 mb-2">
              Ảnh chứng từ chuyển khoản <span className="text-red-500">*</span>
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Tải lên ảnh chụp màn hình hoặc biên lai chuyển khoản
            </p>

            {proofImage ? (
              <div className="relative">
                <img
                  src={proofImage}
                  alt="Proof"
                  className="w-full h-64 object-cover rounded-2xl border-2 border-green-500"
                />
                <div className="absolute top-3 right-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <button
                  type="button"
                  onClick={() => setProofImage(null)}
                  className="absolute bottom-3 right-3 px-4 py-2 bg-white rounded-xl shadow-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Chọn ảnh khác
                </button>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
                  errors.proof ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                }`}>
                  <Camera className={`w-16 h-16 mx-auto mb-3 ${errors.proof ? 'text-red-500' : 'text-gray-400'}`} />
                  <p className="font-medium text-gray-900 mb-1">Tải lên ảnh chứng từ</p>
                  <p className="text-gray-500 text-sm mb-3">PNG, JPG (tối đa 5MB)</p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium">
                    <Upload className="w-4 h-4" />
                    Chọn ảnh
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}

            {errors.proof && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.proof}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-yellow-50 rounded-2xl p-4 border-2 border-yellow-200 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 mb-1">Lưu ý quan trọng</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Đơn hàng sẽ được xác nhận trong vòng 2-24 giờ</li>
                <li>• Vui lòng chuyển đúng số tiền và nội dung chuyển khoản</li>
                <li>• Lưu lại biên lai để đối chiếu khi cần</li>
              </ul>
              <p className="text-sm text-gray-700 mt-3">{item.notice}</p>
            </div>
          </motion.div>

          <Button
            type="submit"
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30"
          >
            Gửi thông tin xác nhận
          </Button>
        </form>
      </div>
    </div>
  );
}
