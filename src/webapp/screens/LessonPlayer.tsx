import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, Maximize, ChevronRight, FileText, Download } from 'lucide-react';
import { lessons } from '../data/mockData';
import { TopBar } from '../components/TopBar';
import { Button } from '../components/ui/button';

export function LessonPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'resources'>('overview');

  const lesson = lessons.find(l => l.id === id);
  const currentIndex = lessons.findIndex(l => l.id === id);
  const nextLesson = lessons[currentIndex + 1];

  if (!lesson) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar showBack title={lesson.title} />

      <div className="bg-black relative" style={{ aspectRatio: '16/9' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto"
            >
              {isPlaying ? (
                <Pause className="w-10 h-10 text-white" />
              ) : (
                <Play className="w-10 h-10 text-white ml-1" />
              )}
            </motion.button>
            <p className="text-white/80 text-sm">Video sẽ được phát tại đây</p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between text-white mb-2">
            <span className="text-sm">0:00</span>
            <div className="flex-1 mx-4 h-1 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '30%' }}
                className="h-full bg-white"
              />
            </div>
            <span className="text-sm">{lesson.duration}</span>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Volume2 className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Maximize className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex gap-2 mb-6 bg-gray-100 rounded-2xl p-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Tổng quan
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'resources'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Tài liệu
          </button>
        </div>

        {activeTab === 'overview' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-bold text-gray-900 mb-2">Về bài học này</h2>
              <p className="text-gray-600 leading-relaxed">
                Trong bài học này, bạn sẽ học về các khái niệm cơ bản và cách áp dụng chúng vào
                thực tế. Chúng ta sẽ đi sâu vào từng chi tiết và thực hành qua các ví dụ cụ thể.
              </p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Ghi chú quan trọng</h3>
              <p className="text-blue-700 text-sm">
                Hãy chắc chắn bạn đã hiểu rõ các khái niệm trước khi chuyển sang bài tiếp theo.
              </p>
            </div>

            {nextLesson && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/lesson/${nextLesson.id}`)}
                className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Play className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-gray-500 text-xs mb-1">Bài học tiếp theo</p>
                    <h3 className="font-medium text-gray-900">{nextLesson.title}</h3>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
            )}

            <Button
              onClick={() => navigate(`/quiz/${lesson.id}`)}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30"
            >
              Làm bài kiểm tra
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {['Slide bài giảng.pdf', 'Source code.zip', 'Tài liệu bổ sung.pdf'].map((resource, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">{resource}</h3>
                    <p className="text-gray-500 text-sm">
                      {index === 1 ? '2.5 MB' : '1.2 MB'}
                    </p>
                  </div>
                </div>
                <Download className="w-5 h-5 text-blue-600" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
