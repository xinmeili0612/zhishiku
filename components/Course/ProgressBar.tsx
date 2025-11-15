'use client';

import { useCourse } from '@/context/CourseContext';

export default function ProgressBar() {
  const { progress, calculateProgress } = useCourse();
  const currentProgress = calculateProgress();

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>已学:</span>
        <span>{currentProgress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${currentProgress}%` }}
        />
      </div>
    </div>
  );
}

