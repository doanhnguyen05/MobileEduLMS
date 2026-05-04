import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  User,
  Calendar,
  FileText,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ArrowLeft,
  ShieldAlert,
  Sparkles,
  MessageSquareText,
  ClipboardList,
  CheckCheck,
} from 'lucide-react';
import { TopBar } from '../../../../components/TopBar';
import { Button } from '../../../../components/ui/button';
import {
  formatAdminReportDate,
  getAdminReportById,
  getAdminReportPriorityLabel,
  updateAdminReport,
} from '../data/adminReportStore';
import { useSmartBack } from '../../../../hooks/useSmartBack';
import { getReportTypeLabel, type ReportStatus } from '../../../reports/data/reportStore';

interface StatusMeta {
  label: string;
  icon: LucideIcon;
  badgeClass: string;
  activeCardClass: string;
  idleIconClass: string;
  tone: string;
}

const statusMetaMap: Record<ReportStatus, StatusMeta> = {
  pending: {
    label: 'Chờ xử lý',
    icon: Clock,
    badgeClass: 'bg-orange-50 border-orange-200 text-orange-600',
    activeCardClass: 'border-orange-300 bg-orange-50 text-orange-700 shadow-sm',
    idleIconClass: 'text-orange-500',
    tone: 'Cần ưu tiên tiếp nhận hồ sơ.',
  },
  reviewing: {
    label: 'Đang xem xét',
    icon: Eye,
    badgeClass: 'bg-blue-50 border-blue-200 text-blue-600',
    activeCardClass: 'border-blue-300 bg-blue-50 text-blue-700 shadow-sm',
    idleIconClass: 'text-blue-500',
    tone: 'Đang đối chiếu dữ liệu và bằng chứng.',
  },
  resolved: {
    label: 'Đã giải quyết',
    icon: CheckCircle,
    badgeClass: 'bg-green-50 border-green-200 text-green-600',
    activeCardClass: 'border-green-300 bg-green-50 text-green-700 shadow-sm',
    idleIconClass: 'text-green-500',
    tone: 'Đã có kết quả xử lý chính thức.',
  },
  rejected: {
    label: 'Từ chối',
    icon: XCircle,
    badgeClass: 'bg-gray-100 border-gray-200 text-gray-600',
    activeCardClass: 'border-gray-300 bg-gray-100 text-gray-700 shadow-sm',
    idleIconClass: 'text-gray-500',
    tone: 'Chưa đủ căn cứ để xử lý.',
  },
};

const priorityClasses: Record<string, string> = {
  urgent: 'bg-red-50 border-red-200 text-red-600',
  high: 'bg-orange-50 border-orange-200 text-orange-600',
  medium: 'bg-blue-50 border-blue-200 text-blue-600',
  low: 'bg-gray-100 border-gray-200 text-gray-600',
};

const timelineToneClasses: Record<string, string> = {
  default: 'bg-blue-50 border-blue-200 text-blue-600',
  warning: 'bg-orange-50 border-orange-200 text-orange-600',
  success: 'bg-green-50 border-green-200 text-green-600',
  danger: 'bg-red-50 border-red-200 text-red-600',
};

export function AdminReportDetail() {
  const { id } = useParams();
  const goBack = useSmartBack('/admin/report-management');
  const report = getAdminReportById(id);

  const [status, setStatus] = useState<ReportStatus>('pending');
  const [adminNote, setAdminNote] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (!report) {
      return;
    }

    setStatus(report.status);
    setAdminNote(report.adminNote);
    setSaveMessage('');
  }, [report?.id, report?.status, report?.adminNote]);

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-6">
          <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">Không tìm thấy thông tin báo cáo</p>
          <Button onClick={goBack} className="mt-4 rounded-2xl">
            Quay lại
          </Button>
        </div>
      </div>
    );
  }

  const currentStatusMeta = statusMetaMap[status];
  const CurrentStatusIcon = currentStatusMeta.icon;

  const handleUpdateStatus = () => {
    const updatedReport = updateAdminReport(report.id, {
      status,
      adminNote,
    });

    if (!updatedReport) {
      setSaveMessage('Không thể lưu thay đổi. Vui lòng thử lại.');
      return;
    }

    setSaveMessage('Đã cập nhật trạng thái và ghi chú xử lý cho báo cáo này.');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Chi tiết báo cáo" fallbackPath="/admin/report-management" />

      <div className="p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-red-600 via-orange-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg"
        >
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div>
                <p className="text-orange-100 text-sm">Mã báo cáo</p>
                <p className="font-mono text-xl font-bold">{report.id}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-end">
              <span className={`px-3 py-1.5 rounded-xl border text-xs font-semibold ${priorityClasses[report.priority] || priorityClasses.low}`}>
                {getAdminReportPriorityLabel(report.priority)}
              </span>
              <span className="px-3 py-1.5 rounded-xl border border-white/20 bg-white/10 text-xs font-medium">
                {getReportTypeLabel(report.type)}
              </span>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2">{report.reportedItem}</h2>
          <p className="text-orange-50 font-medium mb-3">{report.reason}</p>
          <p className="text-sm text-orange-100 leading-relaxed">{report.summary}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="bg-white rounded-3xl shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Người báo cáo</p>
            <p className="font-semibold text-gray-900">{report.reportedBy}</p>
          </div>
          <div className="bg-white rounded-3xl shadow-sm p-4">
            <p className="text-sm text-gray-500 mb-1">Thời gian</p>
            <p className="font-semibold text-gray-900">{formatAdminReportDate(report.createdAt)}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm p-6"
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-bold text-gray-900">Trạng thái báo cáo</h3>
              <p className="text-sm text-gray-500 mt-1">{currentStatusMeta.tone}</p>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border ${currentStatusMeta.badgeClass}`}>
              <CurrentStatusIcon className="w-5 h-5" />
              <span className="font-semibold text-sm">{currentStatusMeta.label}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {(Object.entries(statusMetaMap) as [ReportStatus, StatusMeta][]).map(([value, meta]) => {
              const Icon = meta.icon;
              const isSelected = status === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setStatus(value)}
                  className={`rounded-2xl border-2 p-4 text-left transition-all ${
                    isSelected ? meta.activeCardClass : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-3 ${isSelected ? '' : meta.idleIconClass}`} />
                  <p className="font-semibold mb-1">{meta.label}</p>
                  <p className="text-xs text-gray-500">{meta.tone}</p>
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-3xl shadow-sm p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="w-5 h-5 text-gray-600" />
            <h3 className="font-bold text-gray-900">Hồ sơ báo cáo</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
              <User className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Người báo cáo</p>
                <p className="font-semibold text-gray-900">{report.reportedBy}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
              <AlertTriangle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Đối tượng bị báo cáo</p>
                <p className="font-semibold text-gray-900">{report.reportedItem}</p>
                <p className="text-sm text-gray-500 mt-1">{getReportTypeLabel(report.type)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
              <Calendar className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">Thời gian xử lý gần nhất</p>
                <p className="font-semibold text-gray-900">
                  {formatAdminReportDate(report.updatedAt || report.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-sm p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-gray-600" />
            <h3 className="font-bold text-gray-900">Hướng xử lý đề xuất</h3>
          </div>
          <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4 mb-3">
            <p className="text-sm text-blue-700 font-medium mb-1">Tóm tắt</p>
            <p className="text-gray-700 leading-relaxed">{report.summary}</p>
          </div>
          <div className="bg-orange-50 rounded-2xl border border-orange-100 p-4">
            <p className="text-sm text-orange-700 font-medium mb-1">Đề xuất cho admin</p>
            <p className="text-gray-700 leading-relaxed">{report.suggestedAction}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-3xl shadow-sm p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-gray-600" />
            <h3 className="font-bold text-gray-900">Nội dung chi tiết</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">{report.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-sm p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="w-5 h-5 text-gray-600" />
            <h3 className="font-bold text-gray-900">Bằng chứng kèm theo</h3>
          </div>

          {report.evidence.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {report.evidence.map((evidence) => (
                  <div key={evidence.id} className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img src={evidence.url} alt={evidence.name} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <p className="font-medium text-sm text-gray-900 truncate">{evidence.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{evidence.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-500">
              Báo cáo này hiện chưa có ảnh minh chứng kèm theo.
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-3xl shadow-sm p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCheck className="w-5 h-5 text-gray-600" />
            <h3 className="font-bold text-gray-900">Lịch sử xử lý</h3>
          </div>

          <div className="space-y-3">
            {report.timeline.map((entry) => (
              <div key={entry.id} className="flex gap-3">
                <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center flex-shrink-0 ${timelineToneClasses[entry.tone] || timelineToneClasses.default}`}>
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1 bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-gray-900">{entry.title}</p>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatAdminReportDate(entry.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{entry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-sm p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <MessageSquareText className="w-5 h-5 text-gray-600" />
            <h3 className="font-bold text-gray-900">Ghi chú của admin</h3>
          </div>

          <textarea
            value={adminNote}
            onChange={(event) => setAdminNote(event.target.value)}
            placeholder="Ghi lại kết quả kiểm tra, hướng xử lý hoặc phản hồi nội bộ..."
            className="w-full h-32 p-4 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-2">
            Ghi chú này sẽ được lưu trong hồ sơ admin để tiện đối chiếu các lần xử lý tiếp theo.
          </p>
        </motion.div>

        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-4 text-sm text-green-700"
          >
            {saveMessage}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex gap-3"
        >
          <Button
            type="button"
            onClick={goBack}
            variant="outline"
            className="flex-1 h-14 rounded-2xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Quay lại
          </Button>
          <Button
            type="button"
            onClick={handleUpdateStatus}
            className="flex-1 h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Lưu xử lý
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
