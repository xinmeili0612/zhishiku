'use client';

import { Lesson } from '@/types';
import { useRouter } from 'next/navigation';
import CompleteButton from './CompleteButton';
import { useCourse } from '@/context/CourseContext';

interface NavigationButtonsProps {
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
  currentLessonId: string;
}

export default function NavigationButtons({
  prevLesson,
  nextLesson,
  currentLessonId,
}: NavigationButtonsProps) {
  const router = useRouter();
  const { course } = useCourse();
  const currentLesson = course.sections
    .flatMap(s => s.lessons)
    .find(l => l.id === currentLessonId);
  const participantCount = currentLesson?.learnedCount || 108;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-gray-200">
      {/* 上一节按钮 */}
      <button
        onClick={() => prevLesson && router.push(`/lesson/${prevLesson.id}`)}
        disabled={!prevLesson}
        className={`
          px-4 sm:px-6 py-2 border border-gray-300 rounded-lg 
          transition-colors min-h-[44px] min-w-[100px]
          ${
            prevLesson
              ? 'hover:bg-gray-50 text-gray-700'
              : 'opacity-50 cursor-not-allowed text-gray-400'
          }
          active:scale-95
        `}
      >
        <span className="hidden sm:inline">上一节</span>
        <span className="sm:hidden">← 上一节</span>
      </button>

      {/* 中间：参与人数和完成按钮 */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <span className="text-sm text-gray-600">{participantCount}人参与</span>
        <CompleteButton lessonId={currentLessonId} />
      </div>

      {/* 下一节按钮 */}
      <button
        onClick={() => nextLesson && router.push(`/lesson/${nextLesson.id}`)}
        disabled={!nextLesson}
        className={`
          px-4 sm:px-6 py-2 border border-gray-300 rounded-lg 
          transition-colors min-h-[44px] min-w-[100px]
          ${
            nextLesson
              ? 'hover:bg-gray-50 text-gray-700'
              : 'opacity-50 cursor-not-allowed text-gray-400'
          }
          active:scale-95
        `}
      >
        <span className="hidden sm:inline">下一节</span>
        <span className="sm:hidden">下一节 →</span>
      </button>
    </div>
  );
}

