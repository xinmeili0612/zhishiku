'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 获取当前会话
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (session) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            name: session.user.email?.split('@')[0] || '用户',
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn('Supabase session error (dev mode):', error);
        setIsLoading(false);
      });

    // 监听认证状态变化
    try {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            name: session.user.email?.split('@')[0] || '用户',
          });
        } else {
          setUser(null);
        }
        setIsLoading(false);
      });

      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    } catch (error) {
      console.warn('Supabase auth state change error (dev mode):', error);
      setIsLoading(false);
      return () => {};
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email!,
          name: data.user.email?.split('@')[0] || '用户',
        });
        return { success: true };
      }

      return { success: false, error: '登录失败' };
    } catch (error: any) {
      console.warn('Login error (dev mode):', error);
      return { success: false, error: error.message || '登录失败' };
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email!,
          name: data.user.email?.split('@')[0] || '用户',
        });
        return { success: true };
      }

      return { success: false, error: '注册失败' };
    } catch (error: any) {
      return { success: false, error: error.message || '注册失败' };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.warn('Logout error (dev mode):', error);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

