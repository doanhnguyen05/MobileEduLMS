const evidenceImage1 =
  'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=800&h=600&fit=crop';
const evidenceImage2 =
  'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=600&fit=crop';
const evidenceImage3 =
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop';

export type ReportStatus = 'pending' | 'reviewing' | 'resolved' | 'rejected';

export interface ReportAttachment {
  id: string;
  name: string;
  url: string;
}

export interface UserReport {
  id: string;
  reportedItem: string;
  reason: string;
  type: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt?: string;
  adminNote?: string;
  description: string;
  attachments: ReportAttachment[];
}

const USER_REPORTS_STORAGE_KEY = 'mobileEduLMS.userReports';

const defaultReports: UserReport[] = [
  {
    id: 'RPT-12345678',
    reportedItem: 'Khóa học React Native',
    reason: 'Nội dung không phù hợp',
    type: 'course',
    status: 'reviewing',
    createdAt: '2026-04-20T10:30:00',
    updatedAt: '2026-04-20T14:15:00',
    description: 'Khóa học có một số đoạn mô tả và ví dụ minh họa chưa phù hợp với người học mới bắt đầu. Mình đã đánh dấu các bài có nội dung gây hiểu nhầm và đính kèm ảnh chụp để đội ngũ kiểm duyệt xem lại.',
    attachments: [
      { id: 'att-1', name: 'bang-chung-khoa-hoc-1.png', url: evidenceImage1 },
      { id: 'att-2', name: 'bang-chung-khoa-hoc-2.png', url: evidenceImage2 },
    ],
  },
  {
    id: 'RPT-87654321',
    reportedItem: 'Bình luận vi phạm',
    reason: 'Ngôn từ gây thù ghét',
    type: 'comment',
    status: 'resolved',
    createdAt: '2026-04-18T09:20:00',
    updatedAt: '2026-04-19T16:45:00',
    adminNote: 'Đã xử lý và xóa bình luận vi phạm. Tài khoản liên quan đã bị nhắc nhở theo quy định cộng đồng.',
    description: 'Người dùng để lại bình luận với nội dung công kích cá nhân và dùng ngôn từ gây thù ghét trong phần đánh giá khóa học. Nội dung xuất hiện lặp lại ở nhiều bài viết.',
    attachments: [
      { id: 'att-3', name: 'binh-luan-vi-pham.png', url: evidenceImage3 },
    ],
  },
  {
    id: 'RPT-11223344',
    reportedItem: 'Đánh giá spam',
    reason: 'Spam hoặc quảng cáo',
    type: 'review',
    status: 'pending',
    createdAt: '2026-04-21T08:15:00',
    description: 'Đánh giá chứa nhiều đường link quảng cáo bên ngoài nền tảng và không phản ánh trải nghiệm học tập thực tế. Mình gửi báo cáo để đội ngũ kiểm tra tính hợp lệ.',
    attachments: [],
  },
  {
    id: 'RPT-55667788',
    reportedItem: 'GV. Nguyễn Văn A',
    reason: 'Hành vi không phù hợp',
    type: 'teacher',
    status: 'rejected',
    createdAt: '2026-04-15T14:30:00',
    updatedAt: '2026-04-16T10:00:00',
    adminNote: 'Hiện chưa đủ bằng chứng trực tiếp để xử lý. Nếu có thêm hình ảnh hoặc tin nhắn cụ thể, bạn có thể gửi bổ sung.',
    description: 'Mình nghi ngờ giảng viên có cách phản hồi chưa phù hợp trong phần bình luận, tuy nhiên bằng chứng hiện tại chưa đủ mạnh để xác nhận đầy đủ bối cảnh sự việc.',
    attachments: [
      { id: 'att-4', name: 'trao-doi-giang-vien.png', url: evidenceImage2 },
    ],
  },
];

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function formatReportDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString('vi-VN');
}

export function getReportTypeLabel(type: string) {
  switch (type) {
    case 'course':
      return 'Khóa học';
    case 'teacher':
      return 'Giảng viên';
    case 'student':
      return 'Học viên';
    case 'comment':
      return 'Bình luận';
    case 'review':
      return 'Đánh giá';
    default:
      return type;
  }
}

function writeReports(reports: UserReport[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(USER_REPORTS_STORAGE_KEY, JSON.stringify(reports));
}

export function getUserReports() {
  if (!canUseStorage()) {
    return defaultReports;
  }

  const rawValue = window.localStorage.getItem(USER_REPORTS_STORAGE_KEY);
  if (!rawValue) {
    writeReports(defaultReports);
    return defaultReports;
  }

  try {
    const parsed = JSON.parse(rawValue) as UserReport[];
    if (!Array.isArray(parsed)) {
      writeReports(defaultReports);
      return defaultReports;
    }

    return parsed;
  } catch (error) {
    console.error('Could not parse stored reports:', error);
    writeReports(defaultReports);
    return defaultReports;
  }
}

export function getUserReportById(reportId: string) {
  return getUserReports().find((report) => report.id === reportId);
}

interface CreateUserReportInput {
  reportedItem: string;
  reason: string;
  type: string;
  description: string;
  attachments?: ReportAttachment[];
}

export function createUserReport(input: CreateUserReportInput) {
  const now = new Date().toISOString();
  const report: UserReport = {
    id: `RPT-${Date.now().toString().slice(-8)}`,
    reportedItem: input.reportedItem,
    reason: input.reason,
    type: input.type,
    status: 'pending',
    createdAt: now,
    description: input.description,
    attachments: input.attachments ?? [],
  };

  const nextReports = [report, ...getUserReports()];
  writeReports(nextReports);
  return report;
}
