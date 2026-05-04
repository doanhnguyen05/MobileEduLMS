import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  HelpCircle,
  ChevronRight,
  Award,
  User,
  MessageCircle,
  ExternalLink,
  CreditCard
} from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { BottomNav } from '../components/BottomNav';
import { Button } from '../components/ui/button';

export function HelpCenterNew() {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const faqs = [
    {
      id: 'payment',
      icon: CreditCard,
      title: 'Thanh toán & Hoàn tiền',
      color: 'from-blue-500 to-cyan-400',
      questions: [
        {
          q: 'Tôi bị trừ tiền nhưng chưa nhận được khóa học',
          a: 'Vui lòng kiểm tra email xác nhận thanh toán. Nếu thanh toán thành công nhưng chưa nhận khóa học, liên hệ hỗ trợ với mã giao dịch.'
        },
        {
          q: 'Làm sao để được hoàn tiền?',
          a: 'Bạn có thể yêu cầu hoàn tiền trong vòng 7 ngày nếu chưa học quá 30% khóa học. Truy cập Tài khoản > Khóa học của tôi > Yêu cầu hoàn tiền.'
        },
        {
          q: 'Phương thức thanh toán nào được hỗ trợ?',
          a: 'Chúng tôi hỗ trợ: QR Code (VNPay, MoMo), Thẻ tín dụng/ghi nợ, Chuyển khoản ngân hàng.'
        }
      ]
    },
    {
      id: 'certificate',
      icon: Award,
      title: 'Chứng chỉ',
      color: 'from-purple-500 to-pink-400',
      questions: [
        {
          q: 'Khi nào tôi nhận được chứng chỉ?',
          a: 'Bạn nhận chứng chỉ khi hoàn thành 100% khóa học và đạt điểm tổng kết tối thiểu 80%.'
        },
        {
          q: 'Chứng chỉ có giá trị không?',
          a: 'Chứng chỉ được cấp bởi giảng viên và nền tảng EduMobile. Giá trị phụ thuộc vào uy tín của giảng viên và nội dung khóa học.'
        },
        {
          q: 'Làm sao để tải chứng chỉ?',
          a: 'Truy cập Tài khoản > Chứng chỉ của tôi > Chọn chứng chỉ > Tải xuống PDF hoặc chia sẻ link.'
        }
      ]
    },
    {
      id: 'account',
      icon: User,
      title: 'Tài khoản',
      color: 'from-green-500 to-emerald-400',
      questions: [
        {
          q: 'Quên mật khẩu, làm sao lấy lại?',
          a: 'Nhấn "Quên mật khẩu" ở trang đăng nhập, nhập email đã đăng ký. Chúng tôi sẽ gửi link đặt lại mật khẩu.'
        },
        {
          q: 'Làm sao để đổi email?',
          a: 'Truy cập Cài đặt > Tài khoản > Đổi email. Bạn cần xác minh cả email cũ và email mới.'
        },
        {
          q: 'Xóa tài khoản như thế nào?',
          a: 'Cài đặt > Tài khoản > Xóa tài khoản. Lưu ý: Dữ liệu sẽ bị xóa vĩnh viễn sau 30 ngày.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar showBack title="Trung tâm hỗ trợ" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-6 mb-6 text-white"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <HelpCircle className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Chúng tôi có thể giúp gì?</h2>
              <p className="text-blue-100 text-sm">Tìm câu trả lời nhanh chóng</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((section, index) => {
            const Icon = section.icon;
            const isExpanded = expandedSection === section.id;

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${section.color} rounded-2xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-gray-900">{section.title}</span>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-100"
                  >
                    {section.questions.map((item, qIndex) => (
                      <div
                        key={qIndex}
                        className="p-5 border-b border-gray-50 last:border-b-0"
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <p className="font-semibold text-gray-900">{item.q}</p>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed ml-7">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-6 border-2 border-blue-100"
        >
          <h3 className="font-bold text-gray-900 mb-2">Không tìm thấy câu trả lời?</h3>
          <p className="text-gray-600 text-sm mb-4">
            Liên hệ với đội ngũ hỗ trợ của chúng tôi, chúng tôi luôn sẵn sàng giúp đỡ bạn!
          </p>
          <Button
            onClick={() => navigate('/help/support-request')}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Gửi yêu cầu hỗ trợ
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center"
        >
          <button
            onClick={() => window.open('https://docs.edumobile.com', '_blank')}
            className="text-blue-600 font-medium text-sm flex items-center justify-center gap-2 hover:text-blue-700"
          >
            Xem tài liệu đầy đủ
            <ExternalLink className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
