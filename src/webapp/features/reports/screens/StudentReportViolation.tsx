import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { AlertTriangle, Send, X, Upload } from 'lucide-react';
import { TopBar } from '../../../components/TopBar';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { createUserReport, type ReportAttachment } from '../data/reportStore';
import { useSmartBack } from '../../../hooks/useSmartBack';

async function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function StudentReportViolation() {
  const navigate = useNavigate();
  const goBack = useSmartBack('/settings');
  const [formData, setFormData] = useState({
    reportType: '',
    reportedItem: '',
    reason: '',
    description: ''
  });
  const [attachments, setAttachments] = useState<ReportAttachment[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const reportTypes = [
    { value: 'course', label: 'Khóa học' },
    { value: 'teacher', label: 'Giảng viên' },
    { value: 'comment', label: 'Bình luận' },
    { value: 'review', label: 'Đánh giá' }
  ];

  const reasons = [
    'Nội dung không phù hợp',
    'Spam hoặc quảng cáo',
    'Ngôn từ gây thù ghét',
    'Bạo lực hoặc đe dọa',
    'Lừa đảo',
    'Vi phạm bản quyền',
    'Khác'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0 || attachments.length >= 3) {
      return;
    }

    const availableSlots = Math.max(0, 3 - attachments.length);
    const selectedFiles = files.slice(0, availableSlots);
    const nextAttachments = await Promise.all(
      selectedFiles.map(async (file, index) => ({
        id: `att-${Date.now()}-${index}`,
        name: file.name,
        url: await readFileAsDataUrl(file),
      })),
    );

    setAttachments((currentAttachments) => [...currentAttachments, ...nextAttachments]);
    event.target.value = '';
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.reportType) {
      newErrors.reportType = 'Vui lòng chọn loại báo cáo';
    }

    if (!formData.reportedItem.trim()) {
      newErrors.reportedItem = 'Vui lòng nhập đối tượng báo cáo';
    }

    if (!formData.reason) {
      newErrors.reason = 'Vui lòng chọn lý do báo cáo';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Vui lòng mô tả chi tiết';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Mô tả phải có ít nhất 20 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const createdReport = createUserReport({
        reportedItem: formData.reportedItem.trim(),
        reason: formData.reason,
        type: formData.reportType,
        description: formData.description.trim(),
        attachments,
      });

      navigate('/report-success', {
        state: {
          reportedItem: formData.reportedItem,
          reason: formData.reason,
          reportType: formData.reportType,
          reportId: createdReport.id,
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Báo cáo vi phạm" fallbackPath="/settings" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-6 mb-6 text-white"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-8 h-8" />
            <h2 className="text-xl font-bold">Báo cáo vi phạm</h2>
          </div>
          <p className="text-orange-100 text-sm leading-relaxed">
            Giúp chúng tôi duy trì môi trường học tập an toàn và lành mạnh
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-sm p-6"
          >
            <h3 className="font-bold text-gray-900 mb-4">Thông tin báo cáo</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại báo cáo <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.reportType}
                  onChange={(e) => handleInputChange('reportType', e.target.value)}
                  className={`w-full h-12 px-4 border rounded-xl bg-white ${
                    errors.reportType ? 'border-red-500' : 'border-gray-200'
                  }`}
                >
                  <option value="">-- Chọn loại --</option>
                  {reportTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.reportType && (
                  <p className="text-red-500 text-xs mt-1">{errors.reportType}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đối tượng báo cáo <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Ví dụ: Khóa học React Native, Giảng viên Nguyễn Văn A"
                  value={formData.reportedItem}
                  onChange={(e) => handleInputChange('reportedItem', e.target.value)}
                  className={`h-12 ${errors.reportedItem ? 'border-red-500' : ''}`}
                />
                {errors.reportedItem && (
                  <p className="text-red-500 text-xs mt-1">{errors.reportedItem}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lý do báo cáo <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  className={`w-full h-12 px-4 border rounded-xl bg-white ${
                    errors.reason ? 'border-red-500' : 'border-gray-200'
                  }`}
                >
                  <option value="">-- Chọn lý do --</option>
                  {reasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
                {errors.reason && (
                  <p className="text-red-500 text-xs mt-1">{errors.reason}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả chi tiết <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Mô tả chi tiết về vi phạm, bao gồm ngữ cảnh và bằng chứng (nếu có)..."
                  className={`w-full h-32 p-4 border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                    errors.description ? 'border-red-500' : 'border-gray-200'
                  }`}
                  maxLength={1000}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                )}
                <p className="text-gray-500 text-xs mt-1">{formData.description.length}/1000</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bằng chứng (Tùy chọn)
                </label>
                <div className="space-y-2">
                  {attachments.map((file, index) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-14 h-14 rounded-xl object-cover border border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">Ảnh minh chứng #{index + 1}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {attachments.length < 3 && (
                    <label className="block cursor-pointer">
                      <div className="w-full h-12 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-colors">
                        <Upload className="w-5 h-5" />
                        <span className="text-sm font-medium">Tải lên bằng chứng</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  Tối đa 3 tệp, mỗi tệp không quá 5MB
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-red-50 rounded-2xl p-4 border-2 border-red-200"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Lưu ý quan trọng</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Báo cáo sai có thể ảnh hưởng đến tài khoản của bạn</li>
                  <li>• Chỉ báo cáo khi bạn chắc chắn có vi phạm</li>
                  <li>• Thông tin báo cáo được bảo mật</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-3"
          >
            <Button
              type="button"
              onClick={goBack}
              variant="outline"
              className="flex-1 h-14 rounded-2xl flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              className="flex-1 h-14 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-2xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
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
