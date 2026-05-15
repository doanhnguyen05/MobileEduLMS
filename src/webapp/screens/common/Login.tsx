import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, Chrome, Github, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { getDefaultPathForRole, useAuth, validateLoginInput, type LoginValidationErrors } from '../../features/auth';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [errors, setErrors] = useState<LoginValidationErrors>({});
  const navigate = useNavigate();
  const { login } = useAuth();
  const hasLoginErrors = Object.values(errors).some(Boolean);

  const handleLogin = () => {
    const validation = validateLoginInput({ email, password, role: selectedRole });
    setErrors(validation.errors);

    if (!validation.isValid) {
      return;
    }

    login(email.trim(), password, selectedRole);
    navigate(getDefaultPathForRole(selectedRole), { replace: true });
  };

  const handleSocialLogin = (provider: 'google' | 'github') => {
    setErrors({});
    login(`user@${provider}.com`, 'social-login', selectedRole);
    navigate(getDefaultPathForRole(selectedRole), { replace: true });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <div className="flex-1 px-6 pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              animate={{
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl"
            >
              <span className="text-white text-3xl font-bold">E</span>
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Chào mừng trở lại!</h1>
            <p className="text-gray-600">Đăng nhập để tiếp tục học tập</p>
          </div>

          <div className="space-y-4 mb-6">
            {hasLoginErrors && (
              <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                <p className="text-sm font-medium" aria-live="polite">
                  Vui lòng kiểm tra lại thông tin đăng nhập.
                </p>
              </div>
            )}

            <div className="bg-gray-100 rounded-2xl p-1 flex gap-1">
              {(['student', 'teacher', 'admin'] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setSelectedRole(role);
                    setErrors((currentErrors) => ({ ...currentErrors, role: undefined }));
                  }}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedRole === role
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600'
                  }`}
                >
                  {role === 'student' ? 'Học viên' : role === 'teacher' ? 'Giảng viên' : 'Admin'}
                </button>
              ))}
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Email của bạn"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((currentErrors) => ({ ...currentErrors, email: undefined }));
                }}
                className={`pl-12 h-14 rounded-2xl border-gray-200 ${
                  errors.email ? 'border-red-300 focus-visible:ring-red-400' : ''
                }`}
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((currentErrors) => ({ ...currentErrors, password: undefined }));
                }}
                className={`pl-12 pr-12 h-14 rounded-2xl border-gray-200 ${
                  errors.password ? 'border-red-300 focus-visible:ring-red-400' : ''
                }`}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => navigate('/forgot-password')}
                className="text-blue-600 text-sm font-medium hover:text-blue-700"
              >
                Quên mật khẩu?
              </button>
            </div>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 mb-6"
          >
            Đăng nhập
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Hoặc đăng nhập với</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => handleSocialLogin('google')}
              className="h-12 border border-gray-200 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <Chrome className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700 text-sm font-medium">Google</span>
            </button>
            <button
              onClick={() => handleSocialLogin('github')}
              className="h-12 border border-gray-200 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <Github className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700 text-sm font-medium">Github</span>
            </button>
          </div>

          <div className="text-center">
            <span className="text-gray-600">Chưa có tài khoản? </span>
            <button
              onClick={() => navigate('/register')}
              className="text-blue-600 font-medium"
            >
              Đăng ký ngay
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
