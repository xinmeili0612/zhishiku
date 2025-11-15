'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { CourseProvider } from '@/context/CourseContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CourseProvider>
        {children}
      </CourseProvider>
    </AuthProvider>
  );
}

