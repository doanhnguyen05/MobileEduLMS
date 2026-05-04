import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, CreditCard, CheckCircle, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/TopBar';
import { Button } from '../components/ui/button';

export function BankAccountManagement() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([
    {
      id: '1',
      bankName: 'Ngân hàng TMCP Á Châu (ACB)',
      accountNumber: '123456789',
      accountName: 'NGUYEN THI MAI',
      isDefault: true
    },
    {
      id: '2',
      bankName: 'Ngân hàng TMCP Ngoại thương (Vietcombank)',
      accountNumber: '987654321',
      accountName: 'NGUYEN THI MAI',
      isDefault: false
    }
  ]);

  const handleSetDefault = (id: string) => {
    setAccounts(accounts.map(acc => ({
      ...acc,
      isDefault: acc.id === id
    })));
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
      setAccounts(accounts.filter(acc => acc.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title="Tài khoản nhận tiền" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate('/teacher/add-bank-account')}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl flex items-center justify-center gap-2 font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl transition-shadow"
          >
            <Plus className="w-5 h-5" />
            <span>Thêm tài khoản mới</span>
          </button>
        </motion.div>

        <div className="space-y-4">
          {accounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-sm p-6 relative"
            >
              {account.isDefault && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Mặc định
                  </span>
                </div>
              )}

              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{account.bankName}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Số TK: <span className="font-mono font-semibold">{account.accountNumber}</span>
                  </p>
                  <p className="text-gray-600 text-sm">
                    Chủ TK: <span className="font-semibold">{account.accountName}</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                {!account.isDefault && (
                  <button
                    onClick={() => handleSetDefault(account.id)}
                    className="flex-1 h-10 border-2 border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-colors"
                  >
                    Đặt làm mặc định
                  </button>
                )}
                <button
                  onClick={() => navigate(`/teacher/edit-bank-account/${account.id}`)}
                  className="h-10 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(account.id)}
                  className="h-10 px-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-blue-50 rounded-2xl p-4 border-2 border-blue-100"
        >
          <p className="text-gray-700 text-sm leading-relaxed">
            <strong className="text-blue-600">Lưu ý:</strong> Tài khoản mặc định sẽ được sử dụng để nhận tiền khi bạn rút doanh thu. Hãy đảm bảo thông tin tài khoản chính xác.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
