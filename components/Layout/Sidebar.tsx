'use client';

import { useCourse } from '@/context/CourseContext';
import { useIsMobile } from '@/hooks/useMediaQuery';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { course, progress, calculateProgress } = useCourse();
  const isMobile = useIsMobile();
  const pathname = usePathname();
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
          flex flex-col transition-all duration-300
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
  return (
    <>
      {/* 课程标题和进度 */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-bold text-lg text-gray-800">{course.title}</h2>
        {course.subtitle && (
          <p className="text-sm text-gray-600 mt-1">{course.subtitle}</p>
        )}
        {/* 学习进度 */}
        <div className="mt-3">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>已学:</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 目录列表 */}
      <div className="flex-1 overflow-y-auto p-4">
        {course.sections.map((section: any) => (
          <div key={section.id} className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">{section.title}</h3>
            <ul className="space-y-1">
              {section.lessons.map((lesson: any) => {
                const isActive = pathname === `/lesson/${lesson.id}`;
                return (
                  <li key={lesson.id}>
                    <Link
                      href={`/lesson/${lesson.id}`}
                      onClick={onClose}
                      className={`
                        block px-3 py-2 rounded text-sm transition-colors
                        ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex-1">{lesson.title}</span>
                        {lesson.learnedCount && (
                          <span className="text-xs text-gray-500 ml-2">
                            {lesson.learnedCount}人学过
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

