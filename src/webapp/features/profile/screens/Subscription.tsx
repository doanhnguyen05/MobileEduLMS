import { motion } from 'motion/react';
import { Crown, Check, Zap, Star, TrendingUp } from 'lucide-react';
import { TopBar } from '../../../components/TopBar';
import { Button } from '../../../components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Subscription() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      paymentId: null,
      price: { monthly: 0, yearly: 0 },
      color: 'from-gray-500 to-gray-400',
      features: [
        'Truy cập 5 khóa học miễn phí',
        'Video chất lượng SD',
        'Hỗ trợ qua email',
        'Chứng chỉ cơ bản'
      ],
      current: true
    },
    {
      name: 'Premium',
      paymentId: {
        monthly: 'plan-premium-monthly',
        yearly: 'plan-premium-yearly',
      },
      price: { monthly: 199000, yearly: 1990000 },
      color: 'from-blue-600 to-cyan-400',
      popular: true,
      features: [
        'Truy cập KHÔNG GIỚI HẠN khóa học',
        'Video chất lượng Full HD',
        'Tải video xem offline',
        'Hỗ trợ ưu tiên 24/7',
        'Chứng chỉ cao cấp',
        'Không có quảng cáo'
      ],
      current: false
    },
    {
      name: 'Pro',
      paymentId: {
        monthly: 'plan-pro-monthly',
        yearly: 'plan-pro-yearly',
      },
      price: { monthly: 399000, yearly: 3990000 },
      color: 'from-purple-600 to-pink-500',
      features: [
        'Tất cả tính năng Premium',
        'Học 1-1 với giảng viên',
        'Dự án thực tế',
        'Review code cá nhân',
        'Ưu tiên việc làm',
        'Cộng đồng VIP'
      ],
      current: false
    }
  ];

  const benefits = [
    { icon: Zap, title: 'Học không giới hạn', desc: 'Truy cập toàn bộ thư viện khóa học' },
    { icon: Star, title: 'Chất lượng cao', desc: 'Video Full HD, âm thanh chuyên nghiệp' },
    { icon: TrendingUp, title: 'Cập nhật liên tục', desc: 'Nội dung mới mỗi tuần' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-8">
      <TopBar showBack title="Gói đăng ký" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nâng cấp Premium</h1>
          <p className="text-gray-600">Mở khóa toàn bộ tiềm năng học tập</p>
        </motion.div>

        <div className="flex gap-2 bg-white rounded-2xl p-1 mb-6 shadow-sm">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-gray-600'
            }`}
          >
            Theo tháng
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              billingCycle === 'yearly'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-gray-600'
            }`}
          >
            Theo năm
            <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
              -17%
            </span>
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-3xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-blue-600' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white text-center py-2 text-sm font-medium">
                  🔥 Phổ biến nhất
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900">
                        {plan.price[billingCycle].toLocaleString('vi-VN')}đ
                      </span>
                      {plan.price[billingCycle] > 0 && (
                        <span className="text-gray-500">/{billingCycle === 'monthly' ? 'tháng' : 'năm'}</span>
                      )}
                    </div>
                  </div>
                  <div className={`w-14 h-14 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center`}>
                    <Crown className="w-7 h-7 text-white" />
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  onClick={() => {
                    if (!plan.current && plan.paymentId) {
                      navigate(`/payment/method/${plan.paymentId[billingCycle]}`);
                    }
                  }}
                  className={`w-full h-12 rounded-2xl ${
                    plan.current
                      ? 'bg-gray-100 text-gray-600 cursor-default'
                      : `bg-gradient-to-r ${plan.color} text-white hover:shadow-xl`
                  }`}
                  disabled={plan.current}
                >
                  {plan.current ? 'Gói hiện tại' : 'Nâng cấp ngay'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6 mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Lợi ích Premium</h3>
          <div className="space-y-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm">{benefit.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border-2 border-dashed border-blue-200">
          <p className="text-center text-sm text-gray-600">
            💡 <span className="font-semibold">Đảm bảo hoàn tiền 100%</span> trong 7 ngày đầu tiên
          </p>
        </div>
      </div>
    </div>
  );
}
