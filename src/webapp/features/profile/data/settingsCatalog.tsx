import {
  AlertTriangle,
  Bell,
  BookOpen,
  Clock3,
  Eye,
  FileText,
  Globe,
  HelpCircle,
  LayoutTemplate,
  Lock,
  Moon,
  Palette,
  Shield,
  Siren,
  SlidersHorizontal,
  Smartphone,
  Users,
  Volume2,
  WalletCards,
  type LucideIcon,
} from 'lucide-react';
import type { UserRole } from '../../../entities/user';

export type ToggleSettingKey = 'notifications' | 'darkMode' | 'sound';

export interface SettingSectionItem {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
  type: 'toggle' | 'link';
  route?: string;
  value?: string;
}

export interface SettingSectionDefinition {
  title: string;
  items: SettingSectionItem[];
}

export interface SettingToggleControl {
  id: string;
  label: string;
  description: string;
  defaultValue: boolean;
}

export interface SettingChoiceOption {
  id: string;
  label: string;
  description: string;
}

export interface SettingChoiceControl {
  id: string;
  label: string;
  description: string;
  defaultValue: string;
  options: SettingChoiceOption[];
}

export interface SettingContentBlock {
  title: string;
  items: string[];
}

export interface SettingDetailDefinition {
  id: string;
  roles: UserRole[];
  title: string;
  subtitle: string;
  heroTitle: string;
  heroDescription: string;
  icon: LucideIcon;
  heroClassName: string;
  summary: { label: string; value: string }[];
  contentBlocks: SettingContentBlock[];
  toggleControls?: SettingToggleControl[];
  choiceControl?: SettingChoiceControl;
  ctaLabel?: string;
  ctaRoute?: string;
  readOnly?: boolean;
}

export function getSettingsSections(role: UserRole): SettingSectionDefinition[] {
  const sections: SettingSectionDefinition[] = [
    {
      title: 'Cài đặt chung',
      items: [
        {
          id: 'notifications',
          icon: Bell,
          label: 'Thông báo',
          description: 'Bật/tắt nhanh thông báo và tùy chỉnh kênh nhận tin.',
          type: 'toggle',
          route: '/settings/notifications',
        },
        {
          id: 'darkMode',
          icon: Moon,
          label: 'Chế độ tối',
          description: 'Bật chế độ tối cục bộ cho tài khoản này.',
          type: 'toggle',
        },
        {
          id: 'sound',
          icon: Volume2,
          label: 'Âm thanh',
          description: 'Phát âm báo khi có bài học, tin nhắn hoặc cảnh báo mới.',
          type: 'toggle',
        },
        {
          id: 'language',
          icon: Globe,
          label: 'Ngôn ngữ',
          description: 'Thiết lập ngôn ngữ hiển thị cho ứng dụng.',
          type: 'link',
          route: '/settings/language',
          value: 'Tiếng Việt',
        },
        {
          id: 'appearance',
          icon: Palette,
          label: 'Giao diện',
          description: 'Chỉnh theme, mật độ hiển thị và cảm giác sử dụng.',
          type: 'link',
          route: '/settings/appearance',
        },
      ],
    },
    {
      title: 'Tài khoản & Bảo mật',
      items: [
        {
          id: 'security',
          icon: Lock,
          label: 'Bảo mật tài khoản',
          description: 'Đổi mật khẩu, 2FA và sinh trắc học.',
          type: 'link',
          route: '/security',
        },
      ],
    },
  ];

  if (role === 'teacher') {
    sections.push({
      title: 'Thiết lập giảng viên',
      items: [
        {
          id: 'classroom-controls',
          icon: BookOpen,
          label: 'Quy trình lớp học',
          description: 'Quản lý phản hồi, Q&A và chuẩn xuất bản nội dung.',
          type: 'link',
          route: '/settings/classroom-controls',
        },
        {
          id: 'payout-preferences',
          icon: WalletCards,
          label: 'Thanh toán & đối soát',
          description: 'Chu kỳ trả tiền, hóa đơn và ngưỡng thanh toán.',
          type: 'link',
          route: '/settings/payout-preferences',
        },
        {
          id: 'mentor-availability',
          icon: Clock3,
          label: 'Lịch hỗ trợ học viên',
          description: 'Thiết lập khung giờ phản hồi và trạng thái mentor.',
          type: 'link',
          route: '/settings/mentor-availability',
        },
      ],
    });
  } else if (role === 'admin') {
    sections.push({
      title: 'Thiết lập quản trị',
      items: [
        {
          id: 'moderation-rules',
          icon: Shield,
          label: 'Luật moderation',
          description: 'Điều chỉnh cảnh báo, ưu tiên xử lý và ẩn nội dung.',
          type: 'link',
          route: '/settings/moderation-rules',
        },
        {
          id: 'system-alerts',
          icon: Siren,
          label: 'Cảnh báo hệ thống',
          description: 'Thiết lập nhận cảnh báo khi có sự cố vận hành.',
          type: 'link',
          route: '/settings/system-alerts',
        },
        {
          id: 'access-audit',
          icon: Eye,
          label: 'Audit & truy cập',
          description: 'Quản lý log hành động, retention và bất thường truy cập.',
          type: 'link',
          route: '/settings/access-audit',
        },
      ],
    });
  } else {
    sections.push({
      title: 'Thiết lập học tập',
      items: [
        {
          id: 'learning-preferences',
          icon: SlidersHorizontal,
          label: 'Phong cách học',
          description: 'Chọn cách gợi ý khóa học, màn hình mở đầu và mục tiêu tuần.',
          type: 'link',
          route: '/settings/learning-preferences',
        },
        {
          id: 'study-reminders',
          icon: Bell,
          label: 'Nhắc học',
          description: 'Thiết lập lịch nhắc học, streak và cảnh báo bài tập.',
          type: 'link',
          route: '/settings/study-reminders',
        },
        {
          id: 'offline-materials',
          icon: Smartphone,
          label: 'Tài liệu offline',
          description: 'Quy tắc tải nội dung, phụ đề và dọn bộ nhớ.',
          type: 'link',
          route: '/settings/offline-materials',
        },
      ],
    });
  }

  sections.push({
    title: 'Hỗ trợ & pháp lý',
    items: [
      {
        id: 'help',
        icon: HelpCircle,
        label: 'Trung tâm trợ giúp',
        description: 'Câu hỏi thường gặp, liên hệ hỗ trợ và hướng dẫn xử lý sự cố.',
        type: 'link',
        route: '/help',
      },
      {
        id: 'report-violation',
        icon: AlertTriangle,
        label: 'Báo cáo vi phạm',
        description: 'Gửi báo cáo về nội dung, người dùng hoặc hành vi không phù hợp.',
        type: 'link',
        route: '/report-violation',
      },
      {
        id: 'my-reports',
        icon: AlertTriangle,
        label: 'Báo cáo của tôi',
        description: 'Theo dõi lịch sử báo cáo và tiến độ xử lý.',
        type: 'link',
        route: '/my-reports',
      },
      {
        id: 'terms',
        icon: FileText,
        label: 'Điều khoản sử dụng',
        description: 'Tóm tắt các điều khoản, giới hạn trách nhiệm và quy tắc nền tảng.',
        type: 'link',
        route: '/settings/terms',
      },
      {
        id: 'privacy',
        icon: FileText,
        label: 'Chính sách bảo mật',
        description: 'Mô tả dữ liệu nào được lưu, dùng và bảo vệ như thế nào.',
        type: 'link',
        route: '/settings/privacy',
      },
    ],
  });

  return sections;
}

const allSettingDetails: SettingDetailDefinition[] = [
  {
    id: 'notifications',
    roles: ['student', 'teacher', 'admin'],
    title: 'Thông báo',
    subtitle: 'Quản lý kênh và mức độ ưu tiên',
    heroTitle: 'Tùy chọn nhận thông báo',
    heroDescription: 'Thiết lập kênh gửi, độ ưu tiên và loại thông tin cần theo dõi trên tài khoản hiện tại.',
    icon: Bell,
    heroClassName: 'from-blue-600 to-cyan-500',
    summary: [
      { label: 'Kênh đang bật', value: '3' },
      { label: 'Mức ưu tiên', value: 'Tức thời' },
      { label: 'Thiết bị hiện tại', value: '1' },
    ],
    contentBlocks: [
      {
        title: 'Mục đích',
        items: [
          'Phân loại rõ thông báo học tập, vận hành và bảo mật.',
          'Giảm nhiễu cho người dùng thường xuyên nhận nhiều cập nhật.',
        ],
      },
    ],
    toggleControls: [
      { id: 'push', label: 'Push notification', description: 'Nhận cảnh báo đẩy ngay trên thiết bị.', defaultValue: true },
      { id: 'email', label: 'Email tổng hợp', description: 'Gửi email tóm tắt các thay đổi quan trọng.', defaultValue: true },
      { id: 'priority', label: 'Chỉ báo ưu tiên cao', description: 'Giảm bớt thông báo ít quan trọng.', defaultValue: false },
    ],
    choiceControl: {
      id: 'deliveryWindow',
      label: 'Tần suất nhận',
      description: 'Chọn cách hệ thống gửi thông báo mặc định.',
      defaultValue: 'realtime',
      options: [
        { id: 'realtime', label: 'Theo thời gian thực', description: 'Nhận ngay khi có sự kiện.' },
        { id: 'digest', label: 'Gom theo phiên', description: 'Gửi theo cụm để giảm gián đoạn.' },
        { id: 'daily', label: 'Tóm tắt cuối ngày', description: 'Nhận báo cáo một lần mỗi ngày.' },
      ],
    },
  },
  {
    id: 'language',
    roles: ['student', 'teacher', 'admin'],
    title: 'Ngôn ngữ',
    subtitle: 'Thiết lập hiển thị giao diện',
    heroTitle: 'Cấu hình ngôn ngữ ứng dụng',
    heroDescription: 'Đây là cấu hình tĩnh để mô phỏng việc chọn ngôn ngữ hiển thị và định dạng nội dung.',
    icon: Globe,
    heroClassName: 'from-emerald-600 to-teal-500',
    summary: [
      { label: 'Ngôn ngữ hiện tại', value: 'Tiếng Việt' },
      { label: 'Định dạng ngày', value: 'dd/mm/yyyy' },
      { label: 'Múi giờ', value: 'GMT+7' },
    ],
    contentBlocks: [
      {
        title: 'Lưu ý',
        items: [
          'Thay đổi này chỉ áp dụng cho tài khoản hiện tại.',
          'Một số nội dung khóa học vẫn phụ thuộc ngôn ngữ do giảng viên cung cấp.',
        ],
      },
    ],
    choiceControl: {
      id: 'language',
      label: 'Ngôn ngữ hiển thị',
      description: 'Chọn ngôn ngữ ưu tiên cho giao diện và email hệ thống.',
      defaultValue: 'vi',
      options: [
        { id: 'vi', label: 'Tiếng Việt', description: 'Ngôn ngữ mặc định cho hầu hết người dùng hiện tại.' },
        { id: 'en', label: 'English', description: 'Phù hợp nếu bạn thường dùng tài liệu kỹ thuật quốc tế.' },
        { id: 'ja', label: '日本語', description: 'Dùng cho tài khoản cần giao diện tiếng Nhật.' },
      ],
    },
  },
  {
    id: 'appearance',
    roles: ['student', 'teacher', 'admin'],
    title: 'Giao diện',
    subtitle: 'Theme và trải nghiệm hiển thị',
    heroTitle: 'Tùy chỉnh cảm giác sử dụng',
    heroDescription: 'Thiết lập theme, mật độ hiển thị và hành vi chuyển động cho môi trường học tập.',
    icon: Palette,
    heroClassName: 'from-purple-600 to-fuchsia-500',
    summary: [
      { label: 'Theme', value: 'Sáng' },
      { label: 'Mật độ', value: 'Tiêu chuẩn' },
      { label: 'Chuyển động', value: 'Bật' },
    ],
    contentBlocks: [
      {
        title: 'Phạm vi áp dụng',
        items: [
          'Thay đổi chỉ áp dụng cho trình duyệt hoặc thiết bị hiện tại.',
          'Thiết lập này giúp mô phỏng trải nghiệm cá nhân hóa giao diện.',
        ],
      },
    ],
    toggleControls: [
      { id: 'reduceMotion', label: 'Giảm chuyển động', description: 'Giảm animation khi chuyển màn hình.', defaultValue: false },
      { id: 'compactCards', label: 'Thẻ nội dung gọn hơn', description: 'Hiển thị nhiều thông tin hơn trong cùng một màn hình.', defaultValue: false },
    ],
    choiceControl: {
      id: 'theme',
      label: 'Theme mặc định',
      description: 'Chọn giao diện hiển thị khi đăng nhập.',
      defaultValue: 'light',
      options: [
        { id: 'light', label: 'Sáng', description: 'Giữ giao diện hiện tại rõ ràng, dễ đọc.' },
        { id: 'system', label: 'Theo hệ điều hành', description: 'Đồng bộ theo thiết bị của bạn.' },
        { id: 'dark', label: 'Tối', description: 'Phù hợp khi học vào buổi tối.' },
      ],
    },
  },
  {
    id: 'learning-preferences',
    roles: ['student'],
    title: 'Phong cách học',
    subtitle: 'Thiết lập ưu tiên học tập',
    heroTitle: 'Cá nhân hóa hành trình học',
    heroDescription: 'Điều chỉnh cách app gợi ý khóa học, mở màn hình đầu tiên và theo dõi mục tiêu.',
    icon: SlidersHorizontal,
    heroClassName: 'from-blue-600 to-indigo-500',
    summary: [
      { label: 'Mục tiêu tuần', value: '3 buổi học' },
      { label: 'Màn hình mở đầu', value: 'Trang chủ' },
      { label: 'Gợi ý học tập', value: 'Đang bật' },
    ],
    contentBlocks: [
      {
        title: 'Cài đặt chính',
        items: [
          'Điều chỉnh luồng mở app để vào thẳng khu vực bạn dùng nhiều nhất.',
          'Tăng tính liên tục khi học bằng gợi ý thông minh.',
        ],
      },
    ],
    toggleControls: [
      { id: 'recommendations', label: 'Gợi ý khóa học phù hợp', description: 'Đề xuất thêm khóa học dựa trên lịch sử học.', defaultValue: true },
      { id: 'autoResume', label: 'Tự mở bài học dang dở', description: 'Vào thẳng bài đang học khi quay lại ứng dụng.', defaultValue: true },
      { id: 'weeklyTarget', label: 'Theo dõi mục tiêu tuần', description: 'Hiển thị tiến độ mục tiêu ở trang chủ.', defaultValue: true },
    ],
    choiceControl: {
      id: 'entryScreen',
      label: 'Màn hình ưu tiên',
      description: 'Chọn nơi bạn muốn app mở đầu sau khi đăng nhập.',
      defaultValue: 'home',
      options: [
        { id: 'home', label: 'Trang chủ', description: 'Thấy nhanh tiến độ và khóa học đang học.' },
        { id: 'courses', label: 'Danh sách khóa học', description: 'Vào thẳng thư viện khóa học.' },
        { id: 'progress', label: 'Tiến độ', description: 'Theo dõi chỉ số học tập trước tiên.' },
      ],
    },
  },
  {
    id: 'study-reminders',
    roles: ['student'],
    title: 'Nhắc học',
    subtitle: 'Nhịp học và cảnh báo cá nhân',
    heroTitle: 'Giữ nhịp học tập đều đặn',
    heroDescription: 'Thiết lập nhắc học, thông báo streak và cảnh báo deadline theo lịch cá nhân.',
    icon: Bell,
    heroClassName: 'from-amber-500 to-orange-500',
    summary: [
      { label: 'Khung giờ hiện tại', value: '20:00' },
      { label: 'Streak alert', value: 'Bật' },
      { label: 'Deadline alert', value: 'Bật' },
    ],
    contentBlocks: [
      {
        title: 'Khuyến nghị',
        items: [
          'Khung 19:00 - 21:00 thường có tỷ lệ quay lại học cao hơn.',
          'Bật cảnh báo streak giúp duy trì thói quen học ổn định.',
        ],
      },
    ],
    toggleControls: [
      { id: 'dailyReminder', label: 'Nhắc học hằng ngày', description: 'Tạo thông báo học theo lịch cố định.', defaultValue: true },
      { id: 'streakAlert', label: 'Cảnh báo mất streak', description: 'Nhắc bạn trước khi chuỗi học bị đứt.', defaultValue: true },
      { id: 'deadlineAlert', label: 'Cảnh báo bài tập', description: 'Nhận nhắc trước deadline của quiz hoặc assignment.', defaultValue: true },
    ],
    choiceControl: {
      id: 'studyWindow',
      label: 'Khung giờ nhắc',
      description: 'Chọn thời điểm hệ thống gửi nhắc học mặc định.',
      defaultValue: '20h',
      options: [
        { id: '08h', label: '08:00', description: 'Phù hợp nếu bạn học buổi sáng.' },
        { id: '12h', label: '12:00', description: 'Phù hợp với nhịp nghỉ trưa.' },
        { id: '20h', label: '20:00', description: 'Phù hợp nếu học sau giờ làm việc.' },
      ],
    },
  },
  {
    id: 'offline-materials',
    roles: ['student'],
    title: 'Tài liệu offline',
    subtitle: 'Quản lý tải về và bộ nhớ',
    heroTitle: 'Kiểm soát nội dung học ngoại tuyến',
    heroDescription: 'Thiết lập cách tải bài học, phụ đề và chính sách dọn dữ liệu cục bộ.',
    icon: Smartphone,
    heroClassName: 'from-cyan-600 to-blue-500',
    summary: [
      { label: 'Tải qua Wi-Fi', value: 'Bật' },
      { label: 'Phụ đề', value: 'Tự động' },
      { label: 'Dọn bộ nhớ', value: 'Sau 30 ngày' },
    ],
    contentBlocks: [
      {
        title: 'Mục tiêu',
        items: [
          'Giảm dung lượng dùng không cần thiết trên thiết bị.',
          'Đảm bảo trải nghiệm học ngay cả khi không có mạng.',
        ],
      },
    ],
    toggleControls: [
      { id: 'wifiOnly', label: 'Chỉ tải qua Wi-Fi', description: 'Tránh dùng dữ liệu di động ngoài ý muốn.', defaultValue: true },
      { id: 'autoSubtitle', label: 'Tự tải phụ đề', description: 'Đồng bộ phụ đề cùng video đã tải.', defaultValue: true },
      { id: 'autoCleanup', label: 'Tự dọn dữ liệu cũ', description: 'Xóa các bài đã xem lâu ngày để tiết kiệm bộ nhớ.', defaultValue: false },
    ],
    choiceControl: {
      id: 'cleanupWindow',
      label: 'Chu kỳ dọn dữ liệu',
      description: 'Chọn khoảng thời gian trước khi xóa nội dung cũ.',
      defaultValue: '30d',
      options: [
        { id: '7d', label: '7 ngày', description: 'Dọn bộ nhớ nhanh, ít lưu nội dung.' },
        { id: '30d', label: '30 ngày', description: 'Cân bằng giữa tiện ích và dung lượng.' },
        { id: 'never', label: 'Không tự xóa', description: 'Bạn tự quyết định khi nào xóa nội dung.' },
      ],
    },
  },
  {
    id: 'classroom-controls',
    roles: ['teacher'],
    title: 'Quy trình lớp học',
    subtitle: 'Thiết lập tương tác với học viên',
    heroTitle: 'Vận hành lớp học nhất quán',
    heroDescription: 'Kiểm soát Q&A, phản hồi bài học và cách hiển thị đánh giá từ học viên.',
    icon: BookOpen,
    heroClassName: 'from-emerald-600 to-lime-500',
    summary: [
      { label: 'Q&A', value: 'Mở' },
      { label: 'Feedback', value: 'Cuối chương' },
      { label: 'Review', value: 'Kiểm duyệt tay' },
    ],
    contentBlocks: [
      {
        title: 'Tác động',
        items: [
          'Giúp giảng viên kiểm soát chất lượng tương tác và độ rõ ràng của lớp học.',
          'Giảm khối lượng việc thủ công khi số lượng học viên tăng.',
        ],
      },
    ],
    toggleControls: [
      { id: 'qaEnabled', label: 'Mở khu vực hỏi đáp', description: 'Cho phép học viên đặt câu hỏi trực tiếp trong bài học.', defaultValue: true },
      { id: 'reviewModeration', label: 'Kiểm duyệt đánh giá trước khi công khai', description: 'Giữ chất lượng review hiển thị trên khóa học.', defaultValue: true },
      { id: 'feedbackPrompt', label: 'Yêu cầu feedback cuối chương', description: 'Tự động hỏi phản hồi sau khi hoàn thành một chương.', defaultValue: false },
    ],
    choiceControl: {
      id: 'replyWindow',
      label: 'Cam kết phản hồi',
      description: 'Khung thời gian mục tiêu để trả lời câu hỏi học viên.',
      defaultValue: '12h',
      options: [
        { id: '24h', label: '24 giờ', description: 'Phù hợp lớp học lớn, ít phụ thuộc hỗ trợ trực tiếp.' },
        { id: '12h', label: '12 giờ', description: 'Cân bằng giữa tốc độ và tải vận hành.' },
        { id: '4h', label: '4 giờ', description: 'Phù hợp lớp premium hoặc mentoring.' },
      ],
    },
  },
  {
    id: 'payout-preferences',
    roles: ['teacher'],
    title: 'Thanh toán & đối soát',
    subtitle: 'Chu kỳ chi trả và thông báo tài chính',
    heroTitle: 'Quản lý dòng tiền giảng viên',
    heroDescription: 'Thiết lập nhắc doanh thu, hóa đơn và chu kỳ payout ở mức mô phỏng tĩnh.',
    icon: WalletCards,
    heroClassName: 'from-violet-600 to-purple-500',
    summary: [
      { label: 'Chu kỳ chi trả', value: 'Hàng tháng' },
      { label: 'Ngưỡng thông báo', value: '5 triệu' },
      { label: 'Hóa đơn email', value: 'Bật' },
    ],
    contentBlocks: [
      {
        title: 'Thiết lập chính',
        items: [
          'Chuẩn hóa nhịp chi trả giúp giảng viên kiểm soát kế hoạch tài chính.',
          'Nhắc doanh thu cao hỗ trợ phản ứng nhanh với biến động bán hàng.',
        ],
      },
    ],
    toggleControls: [
      { id: 'emailInvoice', label: 'Nhận hóa đơn qua email', description: 'Gửi bản đối soát tóm tắt sau mỗi kỳ.', defaultValue: true },
      { id: 'highBalanceAlert', label: 'Cảnh báo số dư cao', description: 'Nhắc khi doanh thu chờ rút vượt ngưỡng.', defaultValue: true },
      { id: 'monthlySummary', label: 'Báo cáo tổng cuối tháng', description: 'Tự động gửi báo cáo doanh thu, hoàn tiền và khuyến mãi.', defaultValue: true },
    ],
    choiceControl: {
      id: 'payoutCycle',
      label: 'Chu kỳ đối soát',
      description: 'Chọn nhịp muốn theo dõi payout mặc định.',
      defaultValue: 'monthly',
      options: [
        { id: 'biweekly', label: '2 tuần/lần', description: 'Phù hợp nếu bạn có nhiều giao dịch nhỏ.' },
        { id: 'monthly', label: 'Hàng tháng', description: 'Thiết lập gọn và dễ kiểm soát dòng tiền.' },
        { id: 'manual', label: 'Theo yêu cầu', description: 'Tự theo dõi, không nhắc cố định.' },
      ],
    },
  },
  {
    id: 'mentor-availability',
    roles: ['teacher'],
    title: 'Lịch hỗ trợ học viên',
    subtitle: 'Khung giờ và trạng thái mentor',
    heroTitle: 'Minh bạch thời gian hỗ trợ',
    heroDescription: 'Thiết lập trạng thái nhận lịch và thời gian phản hồi phù hợp cho học viên.',
    icon: Clock3,
    heroClassName: 'from-sky-600 to-indigo-500',
    summary: [
      { label: 'Đặt lịch 1-1', value: 'Cho phép' },
      { label: 'Cuối tuần', value: 'Tắt' },
      { label: 'DM trực tiếp', value: 'Bật' },
    ],
    contentBlocks: [
      {
        title: 'Lợi ích',
        items: [
          'Giúp học viên biết khi nào nên kỳ vọng phản hồi.',
          'Giảm số lượng yêu cầu gửi ngoài khung giờ bạn mong muốn.',
        ],
      },
    ],
    toggleControls: [
      { id: 'allowBooking', label: 'Cho phép đặt lịch 1-1', description: 'Hiển thị tùy chọn đặt lịch trực tiếp trong hồ sơ giảng viên.', defaultValue: true },
      { id: 'weekendSupport', label: 'Nhận hỗ trợ cuối tuần', description: 'Cho phép học viên gửi lịch ngoài ngày làm việc.', defaultValue: false },
      { id: 'directMessages', label: 'Mở tin nhắn trực tiếp', description: 'Cho phép học viên gửi tin nhắn riêng ngoài Q&A khóa học.', defaultValue: true },
    ],
    choiceControl: {
      id: 'availabilityStatus',
      label: 'Trạng thái mặc định',
      description: 'Chọn trạng thái hiển thị khi học viên xem hồ sơ.',
      defaultValue: 'available',
      options: [
        { id: 'available', label: 'Sẵn sàng', description: 'Khuyến khích học viên tương tác nhiều hơn.' },
        { id: 'limited', label: 'Giới hạn', description: 'Bạn chỉ hỗ trợ trong các khung cụ thể.' },
        { id: 'offline', label: 'Tạm đóng', description: 'Tạm dừng nhận yêu cầu mới.' },
      ],
    },
  },
  {
    id: 'moderation-rules',
    roles: ['admin'],
    title: 'Luật moderation',
    subtitle: 'Ưu tiên xử lý và cờ cảnh báo',
    heroTitle: 'Kiểm duyệt nhất quán hơn',
    heroDescription: 'Mô phỏng các quy tắc moderation giúp admin theo dõi cách nền tảng xử lý rủi ro nội dung.',
    icon: Shield,
    heroClassName: 'from-rose-600 to-orange-500',
    summary: [
      { label: 'Spam filter', value: 'Mức cao' },
      { label: 'Ưu tiên báo cáo', value: 'Realtime' },
      { label: 'Ẩn tự động', value: 'Có điều kiện' },
    ],
    contentBlocks: [
      {
        title: 'Nguyên tắc',
        items: [
          'Tối ưu để nội dung nhiều báo cáo không tiếp tục lan rộng khi chưa kiểm tra.',
          'Giảm áp lực xử lý thủ công cho đội moderation khi có spike report.',
        ],
      },
    ],
    toggleControls: [
      { id: 'autoFlagSpam', label: 'Tự gắn cờ spam', description: 'Đánh dấu nội dung nghi ngờ spam trước khi duyệt tay.', defaultValue: true },
      { id: 'autoHideRepeated', label: 'Ẩn nội dung bị báo lặp lại', description: 'Tạm ẩn nếu vượt ngưỡng báo cáo trong thời gian ngắn.', defaultValue: false },
      { id: 'priorityAlert', label: 'Cảnh báo báo cáo ưu tiên cao', description: 'Gửi cảnh báo khi có report liên quan thanh toán, lừa đảo hoặc trẻ vị thành niên.', defaultValue: true },
    ],
    choiceControl: {
      id: 'reviewMode',
      label: 'Chế độ ưu tiên',
      description: 'Quy định nhịp xử lý mặc định của hàng chờ moderation.',
      defaultValue: 'realtime',
      options: [
        { id: 'realtime', label: 'Theo thời gian thực', description: 'Xử lý ngay khi có tín hiệu quan trọng.' },
        { id: 'batch', label: 'Theo đợt trong ngày', description: 'Gom xử lý để cân bằng nguồn lực.' },
        { id: 'manual', label: 'Thủ công', description: 'Admin tự quyết định thứ tự xử lý.' },
      ],
    },
  },
  {
    id: 'system-alerts',
    roles: ['admin'],
    title: 'Cảnh báo hệ thống',
    subtitle: 'Theo dõi sự cố vận hành',
    heroTitle: 'Nhận tín hiệu rủi ro sớm hơn',
    heroDescription: 'Thiết lập cảnh báo về doanh thu, đăng nhập bất thường và hành vi lạm dụng nội dung.',
    icon: Siren,
    heroClassName: 'from-red-600 to-fuchsia-500',
    summary: [
      { label: 'Kênh mặc định', value: 'Dashboard' },
      { label: 'Cảnh báo auth', value: 'Bật' },
      { label: 'Revenue anomaly', value: 'Bật' },
    ],
    contentBlocks: [
      {
        title: 'Phạm vi',
        items: [
          'Dùng để mô phỏng kịch bản cảnh báo vận hành trước khi tích hợp monitoring thật.',
          'Giúp định hình rõ admin nào nên nhận loại cảnh báo nào.',
        ],
      },
    ],
    toggleControls: [
      { id: 'authFailures', label: 'Cảnh báo đăng nhập bất thường', description: 'Bật cảnh báo khi có nhiều lần đăng nhập thất bại liên tiếp.', defaultValue: true },
      { id: 'revenueAnomaly', label: 'Cảnh báo biến động doanh thu', description: 'Phát hiện doanh thu tăng/giảm bất thường theo ngưỡng.', defaultValue: true },
      { id: 'abuseSpike', label: 'Cảnh báo tăng đột biến báo cáo', description: 'Thông báo khi số report hoặc khóa tài khoản tăng nhanh.', defaultValue: true },
    ],
    choiceControl: {
      id: 'alertChannel',
      label: 'Kênh ưu tiên',
      description: 'Chọn nơi hệ thống sẽ ưu tiên hiển thị cảnh báo.',
      defaultValue: 'dashboard',
      options: [
        { id: 'dashboard', label: 'Dashboard nội bộ', description: 'Theo dõi trực tiếp trong khu vực quản trị.' },
        { id: 'email', label: 'Email', description: 'Phù hợp khi cần có bản ghi dễ chuyển tiếp.' },
        { id: 'slack', label: 'Slack/Chat nội bộ', description: 'Phù hợp khi đội vận hành làm việc realtime.' },
      ],
    },
  },
  {
    id: 'access-audit',
    roles: ['admin'],
    title: 'Audit & truy cập',
    subtitle: 'Nhật ký hành động và retention',
    heroTitle: 'Kiểm soát hành vi quản trị',
    heroDescription: 'Thiết lập mô phỏng để quản lý log thao tác admin, cảnh báo IP lạ và chu kỳ lưu vết.',
    icon: Eye,
    heroClassName: 'from-slate-700 to-slate-500',
    summary: [
      { label: 'Log admin', value: 'Đang bật' },
      { label: 'IP anomaly', value: 'Theo dõi' },
      { label: 'Lưu trữ log', value: '90 ngày' },
    ],
    contentBlocks: [
      {
        title: 'Kết quả mong muốn',
        items: [
          'Tăng khả năng truy vết khi có thay đổi nhạy cảm trong hệ thống.',
          'Giảm rủi ro thao tác sai mà không có log hỗ trợ kiểm tra lại.',
        ],
      },
    ],
    toggleControls: [
      { id: 'adminActionLog', label: 'Log thao tác quản trị', description: 'Ghi lại hành động tạo, xóa, khóa tài khoản và thay đổi quyền.', defaultValue: true },
      { id: 'weeklyAuditSummary', label: 'Tóm tắt audit hằng tuần', description: 'Gửi bản tổng hợp để rà soát bất thường định kỳ.', defaultValue: true },
      { id: 'ipAnomalyAlert', label: 'Cảnh báo IP bất thường', description: 'Thông báo khi tài khoản admin đăng nhập từ IP hoặc vị trí lạ.', defaultValue: true },
    ],
    choiceControl: {
      id: 'auditRetention',
      label: 'Chu kỳ lưu log',
      description: 'Xác định thời gian lưu nhật ký quản trị mặc định.',
      defaultValue: '90d',
      options: [
        { id: '30d', label: '30 ngày', description: 'Gọn nhẹ, phù hợp môi trường nhỏ.' },
        { id: '90d', label: '90 ngày', description: 'Cân bằng giữa truy vết và chi phí lưu trữ.' },
        { id: '180d', label: '180 ngày', description: 'Ưu tiên điều tra dài hạn và compliance.' },
      ],
    },
  },
  {
    id: 'terms',
    roles: ['student', 'teacher', 'admin'],
    title: 'Điều khoản sử dụng',
    subtitle: 'Tóm tắt quy định nền tảng',
    heroTitle: 'Điều khoản áp dụng cho tài khoản',
    heroDescription: 'Nội dung tĩnh để người dùng xem nhanh các quy tắc chính khi sử dụng nền tảng.',
    icon: FileText,
    heroClassName: 'from-slate-700 to-slate-500',
    summary: [
      { label: 'Phiên bản', value: 'v1.0' },
      { label: 'Cập nhật', value: '05/05/2026' },
      { label: 'Hiệu lực', value: 'Ngay lập tức' },
    ],
    contentBlocks: [
      {
        title: 'Quy tắc tài khoản',
        items: [
          'Người dùng chịu trách nhiệm với nội dung và hành vi phát sinh từ tài khoản của mình.',
          'Nền tảng có quyền hạn chế hoặc khóa tài khoản khi phát hiện vi phạm nghiêm trọng.',
        ],
      },
      {
        title: 'Nội dung và thanh toán',
        items: [
          'Khóa học, gói dịch vụ và hoàn tiền tuân theo chính sách đang công bố tại thời điểm giao dịch.',
          'Nội dung thuộc bản quyền của giảng viên hoặc nền tảng, không được phát tán trái phép.',
        ],
      },
    ],
    readOnly: true,
  },
  {
    id: 'privacy',
    roles: ['student', 'teacher', 'admin'],
    title: 'Chính sách bảo mật',
    subtitle: 'Dữ liệu được lưu và sử dụng ra sao',
    heroTitle: 'Bảo vệ dữ liệu người dùng',
    heroDescription: 'Màn hình tĩnh mô tả cách hệ thống thu thập, dùng và bảo vệ dữ liệu tài khoản.',
    icon: FileText,
    heroClassName: 'from-cyan-700 to-blue-600',
    summary: [
      { label: 'Dữ liệu hồ sơ', value: 'Có lưu' },
      { label: 'Lịch sử học tập', value: 'Có lưu' },
      { label: 'Chia sẻ bên thứ ba', value: 'Có kiểm soát' },
    ],
    contentBlocks: [
      {
        title: 'Nhóm dữ liệu lưu trữ',
        items: [
          'Thông tin hồ sơ, lịch sử học tập, báo cáo hỗ trợ và dữ liệu thanh toán ở mức cần thiết.',
          'Một số sự kiện vận hành có thể được lưu để phục vụ audit và cải thiện chất lượng hệ thống.',
        ],
      },
      {
        title: 'Nguyên tắc sử dụng',
        items: [
          'Dữ liệu chỉ được dùng cho vận hành, hỗ trợ, phân tích sản phẩm và bảo mật nền tảng.',
          'Chỉ chia sẻ với bên thứ ba khi cần cho xử lý thanh toán, lưu trữ hoặc yêu cầu pháp lý.',
        ],
      },
    ],
    readOnly: true,
  },
];

export function getSettingDetail(settingId: string | undefined, role: UserRole) {
  if (!settingId) {
    return null;
  }

  return (
    allSettingDetails.find(
      (detail) => detail.id === settingId && detail.roles.includes(role),
    ) ?? null
  );
}
