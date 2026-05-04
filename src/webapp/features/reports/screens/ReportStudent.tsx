import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { AlertTriangle, Upload, Send, X } from 'lucide-react';
import { TopBar } from '../../../components/TopBar';
import { Button } from '../../../components/ui/button';
import { createUserReport, type ReportAttachment } from '../data/reportStore';
import { useSmartBack } from '../../../hooks/useSmartBack';

export function ReportStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = useSmartBack(id ? `/teacher/student/${id}/detail` : '/teacher/students');

  const student = {
    name: id ? `Học viên #${id}` : 'Nguyễn Văn A',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id || 'student'}`,
    email: id ? `hocvien${id}@email.com` : 'nguyenvana@email.com'
  };

  const [reportData, setReportData] = useState({
    reason: '',
    description: '',
    evidence: null as ReportAttachment | null
  });

  const reportReasons = [
    'Vi phạm quy định khóa học',
    'Gian lận trong bài kiểm tra',
    'Sử dụng ngôn từ không phù hợp',
    'Spam hoặc quảng cáo',
    'Hành vi quấy rối',
    'Chia sẻ tài liệu trái phép',
    'Lý do khác'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReportData({
          ...reportData,
          evidence: {
            id: `att-${Date.now()}`,
            name: file.name,
            url: reader.result as string,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportData.reason || !reportData.description) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const createdReport = createUserReport({
      reportedItem: student.name,
      reason: reportData.reason,
      type: 'student',
      description: reportData.description,
      attachments: reportData.evidence ? [reportData.evidence] : [],
    });

    navigate('/report-success', {
      state: {
        reportedItem: student.name,
        reason: reportData.reason,
        reportType: 'student',
        reportId: createdReport.id,
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Báo cáo vi phạm" fallbackPath={id ? `/teacher/student/${id}/detail` : '/teacher/students'} />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 mb-6 flex items-start gap-4"
        >
          <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-red-900 mb-2">Thông báo quan trọng</h3>
            <p className="text-red-700 text-sm leading-relaxed">
              Báo cáo vi phạm là một hành động nghiêm túc. Vui lòng cung cấp thông tin chính xác và bằng chứng rõ ràng.
              Báo cáo sai sự thật có thể bị xử lý theo quy định.
            </p>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-sm p-6"
          >
            <h3 className="font-bold text-gray-900 mb-4">Thông tin học viên</h3>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-14 h-14 rounded-full bg-gray-200"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{student.name}</h4>
                <p className="text-gray-600 text-sm">{student.email}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-sm p-6"
          >
            <h3 className="font-bold text-gray-900 mb-4">Lý do báo cáo</h3>
            <div className="space-y-2">
              {reportReasons.map((reason) => (
                <label
                  key={reason}
                  className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${
                    reportData.reason === reason
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={reason}
                    checked={reportData.reason === reason}
                    onChange={(e) => setReportData({ ...reportData, reason: e.target.value })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-900 font-medium">{reason}</span>
                </label>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-sm p-6"
          >
            <h3 className="font-bold text-gray-900 mb-2">Mô tả chi tiết</h3>
            <p className="text-gray-600 text-sm mb-4">
              Vui lòng mô tả rõ ràng về hành vi vi phạm, thời gian xảy ra và các chi tiết liên quan
            </p>
            <textarea
              value={reportData.description}
              onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
              placeholder="Nhập mô tả chi tiết..."
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl shadow-sm p-6"
          >
            <h3 className="font-bold text-gray-900 mb-2">Bằng chứng (tùy chọn)</h3>
            <p className="text-gray-600 text-sm mb-4">
              Tải lên ảnh chụp màn hình hoặc tài liệu minh chứng
            </p>

            {reportData.evidence ? (
              <div className="relative">
                <img
                  src={reportData.evidence.url}
                  alt="Evidence"
                  className="w-full h-64 object-cover rounded-2xl border-2 border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => setReportData({ ...reportData, evidence: null })}
                  className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="font-medium text-gray-900 mb-1">Tải lên bằng chứng</p>
                  <p className="text-gray-500 text-sm">PNG, JPG (tối đa 5MB)</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-yellow-50 rounded-2xl p-4 border-2 border-yellow-200"
          >
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong className="text-yellow-900">Lưu ý:</strong> Sau khi gửi báo cáo, đội ngũ quản lý sẽ xem xét trong vòng 24-48 giờ.
              Bạn sẽ nhận được thông báo về kết quả xử lý qua email.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-3"
          >
            <Button
              type="button"
              onClick={goBack}
              variant="outline"
              className="flex-1 h-14 rounded-2xl"
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              className="flex-1 h-14 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-2xl shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Gửi báo cáo
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
