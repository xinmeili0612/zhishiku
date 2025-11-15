# 知识课程平台 MVP

一个基于 Next.js 的响应式在线课程学习平台。

## 功能特性

- ✅ 用户认证（登录/注册）
- ✅ 响应式布局（适配移动端、平板、桌面）
- ✅ 课程目录导航（移动端抽屉式侧边栏）
- ✅ 课程内容展示（支持视频和图文）
- ✅ 学习进度跟踪
- ✅ 讨论区（评论功能）
- ✅ 本地数据持久化

## 技术栈

- **框架**: Next.js 14+ (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态管理**: React Context API
- **数据存储**: localStorage (MVP阶段)

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
zhishi/
├── app/                    # Next.js App Router 页面
│   ├── (auth)/            # 认证相关页面
│   ├── (course)/         # 课程相关页面
│   └── layout.tsx         # 根布局
├── components/            # React 组件
│   ├── Layout/           # 布局组件
│   ├── Course/           # 课程相关组件
│   └── Auth/             # 认证组件
├── context/               # React Context
├── hooks/                 # 自定义 Hooks
├── types/                 # TypeScript 类型定义
└── utils/                 # 工具函数
```

## 响应式设计

- **移动端** (< 640px): 侧边栏为抽屉式，全屏内容展示
- **平板** (640px - 1024px): 侧边栏可折叠
- **桌面** (> 1024px): 侧边栏默认显示

## 开发计划

- [x] 项目初始化
- [x] 类型定义
- [x] 响应式布局
- [x] 认证系统
- [x] 课程功能
- [x] 讨论区
- [x] 学习进度跟踪
- [x] 移动端优化
- [ ] 后端 API 集成
- [ ] 图片上传
- [ ] 视频播放优化
- [ ] 搜索功能

## 许可证

MIT

