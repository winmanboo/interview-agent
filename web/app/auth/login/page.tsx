'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Alert from '@mui/material/Alert'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Suspense } from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

export function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect') || '/'
  
  const [tab, setTab] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
    setError('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (tab === 0) {
      // 登录逻辑
      if (!formData.email || !formData.password) {
        setError('请填写所有必填字段')
        return
      }

      // 模拟登录验证
      if (formData.email === 'test@example.com' && formData.password === 'password') {
        const userData = {
          name: '测试用户',
          email: formData.email
        }
        localStorage.setItem('user', JSON.stringify(userData))
        router.push(redirectUrl)
      } else {
        setError('邮箱或密码错误')
      }
    } else {
      // 注册逻辑
      if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('请填写所有必填字段')
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setError('两次输入的密码不一致')
        return
      }

      // 模拟注册成功
      const userData = {
        name: formData.username,
        email: formData.email
      }
      localStorage.setItem('user', JSON.stringify(userData))
      router.push(redirectUrl)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
        p: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          borderRadius: 4,
          boxShadow: '0 4px 32px #8F6EFF22',
          position: 'relative',
        }}
      >
        <IconButton
          onClick={() => router.back()}
          sx={{
            position: 'absolute',
            left: 16,
            top: 16,
            zIndex: 1,
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box sx={{ pt: 6, px: 3 }}>
          <Typography variant="h5" fontWeight={600} align="center" gutterBottom>
            {tab === 0 ? '欢迎回来' : '创建账号'}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            {tab === 0 ? '登录您的账号以继续使用' : '注册新账号开始使用'}
          </Typography>
        </Box>

        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              py: 2,
              fontSize: '1rem',
              fontWeight: 600,
            },
          }}
        >
          <Tab label="登录" />
          <Tab label="注册" />
        </Tabs>

        <Box component="form" onSubmit={handleSubmit}>
          <TabPanel value={tab} index={0}>
            <Box display="flex" flexDirection="column" gap={3}>
              {error && (
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                  {error}
                </Alert>
              )}
              <TextField
                fullWidth
                label="邮箱"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="密码"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  height: 48,
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #5B8CFF, #8F6EFF)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #8F6EFF, #5B8CFF)',
                  }
                }}
              >
                登录
              </Button>
            </Box>
          </TabPanel>

          <TabPanel value={tab} index={1}>
            <Box display="flex" flexDirection="column" gap={3}>
              {error && (
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                  {error}
                </Alert>
              )}
              <TextField
                fullWidth
                label="用户名"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="邮箱"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="密码"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="确认密码"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  height: 48,
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #5B8CFF, #8F6EFF)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #8F6EFF, #5B8CFF)',
                  }
                }}
              >
                注册
              </Button>
            </Box>
          </TabPanel>
        </Box>
      </Card>
    </Box>
  )
}

export default function Page() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  )
} 