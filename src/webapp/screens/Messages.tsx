import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MessageCircle, Clock, CheckCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth';
import { TopBar } from '../components/TopBar';
import { BottomNav } from '../components/BottomNav';
import { Input } from '../components/ui/input';

export function Messages() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const messages = [
    {
      id: '1',
      sender: user?.role === 'teacher' ? 'Nguyễn Văn A' : 'Nguyễn Thị Mai',
      role: user?.role === 'teacher' ? 'Học viên' : 'Giảng viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
      lastMessage: 'Cho em hỏi về bài tập ở phần State và Props được không ạ?',
      time: '10 phút trước',
      unread: true,
      course: 'React Native Cơ Bản'
    },
    {
      id: '2',
      sender: user?.role === 'teacher' ? 'Trần Thị B' : 'Trần Văn Long',
      role: user?.role === 'teacher' ? 'Học viên' : 'Giảng viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2',
      lastMessage: 'Cảm ơn thầy đã giải đáp thắc mắc!',
      time: '1 giờ trước',
      unread: false,
      course: 'Flutter Advanced'
    },
    {
      id: '3',
      sender: user?.role === 'teacher' ? 'Lê Văn C' : 'Admin',
      role: user?.role === 'teacher' ? 'Học viên' : 'Admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3',
      lastMessage: user?.role === 'teacher'
        ? 'Video bài 5 không load được, thầy kiểm tra giúp em với ạ'
        : 'Thông báo: Hệ thống sẽ bảo trì vào 22:00 hôm nay',
      time: '3 giờ trước',
      unread: true,
      course: user?.role === 'teacher' ? 'React Native Cơ Bản' : undefined
    },
    {
      id: '4',
      sender: user?.role === 'teacher' ? 'Phạm Thị D' : 'Lê Minh Tuấn',
      role: user?.role === 'teacher' ? 'Học viên' : 'Giảng viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user4',
      lastMessage: 'Em đã hoàn thành dự án cuối khóa!',
      time: '1 ngày trước',
      unread: false,
      course: 'Swift UI Fundamentals'
    },
    {
      id: '5',
      sender: user?.role === 'teacher' ? 'Hoàng Văn E' : 'Phạm Thị Hương',
      role: user?.role === 'teacher' ? 'Học viên' : 'Giảng viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user5',
      lastMessage: 'Thầy có thể giới thiệu thêm tài liệu học không ạ?',
      time: '2 ngày trước',
      unread: false,
      course: 'Kotlin for Android'
    }
  ];

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || (activeTab === 'unread' && msg.unread);
    return matchesSearch && matchesTab;
  });

  const unreadCount = messages.filter(msg => msg.unread).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar title="Tin nhắn" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Tìm kiếm tin nhắn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-2xl bg-white shadow-sm"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 h-10 rounded-xl font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Tất cả ({messages.length})
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              className={`flex-1 h-10 rounded-xl font-medium transition-colors ${
                activeTab === 'unread'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Chưa đọc ({unreadCount})
            </button>
          </div>
        </motion.div>

        {filteredMessages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Không có tin nhắn nào</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filteredMessages.map((message, index) => (
              <motion.button
                key={message.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(`/messages/${message.id}`)}
                className="w-full bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={message.avatar}
                      alt={message.sender}
                      className="w-14 h-14 rounded-full bg-gray-200"
                    />
                    {message.unread && (
                      <div className="absolute top-0 right-0 w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <h3 className={`font-semibold truncate ${
                          message.unread ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {message.sender}
                        </h3>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full flex-shrink-0">
                          {message.role}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 text-xs flex-shrink-0 ml-2">
                        <Clock className="w-3 h-3" />
                        <span>{message.time}</span>
                      </div>
                    </div>

                    {message.course && (
                      <p className="text-blue-600 text-xs mb-1">{message.course}</p>
                    )}

                    <div className="flex items-center justify-between">
                      <p className={`text-sm truncate flex-1 ${
                        message.unread ? 'text-gray-900 font-medium' : 'text-gray-600'
                      }`}>
                        {message.lastMessage}
                      </p>
                      {!message.unread && (
                        <CheckCheck className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
