import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  Filter,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  ChevronRight,
} from 'lucide-react';
import { TopBar } from '../../../../components/TopBar';
import { Input } from '../../../../components/ui/input';
import {
  formatAdminReportDate,
  getAdminReportPriorityLabel,
  getAdminReports,
  getAdminReportStatusLabel,
} from '../data/adminReportStore';
import type { ReportStatus } from '../../../reports/data/reportStore';

const typeOptions = [
  { value: 'all', label: 'Tất cả loại' },
  { value: 'course', label: 'Khóa học' },
  { value: 'teacher', label: 'Giảng viên' },
  { value: 'student', label: 'Học viên' },
  { value: 'comment', label: 'Bình luận' },
  { value: 'review', label: 'Đánh giá' },
];

export function AdminReportManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ReportStatus | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string | 'all'>('all');

  const reports = getAdminReports();

  const statusOptions = [
    { value: 'all', label: 'Tất cả', count: reports.length },
    { value: 'pending', label: 'Chờ xử lý', count: reports.filter((report) => report.status === 'pending').length },
    { value: 'reviewing', label: 'Đang xem xét', count: reports.filter((report) => report.status === 'reviewing').length },
    { value: 'resolved', label: 'Đã giải quyết', count: reports.filter((report) => report.status === 'resolved').length },
    { value: 'rejected', label: 'Từ chối', count: reports.filter((report) => report.status === 'rejected').length },
  ];

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case 'pending':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'reviewing':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'resolved':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: ReportStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'reviewing':
        return <Eye className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600';
      case 'high':
        return 'text-orange-600';
      case 'medium':
        return 'text-blue-600';
      case 'low':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const normalizedQuery = searchQuery.toLowerCase();
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.reportedItem.toLowerCase().includes(normalizedQuery) ||
      report.reportedBy.toLowerCase().includes(normalizedQuery) ||
      report.id.toLowerCase().includes(normalizedQuery) ||
      report.reason.toLowerCase().includes(normalizedQuery);
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    const matchesType = selectedType === 'all' || report.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Quản lý báo cáo" fallbackPath="/admin/reports" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-red-600 to-orange-600 rounded-3xl p-6 mb-6 text-white"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-8 h-8" />
            <h2 className="text-xl font-bold">Quản lý báo cáo vi phạm</h2>
          </div>
          <p className="text-orange-100 text-sm">{filteredReports.length} báo cáo đang hiển thị</p>
        </motion.div>

        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Tìm theo mã, lý do, đối tượng hoặc người báo cáo..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="pl-12 h-12 rounded-2xl"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {statusOptions.map((status) => (
              <button
                key={status.value}
                type="button"
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

          <div className="flex gap-2 items-center">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
              className="flex-1 h-10 px-4 border border-gray-200 rounded-xl bg-white text-sm"
            >
              {typeOptions.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredReports.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center">
              <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">Không tìm thấy báo cáo nào</p>
            </div>
          ) : (
            filteredReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(`/admin/report-detail/${report.id}`)}
                className="bg-white rounded-3xl shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm font-semibold text-gray-900">{report.id}</span>
                      <span className={`text-xs font-semibold ${getPriorityColor(report.priority)}`}>
                        {getAdminReportPriorityLabel(report.priority)}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900">{report.reportedItem}</h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Người báo cáo:</span>
                    <span className="font-medium text-gray-900">{report.reportedBy}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Lý do:</span>
                    <span className="font-medium text-orange-600">{report.reason}</span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{report.summary}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${getStatusColor(report.status)}`}>
                    {getStatusIcon(report.status)}
                    <span className="text-xs font-semibold">{getAdminReportStatusLabel(report.status)}</span>
                  </div>
                  <span className="text-xs text-gray-500">{formatAdminReportDate(report.createdAt)}</span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
