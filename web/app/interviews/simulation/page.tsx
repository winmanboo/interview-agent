"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import Link from "next/link"
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import VideocamIcon from '@mui/icons-material/Videocam'
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import PersonIcon from '@mui/icons-material/Person'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import TimerIcon from '@mui/icons-material/Timer'
import AssessmentIcon from '@mui/icons-material/Assessment'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import CloseIcon from '@mui/icons-material/Close'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import CircularProgress from '@mui/material/CircularProgress'
import { motion, AnimatePresence } from 'framer-motion'
import { WebRTCPlayer } from '../../lib/webrtcPlayer'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2, Video, VideoOff, Play } from 'lucide-react'

enum MessageType {
  AI = 1,
  USER = 2,
  TIP = 3,
  SPECIAL = 4
}

interface InterviewMessage {
  role: "system" | "interviewer" | "user";
  content: string;
}

function SimulationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sceneId = searchParams.get('id')

  // WebRTC状态
  const [webrtcPlayer, setWebrtcPlayer] = useState<WebRTCPlayer | null>(null)
  const webrtcPlayerRef = useRef<WebRTCPlayer | null>(null) // 用ref保存webrtcPlayer引用，避免异步操作中丢失
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [sessionIdForUI, setSessionIdForUI] = useState<string | null>(null)
  const sessionIdRef = useRef<string | null>(null)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [uploadResumeRequested, setUploadResumeRequested] = useState(false)
  const [isResumeUploading, setIsResumeUploading] = useState(false)
  const [isResumeUploaded, setIsResumeUploaded] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(false)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isWebRTCConnected, setIsWebRTCConnected] = useState(false)

  // 媒体状态
  const [isRecording, setIsRecording] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const interviewVideoRef = useRef<HTMLVideoElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // 面试状态
  const [isInterviewStarted, setIsInterviewStarted] = useState(false)
  const [isPreparing, setIsPreparing] = useState(false)
  const [isAnswering, setIsAnswering] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [preparationTime, setPreparationTime] = useState(5) // 准备时间5秒
  const [answerTime, setAnswerTime] = useState(120) // 回答时间2分钟
  const [remainingTime, setRemainingTime] = useState(0)
  const [interviewTime, setInterviewTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [hasSentStartEvent, setHasSentStartEvent] = useState(false)
  const [waitingForNext, setWaitingForNext] = useState(false)
  const hasSentStartEventRef = useRef(false)
  
  // UI状态
  const [messages, setMessages] = useState<InterviewMessage[]>([
    { role: "system", content: "欢迎参加模拟面试，请准备好，我们即将开始面试。" }
  ])
  const [showTips, setShowTips] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeUrl, setResumeUrl] = useState<string>("")
  const [resumeError, setResumeError] = useState<string>("")
  const [showResumePreview, setShowResumePreview] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<string>("等待面试开始...")
  const [questionHistory, setQuestionHistory] = useState<string[]>([])

  const lastAIReportRef = useRef<string | null>(null)

  // 初始化WebRTC客户端
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isInterviewStarted) {
      timer = setInterval(() => {
        setInterviewTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isInterviewStarted])

  useEffect(() => {
    webrtcPlayerRef.current = webrtcPlayer;
  }, [webrtcPlayer]);

  // 监控WebRTC连接状态
  useEffect(() => {
    if (webrtcPlayer) {
      const handleConnectionStateChange = (connectionState: string) => {
        console.log('WebRTC连接状态变化:', connectionState);
        
        // 只在面试未开始时处理连接状态变化，避免在面试过程中干扰
        if (!isInterviewStarted) {
          if (connectionState === 'failed') {
            console.warn('WebRTC连接失败');
            setIsConnected(false);
            setConnectionError('WebRTC连接失败');
          } else if (connectionState === 'connected') {
            console.log('WebRTC连接已建立');
            setIsConnected(true);
            setConnectionError(null);
          } else if (connectionState === 'disconnected') {
            console.warn('WebRTC连接断开');
            setIsConnected(false);
          }
        } else {
          // 面试进行中，只记录状态变化，不更新UI状态，避免干扰面试流程
          console.log('面试进行中，WebRTC连接状态变化:', connectionState, '但不更新UI状态');
          
          // 只有在连接完全失败时才记录错误
          if (connectionState === 'failed') {
            console.error('面试进行中WebRTC连接失败');
            setConnectionError('面试进行中连接失败，请重新开始面试');
          }
        }
      };

      // 添加连接状态监听器
      const removeListener = webrtcPlayer.addConnectionStateListener(handleConnectionStateChange);
      
      return () => {
        removeListener();
      };
    }
  }, [webrtcPlayer, isInterviewStarted]);

  // 格式化时间显示
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 播放问题
  const playQuestion = () => {
    setIsSpeaking(true);
    // 这里可以添加文字转语音的逻辑
    setTimeout(() => {
      setIsSpeaking(false);
      // 确保不是在已经准备或回答的状态下再次触发准备
      if (!isPreparing && !isAnswering) {
        startPreparation();
      }
    }, 2000);
  };

  // 切换摄像头和连接状态
  const handleToggleCamera = async () => {
    if (isVideoOn) {
      // 面试进行中禁止关闭摄像头，避免中断面试流程
      if (isInterviewStarted) {
        console.warn('面试进行中，禁止关闭摄像头');
        return;
      }
      
      webrtcPlayer?.close();
      setWebrtcPlayer(null);
      setIsVideoOn(false);
      setIsConnected(false);
      setSessionIdForUI(null);
      sessionIdRef.current = null;
    } else {
      setIsConnecting(true);
      setConnectionError(null);
      try {
        console.log('检查video元素状态:', {
          interviewVideoRef: interviewVideoRef.current,
          interviewVideoRefExists: !!interviewVideoRef.current
        });
        
        if (interviewVideoRef.current) {
          const player = new WebRTCPlayer({
            remoteVideoEl: interviewVideoRef.current,
            audio: true,
            video: { width: 640, height: 480 },
            offerUrl: 'http://localhost:8080/api/offer',
            onDataChannelMessage: handleDataChannelMessage
          });
          setWebrtcPlayer(player);
          await player.start();
          
          // 保存session_id
          if (player.sessionId) {
            sessionIdRef.current = player.sessionId;
            setSessionIdForUI(player.sessionId);
          }
          
          setIsVideoOn(true);
          setIsConnected(true);
          setIsWebRTCConnected(true);
        } else {
          setConnectionError('视频元素未挂载');
        }
      } catch (e: any) {
        console.error('WebRTC连接失败:', e);
        setConnectionError(e.message || '连接失败');
      } finally {
        setIsConnecting(false);
      }
    }
  };

  const toggleAudio = () => {
    if (webrtcPlayer && webrtcPlayer.localStream) {
      const audioTracks = webrtcPlayer.localStream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = !isAudioOn;
        setIsAudioOn(!isAudioOn);
        console.log(`音频已 ${!isAudioOn ? '开启' : '关闭'}`);
      }
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // 开始录音
      setIsListening(true)
      // 这里添加录音逻辑
    } else {
      // 停止录音
      setIsListening(false)
      // 这里添加停止录音和语音识别逻辑
    }
  }

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== "application/pdf" && file.type !== "text/plain") {
        setResumeError("仅支持PDF或TXT格式的简历文件")
        setResumeFile(null)
        setResumeUrl("")
        return
      }
      setResumeFile(file)
      setResumeUrl(URL.createObjectURL(file))
      setResumeError("")
    }
  }

  const handleReupload = () => {
    setResumeFile(null)
    setResumeUrl("")
    setResumeError("")
    setIsResumeUploaded(false)
  }

  const startPreparation = () => {
    console.log('startPreparation被调用，当前状态:', {
      isPreparing,
      isAnswering,
      remainingTime,
      timerRef: !!timerRef.current,
      webrtcPlayer: !!webrtcPlayer
    });
    
    // 清理之前的定时器
    if (timerRef.current) {
      console.log('清理之前的定时器');
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setIsPreparing(true);
    setRemainingTime(preparationTime);
    
    // 添加准备开始消息
    setMessages(prev => [...prev, {
      role: "system",
      content: `准备时间开始，您有${preparationTime}秒时间准备回答。`
    }]);
    
    console.log('开始准备时间倒计时，准备时间:', preparationTime);
    
    // 开始倒计时
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        console.log('准备时间倒计时:', prev);
        if (prev <= 1) {
          console.log('准备时间倒计时结束，调用handlePreparationEnd');
          clearInterval(timer);
          handlePreparationEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    timerRef.current = timer;
    console.log('定时器已设置:', timer, '准备时间:', preparationTime);
  };
  
  // 处理准备时间结束
  const handlePreparationEnd = () => {
    console.log('handlePreparationEnd被调用，当前状态:', {
      isPreparing,
      isAnswering,
      remainingTime,
      webrtcPlayer: !!webrtcPlayer,
      webrtcPlayerType: typeof webrtcPlayer,
      webrtcPlayerValue: webrtcPlayer,
      timerRef: !!timerRef.current,
      hasSentStartEvent: hasSentStartEventRef.current,
      isInterviewStarted,
      isConnected,
      isVideoOn
    });
    
    // 清理之前的定时器
    if (timerRef.current) {
      console.log('清理之前的定时器');
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setIsPreparing(false);
    setIsAnswering(true);
    setRemainingTime(answerTime);
    
    // 检查是否已经添加过开始回答消息，避免重复
    setMessages(prev => {
      const lastMessage = prev[prev.length - 1];
      console.log('检查最后一条消息:', lastMessage);
      if (lastMessage && lastMessage.content === "准备时间结束，现在开始回答。") {
        // 如果最后一条消息已经是开始回答消息，则不重复添加
        console.log('最后一条消息已经是开始回答消息，不重复添加');
        return prev;
      }
      console.log('添加开始回答消息');
      return [...prev, {
        role: "system",
        content: "准备时间结束，现在开始回答。"
      }];
    });
    
    // 通过DataChannel发送start事件到后端
    if (webrtcPlayerRef.current && !hasSentStartEventRef.current) {
      console.log('发送start事件到后端 (via ref)');
      const success = webrtcPlayerRef.current.sendDataChannelMessage("start");
      console.log('start事件发送结果:', success);
      if (success) {
        hasSentStartEventRef.current = true;
        setHasSentStartEvent(true);
        console.log('start事件已标记为已发送');
      }
    } else {
      console.error('webrtcPlayer不存在或start事件已发送，无法发送start事件', {
        playerExists: !!webrtcPlayerRef.current,
        eventSent: hasSentStartEventRef.current
      });
    }
    
    // 开始回答倒计时
    const timer = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          console.log('回答时间倒计时结束，调用endAnswering');
          clearInterval(timer);
          endAnswering();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    timerRef.current = timer;
    console.log('回答倒计时定时器已设置:', timer);
  };

  // 结束回答
  const endAnswering = () => {
    console.log('endAnswering被调用，当前状态:', {
      isPreparing,
      isAnswering,
      remainingTime,
      webrtcPlayer: !!webrtcPlayer,
      timerRef: !!timerRef.current,
      isInterviewStarted,
      isConnected
    });
    
    // 清理定时器
    if (timerRef.current) {
      console.log('清理回答倒计时定时器');
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setIsAnswering(false);
    setRemainingTime(0);
    
    // 添加回答结束消息
    setMessages(prev => [...prev, {
      role: "system",
      content: "回答结束，等待下一个问题..."
    }]);
    
    // 通过DataChannel发送stop事件到后端，但不调用stopAnswering方法
    if (webrtcPlayer) {
      console.log('发送stop事件到后端');
      
      // 检查DataChannel状态
      const dcStatus = webrtcPlayer.getDataChannelStatus();
      console.log('DataChannel状态:', dcStatus);
      
      // 检查连接状态
      const connectionState = webrtcPlayer.getConnectionState();
      console.log('WebRTC连接状态:', connectionState);
      
      const success = webrtcPlayer.sendDataChannelMessage("stop");
      console.log('stop事件发送结果:', success);
      
      // 发送后再次检查状态
      setTimeout(() => {
        const newDcStatus = webrtcPlayer.getDataChannelStatus();
        const newConnectionState = webrtcPlayer.getConnectionState();
        console.log('发送stop事件后的状态变化:', {
          dcStatus: newDcStatus,
          connectionState: newConnectionState
        });
      }, 1000);
    } else {
      console.error('webrtcPlayer不存在，无法发送stop事件');
    }
    
    // 重要：回答结束后不自动开始新一轮准备，等待后端发送next事件
    console.log('回答结束，等待后端发送next事件开始下一轮');
    setWaitingForNext(true);
  };

  // 处理数据通道消息
  const handleDataChannelMessage = (message: any) => {
    console.log('收到DataChannel消息:', message);
    
    // 新的消息格式：{ type: number, content: string }
    try {
      // 根据消息类型处理
      if (message.type === MessageType.AI) {
        lastAIReportRef.current = message.content // 记录最后一条AI消息
        // AI回答
        setMessages(prev => [...prev, {
          role: "interviewer",
          content: message.content
        }]);
        
        // 滚动到最新消息
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        
      } else if (message.type === MessageType.USER) {
        // 用户回答
        setMessages(prev => [...prev, {
          role: "user",
          content: message.content
        }]);
        
        // 滚动到最新消息
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        
      } else if (message.type === MessageType.TIP) {
        // 提示信息
        setMessages(prev => [...prev, {
          role: "system",
          content: `提示: ${message.content}`
        }]);
        
        // 滚动到最新消息
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        
      } else if (message.type === MessageType.SPECIAL) {
        // 处理特殊消息
        if (message.content === 'next') {
          console.log('收到next消息，准备进入下一轮，当前状态:', {
            isPreparing,
            isAnswering,
            isInterviewStarted,
            webrtcPlayer: !!webrtcPlayer,
            hasSentStartEvent: hasSentStartEventRef.current
          });
          
          // 重置状态并开始新一轮准备
          setCurrentQuestionIndex(prev => {
            const newIndex = prev + 1;
            console.log('问题索引更新:', prev, '->', newIndex);
            return newIndex;
          });
          
          // 重置start事件发送状态，为新一轮准备做准备
          hasSentStartEventRef.current = false;
          setHasSentStartEvent(false);
          setWaitingForNext(false); // 重置等待next事件状态
          console.log('重置hasSentStartEvent状态，准备发送新一轮start事件');
          
          // 重要：只有在收到next事件后才开始新一轮准备
          setTimeout(() => {
            console.log('收到next消息，开始新一轮准备，延迟2秒后执行');
            startPreparation();
          }, 2000);
          
        } else if (message.content === 'end') {
          console.log('收到end消息，面试结束');
          // 面试结束
          handleInterviewEnd();
        } else {
          // 其他自定义消息
          setMessages(prev => [...prev, {
            role: "system",
            content: message.content
          }]);
        }
        
        // 滚动到最新消息
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        // 未知消息类型，直接显示
        setMessages(prev => [...prev, {
          role: "system",
          content: `收到消息: ${JSON.stringify(message)}`
        }]);
        
        // 滚动到最新消息
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (error) {
      console.error('处理数据通道消息失败:', error);
      
      // 即使解析失败，也尝试显示原始消息
      setMessages(prev => [...prev, {
        role: "system",
        content: `消息解析失败: ${String(message)}`
      }]);
    }
  };

  // 处理面试结束
  const handleInterviewEnd = () => {
    // 清理所有资源和状态
    if (webrtcPlayer) {
      webrtcPlayer.close();
    }
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    // 设置UI状态
    setIsInterviewStarted(false);
    setIsPreparing(false);
    setIsAnswering(false);
    setUploadResumeRequested(false);
    
    // 添加面试结束消息
    setMessages(prev => [...prev, {
      role: "system",
      content: "面试已结束，即将跳转到结果页面..."
    }]);
    
    // 延迟3秒后跳转到结果页面
    setTimeout(() => {
      if (lastAIReportRef.current) {
        sessionStorage.setItem('ai_report_json', lastAIReportRef.current)
        router.push(`/reports/result`)
      } else {
        router.push(`/reports/result`)
      }
    }, 3000);
  };

  // 开始面试
  const startInterview = async () => {
    // 确保有WebRTC连接
    if (!webrtcPlayer || !isConnected) {
      try {
        await handleToggleCamera();
        // 等待连接建立
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error('建立WebRTC连接失败:', error);
        setConnectionError('无法建立视频连接，请检查摄像头权限');
        return;
      }
    }
    
    if (!webrtcPlayer) {
      console.error('无法开始面试：RTCClient未初始化');
      return;
    }
    if (!webrtcPlayer.sessionId) {
      console.error('无法开始面试：会话ID未初始化');
      setConnectionError('无法开始面试，请重新连接');
      return;
    }
    
    // 发送开始面试请求
    try {
      const response = await fetch('http://localhost:5001/v1/agent/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          session_id: webrtcPlayer.sessionId, 
          scene_id: sceneId 
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`面试开始请求失败: ${response.status} ${response.statusText} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('面试开始响应:', data);
      
      setIsInterviewStarted(true);
      setUploadResumeRequested(true);
      setHasSentStartEvent(false); // 重置start事件发送状态
      setMessages(prev => [...prev, {
        role: "system",
        content: "面试已开始，请上传您的简历"
      }]);
      
      // 检查视频元素状态
      if (interviewVideoRef.current) {
        console.log('主界面视频元素状态:', {
          srcObject: interviewVideoRef.current.srcObject,
          readyState: interviewVideoRef.current.readyState,
          paused: interviewVideoRef.current.paused,
          currentTime: interviewVideoRef.current.currentTime,
          duration: interviewVideoRef.current.duration
        });
      }
      
      // 测试DataChannel连接
      if (webrtcPlayer) {
        const dcStatus = webrtcPlayer.getDataChannelStatus();
        if (dcStatus.open) {
          webrtcPlayer.sendDataChannelMessage("test_connection");
        }
      }
    } catch (e: any) {
      console.error('开始面试失败:', e);
      setConnectionError(`无法开始面试: ${e.message}`);
    }
  };

  // 上传简历
  const uploadResume = async () => {
    if (!resumeFile) {
      setResumeError('请选择简历文件');
      return;
    }
    
    if (!sessionIdRef.current) {
      setResumeError('系统错误，请重新连接后再试');
      return;
    }
    
    try {
      setIsResumeUploading(true);
      
      // 创建表单数据，使用'file'字段名匹配后端API
      const formData = new FormData();
      formData.append('file', resumeFile);
      
      // 上传简历到正确的API端点
      const uploadUrl = `http://localhost:5001/v1/interview/upload/${sessionIdRef.current}`;
      
      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`上传失败: ${response.status} ${response.statusText} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('简历上传成功，响应数据:', data);
      
      setIsResumeUploaded(true);
      setUploadResumeRequested(false);
      
      // 处理后端返回的消息
      if (data && typeof data === 'object') {
        // 如果返回的是消息格式 { type: number, content: string }
        if (data.type && data.content) {
          if (data.type === MessageType.AI) {
            // AI回答
            setMessages(prev => [...prev, {
              role: "interviewer",
              content: data.content
            }]);
          } else if (data.type === MessageType.TIP) {
            // 提示信息
            setMessages(prev => [...prev, {
              role: "system",
              content: `提示: ${data.content}`
            }]);
          } else {
            // 其他类型消息
            setMessages(prev => [...prev, {
              role: "system",
              content: data.content
            }]);
          }
        } else {
          // 如果返回的不是标准消息格式，显示上传成功消息
          setMessages(prev => [...prev, {
            role: "system",
            content: "简历上传成功，准备开始面试..."
          }]);
        }
      } else {
        // 如果返回的不是对象，显示上传成功消息
        setMessages(prev => [...prev, {
          role: "system",
          content: "简历上传成功，准备开始面试..."
        }]);
      }
      
      // 开始准备
      setTimeout(() => {
        console.log('简历上传成功，开始第一轮准备');
        startPreparation();
      }, 2000);
      
    } catch (error: any) {
      console.error('上传简历失败:', error);
      setResumeError(`上传失败: ${error.message}`);
    } finally {
      setIsResumeUploading(false);
    }
  };
  
  // 更新进度条
  const updateProgress = () => {
    // 简化的进度计算
    if (isInterviewStarted) {
      setProgress(50); // 面试开始后显示50%进度
    } else {
      setProgress(0);
    }
  };

  // 清理视频流
  useEffect(() => {
    return () => {
      if (webrtcPlayer) {
        webrtcPlayer.close();
      }
    };
  }, [webrtcPlayer]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // 在接收到消息后自动滚动消息区域到底部
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Box 
      minHeight="100vh" 
      display="flex" 
      flexDirection="column" 
      bgcolor="#f5f5f5"
      sx={{ 
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%'
      }}
    >
      {/* 初始连接和准备对话框 */}
      <Dialog
        open={!isInterviewStarted}
        maxWidth="sm"
        fullWidth
        onClose={() => {}}
        disableEscapeKeyDown
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
          },
        }}
        sx={{
          '& .MuiDialog-paper': {
            overflow: 'visible',
          },
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h5" fontWeight={600} textAlign="center">
            准备开始面试
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3} py={2}>
            {connectionError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                <AlertTitle>连接错误</AlertTitle>
                {connectionError}
              </Alert>
            )}

            {/* 连接状态 */}
            <Card 
              sx={{ 
                p: 3, 
                borderRadius: 3,
                bgcolor: isConnected ? 'rgba(76, 175, 80, 0.05)' : 'transparent',
                border: '1px solid',
                borderColor: isConnected ? 'success.main' : 'grey.300',
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" fontWeight={500}>
                  连接状态
                </Typography>
                <Box 
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: isConnected ? 'success.main' : 'error.main',
                  }}
                />
              </Box>
              <Typography variant="body1" mt={1} color="text.secondary">
                {isConnected ? '已连接到服务器' : '未连接到服务器'}
              </Typography>
              {sessionIdForUI && (
                <Typography variant="body2" mt={1} color="text.secondary">
                  会话ID: {sessionIdForUI}
                </Typography>
              )}
            </Card>

            {/* 简历上传区域 */}
            {uploadResumeRequested ? (
              <Card 
                sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  border: '2px dashed',
                  borderColor: resumeFile ? 'success.main' : 'primary.main',
                  bgcolor: resumeFile ? 'rgba(76, 175, 80, 0.05)' : 'rgba(25, 118, 210, 0.05)',
                }}
              >
                <Typography variant="h6" fontWeight={600} mb={2}>
                  上传简历
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                  面试助手需要您上传简历以便进行面试。请上传PDF或TXT格式的简历文件。
                </Typography>

                {isResumeUploaded ? (
                  <Alert severity="success">
                    <AlertTitle>上传成功</AlertTitle>
                    简历已成功上传，面试即将开始。
                  </Alert>
                ) : (
                  <Box
                    component="label"
                    htmlFor="resume-upload"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                    sx={{ cursor: 'pointer' }}
                  >
                    <UploadFileIcon 
                      sx={{ 
                        fontSize: 48, 
                        color: resumeFile ? 'success.main' : 'grey.400',
                        transition: 'all 0.3s ease'
                      }} 
                    />
                    <Typography 
                      variant="h6" 
                      color={resumeFile ? 'success.main' : 'text.secondary'}
                      textAlign="center"
                    >
                      {resumeFile ? "简历已上传" : "上传简历"}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      textAlign="center"
                    >
                      {resumeFile ? resumeFile.name : "支持 PDF、TXT 格式"}
                    </Typography>
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.txt"
                      onChange={handleResumeChange}
                      style={{ display: 'none' }}
                      disabled={isInterviewStarted}
                    />
                  </Box>
                )}

                {resumeFile && !isResumeUploaded && (
                  <Box display="flex" justifyContent="center" gap={2} mt={3}>
                    <Button
                      variant="outlined"
                      onClick={() => setShowResumePreview(true)}
                      startIcon={<UploadFileIcon />}
                      sx={{
                        borderRadius: 2,
                      }}
                    >
                      预览简历
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleReupload}
                      startIcon={<CloseIcon />}
                      sx={{
                        borderRadius: 2,
                      }}
                    >
                      移除简历
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={uploadResume}
                      disabled={isResumeUploading}
                      sx={{
                        borderRadius: 2,
                        background: 'linear-gradient(45deg, #5B8CFF, #8F6EFF)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #8F6EFF, #5B8CFF)',
                        }
                      }}
                    >
                      {isResumeUploading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "上传简历"
                      )}
                    </Button>
                  </Box>
                )}

                {resumeError && (
                  <Typography color="error" textAlign="center" mt={2}>
                    {resumeError}
                  </Typography>
                )}
              </Card>
            ) : (
              <Card 
                sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  border: '2px solid',
                  borderColor: 'grey.300',
                }}
              >
                <Typography variant="h6" fontWeight={600} mb={2}>
                  摄像头预览
                </Typography>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 300,
                    borderRadius: 2,
                    overflow: 'hidden',
                    bgcolor: 'black',
                  }}
                >
                  {/* 摄像头未开启时的提示 */}
                  {!isVideoOn && !isConnected && !isWebRTCConnected && (
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#fafafa',
                        gap: 2
                      }}
                    >
                      <VideocamOffIcon sx={{ fontSize: 48, color: 'grey.400' }} />
                      <Typography color="text.secondary">摄像头已关闭</Typography>
                    </Box>
                  )}
                  {/* 摄像头已开启时的提示 */}
                  {(isVideoOn || isConnected || isWebRTCConnected) && (
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(0,0,0,0.8)',
                        color: 'white',
                        gap: 2
                      }}
                    >
                      <VideocamIcon sx={{ fontSize: 48, color: 'white' }} />
                      <Typography variant="h6">摄像头已开启</Typography>
                      <Typography variant="body2" color="grey.300">视频将在主界面显示</Typography>
                    </Box>
                  )}
                </Box>
              </Card>
            )}

            <Box display="flex" justifyContent="center" gap={2}>
              <Button
                variant="contained"
                startIcon={isVideoOn ? <VideocamOffIcon /> : <VideocamIcon />}
                onClick={handleToggleCamera}
                disabled={isConnecting || (isInterviewStarted && isVideoOn)}
                sx={{
                  borderRadius: 2,
                  background: isVideoOn ? 'linear-gradient(45deg, #5B8CFF, #8F6EFF)' : 'grey.500',
                  '&:hover': {
                    background: isVideoOn ? 'linear-gradient(45deg, #8F6EFF, #5B8CFF)' : 'grey.600',
                  }
                }}
              >
                {isConnecting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  isVideoOn ? "关闭摄像头" : "开启摄像头"
                )}
              </Button>
              <Button
                variant="contained"
                startIcon={isVideoOn && !isWebRTCConnected ? <CircularProgress size={16} /> : <SmartToyIcon />}
                onClick={startInterview}
                disabled={!isConnected || isInterviewStarted || !isVideoOn || !isWebRTCConnected}
                sx={{
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #5B8CFF, #8F6EFF)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #8F6EFF, #5B8CFF)',
                  },
                  '&.Mui-disabled': {
                    background: 'grey.300',
                  }
                }}
              >
                {isVideoOn && !isWebRTCConnected ? "正在建立连接..." : 
                 isInterviewStarted ? "面试进行中" : "开始面试"}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* 简历预览对话框 */}
      <Dialog
        open={showResumePreview}
        onClose={() => setShowResumePreview(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            height: '80vh',
          },
        }}
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">简历预览</Typography>
          <IconButton onClick={() => setShowResumePreview(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {resumeUrl && (
            <iframe
              src={resumeUrl}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* 主界面 */}
      <Box 
        className={isInterviewStarted ? "" : "pointer-events-none blur-sm select-none"} 
        flex={1} 
        display="flex" 
        flexDirection="column"
        sx={{ 
          overflow: 'hidden',
          height: '100%'
        }}
      >
        <Box 
          component="header" 
          position="sticky" 
          top={0} 
          zIndex={1000} 
          width="100%" 
          bgcolor="#fff" 
          boxShadow={1}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between" px={3} height={64}>
            <Box display="flex" alignItems="center" gap={2}>
              <Link href="/interviews" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                <IconButton size="small" sx={{ mr: 1 }}><ArrowBackIcon /></IconButton>
                <Typography variant="body1" fontWeight={500}>返回</Typography>
              </Link>
              <Box display="flex" alignItems="center" gap={1}>
                <TimerIcon color="primary" />
                <Typography variant="body2" color="text.secondary">
                  {formatTime(interviewTime)}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={3}>
              <Typography variant="h6" fontWeight={600}>模拟面试</Typography>
              <Box width={200}>
                <LinearProgress 
                  variant="determinate" 
                  value={questionHistory.length > 0 ? (currentQuestionIndex / (questionHistory.length + 5)) * 100 : 0}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'rgba(143, 110, 255, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(45deg, #5B8CFF, #8F6EFF)',
                    }
                  }}
                />
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton 
                color={isRecording ? "error" : "default"} 
                onClick={isAnswering ? endAnswering : undefined}
                disabled={!isAnswering}
                sx={{
                  bgcolor: isRecording ? 'rgba(211, 47, 47, 0.1)' : 'transparent',
                  '&:hover': {
                    bgcolor: isRecording ? 'rgba(211, 47, 47, 0.2)' : 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                {isAnswering ? <MicOffIcon /> : (isRecording ? <MicOffIcon /> : <MicIcon />)}
              </IconButton>
              <IconButton 
                onClick={handleToggleCamera}
                disabled={isConnecting || (isInterviewStarted && isVideoOn)}
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                  }
                }}
              >
                {isConnecting ? (
                  <CircularProgress size={32} color="inherit" />
                ) : (
                  isVideoOn ? <VideocamOffIcon sx={{ fontSize: 32 }} /> : <VideocamIcon sx={{ fontSize: 32 }} />
                )}
              </IconButton>
              <IconButton 
                color={isAudioOn ? "primary" : "default"}
                onClick={toggleAudio}
                sx={{
                  bgcolor: isAudioOn ? 'rgba(91, 140, 255, 0.1)' : 'transparent',
                  '&:hover': {
                    bgcolor: isAudioOn ? 'rgba(91, 140, 255, 0.2)' : 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                {isAudioOn ? <VolumeUpIcon /> : <VolumeOffIcon />}
              </IconButton>
              <IconButton 
                onClick={() => setShowTips(!showTips)}
                sx={{
                  bgcolor: showTips ? 'rgba(143, 110, 255, 0.1)' : 'transparent',
                  '&:hover': {
                    bgcolor: showTips ? 'rgba(143, 110, 255, 0.2)' : 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                <HelpOutlineIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box 
          display="flex" 
          flex={1}
          p={3} 
          gap={3} 
          sx={{ 
            height: 'calc(100% - 64px)',
            overflow: 'hidden'
          }}
        >
          <Box 
            flex={1} 
            display="flex" 
            flexDirection="column" 
            gap={3}
            sx={{
              overflow: 'hidden'
            }}
          >
            <Card sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              borderRadius: 3, 
              overflow: 'hidden', 
              position: 'relative' 
            }}>
              <Box
                component="video"
                ref={interviewVideoRef}
                autoPlay
                playsInline
                muted
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  bgcolor: '#000',
                  transform: 'scaleX(-1)',
                  display: 'block',
                  opacity: (isVideoOn || isConnected || isWebRTCConnected || isInterviewStarted) ? 1 : 0,
                }}
              />
              {/* 如果面试已开始但没有视频流，显示提示 */}
              {isInterviewStarted && !isVideoOn && !isConnected && !isWebRTCConnected && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    gap: 2,
                    zIndex: 1
                  }}
                >
                  <VideocamIcon sx={{ fontSize: 48, color: 'white' }} />
                  <Typography variant="h6">正在连接摄像头...</Typography>
                  <Typography variant="body2" color="grey.300">请稍候，系统正在建立视频连接</Typography>
                </Box>
              )}
              {/* 摄像头未开启时的提示 */}
              {!isInterviewStarted && !isVideoOn && !isConnected && !isWebRTCConnected && (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#fafafa',
                    gap: 2
                  }}
                >
                  <VideocamOffIcon sx={{ fontSize: 48, color: 'grey.400' }} />
                  <Typography color="text.secondary">摄像头已关闭</Typography>
                </Box>
              )}
              <Box
                position="absolute"
                bottom={16}
                left="50%"
                sx={{ transform: 'translateX(-50%)' }}
                display="flex"
                gap={2}
              >
                {isPreparing && (
                  <Box
                    sx={{
                      bgcolor: 'rgba(255, 152, 0, 0.9)',
                      color: 'white',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <TimerIcon />
                    <Typography>准备时间：{remainingTime}秒</Typography>
                  </Box>
                )}
                {isAnswering && (
                  <Box
                    sx={{
                      bgcolor: 'rgba(76, 175, 80, 0.9)',
                      color: 'white',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <TimerIcon />
                    <Typography>作答时间：{remainingTime}秒</Typography>
                  </Box>
                )}
                {isSpeaking && (
                  <Box
                    sx={{
                      bgcolor: 'rgba(91, 140, 255, 0.9)',
                      color: 'white',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <SmartToyIcon />
                    <Typography>AI面试官正在提问</Typography>
                  </Box>
                )}
                {isListening && (
                  <Box
                    sx={{
                      bgcolor: 'rgba(211, 47, 47, 0.9)',
                      color: 'white',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <MicIcon />
                    <Typography>正在听取您的回答</Typography>
                  </Box>
                )}
              </Box>

              {isAnswering && (
                <Box
                  position="absolute"
                  bottom={16}
                  right={16}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={endAnswering}
                    startIcon={<MicOffIcon />}
                    sx={{
                      bgcolor: 'rgba(211, 47, 47, 0.9)',
                      '&:hover': {
                        bgcolor: 'rgba(211, 47, 47, 1)',
                      }
                    }}
                  >
                    结束作答
                  </Button>
                </Box>
              )}
            </Card>
          </Box>

          <Box 
            width={400} 
            display="flex" 
            flexDirection="column" 
            gap={3} 
            sx={{ 
              overflow: 'hidden',
              height: '100%'
            }}
          >
            {/* 当前问题卡片 */}
            <Card sx={{ 
              borderRadius: 3, 
              p: 3, 
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              flexShrink: 0
            }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight={600} color="primary">当前问题</Typography>
                <Typography variant="body2" color="text.secondary">问题 {currentQuestionIndex}/{questionHistory.length || 1}</Typography>
              </Box>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 1 }}>
                {currentQuestion || "等待面试开始..."}
              </Typography>
              {isPreparing && (
                <Box display="flex" alignItems="center" gap={1} mt={2}>
                  <TimerIcon fontSize="small" color="warning" />
                  <Typography variant="body2" color="warning.main">准备时间：{remainingTime}秒</Typography>
                </Box>
              )}
              {isAnswering && (
                <Box display="flex" alignItems="center" gap={1} mt={2}>
                  <TimerIcon fontSize="small" color="success" />
                  <Typography variant="body2" color="success.main">作答时间：{remainingTime}秒</Typography>
                </Box>
              )}
            </Card>

            {/* 面试记录卡片 */}
            <Card sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              borderRadius: 3, 
              overflow: 'hidden',
              minHeight: 0
            }}>
              <CardContent sx={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2, 
                p: 3, 
                overflow: 'hidden',
                height: '100%'
              }}>
                <Typography variant="h6" fontWeight={600} mb={2}>面试记录</Typography>
                <Box sx={{ 
                  flex: 1, 
                  overflow: 'auto',
                  minHeight: 0
                }}>
                  <AnimatePresence mode="wait">
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Box
                          display="flex"
                          gap={2}
                          sx={{
                            bgcolor: message.role === "system" ? "rgba(143, 110, 255, 0.1)" : "transparent",
                            p: message.role === "system" ? 2 : 0,
                            borderRadius: 2,
                            mb: 2,
                          }}
                        >
                          {message.role === "interviewer" ? (
                            <SmartToyIcon color="primary" />
                          ) : message.role === "user" ? (
                            <PersonIcon color="primary" />
                          ) : null}
                          <Typography
                            variant="body1"
                            sx={{
                              color: message.role === "system" ? "primary.main" : "text.primary",
                              fontWeight: message.role === "system" ? 500 : 400,
                              whiteSpace: "pre-wrap",
                              wordBreak: "break-word"
                            }}
                          >
                            {message.content}
                          </Typography>
                        </Box>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </Box>
              </CardContent>
            </Card>

            {showTips && (
              <Card sx={{ 
                borderRadius: 3, 
                p: 3, 
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                flexShrink: 0
              }}>
                <Typography variant="h6" fontWeight={600} mb={2}>面试技巧</Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Typography variant="body2">
                    • 保持清晰的表达和良好的语速
                  </Typography>
                  <Typography variant="body2">
                    • 回答问题时注意逻辑性和完整性
                  </Typography>
                  <Typography variant="body2">
                    • 遇到不确定的问题可以请求澄清
                  </Typography>
                  <Typography variant="body2">
                    • 展示你的思考过程和解决问题的方法
                  </Typography>
                  <Typography variant="body2">
                    • 回答结束后可点击"结束作答"手动结束
                  </Typography>
                </Box>
              </Card>
            )}
          </Box>
        </Box>
      </Box>

      {/* 在主界面中添加简历上传对话框 */}
      <Dialog
        open={isInterviewStarted && uploadResumeRequested && !isResumeUploaded}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
          },
        }}
        disableEscapeKeyDown
        onClose={() => {}}
        sx={{
          '& .MuiDialog-paper': {
            overflow: 'visible',
          },
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h5" fontWeight={600} textAlign="center">
            上传简历
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={3} py={2}>
            <Typography variant="body1" textAlign="center" color="text.secondary">
              面试官要求您上传简历，请选择PDF或TXT格式的简历文件上传。
            </Typography>

            {resumeError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                <AlertTitle>上传错误</AlertTitle>
                {resumeError}
              </Alert>
            )}

            <Card 
              sx={{ 
                p: 3, 
                borderRadius: 3,
                border: '2px dashed',
                borderColor: resumeFile ? 'success.main' : 'primary.main',
                bgcolor: resumeFile ? 'rgba(76, 175, 80, 0.05)' : 'rgba(25, 118, 210, 0.05)',
              }}
            >
              <Box
                component="label"
                htmlFor="resume-upload-modal"
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
                sx={{ cursor: 'pointer' }}
              >
                <UploadFileIcon 
                  sx={{ 
                    fontSize: 48, 
                    color: resumeFile ? 'success.main' : 'grey.400',
                    transition: 'all 0.3s ease'
                  }} 
                />
                <Typography 
                  variant="h6" 
                  color={resumeFile ? 'success.main' : 'text.secondary'}
                  textAlign="center"
                >
                  {resumeFile ? "简历已上传" : "上传简历"}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  textAlign="center"
                >
                  {resumeFile ? resumeFile.name : "支持 PDF、TXT 格式"}
                </Typography>
                <input
                  id="resume-upload-modal"
                  type="file"
                  accept=".pdf,.txt"
                  onChange={handleResumeChange}
                  style={{ display: 'none' }}
                />
              </Box>
            </Card>

            {resumeFile && (
              <Box display="flex" justifyContent="center" gap={2}>
                <Button
                  variant="outlined"
                  onClick={() => setShowResumePreview(true)}
                  startIcon={<UploadFileIcon />}
                  sx={{
                    borderRadius: 2,
                  }}
                >
                  预览简历
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleReupload}
                  startIcon={<CloseIcon />}
                  sx={{
                    borderRadius: 2,
                  }}
                >
                  移除简历
                </Button>
              </Box>
            )}

            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={uploadResume}
                disabled={!resumeFile || isResumeUploading}
                sx={{
                  borderRadius: 2,
                  minWidth: 120,
                  background: 'linear-gradient(45deg, #5B8CFF, #8F6EFF)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #8F6EFF, #5B8CFF)',
                  }
                }}
              >
                {isResumeUploading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "上传简历"
                )}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* 等待下一题友好UI */}
      {waitingForNext && (
        <Box
          sx={{
            position: 'fixed',
            right: 32,
            bottom: 32,
            zIndex: 2000,
            bgcolor: 'rgba(255,255,255,0.95)',
            boxShadow: 3,
            borderRadius: 3,
            px: 3,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            minWidth: 260,
            transition: 'all 0.3s',
            pointerEvents: 'none'
          }}
        >
          <CircularProgress size={28} color="primary" />
          <Typography variant="body1" color="primary">
            AI面试官正在准备下一个问题...
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <SimulationPage />
    </Suspense>
  );
}