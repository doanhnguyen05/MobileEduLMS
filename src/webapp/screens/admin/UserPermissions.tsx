import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Save, X, Shield, Lock, CheckCircle2 } from 'lucide-react';
import { TopBar } from '../../components/TopBar';
import { Button } from '../../components/ui/button';

export function UserPermissions() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    role: 'teacher'
  });

  const [selectedRole, setSelectedRole] = useState(userData.role);
  const [permissions, setPermissions] = useState({
    courses: {
      create: true,
      edit: true,
      delete: false,
      publish: true
    },
    students: {
      view: true,
      manage: true,
      export: false
    },
    revenue: {
      view: true,
      withdraw: true,
      export: true
    },
    analytics: {
      view: true,
      export: false
    },
    content: {
      viewAll: false,
      approve: false,
      delete: false
    },
    users: {
      viewAll: false,
      create: false,
      edit: false,
      delete: false
    },
    system: {
      settings: false,
      logs: false
    }
  });

  const roles = [
    {
      value: 'student',
      label: 'Học viên',
      color: 'from-blue-500 to-cyan-400',
      description: 'Quyền học tập và xem nội dung khóa học'
    },
    {
      value: 'teacher',
      label: 'Giảng viên',
      color: 'from-purple-500 to-pink-400',
      description: 'Quyền tạo khóa học và quản lý học viên'
    },
    {
      value: 'admin',
      label: 'Admin',
      color: 'from-red-500 to-orange-400',
      description: 'Quyền quản trị toàn bộ hệ thống'
    }
  ];

  const permissionGroups = [
    {
      name: 'Khóa học',
      key: 'courses',
      icon: '📚',
      items: [
        { key: 'create', label: 'Tạo khóa học mới' },
        { key: 'edit', label: 'Chỉnh sửa khóa học' },
        { key: 'delete', label: 'Xóa khóa học' },
        { key: 'publish', label: 'Xuất bản khóa học' }
      ]
    },
    {
      name: 'Học viên',
      key: 'students',
      icon: '👥',
      items: [
        { key: 'view', label: 'Xem danh sách học viên' },
        { key: 'manage', label: 'Quản lý học viên' },
        { key: 'export', label: 'Xuất dữ liệu học viên' }
      ]
    },
    {
      name: 'Doanh thu',
      key: 'revenue',
      icon: '💰',
      items: [
        { key: 'view', label: 'Xem doanh thu' },
        { key: 'withdraw', label: 'Rút tiền' },
        { key: 'export', label: 'Xuất báo cáo doanh thu' }
      ]
    },
    {
      name: 'Thống kê',
      key: 'analytics',
      icon: '📊',
      items: [
        { key: 'view', label: 'Xem thống kê' },
        { key: 'export', label: 'Xuất báo cáo' }
      ]
    },
    {
      name: 'Nội dung (Admin)',
      key: 'content',
      icon: '📝',
      items: [
        { key: 'viewAll', label: 'Xem tất cả nội dung' },
        { key: 'approve', label: 'Duyệt nội dung' },
        { key: 'delete', label: 'Xóa nội dung vi phạm' }
      ]
    },
    {
      name: 'Người dùng (Admin)',
      key: 'users',
      icon: '👤',
      items: [
        { key: 'viewAll', label: 'Xem tất cả người dùng' },
        { key: 'create', label: 'Tạo người dùng mới' },
        { key: 'edit', label: 'Chỉnh sửa người dùng' },
        { key: 'delete', label: 'Xóa người dùng' }
      ]
    },
    {
      name: 'Hệ thống (Admin)',
      key: 'system',
      icon: '⚙️',
      items: [
        { key: 'settings', label: 'Cài đặt hệ thống' },
        { key: 'logs', label: 'Xem log hệ thống' }
      ]
    }
  ];

  const handleTogglePermission = (group: string, item: string) => {
    setPermissions({
      ...permissions,
      [group]: {
        ...permissions[group as keyof typeof permissions],
        [item]: !permissions[group as keyof typeof permissions][item as keyof typeof permissions[keyof typeof permissions]]
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating permissions:', { role: selectedRole, permissions });
    navigate('/admin/users');
  };

  const getPermissionCount = () => {
    let count = 0;
    Object.values(permissions).forEach(group => {
      Object.values(group).forEach(value => {
        if (value) count++;
      });
    });
    return count;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Phân quyền người dùng" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-600 to-purple-500 rounded-3xl p-6 mb-6 text-white"
        >
          <div className="flex items-start gap-4 mb-4">
            <img
              src={userData.avatar}
              alt={userData.name}
              className="w-16 h-16 rounded-full border-4 border-white/20 bg-white"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">{userData.name}</h2>
              <p className="text-purple-100 text-sm mb-2">{userData.email}</p>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">{getPermissionCount()} quyền được cấp</span>
              </div>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-sm p-6"
          >
            <h3 className="font-bold text-gray-900 mb-4">Vai trò</h3>
            <div className="space-y-3">
              {roles.map((role) => (
                <label
                  key={role.value}
                  className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    selectedRole === role.value
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={selectedRole === role.value}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="mt-1 w-5 h-5 text-purple-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-8 h-8 bg-gradient-to-br ${role.color} rounded-lg flex items-center justify-center`}>
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <p className="font-semibold text-gray-900">{role.label}</p>
                    </div>
                    <p className="text-gray-600 text-sm">{role.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-sm p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-gray-600" />
              <h3 className="font-bold text-gray-900">Quyền chi tiết</h3>
            </div>

            <div className="space-y-4">
              {permissionGroups.map((group, index) => (
                <motion.div
                  key={group.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="border border-gray-200 rounded-2xl p-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{group.icon}</span>
                    <h4 className="font-semibold text-gray-900">{group.name}</h4>
                  </div>
                  <div className="space-y-2">
                    {group.items.map((item) => (
                      <label
                        key={item.key}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={permissions[group.key as keyof typeof permissions][item.key as keyof typeof permissions[keyof typeof permissions]]}
                            onChange={() => handleTogglePermission(group.key, item.key)}
                            className="w-5 h-5 text-purple-600 rounded peer"
                          />
                          <CheckCircle2 className="w-5 h-5 text-purple-600 absolute top-0 left-0 opacity-0 peer-checked:opacity-100 pointer-events-none" />
                        </div>
                        <span className="text-gray-700 text-sm group-hover:text-gray-900">
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200"
          >
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">Lưu ý về phân quyền</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Vai trò Admin sẽ có toàn quyền trên hệ thống</li>
                  <li>• Giảng viên mặc định có quyền quản lý khóa học của mình</li>
                  <li>• Học viên chỉ có quyền xem và học nội dung đã đăng ký</li>
                  <li>• Thay đổi quyền có hiệu lực ngay lập tức</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-3"
          >
            <Button
              type="button"
              onClick={() => navigate('/admin/users')}
              variant="outline"
              className="flex-1 h-14 rounded-2xl flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              className="flex-1 h-14 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white rounded-2xl shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Lưu phân quyền
            </Button>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
