import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Save, X, AlertCircle, UserCog, Trash2, Eye, EyeOff } from 'lucide-react';
import { TopBar } from '../../components/TopBar';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

export function EditAdminUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    role: 'student',
    phone: '0123456789',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    status: 'active',
    resetPassword: false,
    newPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const roles = [
    { value: 'student', label: 'Học viên', description: 'Người học các khóa học' },
    { value: 'teacher', label: 'Giảng viên', description: 'Người tạo và quản lý khóa học' },
    { value: 'admin', label: 'Admin', description: 'Quản trị viên hệ thống' }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Họ tên quá ngắn';
    }

    if (!formData.role) {
      newErrors.role = 'Vui lòng chọn vai trò';
    }

    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại phải có 10 chữ số';
    }

    if (formData.resetPassword) {
      if (!formData.newPassword) {
        newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Updating user:', formData);
      navigate('/admin/users');
    }
  };

  const handleDelete = () => {
    if (confirm(`Bạn có chắc chắn muốn xóa người dùng "${formData.name}"?`)) {
      console.log('Deleting user:', id);
      navigate('/admin/users');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Chỉnh sửa người dùng" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-purple-600 to-purple-500 rounded-3xl p-6 mb-6 text-white"
        >
          <div className="flex items-center gap-3 mb-3">
            <UserCog className="w-8 h-8" />
            <div>
              <h3 className="font-bold text-lg">Cập nhật thông tin</h3>
              <p className="text-purple-100 text-sm">Chỉnh sửa tài khoản người dùng</p>
            </div>
          </div>
          <p className="text-purple-100 text-sm leading-relaxed">
            Vui lòng kiểm tra kỹ thông tin trước khi lưu. Email không thể thay đổi.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-sm p-6"
          >
            <h3 className="font-bold text-gray-900 mb-4">Thông tin cá nhân</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avatar (URL)
                </label>
                <div className="flex items-center gap-3">
                  {formData.avatar && (
                    <img
                      src={formData.avatar}
                      alt="Avatar preview"
                      className="w-16 h-16 rounded-full bg-gray-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <Input
                    type="text"
                    placeholder="https://example.com/avatar.jpg"
                    value={formData.avatar}
                    onChange={(e) => handleInputChange('avatar', e.target.value)}
                    className="h-12 flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`h-12 ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  disabled
                  className="h-12 bg-gray-100 cursor-not-allowed"
                />
                <p className="text-gray-500 text-xs mt-1">
                  Email không thể thay đổi
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <Input
                  type="text"
                  placeholder="0123456789"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, ''))}
                  className={`h-12 ${errors.phone ? 'border-red-500' : ''}`}
                  maxLength={10}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-sm p-6"
          >
            <h3 className="font-bold text-gray-900 mb-4">Vai trò và trạng thái</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vai trò <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className={`w-full h-12 px-4 border rounded-xl bg-white ${
                    errors.role ? 'border-red-500' : 'border-gray-200'
                  }`}
                >
                  {roles.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label} - {role.description}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.role}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái tài khoản
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-white"
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Ngưng hoạt động</option>
                  <option value="suspended">Đã tạm khóa</option>
                </select>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-sm p-6"
          >
            <h3 className="font-bold text-gray-900 mb-4">Đặt lại mật khẩu</h3>

            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.resetPassword}
                  onChange={(e) => handleInputChange('resetPassword', e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <div>
                  <p className="font-medium text-gray-900">Đặt lại mật khẩu</p>
                  <p className="text-gray-600 text-sm">Tạo mật khẩu mới cho người dùng</p>
                </div>
              </label>

              {formData.resetPassword && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mật khẩu mới <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Nhập mật khẩu mới"
                      value={formData.newPassword}
                      onChange={(e) => handleInputChange('newPassword', e.target.value)}
                      className={`h-12 pr-12 ${errors.newPassword ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.newPassword}
                    </p>
                  )}
                  <p className="text-gray-500 text-xs mt-1">
                    Mật khẩu mới sẽ được gửi qua email của người dùng
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-yellow-50 rounded-2xl p-4 border-2 border-yellow-200"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Lưu ý</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Thay đổi vai trò sẽ ảnh hưởng đến quyền truy cập của người dùng</li>
                  <li>• Tạm khóa tài khoản sẽ ngăn người dùng đăng nhập</li>
                  <li>• Mật khẩu mới sẽ được gửi qua email đã đăng ký</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => navigate('/admin/users')}
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

            <Button
              type="button"
              onClick={handleDelete}
              variant="outline"
              className="w-full h-12 border-2 border-red-200 text-red-600 rounded-2xl hover:bg-red-50 flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Xóa người dùng
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
