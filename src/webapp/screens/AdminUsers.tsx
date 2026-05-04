import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, UserPlus, MoreVertical, Shield, Edit, Trash2, UserCog, Ban } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { BottomNav } from '../components/BottomNav';
import { Input } from '../components/ui/input';

export function AdminUsers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const users = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      role: 'student',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      status: 'active',
      joinDate: '15/01/2026',
      courses: 5
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      role: 'teacher',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      status: 'active',
      joinDate: '10/12/2025',
      courses: 3
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@email.com',
      role: 'student',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
      status: 'inactive',
      joinDate: '20/02/2026',
      courses: 2
    },
    {
      id: 4,
      name: 'Phạm Minh D',
      email: 'phamminhd@email.com',
      role: 'teacher',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4',
      status: 'active',
      joinDate: '05/11/2025',
      courses: 6
    }
  ];

  const roles = ['all', 'student', 'teacher', 'admin'];

  const getRoleBadge = (role: string) => {
    const badges = {
      student: { label: 'Học viên', color: 'bg-blue-100 text-blue-600' },
      teacher: { label: 'Giảng viên', color: 'bg-purple-100 text-purple-600' },
      admin: { label: 'Admin', color: 'bg-red-100 text-red-600' }
    };
    return badges[role as keyof typeof badges] || badges.student;
  };

  const handleDelete = (userId: number, userName: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa người dùng "${userName}"?`)) {
      console.log('Deleting user:', userId);
      setOpenMenuId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar title="Quản lý người dùng" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Người dùng</h2>
            <p className="text-gray-600 text-sm">{users.length} người dùng</p>
          </div>
          <button
            onClick={() => navigate('/admin/users/add')}
            className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-6 h-6" />
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 rounded-2xl border-gray-200 bg-white"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedRole === role
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {role === 'all' ? 'Tất cả' : role === 'student' ? 'Học viên' : role === 'teacher' ? 'Giảng viên' : 'Admin'}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {users.map((user, index) => {
            const badge = getRoleBadge(user.role);
            return (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-sm p-4"
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-14 h-14 rounded-2xl bg-gray-100"
                    />
                    {user.role === 'admin' && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <Shield className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
                        <p className="text-gray-500 text-sm truncate">{user.email}</p>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-400" />
                        </button>

                        <AnimatePresence>
                          {openMenuId === user.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setOpenMenuId(null)}
                              />
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                className="absolute right-0 top-10 z-20 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                              >
                                <button
                                  onClick={() => {
                                    navigate(`/admin/users/${user.id}/edit`);
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                                >
                                  <Edit className="w-4 h-4 text-gray-600" />
                                  <span className="text-gray-900">Chỉnh sửa</span>
                                </button>

                                <button
                                  onClick={() => {
                                    navigate(`/admin/users/${user.id}/permissions`);
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                                >
                                  <UserCog className="w-4 h-4 text-gray-600" />
                                  <span className="text-gray-900">Phân quyền</span>
                                </button>

                                <button
                                  onClick={() => {
                                    console.log('Toggle user status');
                                    setOpenMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                                >
                                  <Ban className="w-4 h-4 text-gray-600" />
                                  <span className="text-gray-900">
                                    {user.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                                  </span>
                                </button>

                                <div className="border-t border-gray-100">
                                  <button
                                    onClick={() => handleDelete(user.id, user.name)}
                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left"
                                  >
                                    <Trash2 className="w-4 h-4 text-red-600" />
                                    <span className="text-red-600">Xóa người dùng</span>
                                  </button>
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                        {badge.label}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {user.status === 'active' ? 'Hoạt động' : 'Ngưng'}
                      </span>
                    </div>

                    <p className="text-gray-500 text-xs">Tham gia: {user.joinDate}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
