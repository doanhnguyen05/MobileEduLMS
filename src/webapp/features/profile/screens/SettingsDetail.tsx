import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, RotateCcw, Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { TopBar } from '../../../components/TopBar';
import { Button } from '../../../components/ui/button';
import { Switch } from '../../../components/ui/switch';
import { useAuth } from '../../auth';
import { getSettingDetail } from '../data/settingsCatalog';

type StoredSettingState = {
  toggles: Record<string, boolean>;
  choice?: string;
  savedAt?: string;
};

function getStorageKey(settingId: string) {
  return `mobileEduLMS.settings.${settingId}`;
}

function readStoredState(settingId: string, fallbackState: StoredSettingState) {
  if (typeof window === 'undefined') {
    return fallbackState;
  }

  const rawValue = window.localStorage.getItem(getStorageKey(settingId));
  if (!rawValue) {
    return fallbackState;
  }

  try {
    return {
      ...fallbackState,
      ...(JSON.parse(rawValue) as StoredSettingState),
    };
  } catch (error) {
    console.error('Could not parse setting detail state:', error);
    return fallbackState;
  }
}

export function SettingsDetail() {
  const { settingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const detail = getSettingDetail(settingId, user?.role ?? 'student');

  const defaultState = useMemo<StoredSettingState>(() => {
    if (!detail) {
      return { toggles: {} };
    }

    return {
      toggles: Object.fromEntries(
        (detail.toggleControls ?? []).map((control) => [control.id, control.defaultValue]),
      ),
      choice: detail.choiceControl?.defaultValue,
    };
  }, [detail]);

  const [state, setState] = useState<StoredSettingState>(() =>
    detail ? readStoredState(detail.id, defaultState) : defaultState,
  );
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!detail) {
      setState(defaultState);
      setSavedNotice(null);
      return;
    }

    setState(readStoredState(detail.id, defaultState));
    setSavedNotice(null);
  }, [defaultState, detail]);

  if (!detail) {
    return (
      <div className="min-h-screen bg-gray-50 pb-8">
        <TopBar showBack title="Chi tiết cài đặt" fallbackPath="/settings" />
        <div className="p-6">
          <div className="bg-white rounded-3xl shadow-sm p-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy cấu hình</h2>
            <p className="text-gray-600 mb-6">
              Mục cài đặt này không áp dụng cho vai trò hiện tại hoặc chưa được cấu hình.
            </p>
            <Button onClick={() => navigate('/settings')} className="w-full h-12 rounded-2xl">
              Quay lại cài đặt
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const Icon = detail.icon;

  const handleToggleChange = (controlId: string, value: boolean) => {
    setState((currentState) => ({
      ...currentState,
      toggles: {
        ...currentState.toggles,
        [controlId]: value,
      },
    }));
  };

  const handleSave = () => {
    const nextState = {
      ...state,
      savedAt: new Date().toLocaleString('vi-VN'),
    };

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(getStorageKey(detail.id), JSON.stringify(nextState));
    }

    setState(nextState);
    setSavedNotice('Thiết lập tĩnh đã được lưu cho phiên bản mô phỏng hiện tại.');
  };

  const handleReset = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(getStorageKey(detail.id));
    }
    setState(defaultState);
    setSavedNotice('Đã khôi phục về cấu hình mặc định.');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <TopBar showBack title={detail.title} fallbackPath="/settings" />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-br ${detail.heroClassName} rounded-3xl p-6 text-white mb-6`}
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-white/80 text-sm mb-2">{detail.subtitle}</p>
              <h2 className="text-2xl font-bold mb-2">{detail.heroTitle}</h2>
              <p className="text-white/90 text-sm leading-relaxed">{detail.heroDescription}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {detail.summary.map((item) => (
              <div key={item.label} className="bg-white/10 rounded-2xl p-3">
                <p className="text-white/70 text-xs mb-1">{item.label}</p>
                <p className="font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {savedNotice && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-900">Đã cập nhật</p>
              <p className="text-sm text-emerald-800">{savedNotice}</p>
            </div>
          </motion.div>
        )}

        {detail.toggleControls && detail.toggleControls.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white rounded-3xl shadow-sm overflow-hidden mb-6"
          >
            {detail.toggleControls.map((control) => (
              <div key={control.id} className="flex items-center justify-between gap-4 p-4 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{control.label}</p>
                  <p className="text-sm text-gray-500 mt-1">{control.description}</p>
                </div>
                <Switch
                  checked={state.toggles[control.id] ?? control.defaultValue}
                  onCheckedChange={(value) => handleToggleChange(control.id, value)}
                />
              </div>
            ))}
          </motion.div>
        )}

        {detail.choiceControl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-sm p-5 mb-6"
          >
            <h3 className="font-bold text-gray-900 mb-1">{detail.choiceControl.label}</h3>
            <p className="text-sm text-gray-500 mb-4">{detail.choiceControl.description}</p>

            <div className="space-y-3">
              {detail.choiceControl.options.map((option) => {
                const isSelected = (state.choice ?? detail.choiceControl?.defaultValue) === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setState((currentState) => ({ ...currentState, choice: option.id }))}
                    className={`w-full text-left rounded-2xl border p-4 transition-colors ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <p className="font-semibold text-gray-900">{option.label}</p>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                    </div>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        <div className="space-y-4 mb-6">
          {detail.contentBlocks.map((block, index) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              className="bg-white rounded-3xl shadow-sm p-5"
            >
              <h3 className="font-bold text-gray-900 mb-3">{block.title}</h3>
              <div className="space-y-3">
                {block.items.map((item) => (
                  <div key={item} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {state.savedAt && (
          <p className="text-xs text-gray-400 text-center mb-4">
            Lần lưu gần nhất: {state.savedAt}
          </p>
        )}

        {!detail.readOnly && (
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="h-12 rounded-2xl border-2 border-gray-200 text-gray-700 font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Khôi phục
            </button>
            <Button
              onClick={handleSave}
              className="h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Lưu cấu hình
            </Button>
          </div>
        )}

        {detail.ctaLabel && detail.ctaRoute && (
          <Button
            onClick={() => navigate(detail.ctaRoute!)}
            className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white mt-4"
          >
            {detail.ctaLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
