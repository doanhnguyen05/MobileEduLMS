import type { UserRole } from '../../../entities/user';

export type ChatSender = 'me' | 'other';
type ChatRole = Extract<UserRole, 'student' | 'teacher'>;

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  text: string;
  createdAt: string;
}

export interface ChatConversation {
  id: string;
  recipient: string;
  role: string;
  avatar: string;
  course?: string;
  unread: boolean;
  messages: ChatMessage[];
}

export interface ChatConversationSummary {
  id: string;
  sender: string;
  role: string;
  avatar: string;
  course?: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

const CHAT_STORAGE_KEY_PREFIX = 'mobileEduLMS.chatConversations';

function resolveChatRole(role?: UserRole): ChatRole {
  return role === 'teacher' ? 'teacher' : 'student';
}

function getStorageKey(role?: UserRole) {
  return `${CHAT_STORAGE_KEY_PREFIX}.${resolveChatRole(role)}`;
}

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function createMessage(
  id: string,
  sender: ChatSender,
  text: string,
  createdAt: string,
): ChatMessage {
  return { id, sender, text, createdAt };
}

function getStudentSeeds(): ChatConversation[] {
  return [
    {
      id: '1',
      recipient: 'Nguyễn Thị Mai',
      role: 'Giảng viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
      course: 'React Native Cơ Bản',
      unread: true,
      messages: [
        createMessage('1-1', 'other', 'Xin chào! Cho em hỏi về bài tập ở phần State và Props được không ạ?', '2026-05-15T10:30:00'),
        createMessage('1-2', 'me', 'Chào cô, em đang bị nhầm giữa State và Props.', '2026-05-15T10:32:00'),
        createMessage('1-3', 'other', 'State là dữ liệu nội bộ có thể thay đổi, còn Props là dữ liệu truyền từ component cha xuống component con.', '2026-05-15T10:35:00'),
        createMessage('1-4', 'other', 'Em thử xem lại ví dụ counter trong bài 4, nếu vẫn vướng thì gửi đoạn code cô xem tiếp nhé.', '2026-05-15T10:40:00'),
      ],
    },
    {
      id: '2',
      recipient: 'Trần Văn Long',
      role: 'Giảng viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2',
      course: 'Flutter Advanced',
      unread: false,
      messages: [
        createMessage('2-1', 'other', 'Bài tập BLoC của em đã nộp đúng yêu cầu.', '2026-05-15T09:10:00'),
        createMessage('2-2', 'me', 'Cảm ơn thầy đã giải đáp thắc mắc!', '2026-05-15T09:20:00'),
      ],
    },
    {
      id: '3',
      recipient: 'Admin',
      role: 'Admin',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user3',
      unread: true,
      messages: [
        createMessage('3-1', 'other', 'Thông báo: Hệ thống sẽ bảo trì vào 22:00 hôm nay.', '2026-05-15T08:00:00'),
      ],
    },
    {
      id: '4',
      recipient: 'Lê Minh Tuấn',
      role: 'Giảng viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user4',
      course: 'Swift UI Fundamentals',
      unread: false,
      messages: [
        createMessage('4-1', 'me', 'Em đã hoàn thành dự án cuối khóa!', '2026-05-14T16:30:00'),
        createMessage('4-2', 'other', 'Tốt, em kiểm tra lại phần navigation trước khi nộp chính thức nhé.', '2026-05-14T17:00:00'),
      ],
    },
    {
      id: '5',
      recipient: 'Phạm Thị Hương',
      role: 'Giảng viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user5',
      course: 'Kotlin for Android',
      unread: false,
      messages: [
        createMessage('5-1', 'me', 'Thầy cô có thể giới thiệu thêm tài liệu học không ạ?', '2026-05-13T20:00:00'),
        createMessage('5-2', 'other', 'Em đọc thêm Android Developers Codelabs phần Jetpack trước nhé.', '2026-05-13T21:05:00'),
      ],
    },
  ];
}

function getTeacherSeeds(): ChatConversation[] {
  return [
    {
      id: '1',
      recipient: 'Nguyễn Văn A',
      role: 'Học viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      course: 'React Native Cơ Bản',
      unread: true,
      messages: [
        createMessage('t1-1', 'other', 'Cho em hỏi về bài tập ở phần State và Props được không ạ?', '2026-05-15T10:30:00'),
        createMessage('t1-2', 'me', 'Chào bạn! Tất nhiên rồi, bạn cứ hỏi nhé.', '2026-05-15T10:32:00'),
        createMessage('t1-3', 'other', 'Em không hiểu rõ sự khác nhau giữa State và Props.', '2026-05-15T10:35:00'),
      ],
    },
    {
      id: '2',
      recipient: 'Trần Thị B',
      role: 'Học viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      course: 'React Native Nâng Cao',
      unread: false,
      messages: [
        createMessage('t2-1', 'other', 'Cảm ơn thầy đã giải đáp thắc mắc!', '2026-05-15T09:30:00'),
      ],
    },
    {
      id: '3',
      recipient: 'Lê Văn C',
      role: 'Học viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
      course: 'React Native Cơ Bản',
      unread: true,
      messages: [
        createMessage('t3-1', 'other', 'Video bài 5 không load được, thầy kiểm tra giúp em với ạ.', '2026-05-15T08:15:00'),
      ],
    },
    {
      id: '4',
      recipient: 'Phạm Thị D',
      role: 'Học viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
      course: 'React Native Nâng Cao',
      unread: false,
      messages: [
        createMessage('t4-1', 'other', 'Em đã hoàn thành dự án cuối khóa!', '2026-05-14T15:00:00'),
      ],
    },
    {
      id: '5',
      recipient: 'Hoàng Văn E',
      role: 'Học viên',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5',
      course: 'React Native Cơ Bản',
      unread: false,
      messages: [
        createMessage('t5-1', 'other', 'Thầy có thể giới thiệu thêm tài liệu học không ạ?', '2026-05-13T19:00:00'),
      ],
    },
  ];
}

function getSeedConversations(role?: UserRole) {
  return resolveChatRole(role) === 'teacher' ? getTeacherSeeds() : getStudentSeeds();
}

function readStoredConversations(role?: UserRole): ChatConversation[] | null {
  if (!canUseStorage()) {
    return null;
  }

  const rawValue = window.localStorage.getItem(getStorageKey(role));
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as ChatConversation[];
    return Array.isArray(parsed) ? parsed : null;
  } catch (error) {
    console.error('Could not parse stored chat conversations:', error);
    return null;
  }
}

function writeConversations(role: UserRole | undefined, conversations: ChatConversation[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(getStorageKey(role), JSON.stringify(conversations));
}

function mergeWithSeeds(role?: UserRole, storedConversations?: ChatConversation[] | null) {
  const seeds = getSeedConversations(role);
  if (!storedConversations) {
    return seeds;
  }

  const storedById = new Map(storedConversations.map((conversation) => [conversation.id, conversation]));
  const seedIds = new Set(seeds.map((conversation) => conversation.id));
  const mergedSeeds = seeds.map((seed) => {
    const stored = storedById.get(seed.id);
    if (!stored) {
      return seed;
    }

    return {
      ...seed,
      unread: stored.unread,
      messages: stored.messages.length > 0 ? stored.messages : seed.messages,
    };
  });

  const customConversations = storedConversations.filter((conversation) => !seedIds.has(conversation.id));
  return [...mergedSeeds, ...customConversations];
}

export function getConversations(role?: UserRole) {
  const storedConversations = readStoredConversations(role);
  const conversations = mergeWithSeeds(role, storedConversations);

  if (!storedConversations) {
    writeConversations(role, conversations);
  }

  return conversations;
}

export function getConversationById(role: UserRole | undefined, conversationId?: string) {
  return getConversations(role).find((conversation) => conversation.id === conversationId);
}

export function formatChatTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

export function formatConversationTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  if (isToday) {
    return formatChatTime(value);
  }

  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
}

export function getConversationSummaries(role?: UserRole): ChatConversationSummary[] {
  return getConversations(role).map((conversation) => {
    const lastMessage = conversation.messages.at(-1);

    return {
      id: conversation.id,
      sender: conversation.recipient,
      role: conversation.role,
      avatar: conversation.avatar,
      course: conversation.course,
      lastMessage: lastMessage?.text ?? 'Chưa có tin nhắn',
      time: lastMessage ? formatConversationTime(lastMessage.createdAt) : '',
      unread: conversation.unread,
    };
  });
}

export function markConversationRead(role: UserRole | undefined, conversationId?: string) {
  if (!conversationId) {
    return undefined;
  }

  const conversations = getConversations(role);
  let updatedConversation: ChatConversation | undefined;
  const nextConversations = conversations.map((conversation) => {
    if (conversation.id !== conversationId) {
      return conversation;
    }

    updatedConversation = { ...conversation, unread: false };
    return updatedConversation;
  });

  writeConversations(role, nextConversations);
  return updatedConversation;
}

export function sendChatMessage(role: UserRole | undefined, conversationId: string | undefined, text: string) {
  const trimmedText = text.trim();
  if (!conversationId || !trimmedText) {
    return undefined;
  }

  const conversations = getConversations(role);
  let updatedConversation: ChatConversation | undefined;
  const now = new Date().toISOString();
  const outgoingMessage: ChatMessage = {
    id: `msg-${Date.now()}`,
    sender: 'me',
    text: trimmedText,
    createdAt: now,
  };

  const nextConversations = conversations.map((conversation) => {
    if (conversation.id !== conversationId) {
      return conversation;
    }

    updatedConversation = {
      ...conversation,
      unread: false,
      messages: [...conversation.messages, outgoingMessage],
    };
    return updatedConversation;
  });

  writeConversations(role, nextConversations);
  return updatedConversation;
}

export function getDemoReplyText(role?: UserRole) {
  if (role === 'teacher') {
    return 'Em đã nhận được phản hồi của thầy. Em sẽ kiểm tra lại bài và gửi thêm nếu còn vướng ạ.';
  }

  return 'Mình đã nhận được tin nhắn của bạn. Nếu cần, bạn gửi thêm ảnh hoặc đoạn code để mình xem chi tiết hơn nhé.';
}

export function addDemoReply(role: UserRole | undefined, conversationId: string | undefined) {
  if (!conversationId) {
    return undefined;
  }

  const conversations = getConversations(role);
  let updatedConversation: ChatConversation | undefined;
  const now = new Date().toISOString();
  const incomingMessage: ChatMessage = {
    id: `reply-${Date.now()}`,
    sender: 'other',
    text: getDemoReplyText(role),
    createdAt: now,
  };

  const nextConversations = conversations.map((conversation) => {
    if (conversation.id !== conversationId) {
      return conversation;
    }

    updatedConversation = {
      ...conversation,
      unread: false,
      messages: [...conversation.messages, incomingMessage],
    };
    return updatedConversation;
  });

  writeConversations(role, nextConversations);
  return updatedConversation;
}
