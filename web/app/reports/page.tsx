'use client'
import { useState, useEffect } from 'react'
import Link from "next/link"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PeopleIcon from '@mui/icons-material/People'
import StarIcon from '@mui/icons-material/Star'
import VisibilityIcon from '@mui/icons-material/Visibility'
import NavBar from '../../components/NavBar'

export default function ReportsPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    // 从 localStorage 获取用户信息
    const userStr = localStorage.getItem('user')
    if (userStr) {
      setUser(JSON.parse(userStr))
    }
  }, [])

  const reports = [
    {
      id: 1,
      title: "算法工程师模拟面试",
      date: "2025-06-07",
      duration: "35分钟",
      score: 85,
      status: "已完成",
      field: "人工智能",
    },
    {
      id: 2,
      title: "数据分析师模拟面试",
      date: "2025-06-05",
      duration: "28分钟",
      score: 78,
      status: "已完成",
      field: "大数据",
    },
    {
      id: 3,
      title: "IoT开发工程师模拟面试",
      date: "2025-06-03",
      duration: "42分钟",
      score: 82,
      status: "已完成",
      field: "物联网",
    },
    {
      id: 4,
      title: "机器学习研究员模拟面试",
      date: "2025-06-01",
      duration: "45分钟",
      score: 88,
      status: "已完成",
      field: "人工智能",
    },
  ]

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" bgcolor="#f5f5f5">
      <NavBar current="reports" />
      <Box component="main" flex={1} py={4} px={{ xs: 1, md: 4 }}>
        <Box display="flex" flexDirection="column" gap={4}>
          <Box
            sx={{
              position: 'relative',
              minHeight: 180,
              mb: 4,
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 4px 32px #8F6EFF22',
              background: 'linear-gradient(120deg, #5B8CFF 0%, #8F6EFF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h4" fontWeight={800} color="#fff" sx={{ textShadow: '0 2px 12px #5B8CFF88' }}>
              我的面试报告
            </Typography>
          </Box>

          {user ? (
            <>
              <Grid container spacing={3} mb={1}>
                <Grid item xs={12} md={3}>
                  <Card sx={{ height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.04)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                    <CardHeader title={<Typography variant="body2" fontWeight={500}>总面试次数</Typography>} action={<CalendarMonthIcon color="action" />} />
                    <CardContent>
                      <Typography variant="h4" fontWeight={700}>12</Typography>
                      <Typography variant="caption" color="text.secondary">+2 较上月</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card sx={{ height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.04)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                    <CardHeader title={<Typography variant="body2" fontWeight={500}>平均得分</Typography>} action={<TrendingUpIcon color="action" />} />
                    <CardContent>
                      <Typography variant="h4" fontWeight={700}>83.2</Typography>
                      <Typography variant="caption" color="text.secondary">+5.2 较上月</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card sx={{ height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.04)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                    <CardHeader title={<Typography variant="body2" fontWeight={500}>总练习时长</Typography>} action={<AccessTimeIcon color="action" />} />
                    <CardContent>
                      <Typography variant="h4" fontWeight={700}>6.5h</Typography>
                      <Typography variant="caption" color="text.secondary">本月累计</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Card sx={{ height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.04)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                    <CardHeader title={<Typography variant="body2" fontWeight={500}>提升幅度</Typography>} action={<TrendingUpIcon color="action" />} />
                    <CardContent>
                      <Typography variant="h4" fontWeight={700}>+12%</Typography>
                      <Typography variant="caption" color="text.secondary">较首次面试</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.04)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                    <CardHeader
                      title={<Typography variant="h6" fontWeight={600}>最近面试记录</Typography>}
                      action={
                        <Chip
                          label="查看全部"
                          color="primary"
                          size="small"
                          clickable
                          component={Link}
                          href="/reports/history"
                        />
                      }
                    />
                    <CardContent>
                      <Box display="flex" flexDirection="column" gap={2}>
                        {reports.map((report) => (
                          <Box key={report.id} display="flex" alignItems="center" justifyContent="space-between" p={2} border={1} borderColor="#eee" borderRadius={2} sx={{ transition: 'box-shadow 0.2s, transform 0.2s', '&:hover': { boxShadow: '0 4px 24px #5B8CFF22', transform: 'scale(1.015)' } }}>
                            <Box display="flex" alignItems="center" gap={2}>
                              <Box display="flex" flexDirection="column">
                                <Typography fontWeight={500}>{report.title}</Typography>
                                <Box display="flex" alignItems="center" gap={2} color="text.secondary" fontSize={14}>
                                  <Box display="flex" alignItems="center" gap={0.5}>
                                    <CalendarMonthIcon sx={{ fontSize: 16 }} />
                                    <span>{report.date}</span>
                                  </Box>
                                  <Box display="flex" alignItems="center" gap={0.5}>
                                    <AccessTimeIcon sx={{ fontSize: 16 }} />
                                    <span>{report.duration}</span>
                                  </Box>
                                  <Chip label={report.field} size="small" variant="outlined" />
                                </Box>
                              </Box>
                            </Box>
                            <Box display="flex" alignItems="center" gap={2}>
                              <Box textAlign="right">
                                <Typography variant="h5" fontWeight={700}>{report.score}</Typography>
                                <Typography variant="caption" color="text.secondary">总分</Typography>
                              </Box>
                              <Button size="small" variant="outlined" component={Link} href={`/reports/result?id=${report.id}`} startIcon={<VisibilityIcon />}>
                                查看详情
                              </Button>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.04)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                    <CardHeader
                      title={<Typography variant="h6" fontWeight={600}>能力提升建议</Typography>}
                      action={<VisibilityIcon color="action" />}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        暂无提升建议
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </>
          ) : (
            <Card
              sx={{
                p: 4,
                textAlign: 'center',
                background: 'linear-gradient(120deg, #fff 0%, #f8f9ff 100%)',
                borderRadius: 4,
                boxShadow: '0 4px 32px #8F6EFF22',
              }}
            >
              <Typography variant="h5" fontWeight={600} mb={2}>
                登录后查看面试报告
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={4}>
                登录账号后，您可以查看详细的面试记录、能力分析和提升建议
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={Link}
                href="/auth/login"
                sx={{
                  height: 48,
                  px: 4,
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #5B8CFF, #8F6EFF)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #8F6EFF, #5B8CFF)',
                  }
                }}
              >
                立即登录
              </Button>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  )
}
