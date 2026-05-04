import {
  formatReportDate,
  getReportTypeLabel,
  getUserReports,
  type ReportStatus,
  type UserReport,
} from '../../../reports/data/reportStore';

const evidenceImage1 =
  'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=800&h=600&fit=crop';
const evidenceImage2 =
  'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=600&fit=crop';
const evidenceImage3 =
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop';

export type AdminReportPriority = 'low' | 'medium' | 'high' | 'urgent';
export type AdminTimelineTone = 'default' | 'warning' | 'success' | 'danger';

export interface AdminReportEvidence {
  id: string;
  name: string;
  url: string;
  caption: string;
}

export interface AdminReportTimelineEntry {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  tone: AdminTimelineTone;
}

export interface AdminReportRecord {
  id: string;
  type: string;
  reportedItem: string;
  reportedBy: string;
  reason: string;
  status: ReportStatus;
  priority: AdminReportPriority;
  createdAt: string;
  updatedAt?: string;
  description: string;
  summary: string;
  suggestedAction: string;
  adminNote: string;
  evidence: AdminReportEvidence[];
  timeline: AdminReportTimelineEntry[];
}

interface AdminReportOverride {
  status: ReportStatus;
  adminNote: string;
  updatedAt: string;
  timeline: AdminReportTimelineEntry[];
}

const ADMIN_REPORT_OVERRIDE_STORAGE_KEY = 'mobileEduLMS.adminReportOverrides';

const seedReports: AdminReportRecord[] = [
  {
    id: 'RPT-00001',
    type: 'course',
    reportedItem: 'Khóa học React Native',
    reportedBy: 'Nguyễn Văn A',
    reason: 'Nội dung không phù hợp',
    status: 'pending',
    priority: 'high',
    createdAt: '2026-04-20T10:30:00',
    description:
      'Người dùng phản ánh một số phần minh họa trong khóa học React Native có nội dung gây hiểu nhầm cho học viên mới và có đoạn ví dụ chưa phù hợp với ngữ cảnh học tập.',
    summary:
      'Báo cáo liên quan tới nội dung bài học và ảnh chụp minh chứng của 2 bài giảng trong cùng một khóa học.',
    suggestedAction:
      'Rà soát lại 2 bài học bị báo cáo, liên hệ giảng viên để chỉnh sửa nội dung và tạm ẩn bài học nếu xác nhận có vi phạm.',
    adminNote: 'Chưa có ghi chú xử lý.',
    evidence: [
      {
        id: 'admin-att-1',
        name: 'react-native-slide-1.png',
        url: evidenceImage1,
        caption: 'Ảnh chụp bài giảng có nội dung gây hiểu nhầm ở phần ví dụ.',
      },
      {
        id: 'admin-att-2',
        name: 'react-native-slide-2.png',
        url: evidenceImage2,
        caption: 'Ảnh chụp phần mô tả khóa học mà người dùng cho là chưa phù hợp.',
      },
    ],
    timeline: [
      {
        id: 'admin-tl-1',
        title: 'Người dùng gửi báo cáo',
        description: 'Báo cáo mới được tạo từ ứng dụng học viên và chuyển đến hàng đợi kiểm duyệt.',
        createdAt: '2026-04-20T10:30:00',
        tone: 'warning',
      },
    ],
  },
  {
    id: 'RPT-00002',
    type: 'teacher',
    reportedItem: 'GV. Trần Thị B',
    reportedBy: 'Lê Văn C',
    reason: 'Ngôn từ gây thù ghét',
    status: 'reviewing',
    priority: 'urgent',
    createdAt: '2026-04-20T09:15:00',
    updatedAt: '2026-04-20T11:45:00',
    description:
      'Người báo cáo cho biết giảng viên đã sử dụng ngôn từ công kích trong phần thảo luận buổi học trực tuyến. Hệ thống ghi nhận kèm ảnh chụp tin nhắn và thời gian diễn ra.',
    summary:
      'Báo cáo mức độ khẩn, ảnh hưởng trực tiếp đến trải nghiệm học viên trong lớp học trực tuyến.',
    suggestedAction:
      'Kiểm tra lại lịch sử trò chuyện, phỏng vấn nhanh các bên liên quan và tạm thời khóa quyền chat của giảng viên nếu xác minh có vi phạm.',
    adminNote: 'Đã chuyển hồ sơ cho nhóm kiểm duyệt cấp cao để đánh giá thêm.',
    evidence: [
      {
        id: 'admin-att-3',
        name: 'teacher-chat.png',
        url: evidenceImage3,
        caption: 'Ảnh chụp đoạn hội thoại trong lớp học trực tuyến.',
      },
    ],
    timeline: [
      {
        id: 'admin-tl-2',
        title: 'Người dùng gửi báo cáo',
        description: 'Hệ thống ghi nhận tố cáo về hành vi giao tiếp không phù hợp của giảng viên.',
        createdAt: '2026-04-20T09:15:00',
        tone: 'warning',
      },
      {
        id: 'admin-tl-3',
        title: 'Admin tiếp nhận hồ sơ',
        description: 'Hồ sơ được chuyển sang trạng thái đang xem xét để đối chiếu lịch sử trao đổi.',
        createdAt: '2026-04-20T11:45:00',
        tone: 'default',
      },
    ],
  },
  {
    id: 'RPT-00003',
    type: 'comment',
    reportedItem: 'Bình luận khóa học Python',
    reportedBy: 'Phạm Thị D',
    reason: 'Spam hoặc quảng cáo',
    status: 'resolved',
    priority: 'low',
    createdAt: '2026-04-19T16:45:00',
    updatedAt: '2026-04-19T18:00:00',
    description:
      'Bình luận chứa nhiều liên kết ngoài nền tảng và nội dung quảng cáo lặp lại ở nhiều bài học.',
    summary:
      'Trường hợp spam rõ ràng, ít ảnh hưởng diện rộng và đã có đủ bằng chứng từ hệ thống.',
    suggestedAction:
      'Gỡ bình luận, cảnh báo tài khoản vi phạm và ghi nhận vào lịch sử kiểm duyệt.',
    adminNote: 'Đã xóa bình luận và gửi cảnh báo đến tài khoản liên quan.',
    evidence: [
      {
        id: 'admin-att-4',
        name: 'spam-comment.png',
        url: evidenceImage2,
        caption: 'Ảnh chụp bình luận spam trước khi bị gỡ khỏi hệ thống.',
      },
    ],
    timeline: [
      {
        id: 'admin-tl-4',
        title: 'Người dùng gửi báo cáo',
        description: 'Báo cáo bình luận spam được ghi nhận trong hàng đợi kiểm duyệt.',
        createdAt: '2026-04-19T16:45:00',
        tone: 'warning',
      },
      {
        id: 'admin-tl-5',
        title: 'Đã giải quyết',
        description: 'Admin xác minh vi phạm, gỡ bình luận và gửi cảnh báo đến tài khoản liên quan.',
        createdAt: '2026-04-19T18:00:00',
        tone: 'success',
      },
    ],
  },
  {
    id: 'RPT-00004',
    type: 'review',
    reportedItem: 'Đánh giá khóa học JavaScript',
    reportedBy: 'Hoàng Văn E',
    reason: 'Lừa đảo',
    status: 'rejected',
    priority: 'medium',
    createdAt: '2026-04-19T14:20:00',
    updatedAt: '2026-04-19T17:10:00',
    description:
      'Báo cáo cho rằng đánh giá khóa học là giả mạo, tuy nhiên dữ liệu truy vết chưa cho thấy dấu hiệu gian lận rõ ràng.',
    summary:
      'Hồ sơ chưa có đủ bằng chứng để kết luận vi phạm, cần giữ lại lịch sử kiểm tra để đối chiếu trong tương lai.',
    suggestedAction:
      'Lưu hồ sơ, tiếp tục theo dõi tài khoản và yêu cầu người báo cáo bổ sung minh chứng nếu có.',
    adminNote: 'Đã từ chối do chưa đủ bằng chứng trực tiếp.',
    evidence: [],
    timeline: [
      {
        id: 'admin-tl-6',
        title: 'Người dùng gửi báo cáo',
        description: 'Đánh giá bị tố là giả mạo và có dấu hiệu thao túng niềm tin người dùng.',
        createdAt: '2026-04-19T14:20:00',
        tone: 'warning',
      },
      {
        id: 'admin-tl-7',
        title: 'Từ chối báo cáo',
        description: 'Admin đối chiếu dữ liệu, kết luận hiện chưa có căn cứ đủ mạnh để xử lý.',
        createdAt: '2026-04-19T17:10:00',
        tone: 'danger',
      },
    ],
  },
  {
    id: 'RPT-00005',
    type: 'student',
    reportedItem: 'HV. Vũ Thị F',
    reportedBy: 'GV. Ngô Văn G',
    reason: 'Bạo lực hoặc đe dọa',
    status: 'pending',
    priority: 'high',
    createdAt: '2026-04-18T11:00:00',
    description:
      'Giảng viên phản ánh học viên có hành vi đe dọa trong tin nhắn riêng sau khi bị nhắc nhở về bài tập và thái độ trong lớp.',
    summary:
      'Báo cáo liên quan đến an toàn cộng đồng, cần ưu tiên kiểm tra sớm dù chưa có quyết định xử lý.',
    suggestedAction:
      'Đối chiếu tin nhắn riêng, tạm đóng quyền nhắn tin nếu có dấu hiệu leo thang và chủ động liên hệ hai bên.',
    adminNote: 'Chờ nhóm vận hành xác minh nội dung tin nhắn riêng.',
    evidence: [
      {
        id: 'admin-att-5',
        name: 'private-message.png',
        url: evidenceImage1,
        caption: 'Ảnh chụp một phần hội thoại được gửi kèm trong báo cáo.',
      },
    ],
    timeline: [
      {
        id: 'admin-tl-8',
        title: 'Giảng viên gửi báo cáo',
        description: 'Báo cáo về hành vi đe dọa của học viên được tạo từ dashboard giảng viên.',
        createdAt: '2026-04-18T11:00:00',
        tone: 'warning',
      },
    ],
  },
];

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readOverrides() {
  if (!canUseStorage()) {
    return {} as Record<string, AdminReportOverride>;
  }

  const rawValue = window.localStorage.getItem(ADMIN_REPORT_OVERRIDE_STORAGE_KEY);
  if (!rawValue) {
    return {} as Record<string, AdminReportOverride>;
  }

  try {
    return JSON.parse(rawValue) as Record<string, AdminReportOverride>;
  } catch (error) {
    console.error('Could not parse stored admin report overrides:', error);
    return {} as Record<string, AdminReportOverride>;
  }
}

function writeOverrides(overrides: Record<string, AdminReportOverride>) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(ADMIN_REPORT_OVERRIDE_STORAGE_KEY, JSON.stringify(overrides));
}

function inferPriority(report: UserReport): AdminReportPriority {
  if (report.type === 'teacher' || report.type === 'student') {
    return 'high';
  }

  if (report.attachments.length > 0) {
    return 'high';
  }

  if (report.type === 'comment' || report.type === 'review') {
    return 'medium';
  }

  return 'medium';
}

function buildUserReportTimeline(report: UserReport): AdminReportTimelineEntry[] {
  const entries: AdminReportTimelineEntry[] = [
    {
      id: `${report.id}-submitted`,
      title: 'Người dùng gửi báo cáo',
      description: `Báo cáo ${getReportTypeLabel(report.type).toLowerCase()} được ghi nhận từ phần cài đặt hoặc lớp học.`,
      createdAt: report.createdAt,
      tone: 'warning',
    },
  ];

  if (report.updatedAt) {
    entries.unshift({
      id: `${report.id}-updated`,
      title: 'Hệ thống ghi nhận cập nhật hồ sơ',
      description: 'Báo cáo đã được đồng bộ sang trung tâm kiểm duyệt để tiếp tục xử lý.',
      createdAt: report.updatedAt,
      tone: 'default',
    });
  }

  return entries;
}

function mapUserReportToAdmin(report: UserReport): AdminReportRecord {
  return {
    id: report.id,
    type: report.type,
    reportedItem: report.reportedItem,
    reportedBy: 'Người dùng hiện tại',
    reason: report.reason,
    status: report.status,
    priority: inferPriority(report),
    createdAt: report.createdAt,
    updatedAt: report.updatedAt,
    description: report.description,
    summary: `Báo cáo do người dùng gửi về ${getReportTypeLabel(report.type).toLowerCase()} với ${report.attachments.length} minh chứng kèm theo.`,
    suggestedAction:
      report.status === 'pending'
        ? 'Kiểm tra nhanh minh chứng và chuyển hồ sơ sang trạng thái đang xem xét nếu cần xác minh thêm.'
        : 'Đối chiếu kết quả xử lý hiện tại và phản hồi lại cho người dùng nếu cần bổ sung thông tin.',
    adminNote: report.adminNote || 'Chưa có ghi chú xử lý.',
    evidence: report.attachments.map((attachment) => ({
      id: attachment.id,
      name: attachment.name,
      url: attachment.url,
      caption: `Minh chứng do người dùng gửi: ${attachment.name}`,
    })),
    timeline: buildUserReportTimeline(report),
  };
}

function mergeWithUserReports() {
  const reports = [...seedReports];
  const existingIds = new Set(reports.map((report) => report.id));

  getUserReports().forEach((userReport) => {
    if (!existingIds.has(userReport.id)) {
      reports.unshift(mapUserReportToAdmin(userReport));
    }
  });

  return reports;
}

export function getAdminReports() {
  const overrides = readOverrides();

  return mergeWithUserReports().map((report) => {
    const override = overrides[report.id];
    if (!override) {
      return report;
    }

    return {
      ...report,
      status: override.status,
      adminNote: override.adminNote,
      updatedAt: override.updatedAt,
      timeline: override.timeline,
    };
  });
}

export function getAdminReportById(reportId?: string) {
  if (!reportId) {
    return undefined;
  }

  return getAdminReports().find((report) => report.id === reportId);
}

export function getAdminReportStatusLabel(status: ReportStatus) {
  switch (status) {
    case 'pending':
      return 'Chờ xử lý';
    case 'reviewing':
      return 'Đang xem xét';
    case 'resolved':
      return 'Đã giải quyết';
    case 'rejected':
      return 'Từ chối';
    default:
      return status;
  }
}

export function getAdminReportPriorityLabel(priority: AdminReportPriority) {
  switch (priority) {
    case 'urgent':
      return 'Khẩn cấp';
    case 'high':
      return 'Cao';
    case 'medium':
      return 'Trung bình';
    case 'low':
      return 'Thấp';
    default:
      return priority;
  }
}

export function formatAdminReportDate(value: string) {
  return formatReportDate(value);
}

export function updateAdminReport(
  reportId: string,
  updates: { status: ReportStatus; adminNote: string },
) {
  const currentReport = getAdminReportById(reportId);
  if (!currentReport) {
    return undefined;
  }

  const now = new Date().toISOString();
  const overrides = readOverrides();
  const nextTimelineEntry: AdminReportTimelineEntry = {
    id: `${reportId}-update-${Date.now()}`,
    title: `Admin cập nhật trạng thái: ${getAdminReportStatusLabel(updates.status)}`,
    description:
      updates.adminNote.trim() || 'Hồ sơ báo cáo đã được cập nhật từ trang quản trị.',
    createdAt: now,
    tone:
      updates.status === 'resolved'
        ? 'success'
        : updates.status === 'rejected'
          ? 'danger'
          : updates.status === 'reviewing'
            ? 'default'
            : 'warning',
  };

  overrides[reportId] = {
    status: updates.status,
    adminNote: updates.adminNote.trim() || 'Chưa có ghi chú xử lý.',
    updatedAt: now,
    timeline: [nextTimelineEntry, ...currentReport.timeline],
  };

  writeOverrides(overrides);
  return getAdminReportById(reportId);
}
