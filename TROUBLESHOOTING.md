# 本地页面打不开 - 故障排除指南

## 快速检查清单

### 1. 确认开发服务器正在运行
```powershell
# 检查端口3000是否被占用
netstat -ano | findstr :3000

# 如果看到输出，说明服务器正在运行
# 如果没有输出，运行以下命令启动服务器：
npm run dev
```

### 2. 尝试访问以下URL
- http://localhost:3000
- http://127.0.0.1:3000
- http://[::1]:3000

### 3. 检查浏览器控制台
按 F12 打开开发者工具，查看 Console 标签页是否有错误信息

### 4. 清除浏览器缓存
- Chrome/Edge: Ctrl + Shift + Delete
- 或使用无痕模式访问

### 5. 检查防火墙设置
确保 Windows 防火墙允许 Node.js 访问网络

### 6. 重新安装依赖
```powershell
# 删除 node_modules 和 package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# 重新安装
npm install

# 重新启动开发服务器
npm run dev
```

### 7. 检查环境变量
确保没有缺少必要的环境变量（当前项目使用默认值，应该没问题）

### 8. 查看开发服务器输出
在运行 `npm run dev` 的终端中查看是否有错误信息

## 常见错误及解决方案

### 错误：Cannot GET /
- **原因**: 路由配置问题
- **解决**: 检查 app/page.tsx 是否正确

### 错误：Module not found
- **原因**: 依赖未安装或路径错误
- **解决**: 运行 `npm install`

### 错误：Port 3000 is already in use
- **原因**: 端口被占用
- **解决**: 
  ```powershell
  # 查找占用端口的进程
  netstat -ano | findstr :3000
  # 停止进程（替换 PID 为实际进程ID）
  Stop-Process -Id <PID> -Force
  ```

### 页面显示空白
- **原因**: 客户端组件渲染错误
- **解决**: 检查浏览器控制台的错误信息

## 如果以上方法都不行

1. 尝试使用不同的端口：
   ```powershell
   npm run dev -- -p 3001
   ```
   然后访问 http://localhost:3001

2. 检查 Next.js 版本兼容性：
   ```powershell
   npm list next
   ```

3. 查看完整的错误日志：
   ```powershell
   npm run dev 2>&1 | Tee-Object -FilePath dev-log.txt
   ```

