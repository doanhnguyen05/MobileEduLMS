import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Save, X, AlertCircle, Building2, Trash2 } from 'lucide-react';
import { TopBar } from '../../components/TopBar';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

export function EditBankAccount() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - trong thực tế sẽ fetch từ API dựa trên id
  const [formData, setFormData] = useState({
    bankName: 'Ngân hàng TMCP Á Châu (ACB)',
    accountNumber: '123456789',
    accountName: 'NGUYEN THI MAI',
    branch: 'Chi nhánh Hồ Chí Minh',
    isDefault: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const bankList = [
    { code: 'VCB', name: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)' },
    { code: 'TCB', name: 'Ngân hàng TMCP Kỹ thương Việt Nam (Techcombank)' },
    { code: 'BIDV', name: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV)' },
    { code: 'VTB', name: 'Ngân hàng TMCP Công thương Việt Nam (VietinBank)' },
    { code: 'ACB', name: 'Ngân hàng TMCP Á Châu (ACB)' },
    { code: 'MBB', name: 'Ngân hàng TMCP Quân đội (MBBank)' },
    { code: 'VPB', name: 'Ngân hàng TMCP Việt Nam Thịnh Vượng (VPBank)' },
    { code: 'TPB', name: 'Ngân hàng TMCP Tiên Phong (TPBank)' },
    { code: 'STB', name: 'Ngân hàng TMCP Sài Gòn Thương Tín (Sacombank)' },
    { code: 'HDB', name: 'Ngân hàng TMCP Phát triển TP.HCM (HDBank)' },
    { code: 'SHB', name: 'Ngân hàng TMCP Sài Gòn - Hà Nội (SHB)' },
    { code: 'EIB', name: 'Ngân hàng TMCP Xuất Nhập khẩu Việt Nam (Eximbank)' },
    { code: 'MSB', name: 'Ngân hàng TMCP Hàng Hải Việt Nam (MSB)' },
    { code: 'OCB', name: 'Ngân hàng TMCP Phương Đông (OCB)' },
    { code: 'AGR', name: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn (Agribank)' },
    { code: 'NAB', name: 'Ngân hàng TMCP Nam Á (Nam A Bank)' },
    { code: 'VAB', name: 'Ngân hàng TMCP Việt Á (VietABank)' },
    { code: 'SCB', name: 'Ngân hàng TMCP Sài Gòn (SCB)' },
    { code: 'SEA', name: 'Ngân hàng TMCP Đông Nam Á (SeABank)' },
    { code: 'OTHER', name: 'Ngân hàng khác' }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.bankName) {
      newErrors.bankName = 'Vui lòng chọn ngân hàng';
    }

    if (!formData.accountNumber) {
      newErrors.accountNumber = 'Vui lòng nhập số tài khoản';
    } else if (formData.accountNumber.length < 6 || formData.accountNumber.length > 20) {
      newErrors.accountNumber = 'Số tài khoản phải từ 6-20 ký tự';
    } else if (!/^\d+$/.test(formData.accountNumber)) {
      newErrors.accountNumber = 'Số tài khoản chỉ được chứa số';
    }

    if (!formData.accountName) {
      newErrors.accountName = 'Vui lòng nhập tên chủ tài khoản';
    } else if (formData.accountName.length < 3) {
      newErrors.accountName = 'Tên chủ tài khoản quá ngắn';
    } else if (!/^[A-Z\s]+$/.test(formData.accountName)) {
      newErrors.accountName = 'Tên chủ tài khoản phải viết HOA, không dấu';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Updating bank account:', formData);
      navigate('/teacher/bank-accounts');
    }
  };

  const handleDelete = () => {
    if (formData.isDefault) {
      alert('Không thể xóa tài khoản mặc định. Vui lòng đặt tài khoản khác làm mặc định trước.');
      return;
    }

    if (confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
      console.log('Deleting bank account:', id);
      navigate('/teacher/bank-accounts');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Chỉnh sửa tài khoản" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-purple-600 to-purple-500 rounded-3xl p-6 mb-6 text-white"
        >
          <div className="flex items-center gap-3 mb-3">
            <Building2 className="w-8 h-8" />
            <div>
              <h3 className="font-bold text-lg">Chỉnh sửa tài khoản</h3>
              {formData.isDefault && (
                <p className="text-purple-100 text-sm flex items-center gap-1">
                  ⭐ Tài khoản mặc định
                </p>
              )}
            </div>
          </div>
          <p className="text-purple-100 text-sm leading-relaxed">
            Cập nhật thông tin tài khoản ngân hàng. Vui lòng kiểm tra kỹ trước khi lưu.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-sm p-6"
          >
            <h3 className="font-bold text-gray-900 mb-4">Thông tin ngân hàng</h3>

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
                  <option value="">-- Chọn ngân hàng --</option>
                  {bankList.map((bank) => (
                    <option key={bank.code} value={bank.name}>
                      {bank.name}
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
                  maxLength={20}
                />
                {errors.accountNumber && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.accountNumber}
                  </p>
                )}
                <p className="text-gray-500 text-xs mt-1">
                  Chỉ nhập số, từ 6-20 ký tự
                </p>
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
                <p className="text-gray-500 text-xs mt-1">
                  Viết HOA, không dấu, đúng như trên thẻ ngân hàng
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chi nhánh (tùy chọn)
                </label>
                <Input
                  type="text"
                  placeholder="Ví dụ: Chi nhánh Hồ Chí Minh"
                  value={formData.branch}
                  onChange={(e) => handleInputChange('branch', e.target.value)}
                  className="h-12"
                />
              </div>

              {!formData.isDefault && (
                <div className="pt-4 border-t border-gray-200">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={false}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleInputChange('isDefault', true);
                        }
                      }}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Đặt làm tài khoản mặc định</p>
                      <p className="text-gray-600 text-sm">Tài khoản này sẽ được dùng để nhận tiền</p>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-yellow-50 rounded-2xl p-4 border-2 border-yellow-200"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Lưu ý quan trọng</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Thay đổi thông tin tài khoản có thể ảnh hưởng đến việc nhận tiền</li>
                  <li>• Kiểm tra kỹ số tài khoản và tên chủ tài khoản</li>
                  <li>• Thông tin sai có thể dẫn đến chậm trễ hoặc không nhận được tiền</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => navigate('/teacher/bank-accounts')}
                variant="outline"
                className="flex-1 h-14 rounded-2xl flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Hủy bỏ
              </Button>
              <Button
                type="submit"
                className="flex-1 h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Lưu thay đổi
              </Button>
            </div>

            {!formData.isDefault && (
              <Button
                type="button"
                onClick={handleDelete}
                variant="outline"
                className="w-full h-12 border-2 border-red-200 text-red-600 rounded-2xl hover:bg-red-50 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Xóa tài khoản
              </Button>
            )}
          </motion.div>
        </form>
      </div>
    </div>
  );
}
