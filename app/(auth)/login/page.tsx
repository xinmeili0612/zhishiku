'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/Auth/LoginForm';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [error, setError] = useState('');

  // 如果已登录，重定向到课程页面
  if (isAuthenticated) {
    router.push('/');
    return null;
  }

  const handleLogin = async (email: string, password: string) => {
    setError('');
    const result = await login(email, password);
    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || '登录失败，请检查邮箱和密码');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <LoginForm onSubmit={handleLogin} error={error} />
    </div>
  );
}

