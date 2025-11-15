import { redirect } from 'next/navigation';
import { mockCourse } from '@/utils/mockData';

export default function CourseHome() {
  // 默认跳转到第一节课
  const allLessons = mockCourse.sections.flatMap(section => section.lessons);
  const firstLesson = allLessons[0];
  
  if (firstLesson) {
    redirect(`/lesson/${firstLesson.id}`);
  }
  
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-500">暂无课程</p>
    </div>
  );
}

