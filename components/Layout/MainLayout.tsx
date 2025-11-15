'use client';

import { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useIsMobile, useIsDesktop } from '@/hooks/useMediaQuery';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();

  // 桌面端默认打开侧边栏
  useEffect(() => {
    if (isDesktop) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [isDesktop]);

  // 移动端侧边栏打开时禁止背景滚动
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobile, sidebarOpen]);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* 左侧目录 */}
      <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />

      {/* 右侧主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header onMenuClick={handleMenuClick} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

