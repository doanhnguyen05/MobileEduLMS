import { motion } from 'motion/react';
import { GraduationCap, Heart, Users, Award, ExternalLink, Mail, Globe } from 'lucide-react';
import { TopBar } from '../../../components/TopBar';

export function AboutApp() {
  const features = [
    { icon: GraduationCap, title: '156+ Khóa học', desc: 'Đa dạng chủ đề' },
    { icon: Users, title: '15K+ Học viên', desc: 'Cộng đồng sôi động' },
    { icon: Award, title: '98% Hài lòng', desc: 'Chất lượng đảm bảo' },
  ];

  const team = [
    { name: 'Nguyễn Văn A', role: 'CEO & Founder', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ceo' },
    { name: 'Trần Thị B', role: 'CTO', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cto' },
    { name: 'Lê Văn C', role: 'Head of Education', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=edu' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-8">
      <TopBar showBack title="Về EduMobile" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="w-28 h-28 bg-gradient-to-br from-blue-600 to-blue-400 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <GraduationCap className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EduMobile</h1>
          <p className="text-gray-600">Phiên bản 1.0.0</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <h2 className="font-bold text-gray-900 mb-3">Sứ mệnh</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            EduMobile được tạo ra với sứ mệnh mang đến giáo dục lập trình mobile chất lượng cao,
            dễ tiếp cận cho mọi người. Chúng tôi tin rằng mỗi người đều có thể trở thành developer
            xuất sắc với sự hướng dẫn đúng đắn.
          </p>
          <div className="flex items-center gap-2 text-blue-600">
            <Heart className="w-5 h-5 fill-blue-600" />
            <span className="font-medium">Made with love in Vietnam</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-6 text-white mb-6"
        >
          <h2 className="font-bold mb-4">Thành tựu</h2>
          <div className="grid grid-cols-3 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-bold mb-1">{feature.title}</p>
                  <p className="text-blue-100 text-xs">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-sm p-6 mb-6"
        >
          <h2 className="font-bold text-gray-900 mb-4">Đội ngũ</h2>
          <div className="space-y-3">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-14 h-14 rounded-full bg-gray-200"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-gray-600 text-sm">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl shadow-sm overflow-hidden mb-6"
        >
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">Website</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <span className="text-sm">edumobile.vn</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">Email</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <span className="text-sm">contact@edumobile.vn</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center space-y-2"
        >
          <div className="flex items-center justify-center gap-4 text-sm">
            <button className="text-blue-600 font-medium hover:underline">
              Điều khoản dịch vụ
            </button>
            <span className="text-gray-300">•</span>
            <button className="text-blue-600 font-medium hover:underline">
              Chính sách bảo mật
            </button>
          </div>
          <p className="text-gray-400 text-sm">© 2026 EduMobile. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
}
