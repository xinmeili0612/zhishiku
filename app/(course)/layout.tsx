'use client';

import MainLayout from '@/components/Layout/MainLayout';

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}

