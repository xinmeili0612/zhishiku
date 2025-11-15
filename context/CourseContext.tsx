'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course, Progress } from '@/types';
import { mockCourse } from '@/utils/mockData';
import { storage, STORAGE_KEYS } from '@/utils/storage';

interface CourseContextType {
  course: Course;
  progress: Progress;
  markLessonComplete: (lessonId: string) => void;
  markLessonIncomplete: (lessonId: string) => void;
  calculateProgress: () => number;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
  const [course] = useState<Course>(mockCourse);
  const [progress, setProgress] = useState<Progress>({
    courseId: course.id,
    lessonProgress: {},
    overallProgress: 0,
  });

  useEffect(() => {
    // 从 localStorage 恢复学习进度
    const savedProgress = storage.get<Progress>(STORAGE_KEYS.PROGRESS(course.id));
    if (savedProgress) {
      setProgress(savedProgress);
    } else {
      // 初始化进度
      const initialProgress: Progress = {
        courseId: course.id,
        lessonProgress: {},
        overallProgress: 0,
      };
      setProgress(initialProgress);
      storage.set(STORAGE_KEYS.PROGRESS(course.id), initialProgress);
    }
  }, [course.id]);

  const calculateProgress = (): number => {
    let totalLessons = 0;
    let completedLessons = 0;

    course.sections.forEach(section => {
      section.lessons.forEach(lesson => {
        totalLessons++;
        if (progress.lessonProgress[lesson.id]) {
          completedLessons++;
        }
      });
    });

    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };

  const calculateProgressValue = (lessonProgress: Record<string, boolean>): number => {
    let totalLessons = 0;
    let completedLessons = 0;

    course.sections.forEach(section => {
      section.lessons.forEach(lesson => {
        totalLessons++;
        if (lessonProgress[lesson.id]) {
          completedLessons++;
        }
      });
    });

    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };

  const markLessonComplete = (lessonId: string) => {
    setProgress(prev => {
      const newLessonProgress = {
        ...prev.lessonProgress,
        [lessonId]: true,
      };
      const newProgress = {
        ...prev,
        lessonProgress: newLessonProgress,
        overallProgress: calculateProgressValue(newLessonProgress),
      };
      storage.set(STORAGE_KEYS.PROGRESS(course.id), newProgress);
      return newProgress;
    });
  };

  const markLessonIncomplete = (lessonId: string) => {
    setProgress(prev => {
      const newLessonProgress = {
        ...prev.lessonProgress,
        [lessonId]: false,
      };
      const newProgress = {
        ...prev,
        lessonProgress: newLessonProgress,
        overallProgress: calculateProgressValue(newLessonProgress),
      };
      storage.set(STORAGE_KEYS.PROGRESS(course.id), newProgress);
      return newProgress;
    });
  };

  return (
    <CourseContext.Provider
      value={{
        course,
        progress,
        markLessonComplete,
        markLessonIncomplete,
        calculateProgress,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
}

