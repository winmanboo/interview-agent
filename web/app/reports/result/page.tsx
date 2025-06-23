"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Chip from '@mui/material/Chip'
import LinearProgress from '@mui/material/LinearProgress'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DownloadIcon from '@mui/icons-material/Download'
import ShareIcon from '@mui/icons-material/Share'
import React from "react"

interface RadarChartProps {
  labels: string[];
  scores: number[];
  size?: number;
  maxScore?: number;
}

function RadarChart({ labels, scores, size = 400, maxScore = 10 }: RadarChartProps) {
  const count = labels.length;
  const center = size / 2;
  const radius = size / 2 - 50; // 为标签留出更多空间
  const angleStep = (2 * Math.PI) / count;

  // 计算每个顶点坐标
  const getPoint = (score: number, i: number, r = radius) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const len = (score / maxScore) * r;
    return [
      center + len * Math.cos(angle),
      center + len * Math.sin(angle)
    ];
  };

  // 标签点坐标（始终在雷达图外一圈）
  const getLabelPoint = (i: number) => {
    const angle = -Math.PI / 2 + i * angleStep;
    return [
      center + (radius + 20) * Math.cos(angle),
      center + (radius + 20) * Math.sin(angle)
    ];
  };

  // 多边形点
  const polygonPoints = scores
    .map((score: number, i: number) => getPoint(score, i).join(","))
    .join(" ");

  // 网格
  const gridLevels = [0.33, 0.66, 1];
  const gridPolygons = gridLevels.map((level: number) => {
    const points = labels
      .map((_: string, i: number) => getPoint(maxScore * level, i).join(","))
      .join(" ");
    return (
      <polygon
        key={level}
        points={points}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth="1"
      />
    );
  });

  // 坐标轴
  const axes = labels.map((_: string, i: number) => {
    const [x, y] = getPoint(maxScore, i);
    return (
      <line
        key={i}
        x1={center}
        y1={center}
        x2={x}
        y2={y}
        stroke="#e2e8f0"
        strokeWidth="1"
      />
    );
  });

  // 标签
  const labelElements = labels.map((label: string, i: number) => {
    const [x, y] = getLabelPoint(i);
    return (
      <text
        key={i}
        x={x}
        y={y}
        textAnchor="middle"
        fontSize="14"
        fill="#222"
        alignmentBaseline="middle"
      >
        {label}
      </text>
    );
  });

  return (
    <svg width={size} height={size} className="w-full h-full">
      {gridPolygons}
      {axes}
      <polygon
        points={polygonPoints}
        fill="rgba(16, 185, 129, 0.2)"
        stroke="rgb(16, 185, 129)"
        strokeWidth="2"
      />
      {labelElements}
    </svg>
  );
}

export default function ResultPage() {
  const [report, setReport] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const json = sessionStorage.getItem('ai_report_json')
      if (json) {
        try {
          setReport(JSON.parse(json))
        } catch {
          setReport(null)
        }
      }
    }
  }, [])

  if (!report) return <div>暂无评测数据</div>

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-2">
          <div className="flex items-center gap-2 min-w-[100px]">
            <Link href="/interviews" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>返回</span>
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <h1 className="text-lg font-medium text-center">面试评测结果</h1>
          </div>
          <div className="min-w-[100px]" />
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{report.report_meta.title}</CardTitle>
                <CardDescription>完成时间: {report.report_meta.completion_time}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">总体评分</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold">
                        {report.overall_evaluation.score}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{report.overall_evaluation.rating}</p>
                        <p className="text-sm text-muted-foreground">你的表现超过了{report.overall_evaluation.percentile}%的同专业求职者</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">能力雷达图</h3>
                    <div className="w-[420px] h-[420px] mx-auto relative mt-8">
                      <RadarChart labels={report.ability_radar.labels} scores={report.ability_radar.scores} size={400} maxScore={10} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
              <Tab label="总览" value="overview" />
              <Tab label="内容分析" value="content" />
              <Tab label="语音分析" value="speech" />
              <Tab label="视觉分析" value="visual" />
            </Tabs>

            {activeTab === "overview" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>评测总结</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {report.analysis_tabs.overview.overview_summary.text}
                    </p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">优势</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {report.analysis_tabs.overview.overview_summary.strengths.map((item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">改进空间</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {report.analysis_tabs.overview.overview_summary.improvements.map((item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>关键问题分析</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {report.analysis_tabs.overview.key_questions.map((q: any, idx: number) => (
                        <div key={idx}>
                          <h4 className="font-medium mb-2">{q.question}</h4>
                          <div className="pl-4 border-l-2 border-primary">
                            <p className="text-sm text-muted-foreground mb-2">{q.analysis}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <div className={`w-2 h-2 rounded-full ${q.tag.level === 'excellent' ? 'bg-green-500' : q.tag.level === 'good' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                              <span className={`text-xs ${q.tag.level === 'excellent' ? 'text-green-600' : q.tag.level === 'good' ? 'text-yellow-600' : 'text-red-600'}`}>{q.tag.category}：{q.tag.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "content" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>专业知识评估</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {report.analysis_tabs.content_analysis.knowledge_assessment.map((item: any, idx: number) => (
                        <div className="flex items-center justify-between" key={idx}>
                          <span>{item.skill}</span>
                          <div className="w-1/2 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full ${item.score >= 80 ? 'bg-green-500' : 'bg-yellow-500'} rounded-full`} style={{ width: `${item.score}%` }}></div>
                          </div>
                          <span className="text-sm">{item.score}%</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium mb-2">关键词分析</h4>
                      <div className="flex flex-wrap gap-2">
                        {report.analysis_tabs.content_analysis.keywords.map((kw: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">{kw}</span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>回答结构分析</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">STAR结构应用</h4>
                        <div className="grid grid-cols-4 gap-4">
                          {Object.entries(report.analysis_tabs.content_analysis.star_structure.scores).map(([key, value], idx) => (
                            <div className="flex flex-col items-center" key={key}>
                              <div className={`w-12 h-12 rounded-full ${(value as number) >= 80 ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'} flex items-center justify-center mb-2`}>
                                {key[0].toUpperCase()}
                              </div>
                              <span className="text-xs text-center">
                                {key === 'situation' ? '情境' : key === 'task' ? '任务' : key === 'action' ? '行动' : '结果'}<br />{value as number}%
                              </span>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-4">{report.analysis_tabs.content_analysis.star_structure.summary}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "speech" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>语音分析</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">语速分析</h4>
                        <div className="flex items-center gap-4">
                          <div className="w-full h-4 bg-gray-200 rounded-full relative">
                            <div className="absolute top-0 left-0 h-full w-full flex items-center justify-between px-2">
                              <span className="text-xs">慢</span>
                              <span className="text-xs">适中</span>
                              <span className="text-xs">快</span>
                            </div>
                            <div className="absolute top-0 left-[${report.analysis_tabs.speech_analysis.speech_rate_analysis.value}%] w-4 h-4 bg-primary rounded-full transform -translate-x-1/2"></div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{report.analysis_tabs.speech_analysis.speech_rate_analysis.summary}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">语调情感分析</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {report.analysis_tabs.speech_analysis.tone_emotion_analysis.tone_emotion.map((item: any, idx: number) => (
                            <div key={idx}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm">{item.emotion}</span>
                                <span className="text-sm">{item.score}%</span>
                              </div>
                              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className={`h-full ${item.score >= 80 ? 'bg-green-500' : 'bg-yellow-500'} rounded-full`} style={{ width: `${item.score}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">语言清晰度</h4>
                        <div className="flex items-center gap-2">
                          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${report.analysis_tabs.speech_analysis.clarity_analysis.score}%` }}></div>
                          </div>
                          <span className="text-sm">{report.analysis_tabs.speech_analysis.clarity_analysis.score}%</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{report.analysis_tabs.speech_analysis.clarity_analysis.summary}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "visual" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>视觉分析</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {report.analysis_tabs.visual_analysis.facial_expression.map((item: any, idx: number) => (
                        <div className="flex flex-col items-center" key={idx}>
                          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">{item.emoji}</div>
                          <span className="text-xs">{item.expression}</span>
                          <span className="text-xs text-muted-foreground">{item.percentage}%</span>
                        </div>
                      ))}

                      <div>
                        <h4 className="font-medium mb-2">眼神接触</h4>
                        <div className="flex items-center gap-2">
                          <div className="w-full h-2 bg-yellow-500 rounded-full" style={{ width: `${report.analysis_tabs.visual_analysis.eye_contact.score}%` }}></div>
                          <span className="text-sm">{report.analysis_tabs.visual_analysis.eye_contact.score}%</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{report.analysis_tabs.visual_analysis.eye_contact.summary}</p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">肢体语言</h4>
                        <div className="space-y-3">
                          {report.analysis_tabs.visual_analysis.body_language.map((item: any, idx: number) => (
                            <div className="flex items-center justify-between" key={idx}>
                              <span className="text-sm">{item.aspect}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${item.score}%` }}></div>
                                </div>
                                <span className="text-xs">{item.score}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>个性化建议</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">立即改进</h4>
                    <ul className="space-y-2 text-sm">
                      {report.personalized_suggestions.immediate_improvements.map((item: string, idx: number) => (
                        <li className="flex items-start gap-2" key={idx}>
                          <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">长期提升</h4>
                    <ul className="space-y-2 text-sm">
                      {report.personalized_suggestions.long_term_enhancements.map((item: string, idx: number) => (
                        <li className="flex items-start gap-2" key={idx}>
                          <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>推荐学习资源</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">技术提升</h4>
                    <div className="space-y-2">
                      {report.learning_resources.technical_improvement.map((item: any, idx: number) => (
                        <Button variant="outline" size="sm" className="w-full justify-start" key={idx}>
                          {item.title}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">面试技巧</h4>
                    <div className="space-y-2">
                      {report.learning_resources.interview_skills.map((item: any, idx: number) => (
                        <Button variant="outline" size="sm" className="w-full justify-start" key={idx}>
                          {item.title}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="default" size="default">
                  查看完整学习路径
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
