import { courses } from '../../../data/mockData';

const subscriptionPreview =
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop';

export type PurchaseItemKind = 'course' | 'subscription';

export interface PurchaseItem {
  id: string;
  kind: PurchaseItemKind;
  title: string;
  subtitle: string;
  thumbnail: string;
  price: number;
  summaryLabel: string;
  secondaryLabel: string;
  secondaryValue: string;
  notice: string;
  successTitle: string;
  successDescription: string;
  successSteps: string[];
  primaryActionLabel: string;
  primaryActionPath: string;
}

const subscriptionPurchases: Record<string, PurchaseItem> = {
  'plan-premium-monthly': {
    id: 'plan-premium-monthly',
    kind: 'subscription',
    title: 'Gói Premium',
    subtitle: 'Thanh toán theo tháng',
    thumbnail: subscriptionPreview,
    price: 199000,
    summaryLabel: 'Phí gói',
    secondaryLabel: 'Chu kỳ',
    secondaryValue: '1 tháng',
    notice: 'Sau khi thanh toán thành công, gói Premium sẽ được kích hoạt ngay để bạn truy cập toàn bộ khóa học, tải video offline và nhận hỗ trợ ưu tiên.',
    successTitle: 'Kích hoạt gói thành công!',
    successDescription: 'Gói Premium tháng đã được kích hoạt cho tài khoản của bạn',
    successSteps: [
      'Quyền truy cập Premium có hiệu lực ngay lập tức',
      'Hóa đơn điện tử đã được gửi đến email của bạn',
      'Bạn có thể bắt đầu học mọi khóa học ngay bây giờ',
    ],
    primaryActionLabel: 'Xem quyền lợi gói',
    primaryActionPath: '/subscription',
  },
  'plan-premium-yearly': {
    id: 'plan-premium-yearly',
    kind: 'subscription',
    title: 'Gói Premium',
    subtitle: 'Thanh toán theo năm',
    thumbnail: subscriptionPreview,
    price: 1990000,
    summaryLabel: 'Phí gói',
    secondaryLabel: 'Chu kỳ',
    secondaryValue: '12 tháng',
    notice: 'Sau khi thanh toán thành công, gói Premium năm sẽ được kích hoạt ngay và giúp bạn tiết kiệm chi phí hơn so với thanh toán từng tháng.',
    successTitle: 'Kích hoạt gói thành công!',
    successDescription: 'Gói Premium năm đã được kích hoạt cho tài khoản của bạn',
    successSteps: [
      'Quyền truy cập Premium có hiệu lực ngay lập tức',
      'Bạn được ưu đãi tốt hơn so với gói tháng',
      'Tất cả khóa học và tính năng Premium đã sẵn sàng để sử dụng',
    ],
    primaryActionLabel: 'Xem quyền lợi gói',
    primaryActionPath: '/subscription',
  },
  'plan-pro-monthly': {
    id: 'plan-pro-monthly',
    kind: 'subscription',
    title: 'Gói Pro',
    subtitle: 'Thanh toán theo tháng',
    thumbnail: subscriptionPreview,
    price: 399000,
    summaryLabel: 'Phí gói',
    secondaryLabel: 'Chu kỳ',
    secondaryValue: '1 tháng',
    notice: 'Sau khi thanh toán thành công, gói Pro sẽ được kích hoạt ngay để bạn học 1-1 với giảng viên, nhận review code và tham gia cộng đồng VIP.',
    successTitle: 'Kích hoạt gói thành công!',
    successDescription: 'Gói Pro tháng đã được kích hoạt cho tài khoản của bạn',
    successSteps: [
      'Bạn đã có toàn bộ quyền lợi của Premium và Pro',
      'Lịch học 1-1 và review code có thể được đặt ngay',
      'Hệ thống đã ghi nhận gói mới trong hồ sơ tài khoản của bạn',
    ],
    primaryActionLabel: 'Xem quyền lợi gói',
    primaryActionPath: '/subscription',
  },
  'plan-pro-yearly': {
    id: 'plan-pro-yearly',
    kind: 'subscription',
    title: 'Gói Pro',
    subtitle: 'Thanh toán theo năm',
    thumbnail: subscriptionPreview,
    price: 3990000,
    summaryLabel: 'Phí gói',
    secondaryLabel: 'Chu kỳ',
    secondaryValue: '12 tháng',
    notice: 'Sau khi thanh toán thành công, gói Pro năm sẽ được kích hoạt ngay để bạn nhận toàn bộ quyền lợi học tập chuyên sâu trong vòng 12 tháng.',
    successTitle: 'Kích hoạt gói thành công!',
    successDescription: 'Gói Pro năm đã được kích hoạt cho tài khoản của bạn',
    successSteps: [
      'Quyền lợi Pro được kích hoạt ngay trong 12 tháng',
      'Bạn có thể học 1-1, review code và tham gia cộng đồng VIP',
      'Hóa đơn điện tử và thông tin gói đã được gửi qua email',
    ],
    primaryActionLabel: 'Xem quyền lợi gói',
    primaryActionPath: '/subscription',
  },
};

export function getPurchaseItem(itemId?: string) {
  if (!itemId) {
    return undefined;
  }

  if (subscriptionPurchases[itemId]) {
    return subscriptionPurchases[itemId];
  }

  const course = courses.find((entry) => entry.id === itemId);
  if (!course) {
    return undefined;
  }

  return {
    id: course.id,
    kind: 'course',
    title: course.title,
    subtitle: course.instructor,
    thumbnail: course.thumbnail,
    price: course.price,
    summaryLabel: 'Giá khóa học',
    secondaryLabel: 'Giảng viên',
    secondaryValue: course.instructor,
    notice: 'Sau khi thanh toán thành công, bạn sẽ có quyền truy cập vĩnh viễn vào khóa học này và toàn bộ các bài học được cập nhật trong tương lai.',
    successTitle: 'Thanh toán thành công!',
    successDescription: 'Chúc mừng bạn đã đăng ký khóa học thành công',
    successSteps: [
      'Hóa đơn điện tử đã được gửi đến email của bạn',
      'Bạn có thể bắt đầu học ngay bây giờ',
      'Truy cập khóa học mọi lúc, mọi nơi',
    ],
    primaryActionLabel: 'Bắt đầu học ngay',
    primaryActionPath: `/course/${course.id}`,
  } satisfies PurchaseItem;
}
