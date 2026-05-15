import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, BookOpen, CheckCircle, Clock, XCircle, Eye, AlertTriangle } from 'lucide-react';
import { TopBar } from '../../components/TopBar';
import { BottomNav } from '../../components/BottomNav';
import { Input } from '../../components/ui/input';

export function AdminContent() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const contents = [
    {
      id: 1,
      title: 'React Native Cơ Bản',
      type: 'course',
      instructor: 'Nguyễn Thị Mai',
      status: 'approved',
      students: 1250,
      rating: 4.8,
      submitDate: '10/03/2026'
    },
    {
      id: 2,
      title: 'Flutter Advanced - Phần 2',
      type: 'course',
      instructor: 'Trần Văn Long',
      status: 'pending',
      students: 0,
      rating: 0,
      submitDate: '18/04/2026'
    },
    {
      id: 3,
      title: 'Swift UI Fundamentals',
      type: 'course',
      instructor: 'Lê Minh Tuấn',
      status: 'approved',
      students: 750,
      rating: 4.7,
      submitDate: '25/02/2026'
    },
    {
      id: 4,
      title: 'Kotlin State Management',
      type: 'course',
      instructor: 'Phạm Thị Hương',
      status: 'rejected',
      students: 0,
      rating: 0,
      submitDate: '15/04/2026'
    }
  ];

  const statuses = ['all', 'approved', 'pending', 'rejected'];

  const getStatusBadge = (status: string) => {
    const badges = {
      approved: { label: 'Đã duyệt', color: 'bg-green-100 text-green-600', icon: CheckCircle },
      pending: { label: 'Chờ duyệt', color: 'bg-yellow-100 text-yellow-600', icon: Clock },
      rejected: { label: 'Từ chối', color: 'bg-red-100 text-red-600', icon: XCircle }
    };
    return badges[status as keyof typeof badges];
  };

  const handleApprove = (contentId: number, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn phê duyệt khóa học "${title}"?`)) {
      console.log('Approving content:', contentId);
    }
  };

  const handleReject = (contentId: number, title: string) => {
    const reason = prompt(`Nhập lý do từ chối khóa học "${title}":`);
    if (reason) {
      console.log('Rejecting content:', contentId, 'Reason:', reason);
    }
  };

  const handleWarn = (contentId: number, title: string) => {
    const warning = prompt(`Nhập cảnh báo cho khóa học "${title}":`);
    if (warning) {
      const content = contents.find(c => c.id === contentId);
      console.log('Warning content:', contentId, 'Warning:', warning);
      navigate('/admin/content/warning-success', {
        state: {
          courseTitle: title,
          instructorName: content?.instructor || 'Unknown',
          instructorEmail: content?.instructor.toLowerCase().replace(/\s+/g, '') + '@email.com',
          reason: warning,
          courseId: contentId.toString()
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar title="Quản lý nội dung" />

      <div className="p-6">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-4 shadow-sm text-center"
          >
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">156</p>
            <p className="text-gray-600 text-xs">Đã duyệt</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-4 shadow-sm text-center"
          >
            <Clock className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-gray-600 text-xs">Chờ duyệt</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-4 shadow-sm text-center"
          >
            <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">8</p>
            <p className="text-gray-600 text-xs">Từ chối</p>
          </motion.div>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Tìm kiếm nội dung..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 rounded-2xl border-gray-200 bg-white"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedStatus === status
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {status === 'all' ? 'Tất cả' : status === 'approved' ? 'Đã duyệt' : status === 'pending' ? 'Chờ duyệt' : 'Từ chối'}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {contents.map((content, index) => {
            const badge = getStatusBadge(content.status);
            const StatusIcon = badge.icon;

            return (
              <motion.div
                key={content.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-sm p-5"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{content.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">Giảng viên: {content.instructor}</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.color} flex items-center gap-1`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {badge.label}
                      </span>
                      <span className="text-gray-500 text-xs">• {content.submitDate}</span>
                    </div>
                  </div>
                </div>

                {content.status === 'approved' && (
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-50 rounded-xl p-3 text-center">
                      <p className="text-sm text-gray-600 mb-1">Học viên</p>
                      <p className="text-lg font-bold text-blue-600">{content.students.toLocaleString()}</p>
                    </div>
                    <div className="bg-yellow-50 rounded-xl p-3 text-center">
                      <p className="text-sm text-gray-600 mb-1">Đánh giá</p>
                      <p className="text-lg font-bold text-yellow-600">{content.rating}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/content/${content.id}`)}
                    className="flex-1 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Xem chi tiết</span>
                  </button>
                  {content.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(content.id, content.title)}
                        className="flex-1 h-10 bg-green-50 text-green-600 rounded-xl text-sm font-medium hover:bg-green-100 transition-colors"
                      >
                        Phê duyệt
                      </button>
                      <button
                        onClick={() => handleReject(content.id, content.title)}
                        className="flex-1 h-10 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
                      >
                        Từ chối
                      </button>
                    </>
                  )}
                  {content.status === 'approved' && (
                    <button
                      onClick={() => handleWarn(content.id, content.title)}
                      className="flex-1 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center gap-2 text-sm font-medium hover:bg-orange-100 transition-colors"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Cảnh báo</span>
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
