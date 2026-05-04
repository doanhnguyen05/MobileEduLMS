import type { ReactNode } from 'react';
import { ArrowLeft, MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';
import { useSmartBack } from '../hooks/useSmartBack';

interface TopBarProps {
  title?: ReactNode;
  showBack?: boolean;
  actions?: ReactNode;
  fallbackPath?: string;
}

export function TopBar({ title, showBack = false, actions, fallbackPath }: TopBarProps) {
  const goBack = useSmartBack(fallbackPath);

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-4 py-3 z-40"
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center gap-3 flex-1">
          {showBack && (
            <button
              type="button"
              onClick={goBack}
              aria-label="Quay lại"
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}
          {title && (
            <h1 className="font-semibold text-gray-900 truncate">{title}</h1>
          )}
        </div>
        {actions || (
          <div className="w-9 h-9 flex items-center justify-center text-gray-300" aria-hidden="true">
            <MoreVertical className="w-5 h-5 opacity-0" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
