import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Send, Paperclip, Image as ImageIcon, Smile } from 'lucide-react';
import { useAuth } from '../features/auth';
import { TopBar } from '../components/TopBar';
import { Input } from '../components/ui/input';

export function MessageDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [message, setMessage] = useState('');

  const conversation = {
    id: id,
    recipient: user?.role === 'teacher' ? 'Nguyễn Văn A' : 'Nguyễn Thị Mai',
    role: user?.role === 'teacher' ? 'Học viên' : 'Giảng viên',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
    course: 'React Native Cơ Bản',
    messages: [
      {
        id: '1',
        sender: 'other',
        text: 'Xin chào! Cho em hỏi về bài tập ở phần State và Props được không ạ?',
        time: '10:30',
        date: 'Hôm nay'
      },
      {
        id: '2',
        sender: 'me',
        text: 'Chào bạn! Tất nhiên rồi, bạn cứ hỏi nhé.',
        time: '10:32',
        date: 'Hôm nay'
      },
      {
        id: '3',
        sender: 'other',
        text: 'Em không hiểu rõ sự khác nhau giữa State và Props. Thầy có thể giải thích thêm được không ạ?',
        time: '10:35',
        date: 'Hôm nay'
      },
      {
        id: '4',
        sender: 'me',
        text: 'State là dữ liệu nội bộ của component, có thể thay đổi được. Props là dữ liệu được truyền từ component cha xuống component con, không thể thay đổi trực tiếp.',
        time: '10:37',
        date: 'Hôm nay'
      },
      {
        id: '5',
        sender: 'me',
        text: 'Bạn có thể xem lại video bài học, mình có demo chi tiết về phần này nhé!',
        time: '10:37',
        date: 'Hôm nay'
      },
      {
        id: '6',
        sender: 'other',
        text: 'Dạ em hiểu rồi ạ! Cảm ơn thầy nhiều!',
        time: '10:40',
        date: 'Hôm nay'
      }
    ]
  };

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <TopBar
        showBack
        title={
          <div className="flex items-center gap-3">
            <img
              src={conversation.avatar}
              alt={conversation.recipient}
              className="w-9 h-9 rounded-full bg-gray-200"
            />
            <div className="text-left">
              <p className="font-semibold text-gray-900">{conversation.recipient}</p>
              <p className="text-xs text-gray-600">{conversation.role}</p>
            </div>
          </div>
        }
      />

      <div className="bg-blue-50 px-6 py-3 border-b border-blue-100">
        <p className="text-sm text-blue-900">
          <span className="font-medium">Khóa học:</span> {conversation.course}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-4">
          {conversation.messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] ${msg.sender === 'me' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    msg.sender === 'me'
                      ? 'bg-blue-600 text-white rounded-tr-md'
                      : 'bg-white text-gray-900 rounded-tl-md shadow-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                <p
                  className={`text-xs text-gray-500 mt-1 ${
                    msg.sender === 'me' ? 'text-right' : 'text-left'
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>

          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <ImageIcon className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="h-11 pr-12 rounded-full"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <Smile className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
            </button>
          </div>

          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              message.trim()
                ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30'
                : 'bg-gray-200'
            }`}
          >
            <Send
              className={`w-5 h-5 ${message.trim() ? 'text-white' : 'text-gray-400'}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
