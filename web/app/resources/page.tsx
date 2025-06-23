'use client'
import Link from "next/link"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import BookIcon from '@mui/icons-material/Book'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import DescriptionIcon from '@mui/icons-material/Description'
import PeopleIcon from '@mui/icons-material/People'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import StarIcon from '@mui/icons-material/Star'
import { useState } from 'react'
import NavBar from '../../components/NavBar'

export default function ResourcesPage() {
  const [tab, setTab] = useState(0)
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" bgcolor="#f5f5f5">
      <NavBar current="resources" />
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
              学习资源与题库
            </Typography>
          </Box>
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label="在线课程" icon={<BookIcon />} iconPosition="start" value={0} />
            <Tab label="面试题库" icon={<DescriptionIcon />} iconPosition="start" value={1} />
            <Tab label="视频教程" icon={<VideoLibraryIcon />} iconPosition="start" value={2} />
            <Tab label="文章资料" icon={<DescriptionIcon />} iconPosition="start" value={3} />
          </Tabs>
          {tab === 0 && (
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr' }} gap={3} mt={2}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.03)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                <CardHeader title={<Typography fontWeight={600}>STAR面试法精通课程</Typography>} subheader={<Typography variant="body2" color="text.secondary">掌握结构化面试回答技巧，提升表达逻辑性</Typography>} avatar={<BookIcon color="primary" />} action={<Chip label="推荐" color="primary" size="small" />} />
                <CardContent sx={{ flex: 1 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <AccessTimeIcon fontSize="small" color="action" />
                    <Typography variant="body2">8小时</Typography>
                    <StarIcon fontSize="small" sx={{ color: '#FFD600' }} />
                    <Typography variant="body2">4.8</Typography>
                    <PeopleIcon fontSize="small" color="action" />
                    <Typography variant="body2">1.2k</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    通过实际案例学习STAR法则，包含情境设定、任务分析、行动计划和结果展示四个核心环节。
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">开始学习</Button>
                </CardActions>
              </Card>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.03)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                <CardHeader title={<Typography fontWeight={600}>算法工程师面试指南</Typography>} subheader={<Typography variant="body2" color="text.secondary">专为算法岗位设计的技术面试准备课程</Typography>} avatar={<BookIcon color="primary" />} action={<Chip label="热门" variant="outlined" size="small" />} />
                <CardContent sx={{ flex: 1 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <AccessTimeIcon fontSize="small" color="action" />
                    <Typography variant="body2">12小时</Typography>
                    <StarIcon fontSize="small" sx={{ color: '#FFD600' }} />
                    <Typography variant="body2">4.9</Typography>
                    <PeopleIcon fontSize="small" color="action" />
                    <Typography variant="body2">856</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    涵盖机器学习算法、深度学习框架、数据结构与算法等核心技术点的面试准备。
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">开始学习</Button>
                </CardActions>
              </Card>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.03)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                <CardHeader title={<Typography fontWeight={600}>数据分析师职业规划</Typography>} subheader={<Typography variant="body2" color="text.secondary">从技能提升到职业发展的全方位指导</Typography>} avatar={<BookIcon color="primary" />} />
                <CardContent sx={{ flex: 1 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <AccessTimeIcon fontSize="small" color="action" />
                    <Typography variant="body2">6小时</Typography>
                    <StarIcon fontSize="small" sx={{ color: '#FFD600' }} />
                    <Typography variant="body2">4.7</Typography>
                    <PeopleIcon fontSize="small" color="action" />
                    <Typography variant="body2">643</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    包含数据分析技能树、行业发展趋势、薪资谈判技巧等实用内容。
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">开始学习</Button>
                </CardActions>
              </Card>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.03)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                <CardHeader title={<Typography fontWeight={600}>物联网工程师技能提升</Typography>} subheader={<Typography variant="body2" color="text.secondary">IoT领域核心技术与面试要点解析</Typography>} avatar={<BookIcon color="primary" />} />
                <CardContent sx={{ flex: 1 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <AccessTimeIcon fontSize="small" color="action" />
                    <Typography variant="body2">10小时</Typography>
                    <StarIcon fontSize="small" sx={{ color: '#FFD600' }} />
                    <Typography variant="body2">4.6</Typography>
                    <PeopleIcon fontSize="small" color="action" />
                    <Typography variant="body2">432</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    深入讲解传感器网络、边缘计算、通信协议等IoT核心技术栈。
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">开始学习</Button>
                </CardActions>
              </Card>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.03)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                <CardHeader title={<Typography fontWeight={600}>面试心理调适与压力管理</Typography>} subheader={<Typography variant="body2" color="text.secondary">克服面试焦虑，提升心理素质</Typography>} avatar={<BookIcon color="primary" />} action={<Chip label="新课程" color="primary" size="small" />} />
                <CardContent sx={{ flex: 1 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <AccessTimeIcon fontSize="small" color="action" />
                    <Typography variant="body2">4小时</Typography>
                    <StarIcon fontSize="small" sx={{ color: '#FFD600' }} />
                    <Typography variant="body2">4.8</Typography>
                    <PeopleIcon fontSize="small" color="action" />
                    <Typography variant="body2">298</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    学习放松技巧、自信建立方法和压力应对策略，提升面试表现。
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">开始学习</Button>
                </CardActions>
              </Card>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.03)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                <CardHeader title={<Typography fontWeight={600}>职场沟通与表达技巧</Typography>} subheader={<Typography variant="body2" color="text.secondary">提升语言表达能力和沟通效果</Typography>} avatar={<BookIcon color="primary" />} />
                <CardContent sx={{ flex: 1 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <AccessTimeIcon fontSize="small" color="action" />
                    <Typography variant="body2">5小时</Typography>
                    <StarIcon fontSize="small" sx={{ color: '#FFD600' }} />
                    <Typography variant="body2">4.7</Typography>
                    <PeopleIcon fontSize="small" color="action" />
                    <Typography variant="body2">567</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">掌握清晰表达、逻辑组织、情感传递等沟通核心技能。</Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">开始学习</Button>
                </CardActions>
              </Card>
            </Box>
          )}
          {tab === 1 && (
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr' }} gap={3} mt={2}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.03)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                <CardHeader title={<Typography fontWeight={600}>人工智能面试题库</Typography>} subheader={<Typography variant="body2" color="text.secondary">涵盖机器学习、深度学习、NLP等领域</Typography>} avatar={<DescriptionIcon color="primary" />} />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary" mb={2}>基础题目：120题</Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>进阶题目：85题</Typography>
                  <Typography variant="body2" color="text.secondary">高级题目：45题</Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">开始练习</Button>
                </CardActions>
              </Card>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.03)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                <CardHeader title={<Typography fontWeight={600}>大数据面试题库</Typography>} subheader={<Typography variant="body2" color="text.secondary">数据处理、分析工具、架构设计等</Typography>} avatar={<DescriptionIcon color="primary" />} />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary" mb={2}>基础题目：95题</Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>进阶题目：68题</Typography>
                  <Typography variant="body2" color="text.secondary">高级题目：32题</Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">开始练习</Button>
                </CardActions>
              </Card>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.03)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                <CardHeader title={<Typography fontWeight={600}>物联网面试题库</Typography>} subheader={<Typography variant="body2" color="text.secondary">嵌入式系统、通信协议、传感器等</Typography>} avatar={<DescriptionIcon color="primary" />} />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary" mb={2}>基础题目：78题</Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>进阶题目：56题</Typography>
                  <Typography variant="body2" color="text.secondary">高级题目：28题</Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">开始练习</Button>
                </CardActions>
              </Card>
            </Box>
          )}
          {tab === 2 && (
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr' }} gap={3} mt={2}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.03)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                <CardHeader title={<Typography fontWeight={600}>面试礼仪与形象管理</Typography>} subheader={<Typography variant="body2" color="text.secondary">专业形象塑造和面试礼仪规范</Typography>} avatar={<VideoLibraryIcon color="primary" />} />
                <CardContent sx={{ flex: 1 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <AccessTimeIcon fontSize="small" color="action" />
                    <Typography variant="body2">25分钟</Typography>
                    <StarIcon fontSize="small" sx={{ color: '#FFD600' }} />
                    <Typography variant="body2">4.8</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">从着装搭配到肢体语言，全面提升面试形象和专业度。</Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">观看视频</Button>
                </CardActions>
              </Card>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.03)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                <CardHeader title={<Typography fontWeight={600}>技术面试实战演练</Typography>} subheader={<Typography variant="body2" color="text.secondary">真实技术面试场景模拟与解析</Typography>} avatar={<VideoLibraryIcon color="primary" />} />
                <CardContent sx={{ flex: 1 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <AccessTimeIcon fontSize="small" color="action" />
                    <Typography variant="body2">45分钟</Typography>
                    <StarIcon fontSize="small" sx={{ color: '#FFD600' }} />
                    <Typography variant="body2">4.9</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">观看真实技术面试过程，学习优秀回答技巧和问题解决思路。</Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">观看视频</Button>
                </CardActions>
              </Card>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.03)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                <CardHeader title={<Typography fontWeight={600}>压力面试应对策略</Typography>} subheader={<Typography variant="body2" color="text.secondary">高压环境下的冷静应对和表现技巧</Typography>} avatar={<VideoLibraryIcon color="primary" />} />
                <CardContent sx={{ flex: 1 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <AccessTimeIcon fontSize="small" color="action" />
                    <Typography variant="body2">30分钟</Typography>
                    <StarIcon fontSize="small" sx={{ color: '#FFD600' }} />
                    <Typography variant="body2">4.7</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">学习在压力面试中保持冷静，展现抗压能力和专业素养。</Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">观看视频</Button>
                </CardActions>
              </Card>
            </Box>
          )}
          {tab === 3 && (
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr' }} gap={3} mt={2}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.03)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                <CardHeader title={<Typography fontWeight={600}>2025年技术岗位面试趋势分析</Typography>} subheader={<Typography variant="body2" color="text.secondary">最新行业动态和面试要求变化</Typography>} avatar={<DescriptionIcon color="primary" />} action={<Chip label="热门" color="primary" size="small" />} />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary">深度分析当前技术岗位市场需求，面试官关注重点的变化趋势，以及求职者应该重点准备的技能领域。</Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">阅读文章</Button>
                </CardActions>
              </Card>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.03)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                <CardHeader title={<Typography fontWeight={600}>简历优化完全指南</Typography>} subheader={<Typography variant="body2" color="text.secondary">打造吸引HR的专业简历</Typography>} avatar={<DescriptionIcon color="primary" />} />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary">从格式设计到内容组织，详细指导如何制作一份突出个人优势、匹配岗位需求的优秀简历。</Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">阅读文章</Button>
                </CardActions>
              </Card>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-6px) scale(1.03)', boxShadow: '0 8px 32px #8F6EFF44' } }}>
                <CardHeader title={<Typography fontWeight={600}>薪资谈判技巧与策略</Typography>} subheader={<Typography variant="body2" color="text.secondary">获得理想薪资的谈判艺术</Typography>} avatar={<DescriptionIcon color="primary" />} />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="body2" color="text.secondary">学习薪资谈判的时机选择、策略制定和沟通技巧，帮助你在面试中争取到满意的薪资待遇。</Typography>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">阅读文章</Button>
                </CardActions>
              </Card>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
