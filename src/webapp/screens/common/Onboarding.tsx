import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, BookOpen, Trophy, Users } from 'lucide-react';
import { Button } from '../../components/ui/button';

const slides = [
  {
    icon: BookOpen,
    title: 'Học mọi lúc mọi nơi',
    description: 'Truy cập hàng ngàn khóa học lập trình mobile chất lượng cao, học theo tốc độ của bạn',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    icon: Trophy,
    title: 'Theo dõi tiến độ',
    description: 'Kiểm tra kết quả học tập, nhận chứng chỉ và xây dựng portfolio chuyên nghiệp',
    color: 'from-purple-500 to-pink-400'
  },
  {
    icon: Users,
    title: 'Cộng đồng hỗ trợ',
    description: 'Kết nối với hàng nghìn học viên và giảng viên giàu kinh nghiệm trên toàn quốc',
    color: 'from-orange-500 to-red-400'
  }
];

export function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/login');
    }
  };

  const skipToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="h-screen w-full bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md text-center"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className={`w-40 h-40 mx-auto mb-8 rounded-3xl bg-gradient-to-br ${slides[currentSlide].color} flex items-center justify-center shadow-2xl`}
            >
              {(() => {
                const Icon = slides[currentSlide].icon;
                return <Icon className="w-20 h-20 text-white" />;
              })()}
            </motion.div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {slides[currentSlide].title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="px-6 pb-12 space-y-4">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              animate={{
                width: currentSlide === index ? 32 : 8,
                backgroundColor: currentSlide === index ? '#3B82F6' : '#D1D5DB'
              }}
              className="h-2 rounded-full"
            />
          ))}
        </div>

        <Button
          onClick={nextSlide}
          className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30"
        >
          <span>{currentSlide === slides.length - 1 ? 'Bắt đầu' : 'Tiếp tục'}</span>
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>

        <button
          onClick={skipToLogin}
          className="w-full text-gray-500 hover:text-gray-700 transition-colors"
        >
          Bỏ qua
        </button>
      </div>
    </div>
  );
}
