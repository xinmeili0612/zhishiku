export default function TestPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>测试页面</h1>
      <p>如果你能看到这个页面，说明 Next.js 服务器运行正常！</p>
      <p>当前时间: {new Date().toLocaleString('zh-CN')}</p>
      <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
        返回首页
      </a>
    </div>
  );
}

