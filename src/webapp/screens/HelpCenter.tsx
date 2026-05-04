import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MessageCircle, HelpCircle, ChevronRight, Mail, Phone, ExternalLink } from 'lucide-react';
import { TopBar } from '../components/TopBar';
import { Input } from '../components/ui/input';

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      icon: '📚',
      title: 'Khóa học',
      questions: [
        'Làm sao để đăng ký khóa học?',
        'Tôi có thể học lại khóa học đã mua không?',
        'Chính sách hoàn tiền như thế nào?'
      ]
    },
    {
      icon: '💳',
      title: 'Thanh toán',
      questions: [
        'Các phương thức thanh toán được hỗ trợ?',
        'Làm sao để xem lịch sử giao dịch?',
        'Tôi bị trừ tiền nhưng chưa nhận được khóa học'
      ]
    },
    {
      icon: '🎓',
      title: 'Chứng chỉ',
      questions: [
        'Khi nào tôi nhận được chứng chỉ?',
        'Chứng chỉ có giá trị không?',
        'Làm sao để tải chứng chỉ?'
      ]
    },
    {
      icon: '⚙️',
      title: 'Tài khoản',
      questions: [
        'Quên mật khẩu, làm sao lấy lại?',
        'Làm sao để đổi email?',
        'Xóa tài khoản như thế nào?'
      ]
    }
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      desc: 'Trò chuyện trực tiếp với team',
      action: 'Bắt đầu chat',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: Mail,
      title: 'Email',
      desc: 'support@edumobile.vn',
      action: 'Gửi email',
      color: 'from-purple-500 to-pink-400'
    },
    {
      icon: Phone,
      title: 'Hotline',
      desc: '1900 1234 (8:00 - 22:00)',
      action: 'Gọi ngay',
      color: 'from-green-500 to-emerald-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Trung tâm hỗ trợ" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Chúng tôi có thể giúp gì?</h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Tìm kiếm câu hỏi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-2xl bg-white shadow-sm"
            />
          </div>
        </motion.div>

        <div className="mb-8">
          <h2 className="font-bold text-gray-900 mb-4">Liên hệ hỗ trợ</h2>
          <div className="space-y-3">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-900 mb-0.5">{method.title}</h3>
                    <p className="text-gray-600 text-sm">{method.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </motion.button>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-gray-900 mb-4">Câu hỏi thường gặp</h2>
          <div className="space-y-4">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + categoryIndex * 0.1 }}
                className="bg-white rounded-3xl shadow-sm overflow-hidden"
              >
                <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="font-bold text-gray-900">{category.title}</h3>
                  </div>
                </div>
                <div>
                  {category.questions.map((question, questionIndex) => (
                    <button
                      key={questionIndex}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center gap-3 text-left">
                        <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-900">{question}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-6 border-2 border-dashed border-blue-200"
        >
          <h3 className="font-bold text-gray-900 mb-2">Không tìm thấy câu trả lời?</h3>
          <p className="text-gray-600 text-sm mb-4">
            Liên hệ với đội ngũ hỗ trợ của chúng tôi, chúng tôi luôn sẵn sàng giúp đỡ bạn!
          </p>
          <button className="w-full h-12 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <span>Gửi yêu cầu hỗ trợ</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <button className="text-blue-600 font-medium flex items-center gap-2 mx-auto hover:underline">
            <span>Xem tài liệu đầy đủ</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
