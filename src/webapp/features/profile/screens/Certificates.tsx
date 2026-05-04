import { motion } from 'motion/react';
import { Award, Download, Share2, CheckCircle2, Calendar } from 'lucide-react';
import { TopBar } from '../../../components/TopBar';
import { BottomNav } from '../../../components/BottomNav';

export function Certificates() {
  const certificates = [
    {
      id: 1,
      courseName: 'React Native Cơ Bản',
      completedDate: '15/03/2026',
      score: 95,
      instructor: 'Nguyễn Thị Mai',
      certificateId: 'RN-2026-001234'
    },
    {
      id: 2,
      courseName: 'Flutter Advanced',
      completedDate: '28/02/2026',
      score: 88,
      instructor: 'Trần Văn Long',
      certificateId: 'FL-2026-005678'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar showBack title="Chứng chỉ của tôi" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-yellow-500 to-orange-400 rounded-3xl p-6 text-white mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-yellow-100 mb-1">Tổng chứng chỉ</p>
              <h2 className="text-5xl font-bold">{certificates.length}</h2>
            </div>
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Award className="w-10 h-10 text-white" />
            </div>
          </div>
          <p className="text-yellow-100 text-sm">Xuất sắc! Tiếp tục phát huy nhé!</p>
        </motion.div>

        <div className="space-y-4">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >
              <div className="h-40 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <Award className="w-12 h-12 text-yellow-300" />
                    <CheckCircle2 className="w-8 h-8 text-green-300" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">{cert.courseName}</h3>
                  <p className="text-white/90 text-sm">Chứng nhận hoàn thành xuất sắc</p>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Ngày hoàn thành</p>
                    <div className="flex items-center gap-1 text-gray-900">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium text-sm">{cert.completedDate}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Điểm số</p>
                    <p className="text-2xl font-bold text-blue-600">{cert.score}%</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-500 text-xs mb-1">Giảng viên</p>
                  <p className="text-gray-900 font-medium">{cert.instructor}</p>
                </div>

                <div className="mb-4">
                  <p className="text-gray-500 text-xs mb-1">Mã chứng chỉ</p>
                  <p className="text-gray-900 font-mono text-sm">{cert.certificateId}</p>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-2 font-medium hover:bg-blue-700 transition-colors">
                    <Download className="w-5 h-5" />
                    <span>Tải xuống</span>
                  </button>
                  <button className="flex-1 h-12 border-2 border-gray-200 text-gray-700 rounded-2xl flex items-center justify-center gap-2 font-medium hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Chia sẻ</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-6 border-2 border-dashed border-blue-200"
        >
          <div className="text-center">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Còn nhiều chứng chỉ đang chờ bạn!</h3>
            <p className="text-gray-600 text-sm">Hoàn thành khóa học để nhận thêm chứng chỉ</p>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
