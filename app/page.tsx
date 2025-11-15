'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockCourse } from '@/utils/mockData';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  
  useEffect(() => {
    // 如果未登录，重定向到登录页
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    // 如果已登录，默认跳转到第一节课
    if (isAuthenticated) {
      const allLessons = mockCourse.sections.flatMap(section => section.lessons);
      const firstLesson = allLessons[0];
      
      if (firstLesson) {
        router.push(`/lesson/${firstLesson.id}`);
      }
    }
  }, [router, isAuthenticated, isLoading]);
  
  const allLessons = mockCourse.sections.flatMap(section => section.lessons);
  const firstLesson = allLessons[0];
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">加载中...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">请先登录</p>
      </div>
    );
  }
  
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

