'use client';

import { useCourse } from '@/context/CourseContext';
import { useIsMobile } from '@/hooks/useMediaQuery';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { course, progress, calculateProgress } = useCourse();
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const currentProgress = calculateProgress();

  // 移动端遮罩层
  if (isMobile && isOpen) {
    return (
      <>
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
        <aside
          className={`
            fixed top-0 left-0 h-full w-80 bg-white z-50
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            flex flex-col shadow-lg
          `}
        >
          <SidebarContent
            course={course}
            progress={currentProgress}
            pathname={pathname}
            onClose={onClose}
          />
        </aside>
      </>
    );
  }

  // 桌面端侧边栏
  if (!isMobile) {
    return (
      <aside
        className={`
          w-80 bg-white border-r border-gray-200
          flex flex-col h-full transition-all duration-300
          ${isOpen ? 'block' : 'hidden lg:block'}
        `}
      >
        <SidebarContent
          course={course}
          progress={currentProgress}
          pathname={pathname}
          onClose={onClose}
        />
      </aside>
    );
  }

  // 移动端未打开时返回null
  return null;
}

function SidebarContent({
  course,
  progress,
  pathname,
  onClose,
}: {
  course: any;
  progress: number;
  pathname: string;
  onClose: () => void;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLLIElement>(null);
  const { isAuthenticated } = useAuth();

  // 滚动到激活项
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !activeItemRef.current) return;

    const timer = setTimeout(() => {
      const activeItem = activeItemRef.current;
      if (!activeItem) return;

      const containerRect = container.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const currentScrollTop = container.scrollTop;
      
      const itemTopRelativeToContainer = itemRect.top - containerRect.top + currentScrollTop;
      const containerHeight = containerRect.height;
      const itemHeight = itemRect.height;
      const targetScrollTop = itemTopRelativeToContainer - (containerHeight / 2) + (itemHeight / 2);
      
      container.scrollTo({
        top: Math.max(0, Math.min(targetScrollTop, container.scrollHeight - containerHeight)),
        behavior: 'smooth'
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="flex flex-col h-full">
      {/* 课程标题和进度 */}
      <div className="flex-shrink-0 p-6 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="mb-4">
          <h2 className="font-bold text-xl text-gray-900 mb-1.5 leading-tight">
            {course.title}
          </h2>
          {course.subtitle && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {course.subtitle}
            </p>
          )}
        </div>
        {/* 学习进度 */}
        <div className="mt-4">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-gray-700 font-medium">学习进度</span>
            <span className="text-gray-600 font-semibold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 目录列表 - 可滚动区域 */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-scroll overscroll-contain min-h-0" 
        style={{ 
          scrollbarWidth: 'thin', 
          scrollbarColor: '#9ca3af #f3f4f6',
        }}
      >
        <div className="p-4">
          {course.sections.map((section: any, sectionIndex: number) => (
            <div key={section.id} className={sectionIndex > 0 ? 'mt-8' : 'mt-4'}>
              <h3 className="font-bold text-base text-gray-500 uppercase tracking-wider mb-3 px-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.lessons.map((lesson: any, lessonIndex: number) => {
                  const isActive = pathname === `/lesson/${lesson.id}`;
                  
                  return (
                    <li 
                      key={lesson.id}
                      ref={isActive ? activeItemRef : null}
                    >
                      {isAuthenticated ? (
                        <Link
                          href={`/lesson/${lesson.id}`}
                          onClick={() => {
                            onClose();
                          }}
                          className={`
                            group relative flex items-center gap-3 px-3 py-2.5 rounded-lg
                            text-base transition-all duration-200
                            ${
                              isActive
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-200'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }
                          `}
                        >
                          {/* 章节编号 */}
                          <div className={`
                            flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold
                            ${isActive 
                              ? 'bg-white/20 text-white' 
                              : 'bg-gray-100 text-gray-700 group-hover:bg-gray-200'
                            }
                          `}>
                            {lessonIndex + 1}
                          </div>
                          
                          {/* 课程标题 */}
                          <span className={`
                            flex-1 leading-relaxed
                            ${isActive ? 'font-medium' : 'font-normal'}
                          `}>
                            {lesson.title}
                          </span>
                          
                          {/* 完成状态指示器 */}
                          {isActive && (
                            <div className="flex-shrink-0">
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </Link>
                      ) : (
                        <div
                          className={`
                            group relative flex items-center gap-3 px-3 py-2.5 rounded-lg
                            text-base cursor-not-allowed opacity-50
                            text-gray-400
                          `}
                          title="请先登录以查看课程内容"
                        >
                          {/* 章节编号 */}
                          <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold bg-gray-100 text-gray-400">
                            {lessonIndex + 1}
                          </div>
                          
                          {/* 课程标题 */}
                          <span className="flex-1 leading-relaxed font-normal">
                            {lesson.title}
                          </span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

