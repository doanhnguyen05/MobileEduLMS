import {
  Award,
  BadgeCheck,
  BarChart3,
  BookMarked,
  BookOpen,
  CircleDollarSign,
  Clock3,
  CreditCard,
  FileWarning,
  MessageSquare,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { UserRole } from '../../../entities/user';

export interface ProfileShortcut {
  label: string;
  description: string;
  route: string;
  icon: LucideIcon;
  colorClass: string;
}

export interface ProfileStatusItem {
  label: string;
  value: string;
  toneClass: string;
}

export function getProfileShortcuts(role: UserRole): ProfileShortcut[] {
  if (role === 'teacher') {
    return [
      {
        label: 'Quản lý khóa học',
        description: 'Xem nội dung, đánh giá và chỉnh sửa khóa học đang bán.',
        route: '/teacher/courses',
        icon: BookOpen,
        colorClass: 'bg-blue-100 text-blue-600',
      },
      {
        label: 'Tài khoản nhận tiền',
        description: 'Kiểm tra tài khoản ngân hàng và luồng rút tiền.',
        route: '/teacher/bank-accounts',
        icon: CreditCard,
        colorClass: 'bg-emerald-100 text-emerald-600',
      },
      {
        label: 'Học viên nổi bật',
        description: 'Theo dõi học viên tiến bộ tốt và cần hỗ trợ thêm.',
        route: '/teacher/students',
        icon: Users,
        colorClass: 'bg-purple-100 text-purple-600',
      },
    ];
  }

  if (role === 'admin') {
    return [
      {
        label: 'Quản lý người dùng',
        description: 'Kiểm duyệt, khóa tài khoản và phân quyền người dùng.',
        route: '/admin/users',
        icon: Users,
        colorClass: 'bg-blue-100 text-blue-600',
      },
      {
        label: 'Hàng chờ moderation',
        description: 'Xử lý báo cáo vi phạm và nội dung cần kiểm duyệt.',
        route: '/admin/report-management',
        icon: FileWarning,
        colorClass: 'bg-amber-100 text-amber-600',
      },
      {
        label: 'Doanh thu hệ thống',
        description: 'Xem nhanh doanh thu, tăng trưởng và biến động nền tảng.',
        route: '/admin/reports/revenue',
        icon: CircleDollarSign,
        colorClass: 'bg-emerald-100 text-emerald-600',
      },
    ];
  }

  return [
    {
      label: 'Khóa học đã lưu',
      description: 'Mở lại danh sách khóa học bạn quan tâm để học sau.',
      route: '/bookmarks',
      icon: BookMarked,
      colorClass: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Tin nhắn học tập',
      description: 'Theo dõi trao đổi với giảng viên và bộ phận hỗ trợ.',
      route: '/messages',
      icon: MessageSquare,
      colorClass: 'bg-emerald-100 text-emerald-600',
    },
    {
      label: 'Báo cáo của tôi',
      description: 'Xem lịch sử các báo cáo và trạng thái xử lý hiện tại.',
      route: '/my-reports',
      icon: ShieldCheck,
      colorClass: 'bg-purple-100 text-purple-600',
    },
  ];
}

export function getProfileStatusItems(role: UserRole): ProfileStatusItem[] {
  if (role === 'teacher') {
    return [
      { label: 'Trạng thái giảng viên', value: 'Đã xác minh', toneClass: 'bg-emerald-50 text-emerald-700' },
      { label: 'Chu kỳ thanh toán', value: 'Ngày 15 hàng tháng', toneClass: 'bg-blue-50 text-blue-700' },
      { label: 'Cam kết phản hồi', value: 'Trong 12 giờ', toneClass: 'bg-purple-50 text-purple-700' },
    ];
  }

  if (role === 'admin') {
    return [
      { label: 'Mức quyền hạn', value: 'System Admin', toneClass: 'bg-red-50 text-red-700' },
      { label: 'Moderation SLA', value: '24 giờ', toneClass: 'bg-amber-50 text-amber-700' },
      { label: 'Audit log', value: 'Đang bật', toneClass: 'bg-blue-50 text-blue-700' },
    ];
  }

  return [
    { label: 'Gói học tập', value: 'Standard', toneClass: 'bg-blue-50 text-blue-700' },
    { label: 'Chuỗi học liên tục', value: '12 ngày', toneClass: 'bg-emerald-50 text-emerald-700' },
    { label: 'Trạng thái chứng chỉ', value: '4 đã cấp', toneClass: 'bg-purple-50 text-purple-700' },
  ];
}

export function getRoleFocusCard(role: UserRole) {
  if (role === 'teacher') {
    return {
      title: 'Không gian giảng dạy',
      description: 'Quản lý lớp học, phản hồi học viên và dòng tiền ngay trong tài khoản.',
      icon: BadgeCheck,
      iconClass: 'bg-emerald-100 text-emerald-600',
    };
  }

  if (role === 'admin') {
    return {
      title: 'Không gian vận hành',
      description: 'Theo dõi moderation, tăng trưởng và an toàn hệ thống từ một nơi.',
      icon: BarChart3,
      iconClass: 'bg-red-100 text-red-600',
    };
  }

  return {
    title: 'Không gian học tập',
    description: 'Theo dõi tiến độ, khóa học đã lưu và hỗ trợ học tập cá nhân.',
    icon: Award,
    iconClass: 'bg-blue-100 text-blue-600',
  };
}
