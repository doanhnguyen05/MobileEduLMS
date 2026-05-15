import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { AlertTriangle, CalendarDays, CheckCircle, Clock, Eye, FileImage, Home, MessageSquare, XCircle } from 'lucide-react';
import { BottomNav } from '../../../components/BottomNav';
import { TopBar } from '../../../components/TopBar';
import { Button } from '../../../components/ui/button';
import { getDefaultPathForRole, useAuth } from '../../../features/auth';
import { formatReportDate, getReportTypeLabel, getUserReportById, type ReportStatus } from '../data/reportStore';

function getStatusConfig(status: ReportStatus) {
  switch (status) {
    case 'pending':
      return { icon: Clock, label: 'Chờ xử lý', color: 'text-orange-600 bg-orange-50 border-orange-200' };
    case 'reviewing':
      return { icon: Eye, label: 'Đang xem xét', color: 'text-blue-600 bg-blue-50 border-blue-200' };
    case 'resolved':
      return { icon: CheckCircle, label: 'Đã giải quyết', color: 'text-green-600 bg-green-50 border-green-200' };
    case 'rejected':
      return { icon: XCircle, label: 'Từ chối', color: 'text-gray-600 bg-gray-50 border-gray-200' };
  }
}

export function MyReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const report = useMemo(() => (id ? getUserReportById(id) : undefined), [id]);

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-sm p-8 text-center max-w-md w-full">
          <AlertTriangle className="w-14 h-14 text-orange-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy báo cáo</h2>
          <p className="text-gray-600 mb-6">Báo cáo này có thể đã bị xóa hoặc chưa được đồng bộ.</p>
          <Button onClick={() => navigate('/my-reports')} className="w-full h-12 rounded-2xl">
            Quay lại danh sách báo cáo
          </Button>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(report.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar showBack title="Chi tiết báo cáo" fallbackPath="/my-reports" />

      <div className="p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-orange-600 to-red-600 rounded-3xl p-6 text-white"
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <p className="text-orange-100 text-sm mb-1">{report.id}</p>
              <h1 className="text-2xl font-bold">{report.reportedItem}</h1>
            </div>
            <div className="px-3 py-1.5 bg-white/15 rounded-xl text-sm font-semibold">
              {getReportTypeLabel(report.type)}
            </div>
          </div>

          <p className="text-orange-100 text-sm leading-relaxed">{report.reason}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-3xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="font-bold text-gray-900">Trạng thái xử lý</h3>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${statusConfig.color}`}>
              <StatusIcon className="w-4 h-4" />
              <span className="text-sm font-semibold">{statusConfig.label}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
              <CalendarDays className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Thời gian gửi</p>
                <p className="font-medium text-gray-900">{formatReportDate(report.createdAt)}</p>
              </div>
            </div>

            {report.updatedAt && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Cập nhật gần nhất</p>
                  <p className="font-medium text-gray-900">{formatReportDate(report.updatedAt)}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-5 h-5 text-orange-600" />
            <h3 className="font-bold text-gray-900">Mô tả chi tiết</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{report.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-3xl shadow-sm p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <FileImage className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-900">Ảnh bằng chứng</h3>
          </div>

          {report.attachments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 px-4 py-8 text-center text-gray-500 text-sm">
              Báo cáo này hiện chưa có ảnh đính kèm.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {report.attachments.map((attachment) => (
                <div key={attachment.id} className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                  <img src={attachment.url} alt={attachment.name} className="w-full h-32 object-cover" />
                  <div className="p-3">
                    <p className="text-xs text-gray-600 truncate">{attachment.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {report.adminNote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-50 rounded-3xl p-6 border-2 border-blue-200"
          >
            <h3 className="font-bold text-blue-900 mb-2">Phản hồi từ hệ thống</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{report.adminNote}</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="grid grid-cols-2 gap-3"
        >
          <Button
            variant="outline"
            onClick={() => navigate('/my-reports')}
            className="h-12 rounded-2xl"
          >
            Về danh sách
          </Button>
          <Button
            onClick={() => navigate(getDefaultPathForRole(user?.role))}
            className="h-12 rounded-2xl flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Trang chủ
          </Button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
