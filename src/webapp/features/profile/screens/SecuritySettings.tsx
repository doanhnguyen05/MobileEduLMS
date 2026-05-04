import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Smartphone, Key, Shield, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { TopBar } from '../../../components/TopBar';
import { Input } from '../../../components/ui/input';
import { Switch } from '../../../components/ui/switch';
import { Button } from '../../../components/ui/button';

export function SecuritySettings() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  const [passwords, setPasswords] = useState({
    old: '',
    new: '',
    confirm: ''
  });

  const securityLevels = [
    { label: 'Mật khẩu mạnh', checked: true, color: 'text-green-600' },
    { label: 'Xác thực 2 bước', checked: twoFactorEnabled, color: twoFactorEnabled ? 'text-green-600' : 'text-gray-400' },
    { label: 'Sinh trắc học', checked: biometricEnabled, color: biometricEnabled ? 'text-green-600' : 'text-gray-400' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Bảo mật" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500 to-emerald-400 rounded-3xl p-6 text-white mb-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Độ bảo mật</h3>
              <p className="text-green-100 text-sm">Tài khoản của bạn được bảo vệ tốt</p>
            </div>
            <Shield className="w-12 h-12 text-white/30" />
          </div>
          <div className="space-y-2">
            {securityLevels.map((level, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2 className={`w-5 h-5 ${level.checked ? 'text-white' : 'text-white/30'}`} />
                <span className={level.checked ? 'text-white' : 'text-white/50'}>{level.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <h3 className="font-bold text-gray-900 mb-4">Đổi mật khẩu</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Mật khẩu hiện tại
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type={showOldPassword ? 'text' : 'password'}
                  value={passwords.old}
                  onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
                  className="pl-12 pr-12 h-12 rounded-2xl"
                  placeholder="Nhập mật khẩu hiện tại"
                />
                <button
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showOldPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Mật khẩu mới
              </label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  className="pl-12 pr-12 h-12 rounded-2xl"
                  placeholder="Nhập mật khẩu mới"
                />
                <button
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Xác nhận mật khẩu mới
              </label>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  className="pl-12 h-12 rounded-2xl"
                  placeholder="Nhập lại mật khẩu mới"
                />
              </div>
            </div>

            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl">
              Cập nhật mật khẩu
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-sm overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Xác thực 2 bước</p>
                  <p className="text-sm text-gray-500">Bảo vệ tài khoản với OTP</p>
                </div>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sinh trắc học</p>
                  <p className="text-sm text-gray-500">Vân tay / Face ID</p>
                </div>
              </div>
              <Switch
                checked={biometricEnabled}
                onCheckedChange={setBiometricEnabled}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-yellow-50 rounded-2xl p-4 border border-yellow-200"
        >
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-900 mb-1">Lưu ý bảo mật</p>
              <p className="text-sm text-yellow-700">
                Không chia sẻ mật khẩu với bất kỳ ai. Chúng tôi sẽ không bao giờ yêu cầu mật khẩu qua email hoặc điện thoại.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
