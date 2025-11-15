'use client';

import { useState, useEffect } from 'react';
import { Comment } from '@/types';
import { storage, STORAGE_KEYS } from '@/utils/storage';
import { useAuth } from '@/context/AuthContext';

interface DiscussionProps {
  lessonId: string;
}

export default function Discussion({ lessonId }: DiscussionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 加载评论
  useEffect(() => {
    const savedComments = storage.get<Comment[]>(STORAGE_KEYS.COMMENTS(lessonId));
    if (savedComments) {
      setComments(savedComments);
    }
  }, [lessonId]);

  const handleSubmit = async () => {
    if (!content.trim() || !user) return;

    setIsSubmitting(true);
    // 模拟异步提交
    await new Promise(resolve => setTimeout(resolve, 300));

    const newComment: Comment = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    storage.set(STORAGE_KEYS.COMMENTS(lessonId), updatedComments);
    setContent('');
    setIsSubmitting(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl/Cmd + Enter 提交
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">发起讨论</h3>

      {/* 评论输入框 */}
      {user ? (
        <div className="mb-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="期待你的精彩发言..."
            className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            maxLength={1200}
            disabled={isSubmitting}
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-2">
            <div className="flex gap-2">
              <button
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                title="表情"
                disabled={isSubmitting}
              >
                <span className="text-xl">😊</span>
              </button>
              <button
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                title="上传图片"
                disabled={isSubmitting}
              >
                <span className="text-xl">📷</span>
              </button>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-sm text-gray-500">
                {content.length}/1200
              </span>
              <button
                onClick={handleSubmit}
                disabled={!content.trim() || isSubmitting}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[80px] active:scale-95"
              >
                {isSubmitting ? '发布中...' : '发布'}
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            提示：按 Ctrl/Cmd + Enter 快速提交
          </p>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center text-gray-600">
          <a href="/login" className="text-blue-600 hover:underline">
            请先登录
          </a>
          后再参与讨论
        </div>
      )}

      {/* 评论列表 */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            暂无评论，快来发表第一条吧！
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                  {comment.userAvatar ? (
                    <img
                      src={comment.userAvatar}
                      alt={comment.userName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    comment.userName[0]?.toUpperCase() || 'U'
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-gray-800">
                      {comment.userName}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleString('zh-CN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap break-words">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

