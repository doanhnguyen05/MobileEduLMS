import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  Clock,
  Eye,
  CheckCircle,
  XCircle,
  ChevronRight,
} from 'lucide-react';
import { TopBar } from '../../../components/TopBar';
import { BottomNav } from '../../../components/BottomNav';
import { formatReportDate, getReportTypeLabel, getUserReports, type ReportStatus } from '../data/reportStore';

export function MyReports() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<ReportStatus | 'all'>('all');
  const reports = getUserReports();

  const statuses = [
    { value: 'all', label: 'Tất cả', count: reports.length },
    { value: 'pending', label: 'Chờ xử lý', count: reports.filter(r => r.status === 'pending').length },
    { value: 'reviewing', label: 'Đang xem xét', count: reports.filter(r => r.status === 'reviewing').length },
    { value: 'resolved', label: 'Đã giải quyết', count: reports.filter(r => r.status === 'resolved').length },
    { value: 'rejected', label: 'Từ chối', count: reports.filter(r => r.status === 'rejected').length }
  ];

  const getStatusConfig = (status: ReportStatus) => {
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
  };

  const filteredReports = selectedStatus === 'all'
    ? reports
    : reports.filter(r => r.status === selectedStatus);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar showBack title="Báo cáo của tôi" fallbackPath="/settings" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-orange-600 to-red-600 rounded-3xl p-6 mb-6 text-white"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Báo cáo của tôi</h2>
              <p className="text-orange-100 text-sm">Theo dõi trạng thái xử lý</p>
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {statuses.map((status) => (
            <button
              key={status.value}
              onClick={() => setSelectedStatus(status.value as ReportStatus | 'all')}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedStatus === status.value
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              {status.label} ({status.count})
            </button>
          ))}
        </div>

        {/* Reports List */}
        <div className="space-y-3">
          {filteredReports.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center">
              <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">Không có báo cáo nào</p>
            </div>
          ) : (
            filteredReports.map((report, index) => {
              const statusConfig = getStatusConfig(report.status);
              const StatusIcon = statusConfig.icon;

              return (
                <motion.button
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(`/my-reports/${report.id}`)}
                  className="bg-white rounded-3xl shadow-sm p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-semibold text-gray-600">
                          {report.id}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-lg bg-gray-100 text-gray-600">
                          {getReportTypeLabel(report.type)}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1">{report.reportedItem}</h3>
                      <p className="text-sm text-orange-600 font-medium">{report.reason}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${statusConfig.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-xs font-semibold">{statusConfig.label}</span>
                    </div>
                    <span className="text-xs text-gray-500">{formatReportDate(report.createdAt)}</span>
                  </div>

                  {report.adminNote && (
                    <div className="mt-3 p-3 bg-blue-50 rounded-2xl border border-blue-200">
                      <p className="text-xs font-semibold text-blue-900 mb-1">Phản hồi từ Admin:</p>
                      <p className="text-sm text-gray-700">{report.adminNote}</p>
                    </div>
                  )}

                  {report.status === 'reviewing' && (
                    <div className="mt-3 flex items-start gap-2 p-3 bg-yellow-50 rounded-2xl border border-yellow-200">
                      <Clock className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-700">
                        Báo cáo đang được xem xét. Bạn sẽ nhận thông báo khi có kết quả.
                      </p>
                    </div>
                  )}
                </motion.button>
              );
            })
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-blue-50 rounded-2xl p-4 border-2 border-blue-200"
        >
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold">Lưu ý:</span> Thời gian xử lý báo cáo thường trong vòng 24-48 giờ làm việc.
            Bạn sẽ nhận thông báo qua email khi có cập nhật.
          </p>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
