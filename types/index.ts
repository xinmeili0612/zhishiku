export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle?: string;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'mixed';
  content: string;
  videoUrl?: string;
  duration?: number;
  completed: boolean;
  learnedCount?: number;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
}

export interface Progress {
  courseId: string;
  lessonProgress: Record<string, boolean>;
  overallProgress: number;
}

