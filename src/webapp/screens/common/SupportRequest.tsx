import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Send, Upload, X, AlertCircle, CheckCircle } from 'lucide-react';
import { TopBar } from '../../components/TopBar';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useSmartBack } from '../../hooks/useSmartBack';

export function SupportRequest() {
  const navigate = useNavigate();
  const goBack = useSmartBack('/help');
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    description: '',
    priority: 'medium'
  });
  const [attachments, setAttachments] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    { value: 'payment', label: 'Thanh toán & Hoàn tiền' },
    { value: 'technical', label: 'Vấn đề kỹ thuật' },
    { value: 'course', label: 'Nội dung khóa học' },
    { value: 'account', label: 'Tài khoản' },
    { value: 'certificate', label: 'Chứng chỉ' },
    { value: 'other', label: 'Khác' }
  ];

  const priorities = [
    { value: 'low', label: 'Thấp', color: 'text-gray-600' },
    { value: 'medium', label: 'Trung bình', color: 'text-blue-600' },
    { value: 'high', label: 'Cao', color: 'text-orange-600' },
    { value: 'urgent', label: 'Khẩn cấp', color: 'text-red-600' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleFileUpload = () => {
    if (attachments.length < 3) {
      setAttachments([...attachments, `attachment-${Date.now()}.jpg`]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.category) {
      newErrors.category = 'Vui lòng chọn danh mục';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Vui lòng nhập tiêu đề';
    } else if (formData.subject.trim().length < 10) {
      newErrors.subject = 'Tiêu đề phải có ít nhất 10 ký tự';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Vui lòng mô tả vấn đề';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Mô tả phải có ít nhất 20 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Submitting support request:', formData, attachments);
      navigate('/help/support-success', {
        state: {
          ticketId: `SUP-${Date.now().toString().slice(-8)}`,
          category: categories.find(c => c.value === formData.category)?.label,
          subject: formData.subject
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Gửi yêu cầu hỗ trợ" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-6 mb-6 text-white"
        >
          <h2 className="text-xl font-bold mb-2">Chúng tôi sẵn sàng hỗ trợ!</h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            Mô tả chi tiết vấn đề của bạn. Đội ngũ hỗ trợ sẽ phản hồi trong vòng 24 giờ.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-sm p-6"
          >
            <h3 className="font-bold text-gray-900 mb-4">Thông tin yêu cầu</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full h-12 px-4 border rounded-xl bg-white ${
                    errors.category ? 'border-red-500' : 'border-gray-200'
                  }`}
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mức độ ưu tiên
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {priorities.map((priority) => (
                    <button
                      key={priority.value}
                      type="button"
                      onClick={() => handleInputChange('priority', priority.value)}
                      className={`h-10 px-4 rounded-xl border-2 font-medium text-sm transition-all ${
                        formData.priority === priority.value
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {priority.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Ví dụ: Không thể truy cập khóa học đã mua"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className={`h-12 ${errors.subject ? 'border-red-500' : ''}`}
                  maxLength={100}
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.subject}
                  </p>
                )}
                <p className="text-gray-500 text-xs mt-1">{formData.subject.length}/100</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả chi tiết <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Mô tả chi tiết vấn đề bạn gặp phải, bao gồm các bước đã thực hiện và thông báo lỗi (nếu có)..."
                  className={`w-full h-32 p-4 border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.description ? 'border-red-500' : 'border-gray-200'
                  }`}
                  maxLength={1000}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.description}
                  </p>
                )}
                <p className="text-gray-500 text-xs mt-1">{formData.description.length}/1000</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tệp đính kèm (Tùy chọn)
                </label>
                <div className="space-y-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                    >
                      <span className="text-sm text-gray-700">{file}</span>
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
                    <button
                      type="button"
                      onClick={handleFileUpload}
                      className="w-full h-12 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
                    >
                      <Upload className="w-5 h-5" />
                      <span className="text-sm font-medium">Tải lên ảnh chụp màn hình</span>
                    </button>
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
            className="bg-yellow-50 rounded-2xl p-4 border-2 border-yellow-200"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Lưu ý</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Đội ngũ hỗ trợ sẽ phản hồi trong vòng 24 giờ làm việc</li>
                  <li>• Cung cấp thông tin chi tiết giúp xử lý nhanh hơn</li>
                  <li>• Bạn sẽ nhận email khi có phản hồi</li>
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
              className="flex-1 h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Gửi yêu cầu
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
