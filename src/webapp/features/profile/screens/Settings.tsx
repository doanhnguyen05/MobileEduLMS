import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronRight, Moon, Volume2 } from 'lucide-react';
import { TopBar } from '../../../components/TopBar';
import { BottomNav } from '../../../components/BottomNav';
import { Switch } from '../../../components/ui/switch';
import { useEffect, useState } from 'react';
import { useAuth } from '../../auth';
import { getSettingsSections, type ToggleSettingKey } from '../data/settingsCatalog';

type ToggleState = Record<ToggleSettingKey, boolean>;

const SETTINGS_STORAGE_KEY = 'mobileEduLMS.settings.generalToggles';

export function Settings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [toggleState, setToggleState] = useState<ToggleState>(() => {
    if (typeof window === 'undefined') {
      return {
        notifications: true,
        darkMode: false,
        sound: true,
      };
    }

    const rawValue = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!rawValue) {
      return {
        notifications: true,
        darkMode: false,
        sound: true,
      };
    }

    try {
      return {
        notifications: true,
        darkMode: false,
        sound: true,
        ...(JSON.parse(rawValue) as Partial<ToggleState>),
      };
    } catch (error) {
      console.error('Could not parse settings toggle state:', error);
      return {
        notifications: true,
        darkMode: false,
        sound: true,
      };
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(toggleState));
  }, [toggleState]);

  const settingsSections = getSettingsSections(user?.role ?? 'student');

  const handleToggleChange = (key: ToggleSettingKey, value: boolean) => {
    setToggleState((currentState) => ({
      ...currentState,
      [key]: value,
    }));
  };

  const roleSummary =
    user?.role === 'teacher'
      ? {
          title: 'Thiết lập dành cho giảng viên',
          subtitle: 'Bổ sung cấu hình lớp học, payout và khung giờ hỗ trợ học viên.',
        }
      : user?.role === 'admin'
        ? {
            title: 'Thiết lập dành cho quản trị',
            subtitle: 'Bổ sung cấu hình moderation, audit và cảnh báo hệ thống.',
          }
        : {
            title: 'Thiết lập dành cho học viên',
            subtitle: 'Bổ sung cấu hình nhắc học, tài liệu offline và phong cách học.',
          };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <TopBar showBack title="Cài đặt" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-3xl p-6 text-white mb-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-slate-200 text-sm mb-2">{roleSummary.title}</p>
              <h2 className="text-2xl font-bold mb-2">Khu vực cài đặt theo vai trò</h2>
              <p className="text-slate-200 text-sm leading-relaxed">{roleSummary.subtitle}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Bell className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-3 px-2">{section.title}</h3>
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const isToggleItem = item.type === 'toggle';
                const toggleKey = item.id as ToggleSettingKey;
                const rowIsClickable = Boolean(item.route);

                return (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                    onClick={() => rowIsClickable && navigate(item.route!)}
                    className={`flex items-center justify-between gap-4 p-4 border-b border-gray-100 last:border-b-0 ${
                      rowIsClickable ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                      </div>
                    </div>

                    {isToggleItem ? (
                      <div
                        className="flex items-center gap-3 flex-shrink-0"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {item.route && (
                          <button
                            type="button"
                            onClick={() => navigate(item.route!)}
                            className="text-xs font-semibold text-blue-600"
                          >
                            Chi tiết
                          </button>
                        )}
                        <Switch
                          checked={toggleState[toggleKey]}
                          onCheckedChange={(value) => handleToggleChange(toggleKey, value)}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {item.value && (
                          <span className="text-gray-500 text-sm">{item.value}</span>
                        )}
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="text-center text-gray-400 text-sm mt-8">
          <p>EduMobile v1.0.0</p>
          <p className="mt-1">© 2026 EduMobile. All rights reserved.</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
