import { Course, Lesson } from '@/types';

export const mockCourse: Course = {
  id: '1',
  title: '金牌编剧入门秘籍',
  subtitle: '从零基础到专业编剧的完整指南',
  sections: [
    {
      id: 'preface',
      title: '序言',
      lessons: [
        {
          id: 'preface-1',
          title: '序言',
          type: 'mixed',
          content: '<p>欢迎来到《金牌编剧入门秘籍》课程！本课程将带你从零基础开始，系统学习短剧编剧的核心技能。</p>',
          completed: false,
          learnedCount: 0,
        },
      ],
    },
    {
      id: 'chapters',
      title: '正文',
      lessons: [
        {
          id: 'chapter-1',
          title: '第一章 小说转短剧: 5 大创作通关秘籍',
          type: 'mixed',
          content: '<p>学习如何将小说改编成短剧，掌握5大核心创作技巧。</p>',
          completed: false,
          learnedCount: 0,
        },
        {
          id: 'chapter-2',
          title: '第二章 短剧术语: 30 个行业核心词',
          type: 'mixed',
          content: '<p>掌握短剧行业的30个核心术语，建立专业基础。</p>',
          completed: false,
          learnedCount: 0,
        },
        {
          id: 'chapter-3',
          title: '第三章 情绪爆破: 短剧的噱头与爽点',
          type: 'mixed',
          content: '<p>学习如何设计情绪爆破点，掌握短剧的噱头与爽点创作技巧。</p>',
          completed: false,
          learnedCount: 0,
        },
        {
          id: 'chapter-4',
          title: '第四章 对标爆款: 进行微创新',
          type: 'mixed',
          content: '<p>学习如何分析爆款作品，并进行微创新，打造自己的独特风格。</p>',
          completed: false,
          learnedCount: 0,
        },
        {
          id: 'chapter-5',
          title: '第五章 镜头语言: 文字到画面转化逻辑',
          type: 'mixed',
          content: '<p>掌握镜头语言，学习如何将文字描述转化为画面呈现的逻辑。</p>',
          completed: false,
          learnedCount: 0,
        },
        {
          id: 'chapter-6',
          title: '第六章 大纲密钥: 新手编剧必备',
          type: 'mixed',
          content: '<p>学习如何编写剧本大纲，这是新手编剧必须掌握的核心技能。</p>',
          completed: false,
          learnedCount: 0,
        },
        {
          id: 'chapter-7',
          title: '第七章 人设模版: 20 个高记忆点角色模板',
          type: 'mixed',
          content: '<p>掌握20个高记忆点的角色模板，快速塑造令人印象深刻的角色。</p>',
          completed: false,
          learnedCount: 0,
        },
        {
          id: 'chapter-8',
          title: '第八章 爽点大全: 30 个核心刺激点',
          type: 'mixed',
          content: '<p>学习30个核心刺激点的设计方法，让观众欲罢不能。</p>',
          completed: false,
          learnedCount: 0,
        },
        {
          id: 'chapter-9',
          title: '第九章 剧情模版库: 8 种常见剧情写法',
          type: 'mixed',
          content: '<p>掌握8种常见的剧情写法，建立自己的剧情模板库。</p>',
          completed: false,
          learnedCount: 0,
        },
        {
          id: 'chapter-10',
          title: '第十章 反派套路: 8 种让观众恨到付费的阴招',
          type: 'mixed',
          content: '<p>学习如何设计反派角色，掌握8种让观众恨到付费的创作技巧。</p>',
          completed: false,
          learnedCount: 0,
        },
        {
          id: 'chapter-11',
          title: '第十一章 爆款类型: 4 大类高流量题材',
          type: 'mixed',
          content: '<p>了解4大类高流量题材，选择最适合的创作方向。</p>',
          completed: false,
          learnedCount: 0,
        },
        {
          id: 'chapter-12',
          title: '第十二章 暗黑元素: 病娇剧情与计谋设计',
          type: 'mixed',
          content: '<p>学习暗黑元素的运用，掌握病娇剧情与计谋设计的创作方法。</p>',
          completed: false,
          learnedCount: 0,
        },
        {
          id: 'chapter-13',
          title: '第十三章 创作进阶: 短剧通关核心秘籍',
          type: 'mixed',
          content: '<p>掌握短剧创作的核心秘籍，从入门到精通的进阶之路。</p>',
          completed: false,
          learnedCount: 0,
        },
      ],
    },
  ],
};

export const getLessonById = (course: Course, lessonId: string): Lesson | null => {
  for (const section of course.sections) {
    const lesson = section.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return null;
};

export const getNextLesson = (course: Course, currentLessonId: string): Lesson | null => {
  let found = false;
  for (const section of course.sections) {
    for (const lesson of section.lessons) {
      if (found) return lesson;
      if (lesson.id === currentLessonId) found = true;
    }
  }
  return null;
};

export const getPrevLesson = (course: Course, currentLessonId: string): Lesson | null => {
  let prevLesson: Lesson | null = null;
  for (const section of course.sections) {
    for (const lesson of section.lessons) {
      if (lesson.id === currentLessonId) return prevLesson;
      prevLesson = lesson;
    }
  }
  return null;
};

