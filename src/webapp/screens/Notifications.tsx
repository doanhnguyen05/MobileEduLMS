import { motion } from 'motion/react';
import { Bell, BookOpen, Trophy, Clock } from 'lucide-react';
import { notifications } from '../data/mockData';
import { TopBar } from '../components/TopBar';
import { BottomNav } from '../components/BottomNav';

export function Notifications() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'course':
        return BookOpen;
      case 'achievement':
        return Trophy;
      case 'reminder':
        return Clock;
      default:
        return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'course':
        return 'bg-blue-100 text-blue-600';
      case 'achievement':
        return 'bg-yellow-100 text-yellow-600';
      case 'reminder':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar title="Thông báo" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Hôm nay</h2>
          <button className="text-blue-600 text-sm font-medium">Đánh dấu đã đọc</button>
        </div>

        <div className="space-y-3">
          {notifications.map((notification, index) => {
            const Icon = getIcon(notification.type);
            const iconColor = getIconColor(notification.type);

            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
                  !notification.read ? 'border-l-4 border-blue-600' : ''
                }`}
              >
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                    <p className="text-gray-400 text-xs">{notification.time}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Trước đó</h2>
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (notifications.length + index) * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-sm opacity-60"
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Bell className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Cập nhật hệ thống</h3>
                    <p className="text-gray-600 text-sm mb-2">Phiên bản mới đã được cập nhật</p>
                    <p className="text-gray-400 text-xs">{index + 3} ngày trước</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
