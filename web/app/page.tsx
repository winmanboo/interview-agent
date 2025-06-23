'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from "next/link"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import PeopleIcon from '@mui/icons-material/People'
import PsychologyIcon from '@mui/icons-material/Psychology'
import MemoryIcon from '@mui/icons-material/Memory'
import DevicesOtherIcon from '@mui/icons-material/DevicesOther'
import NavBar from '../components/NavBar'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function HomePage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [testimonialsRef, testimonialsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [jobsRef, jobsInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" bgcolor="#f5f5f5">
      <NavBar current="home" />
      <Box component="main" flex={1} py={8} px={{ xs: 2, md: 8 }}>
        <motion.div
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <Box
            component={motion.div}
            variants={fadeInUp}
            sx={{
              position: 'relative',
              minHeight: 320,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 8,
              borderRadius: 6,
              overflow: 'hidden',
              boxShadow: '0 4px 32px #8F6EFF22',
              background: 'linear-gradient(120deg, #5B8CFF 0%, #8F6EFF 100%)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)',
                animation: 'pulse 4s ease-in-out infinite',
              },
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.2)' },
                '100%': { transform: 'scale(1)' },
              }
            }}
          >
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.3 }}
              sx={{
                position: 'absolute',
                left: 32,
                top: 32,
                zIndex: 2,
                display: { xs: 'none', md: 'block' },
              }}
            >
              <img src="/logo-ai.svg" alt="AI Logo" width={64} height={64} style={{ filter: 'drop-shadow(0 2px 8px #fff8)' }} />
            </Box>
            <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 }}
              >
                <Typography variant="h3" fontWeight={800} mb={2} color="#fff" sx={{ textShadow: '0 2px 12px #5B8CFF88' }}>
                  智能面试模拟与评测平台
                </Typography>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
              >
                <Typography variant="h6" color="#f3f3fa" mb={4} sx={{ textShadow: '0 1px 8px #8F6EFF55' }}>
                  一站式提升你的面试表现，AI驱动，专业反馈，助你斩获理想Offer！
                </Typography>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  href="/interviews"
                  sx={{
                    px: 6,
                    py: 1.5,
                    fontSize: 18,
                    background: 'rgba(255,255,255,0.15)',
                    color: '#fff',
                    boxShadow: '0 2px 8px #5B8CFF55',
                    backdropFilter: 'blur(2px)',
                    borderRadius: 99,
                    fontWeight: 700,
                    letterSpacing: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.25)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px #5B8CFF88',
                    }
                  }}
                >
                  立即开始模拟面试
                </Button>
              </motion.div>
            </Box>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.3 }}
              sx={{
                position: 'absolute',
                right: 32,
                bottom: 0,
                zIndex: 1,
                display: { xs: 'none', md: 'block' },
              }}
            >
              <svg width="120" height="120" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.circle
                  cx="24"
                  cy="24"
                  r="22"
                  fill="url(#ai-gradient)"
                  stroke="#fff"
                  strokeWidth="2"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <ellipse cx="24" cy="24" rx="7" ry="10" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.3" />
                <circle cx="24" cy="24" r="2" fill="#fff" />
                <defs>
                  <linearGradient id="ai-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5B8CFF" />
                    <stop offset="1" stopColor="#8F6EFF" />
                  </linearGradient>
                </defs>
              </svg>
            </Box>
          </Box>
        </motion.div>

        <motion.div
          ref={featuresRef}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <Box my={10}>
            <motion.div variants={fadeInUp}>
              <Typography variant="h5" fontWeight={700} mb={4} textAlign="center">平台特色</Typography>
            </motion.div>
            <Box height={2} bgcolor="#ececff" my={2} borderRadius={1} />
            <Grid container spacing={6} justifyContent="center">
              {[
                {
                  icon: <PsychologyIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />,
                  title: "AI智能评测",
                  description: "基于AI算法，自动分析你的面试表现，给出专业反馈。"
                },
                {
                  icon: <MemoryIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />,
                  title: "多维度能力分析",
                  description: "从专业知识、表达、逻辑、应变等多维度全方位评测。"
                },
                {
                  icon: <DevicesOtherIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />,
                  title: "真实场景还原",
                  description: "模拟真实面试流程，支持视频、语音、文本多模态互动。"
                }
              ].map((feature, index) => (
                <Grid key={index} item xs={12} md={4}>
                  <motion.div variants={fadeInUp}>
                    <Card
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        borderRadius: '1.2rem',
                        boxShadow: '0 4px 24px #8F6EFF22',
                        transition: 'all 0.3s ease',
                        background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 8px 32px #8F6EFF44',
                        }
                      }}
                    >
                      {feature.icon}
                      <Typography fontWeight={600}>{feature.title}</Typography>
                      <Typography variant="body2" color="text.secondary" mt={1}>
                        {feature.description}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        <motion.div
          ref={testimonialsRef}
          initial="hidden"
          animate={testimonialsInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <Box my={10}>
            <motion.div variants={fadeInUp}>
              <Typography variant="h5" fontWeight={700} mb={4} textAlign="center">用户评价</Typography>
            </motion.div>
            <Box height={2} bgcolor="#ececff" my={2} borderRadius={1} />
            <Grid container spacing={6} justifyContent="center">
              {[
                {
                  name: "张同学",
                  content: "平台的AI反馈非常专业，帮我发现了表达和逻辑上的不足，最终顺利拿到大厂offer！"
                },
                {
                  name: "李同学",
                  content: "多维度能力分析很细致，面试技巧区也很实用，推荐给所有求职的同学！"
                }
              ].map((testimonial, index) => (
                <Grid key={index} item xs={12} md={4}>
                  <motion.div variants={fadeInUp}>
                    <Card
                      sx={{
                        p: 3,
                        borderRadius: '1.2rem',
                        boxShadow: '0 4px 24px #8F6EFF22',
                        transition: 'all 0.3s ease',
                        background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 8px 32px #8F6EFF44',
                        }
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={2} mb={1}>
                        <PeopleIcon color="primary" />
                        <Typography fontWeight={600}>{testimonial.name}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.content}
                      </Typography>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        <motion.div
          ref={jobsRef}
          initial="hidden"
          animate={jobsInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <Grid container spacing={6} justifyContent="center">
            {[
              {
                title: "AI算法工程师",
                icon: <PsychologyIcon color="primary" sx={{ fontSize: 40 }} />,
                description: "覆盖算法、机器学习、深度学习等核心知识点，适合技术岗求职者。"
              },
              {
                title: "大数据工程师",
                icon: <MemoryIcon color="primary" sx={{ fontSize: 40 }} />,
                description: "聚焦数据处理、分布式计算、数据分析等，助力大数据岗位面试。"
              },
              {
                title: "物联网/嵌入式",
                icon: <DevicesOtherIcon color="primary" sx={{ fontSize: 40 }} />,
                description: "适配物联网、嵌入式系统等新兴领域，覆盖软硬件结合面试场景。"
              }
            ].map((job, index) => (
              <Grid key={index} item xs={12} md={4}>
                <motion.div variants={fadeInUp}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 2,
                      borderRadius: '1.2rem',
                      boxShadow: '0 4px 24px #8F6EFF22',
                      transition: 'all 0.3s ease',
                      background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 8px 32px #8F6EFF44',
                      }
                    }}
                  >
                    <CardHeader
                      title={
                        <Typography fontWeight={600}>{job.title}</Typography>
                      }
                      avatar={job.icon}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {job.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="outlined"
                        href="/interviews/simulation"
                        sx={{
                          borderRadius: 99,
                          fontWeight: 700,
                          fontSize: 18,
                          background: 'linear-gradient(45deg, #5B8CFF, #8F6EFF)',
                          color: '#fff',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #8F6EFF, #5B8CFF)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px #5B8CFF88',
                          }
                        }}
                      >
                        进入模拟
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </Box>
  )
}
