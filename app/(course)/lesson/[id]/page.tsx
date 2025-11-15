'use client';

import { useParams } from 'next/navigation';
import { useCourse } from '@/context/CourseContext';
import { getLessonById, getNextLesson, getPrevLesson } from '@/utils/mockData';
import CourseContent from '@/components/Course/CourseContent';
import NavigationButtons from '@/components/Course/NavigationButtons';
import ProgressBar from '@/components/Course/ProgressBar';
import Discussion from '@/components/Course/Discussion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { course } = useCourse();
  const { isAuthenticated, isLoading } = useAuth();
  const lessonId = params.id as string;

  // 检查登录状态
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  const lesson = getLessonById(course, lessonId);
  const nextLesson = getNextLesson(course, lessonId);
  const prevLesson = getPrevLesson(course, lessonId);

  // 如果正在加载，显示加载状态
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">加载中...</p>
      </div>
    );
  }

  // 如果未登录，不显示内容（会在useEffect中重定向）
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">请先登录</p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">课程不存在</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="max-w-4xl mx-auto p-4 md:p-6">
        {/* 课程标题 */}
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900">
          {lesson.title}
        </h1>

        {/* 课程内容 */}
        <CourseContent lesson={lesson} />

        {/* 导航按钮和学习完成 */}
        <NavigationButtons
          prevLesson={prevLesson}
          nextLesson={nextLesson}
          currentLessonId={lessonId}
        />

        {/* 讨论区 */}
        <Discussion lessonId={lessonId} />
      </div>
    </div>
  );
}

