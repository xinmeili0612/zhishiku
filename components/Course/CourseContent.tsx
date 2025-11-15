'use client';

import { Lesson } from '@/types';
import { useState } from 'react';

interface CourseContentProps {
  lesson: Lesson;
}

export default function CourseContent({ lesson }: CourseContentProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="mb-8">
      {lesson.type === 'video' && lesson.videoUrl && (
        <div className="mb-6">
          <div className="relative w-full aspect-video bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <video
              src={lesson.videoUrl}
              controls
              className="w-full h-full"
              preload="metadata"
              onError={() => setImageError(true)}
            >
              您的浏览器不支持视频播放
            </video>
            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                视频加载失败
              </div>
            )}
          </div>
        </div>
      )}

      {/* 课程内容文本框 */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 md:p-8">
        <div
          className="course-content prose max-w-none text-gray-800 leading-relaxed 
                     prose-headings:font-bold prose-p:mb-4 
                     prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4
                     prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-4
                     prose-h3:text-xl prose-h3:mt-4 prose-h3:mb-3"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />
      </div>
    </div>
  );
}

