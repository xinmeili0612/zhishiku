'use client';

import { useCourse } from '@/context/CourseContext';
import { useState } from 'react';

interface CompleteButtonProps {
  lessonId: string;
}

export default function CompleteButton({ lessonId }: CompleteButtonProps) {
  const { progress, markLessonComplete, markLessonIncomplete } = useCourse();
  const [isCompleting, setIsCompleting] = useState(false);
  const isCompleted = progress.lessonProgress[lessonId] || false;

  const handleClick = async () => {
    setIsCompleting(true);
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (isCompleted) {
      markLessonIncomplete(lessonId);
    } else {
      markLessonComplete(lessonId);
    }
    setIsCompleting(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isCompleting}
      className={`
        px-6 py-2 rounded-lg font-medium transition-all duration-200
        min-h-[44px] min-w-[100px]
        ${
          isCompleted
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-95
      `}
    >
      {isCompleting ? '处理中...' : isCompleted ? '我已学完' : '标记完成'}
    </button>
  );
}

