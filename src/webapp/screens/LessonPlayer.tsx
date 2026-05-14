import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Maximize, ChevronRight, ChevronDown, FileText, Download, Loader2, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import { lessons } from '../data/mockData';
import { TopBar } from '../components/TopBar';
import { Button } from '../components/ui/button';

function formatPlaybackTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00';
  }

  const totalSeconds = Math.floor(seconds);
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function isEmbeddedLessonVideo(videoUrl: string) {
  return videoUrl.includes('youtube.com/embed') || videoUrl.includes('youtube-nocookie.com/embed');
}

export function LessonPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'resources'>('overview');
  const [isLessonListOpen, setIsLessonListOpen] = useState(false);

  const lesson = lessons.find(l => l.id === id);
  const courseLessons = lesson ? lessons.filter(l => l.courseId === lesson.courseId) : [];
  const currentIndex = courseLessons.findIndex(l => l.id === id);
  const nextLessons = courseLessons.slice(currentIndex + 1);
  const nextLesson = nextLessons[0];
  const usesEmbeddedVideo = lesson ? isEmbeddedLessonVideo(lesson.videoUrl) : false;

  useEffect(() => {
    if (!lesson) {
      return;
    }

    setIsPlaying(false);
    setIsMuted(false);
    setIsLoading(true);
    setVideoError(false);
    setCurrentTime(0);
    setDuration(0);
    setIsLessonListOpen(false);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      videoRef.current.load();
    }
  }, [lesson?.id, lesson?.videoUrl]);

  if (!lesson) return null;

  const handleTogglePlayback = async () => {
    if (!videoRef.current || videoError) {
      return;
    }

    if (videoRef.current.paused) {
      try {
        await videoRef.current.play();
      } catch (error) {
        console.error('Could not play lesson video:', error);
      }
      return;
    }

    videoRef.current.pause();
  };

  const handleToggleMute = () => {
    if (!videoRef.current) {
      return;
    }

    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleSeek = (event: MouseEvent<HTMLButtonElement>) => {
    if (!videoRef.current || duration <= 0) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const clickOffset = event.clientX - rect.left;
    const ratio = Math.min(Math.max(clickOffset / rect.width, 0), 1);
    const nextTime = ratio * duration;

    videoRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleFullscreen = async () => {
    const container = videoContainerRef.current;
    if (!container) {
      return;
    }

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }

      await container.requestFullscreen();
    } catch (error) {
      console.error('Could not toggle fullscreen:', error);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const durationLabel = duration > 0 ? formatPlaybackTime(duration) : lesson.duration;

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar showBack title={lesson.title} />

      <div
        ref={videoContainerRef}
        className="bg-black relative overflow-hidden"
        style={{ aspectRatio: '16/9' }}
      >
        {usesEmbeddedVideo ? (
          <iframe
            key={lesson.id}
            src={lesson.videoUrl}
            title={lesson.title}
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          />
        ) : (
          <video
            ref={videoRef}
            key={lesson.id}
            src={lesson.videoUrl}
            className="h-full w-full object-cover"
            preload="metadata"
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onLoadedMetadata={(event) => {
              setDuration(event.currentTarget.duration || 0);
              setIsLoading(false);
              setVideoError(false);
            }}
            onCanPlay={() => setIsLoading(false)}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
            onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => setIsLoading(false)}
            onEnded={() => setIsPlaying(false)}
            onError={() => {
              setVideoError(true);
              setIsLoading(false);
              setIsPlaying(false);
            }}
          />
        )}

        {!usesEmbeddedVideo && !videoError && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/25">
            <div className="text-center">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleTogglePlayback}
                className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto"
              >
                <Play className="w-10 h-10 text-white ml-1" />
              </motion.button>
              <p className="text-white/80 text-sm">Nhấn để phát video bài học</p>
            </div>
          </div>
        )}

        {isLoading && !videoError && (
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-2 text-white">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Đang tải video...</span>
          </div>
        )}

        {videoError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 px-6">
            <div className="max-w-sm text-center text-white">
              <AlertCircle className="mx-auto mb-3 h-10 w-10 text-red-300" />
              <p className="mb-2 text-base font-medium">Không thể tải video của bài học này</p>
              <p className="text-sm text-white/80">
                Nguồn video demo hiện không phản hồi. Bạn có thể chuyển sang bài khác hoặc tải lại màn hình.
              </p>
            </div>
          </div>
        )}

        {!usesEmbeddedVideo && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between text-white mb-2">
            <span className="text-sm">{formatPlaybackTime(currentTime)}</span>
            <button
              type="button"
              onClick={handleSeek}
              className="mx-4 flex-1 rounded-full"
              aria-label="Tua video"
            >
              <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${progressPercent}%` }}
                  className="h-full bg-white"
                />
              </div>
            </button>
            <span className="text-sm">{durationLabel}</span>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleTogglePlayback}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              disabled={videoError}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleMute}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                disabled={videoError}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
              <button
                onClick={handleFullscreen}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                disabled={videoError}
              >
                <Maximize className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
        )}
      </div>

      <div className="p-6">
        <div className="mb-4 rounded-2xl bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-900">Nguồn video demo</p>
          <p className="mt-1 text-sm text-blue-700">
            Mỗi bài học được liên kết tới danh sách video phù hợp với nội dung bài đang học.
          </p>
        </div>

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
              <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setIsLessonListOpen((value) => !value)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  aria-expanded={isLessonListOpen}
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
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isLessonListOpen ? 'rotate-180' : ''
                    }`}
                  />
                </motion.button>

                {isLessonListOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="border-t border-gray-100"
                  >
                    {nextLessons.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => navigate(`/lesson/${item.id}`)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-blue-50 transition-colors"
                      >
                        {item.completed ? (
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 flex-shrink-0 text-gray-300" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-gray-900">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.duration}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400" />
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
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
