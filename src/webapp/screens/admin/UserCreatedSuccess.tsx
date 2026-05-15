import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle, User, Mail, Key, ArrowRight, Home } from 'lucide-react';
import { Button } from '../../components/ui/button';

export function UserCreatedSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  // Dữ liệu từ trang tạo người dùng
  const userData = location.state || {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    role: 'student',
    password: 'temp123456'
  };

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      student: 'Học viên',
      teacher: 'Giảng viên',
      admin: 'Admin'
    };
    return labels[role] || 'Học viên';
  };

  useEffect(() => {
    // Confetti effect
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Tạo confetti từ 2 bên
      if (typeof (window as any).confetti !== 'undefined') {
        (window as any).confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        (window as any).confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1
          }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50"
            >
              <CheckCircle className="w-14 h-14 text-white" />
            </motion.div>
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
            >
              <span className="text-lg">✨</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Tạo người dùng thành công! 🎉
          </h1>
          <p className="text-gray-600">
            Tài khoản đã được tạo và thông tin đăng nhập đã được gửi qua email.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-6"
        >
          <h2 className="font-bold text-gray-900 mb-4 text-center">Thông tin tài khoản</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Họ và tên</p>
                <p className="font-semibold text-gray-900">{userData.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-semibold text-gray-900">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Key className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Vai trò</p>
                <p className="font-semibold text-gray-900">{getRoleLabel(userData.role)}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200 mb-6"
        >
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">Email đã được gửi</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                Thông tin đăng nhập và mật khẩu tạm thời đã được gửi đến email <span className="font-medium text-blue-600">{userData.email}</span>.
                Người dùng nên đổi mật khẩu sau lần đăng nhập đầu tiên.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <Button
            onClick={() => navigate('/admin/users/add')}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
          >
            <User className="w-5 h-5" />
            Tạo người dùng khác
          </Button>

          <Button
            onClick={() => navigate('/admin/users')}
            variant="outline"
            className="w-full h-12 rounded-2xl flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            Về danh sách người dùng
          </Button>

          <Button
            onClick={() => navigate('/admin/dashboard')}
            variant="outline"
            className="w-full h-12 rounded-2xl flex items-center justify-center gap-2 text-gray-600"
          >
            <Home className="w-5 h-5" />
            Về trang chủ
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
