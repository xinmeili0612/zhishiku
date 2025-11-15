'use client';

import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/useMediaQuery';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const isMobile = useIsMobile();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40 shadow-sm backdrop-blur-sm bg-white/95">
      <div className="flex items-center gap-4">
        {/* 移动端菜单按钮 */}
        {isMobile && (
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 active:scale-95"
            aria-label="打开菜单"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
            <span className="text-white text-sm font-bold">AI</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            AI联盟
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="text-sm text-gray-700 font-medium">{user?.name}</span>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 font-medium active:scale-95"
            >
              退出
            </button>
          </>
        ) : (
          <a
            href="/login"
            className="px-4 py-2.5 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md active:scale-95"
          >
            登录
          </a>
        )}
      </div>
    </header>
  );
}

