import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Search, MessageCircle, Clock, CheckCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth';
import { getConversationSummaries, type ChatConversationSummary } from '../../features/messages/data/chatStore';
import { TopBar } from '../../components/TopBar';
import { BottomNav } from '../../components/BottomNav';
import { Input } from '../../components/ui/input';

export function Messages() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [conversations, setConversations] = useState<ChatConversationSummary[]>(() =>
    getConversationSummaries(user?.role),
  );

  useEffect(() => {
    setConversations(getConversationSummaries(user?.role));
  }, [user?.role]);

  const filteredMessages = useMemo(
    () =>
      conversations.filter((conversation) => {
        const normalizedSearch = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !normalizedSearch ||
          conversation.sender.toLowerCase().includes(normalizedSearch) ||
          conversation.lastMessage.toLowerCase().includes(normalizedSearch) ||
          conversation.course?.toLowerCase().includes(normalizedSearch);
        const matchesTab = activeTab === 'all' || (activeTab === 'unread' && conversation.unread);
        return matchesSearch && matchesTab;
      }),
    [activeTab, conversations, searchQuery],
  );

  const unreadCount = conversations.filter((conversation) => conversation.unread).length;

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
              onChange={(event) => setSearchQuery(event.target.value)}
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
              Tất cả ({conversations.length})
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
            {filteredMessages.map((conversation, index) => (
              <motion.button
                key={conversation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(`/messages/${conversation.id}`)}
                className="w-full bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={conversation.avatar}
                      alt={conversation.sender}
                      className="w-14 h-14 rounded-full bg-gray-200"
                    />
                    {conversation.unread && (
                      <div className="absolute top-0 right-0 w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <h3
                          className={`font-semibold truncate ${
                            conversation.unread ? 'text-gray-900' : 'text-gray-700'
                          }`}
                        >
                          {conversation.sender}
                        </h3>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full flex-shrink-0">
                          {conversation.role}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 text-xs flex-shrink-0 ml-2">
                        <Clock className="w-3 h-3" />
                        <span>{conversation.time}</span>
                      </div>
                    </div>

                    {conversation.course && (
                      <p className="text-blue-600 text-xs mb-1">{conversation.course}</p>
                    )}

                    <div className="flex items-center justify-between">
                      <p
                        className={`text-sm truncate flex-1 ${
                          conversation.unread ? 'text-gray-900 font-medium' : 'text-gray-600'
                        }`}
                      >
                        {conversation.lastMessage}
                      </p>
                      {!conversation.unread && (
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
