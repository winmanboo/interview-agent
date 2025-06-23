# 模拟面试系统

这是一个基于WebRTC的AI模拟面试系统，支持实时视频面试和智能问答。

## 功能特性

- 🎥 实时视频面试
- 🤖 AI面试官智能问答
- 📝 简历上传功能
- ⏱️ 自动计时和流程控制
- 💬 实时消息交互
- 📊 面试记录和反馈

## 系统架构

### 前端 (Next.js + TypeScript)
- 位置: `Interview Simulator/`
- 端口: 3000 (开发模式)
- 技术栈: Next.js, React, TypeScript, Material-UI, Tailwind CSS

### 后端服务
- WebRTC信令服务器: `localhost:8080`
- 面试AI服务: `localhost:5001`

## 快速开始

### 1. 启动前端

```bash
cd "Interview Simulator"
npm install
npm run dev
```

前端将在 http://localhost:3000 启动

### 2. 启动后端服务

确保以下服务正在运行：
- WebRTC信令服务器: `localhost:8080`
- 面试AI服务: `localhost:5001`

### 3. 访问系统

1. 打开浏览器访问 http://localhost:3000
2. 导航到模拟面试页面
3. 点击"开启摄像头"建立WebRTC连接
4. 点击"开始面试"启动面试流程
5. 上传简历开始面试

## API接口

### WebRTC连接
- **端点**: `POST http://localhost:8080/api/offer`
- **参数**: 
  - `sdp`: WebRTC SDP offer
  - `type`: SDP类型
- **返回**: 
  - `sdp`: WebRTC SDP answer
  - `type`: SDP类型
  - `session_id`: 会话ID

### 开始面试
- **端点**: `POST http://localhost:5001/v1/agent/start`
- **参数**:
  - `session_id`: 会话ID
  - `scene_id`: 场景ID
- **返回**: 面试开始确认

### 上传简历
- **端点**: `POST http://localhost:5001/v1/interview/upload/{session_id}`
- **参数**: FormData包含简历文件
  - `file`: 简历文件 (PDF或TXT格式)
- **返回**: 上传确认

## 消息格式

### DataChannel消息格式
```json
{
  "type": 1,  // 消息类型: 1=AI回答, 2=用户回答, 3=提示, 4=特殊信息
  "content": "消息内容"
}
```

### 特殊消息类型
- `type: 4, content: "next"` - 进入下一轮面试
- `type: 4, content: "end"` - 面试结束

### 控制事件
- `"start"` - 开始回答
- `"end"` - 结束回答

## 面试流程

1. **连接阶段**: 建立WebRTC连接，获取session_id
2. **开始面试**: 调用开始面试API
3. **上传简历**: 上传PDF或TXT格式简历
4. **准备阶段**: 30秒准备时间
5. **回答阶段**: 120秒回答时间
6. **自动控制**: 系统自动发送start/end事件
7. **循环问答**: 重复准备-回答流程
8. **面试结束**: 收到end信号后结束

## 开发说明

### 文件结构
```
Interview Simulator/
├── app/
│   ├── interviews/simulation/
│   │   └── page.tsx          # 主面试页面
│   └── lib/
│       └── webrtcPlayer.ts   # WebRTC客户端
├── components/               # UI组件
└── package.json
```

### 主要组件
- `WebRTCPlayer`: WebRTC连接管理
- `SimulationPage`: 主面试界面

### 状态管理
- WebRTC连接状态
- 面试流程状态
- 消息记录
- 计时器管理

## 故障排除

### 常见问题
1. **摄像头无法访问**: 确保浏览器有摄像头权限
2. **WebRTC连接失败**: 检查后端服务是否运行
3. **API调用失败**: 检查网络连接和API端点
4. **消息不显示**: 检查DataChannel连接状态

### 调试方法
1. 使用浏览器开发者工具查看控制台日志
2. 检查网络请求和响应
3. 查看WebRTC连接状态

## 技术栈

- **前端**: Next.js, React, TypeScript
- **UI**: Material-UI, Tailwind CSS
- **WebRTC**: 原生WebRTC API
- **通信**: WebRTC DataChannel
- **样式**: CSS-in-JS, Tailwind CSS
- **动画**: Framer Motion

## 许可证

MIT License