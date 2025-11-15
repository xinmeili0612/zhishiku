'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockCourse } from '@/utils/mockData';

export default function HomePage() {
  const router = useRouter();
  
  useEffect(() => {
    // 默认跳转到第一节课
    const allLessons = mockCourse.sections.flatMap(section => section.lessons);
    const firstLesson = allLessons[0];
    
    if (firstLesson) {
      router.push(`/lesson/${firstLesson.id}`);
    }
  }, [router]);
  
  const allLessons = mockCourse.sections.flatMap(section => section.lessons);
  const firstLesson = allLessons[0];
  
  if (!firstLesson) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">暂无课程</p>
      </div>
    );
  }
  
  // 跳转中显示加载状态
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500">正在跳转...</p>
    </div>
  );
}

