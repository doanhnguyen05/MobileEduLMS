import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Send, Paperclip, Image as ImageIcon, Smile, MessageCircle } from 'lucide-react';
import { useAuth } from '../features/auth';
import {
  addDemoReply,
  formatChatTime,
  getConversationById,
  markConversationRead,
  sendChatMessage,
  type ChatConversation,
} from '../features/messages/data/chatStore';
import { TopBar } from '../components/TopBar';
import { Input } from '../components/ui/input';

export function MessageDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<ChatConversation | undefined>(() =>
    getConversationById(user?.role, id),
  );
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const replyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const readConversation = markConversationRead(user?.role, id) ?? getConversationById(user?.role, id);
    setConversation(readConversation);
  }, [id, user?.role]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages.length]);

  useEffect(
    () => () => {
      if (replyTimeoutRef.current) {
        clearTimeout(replyTimeoutRef.current);
      }
    },
    [],
  );

  const handleSendText = (text: string) => {
    const updatedConversation = sendChatMessage(user?.role, id, text);
    if (!updatedConversation) {
      return;
    }

    setConversation(updatedConversation);
    setMessage('');

    if (replyTimeoutRef.current) {
      clearTimeout(replyTimeoutRef.current);
    }

    replyTimeoutRef.current = setTimeout(() => {
      const repliedConversation = addDemoReply(user?.role, id);
      if (repliedConversation) {
        setConversation(repliedConversation);
      }
    }, 700);
  };

  const handleSend = () => {
    handleSendText(message);
  };

  if (!conversation) {
    return (
      <div className="h-screen flex flex-col bg-gray-50">
        <TopBar showBack title="Tin nhắn" />
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <MessageCircle className="mb-3 h-14 w-14 text-gray-300" />
          <h2 className="mb-2 text-lg font-semibold text-gray-900">Không tìm thấy hội thoại</h2>
          <p className="text-sm text-gray-500">Hội thoại này chưa tồn tại hoặc đã bị xóa khỏi dữ liệu demo.</p>
        </div>
      </div>
    );
  }

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

      {conversation.course && (
        <div className="bg-blue-50 px-6 py-3 border-b border-blue-100">
          <p className="text-sm text-blue-900">
            <span className="font-medium">Khóa học:</span> {conversation.course}
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-4">
          {conversation.messages.map((chatMessage, index) => (
            <motion.div
              key={chatMessage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.03, 0.3) }}
              className={`flex ${chatMessage.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] ${chatMessage.sender === 'me' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    chatMessage.sender === 'me'
                      ? 'bg-blue-600 text-white rounded-tr-md'
                      : 'bg-white text-gray-900 rounded-tl-md shadow-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{chatMessage.text}</p>
                </div>
                <p
                  className={`text-xs text-gray-500 mt-1 ${
                    chatMessage.sender === 'me' ? 'text-right' : 'text-left'
                  }`}
                >
                  {formatChatTime(chatMessage.createdAt)}
                </p>
              </div>
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSendText('Đã gửi tệp đính kèm demo: bai-tap-state-props.pdf')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Gửi tệp demo"
          >
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>

          <button
            type="button"
            onClick={() => handleSendText('Đã gửi hình ảnh minh chứng bài học trong bản demo.')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Gửi hình ảnh demo"
          >
            <ImageIcon className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleSend();
                }
              }}
              className="h-11 pr-12 rounded-full"
            />
            <button
              type="button"
              onClick={() => setMessage((currentMessage) => `${currentMessage} Cảm ơn bạn!`.trimStart())}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              aria-label="Thêm câu cảm ơn"
            >
              <Smile className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleSend}
            disabled={!message.trim()}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              message.trim()
                ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30'
                : 'bg-gray-200'
            }`}
            aria-label="Gửi tin nhắn"
          >
            <Send className={`w-5 h-5 ${message.trim() ? 'text-white' : 'text-gray-400'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
