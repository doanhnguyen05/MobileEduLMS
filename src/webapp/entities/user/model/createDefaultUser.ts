import type { User, UserRole, UserRoleSelection } from './types';

interface UserProfileSeed {
  name: string;
  phone: string;
  bio: string;
  location: string;
  birthdate: string;
  website: string;
}

const userProfiles: Record<UserRole, UserProfileSeed> = {
  student: {
    name: 'Nguyễn Văn A',
    phone: '0123 456 789',
    bio: 'Đam mê học lập trình mobile và xây dựng sản phẩm hữu ích cho người dùng.',
    location: 'Hà Nội, Việt Nam',
    birthdate: '2000-03-15',
    website: 'https://portfolio.edumobile.vn',
  },
  teacher: {
    name: 'Giảng viên B',
    phone: '0988 234 567',
    bio: 'Giảng viên mobile app với kinh nghiệm xây dựng ứng dụng thực tế cho doanh nghiệp.',
    location: 'Hồ Chí Minh, Việt Nam',
    birthdate: '1992-08-18',
    website: 'https://teacher.edumobile.vn',
  },
  admin: {
    name: 'Admin C',
    phone: '0901 888 999',
    bio: 'Quản trị viên nền tảng, phụ trách kiểm duyệt nội dung và hỗ trợ vận hành hệ thống.',
    location: 'Đà Nẵng, Việt Nam',
    birthdate: '1990-01-10',
    website: 'https://admin.edumobile.vn',
  },
};

export function createDefaultUser(email: string, role: UserRoleSelection): User {
  const resolvedRole: UserRole = role ?? 'student';
  const profile = userProfiles[resolvedRole];

  return {
    id: '1',
    email,
    role: resolvedRole,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    ...profile,
  };
}
