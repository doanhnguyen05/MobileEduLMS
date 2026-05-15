import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import { quizzes } from '../../data/mockData';
import { TopBar } from '../../components/TopBar';
import { Button } from '../../components/ui/button';

export function QuizScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const quiz = quizzes[0];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);

  const question = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;

  const handleSelectAnswer = (index: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = index;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResult(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const correctAnswers = selectedAnswers.filter(
    (answer, index) => answer === quiz.questions[index].correctAnswer
  ).length;

  const score = Math.round((correctAnswers / quiz.questions.length) * 100);

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <TopBar showBack title="Kết quả" />
        <div className="p-6 pt-20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hoàn thành!</h1>
            <p className="text-gray-600 mb-8">Bạn đã hoàn thành bài kiểm tra</p>

            <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
              <div className="text-6xl font-bold text-blue-600 mb-2">{score}%</div>
              <p className="text-gray-600 mb-6">Điểm của bạn</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-2xl p-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">{correctAnswers}</p>
                  <p className="text-gray-600 text-sm">Đúng</p>
                </div>
                <div className="bg-red-50 rounded-2xl p-4">
                  <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-red-600">
                    {quiz.questions.length - correctAnswers}
                  </p>
                  <p className="text-gray-600 text-sm">Sai</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => navigate('/home')}
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30"
              >
                Về trang chủ
              </Button>
              <button
                onClick={() => {
                  setShowResult(false);
                  setCurrentQuestion(0);
                  setSelectedAnswers([]);
                }}
                className="w-full h-14 border-2 border-gray-200 text-gray-700 rounded-2xl font-medium hover:bg-gray-50 transition-colors"
              >
                Làm lại
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <TopBar showBack title={quiz.title} />

      <div className="p-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-gray-900">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <span className="text-gray-600 font-medium">
              {currentQuestion + 1}/{quiz.questions.length}
            </span>
          </div>

          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`
                }}
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
              />
            </div>
          </div>

          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-3xl shadow-xl p-6 mb-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6 leading-relaxed">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestion] === index;

                return (
                  <motion.button
                    key={index}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectAnswer(index)}
                    className={`w-full p-4 rounded-2xl text-left transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? 'border-white bg-white'
                            : 'border-gray-300'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-3 h-3 rounded-full bg-blue-600" />
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLastQuestion ? 'Hoàn thành' : 'Câu tiếp theo'}
          </Button>
        </div>
      </div>
    </div>
  );
}
