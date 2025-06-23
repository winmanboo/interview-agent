"use client";
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ToastContainer } from 'react-toastify';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  Code, 
  Globe, 
  Cpu, 
  Users, 
  Brain, 
  ChevronRight 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import NavBar from '../../components/NavBar';
import request from '../../utils/request';
import { Dialog, DialogContent, DialogTitle, DialogFooter, DialogHeader } from "@/components/ui/dialog";

interface Category {
  id: number;
  name: string;
}

interface Scene {
  id: number;
  topic: string;
  estimated_time: string;
  difficulty: number;
  introduction: string;
  tags: string | string[];
}

interface CategoriesResponse {
  categories: Category[];
}

interface ScenesResponse {
  scenes: Scene[];
}

export default function InterviewsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [currentCategoryId, setCurrentCategoryId] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);

  // 首次加载获取分类，并默认选中第一个
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
    const fetchCategories = async () => {
      try {
        const res = await request.get<CategoriesResponse>("/categories");
        setCategories(res.data.categories);
        if (res.data.categories.length > 0) {
          setCurrentCategoryId(res.data.categories[0].id.toString());
        }
      } catch (error) {
        console.error("获取分类失败:", error);
      }
    };
    fetchCategories();
  }, []);

  // 选中分类时获取场景
  useEffect(() => {
    if (!currentCategoryId) return;
    const fetchScenes = async () => {
      try {
        const res = await request.get<ScenesResponse>(`/scenes/${currentCategoryId}`);
        setScenes(res.data.scenes);
      } catch (error) {
        setScenes([]);
        console.error("获取场景失败:", error);
      }
    };
    fetchScenes();
  }, [currentCategoryId]);

  const handleTabChange = (value: string) => {
    setCurrentCategoryId(value);
  };

  const handleStartInterview = (scene: Scene) => {
    if (!user) {
      setSelectedScene(scene);
      setDialogOpen(true);
    } else {
      router.push(`/interviews/simulation?id=${scene.id}`);
    }
  };

  const handleLoginSuccess = () => {
    setDialogOpen(false);
    if (selectedScene) {
      router.push(`/interviews/simulation?id=${selectedScene.id}`);
    }
  };

  const getDifficultyInfo = (difficulty: number) => {
    switch(difficulty) {
      case 1:
        return { text: "简单", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" };
      case 2:
        return { text: "中等", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300" };
      case 3:
        return { text: "困难", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" };
      default:
        return { text: "未知", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300" };
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    const icons: Record<string, React.ReactNode> = {
      "1": <Code className="w-4 h-4" />,
      "2": <Cpu className="w-4 h-4" />,
      "3": <Brain className="w-4 h-4" />,
      "4": <Globe className="w-4 h-4" />,
      "5": <Users className="w-4 h-4" />
    };
    return icons[categoryId] || <Code className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <div className="w-full bg-[linear-gradient(120deg,#5B8CFF_0%,#8F6EFF_100%)] py-16 px-4 text-center text-white rounded-b-[2.5rem] shadow-[0_4px_32px_#8F6EFF22] overflow-hidden">
        <h1 className="text-3xl font-bold drop-shadow-lg">模拟面试</h1>
      </div>
      <main className="flex-1 w-full flex flex-col px-2 md:px-8 py-8">
        <div className="w-full max-w-7xl mx-auto bg-[linear-gradient(145deg,#fff,#f5f5f5)] rounded-3xl shadow-[0_4px_24px_#8F6EFF22] p-6 md:p-10 flex flex-col items-center">
          <Tabs value={currentCategoryId} onValueChange={handleTabChange} className="w-full">
            <TabsList className="mb-6 w-full justify-start overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id.toString()} className="px-4 py-2">
                  <span className="flex items-center gap-2">
                    {getCategoryIcon(category.id.toString())}
                    {category.name}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="h-0.5 bg-[#ececff] my-2 rounded w-full" />
            <TabsContent value={currentCategoryId}>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scenes.length === 0 ? (
                  <div className="col-span-3 text-center text-gray-400 py-12">暂无面试场景</div>
                ) : (
                  scenes.map((scene) => {
                    const difficultyInfo = getDifficultyInfo(scene.difficulty);
                    // 兼容 tags 为字符串或数组
                    let tags: string[] = [];
                    if (Array.isArray(scene.tags)) {
                      tags = scene.tags as string[];
                    } else if (typeof scene.tags === 'string') {
                      tags = (scene.tags as string).split(',').map((t: string) => t.trim()).filter(Boolean);
                    }
                    return (
                      <Card key={scene.id} className="rounded-[1.2rem] bg-[linear-gradient(145deg,#fff,#f5f5f5)] shadow-[0_4px_24px_#8F6EFF22] transition-all hover:-translate-y-2 hover:shadow-[0_8px_32px_#8F6EFF44] overflow-hidden">
                        <CardHeader className="pb-2">
                          <CardTitle>{scene.topic}</CardTitle>
                          <CardDescription>{scene.introduction}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {tags.map((tag, index) => (
                              <Badge key={index} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-between text-sm mb-2">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 opacity-70" />
                              <span>{scene.estimated_time}</span>
                            </div>
                            <div>
                              <Badge variant="secondary" className={difficultyInfo.color}>
                                {difficultyInfo.text}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            onClick={() => handleStartInterview(scene)} 
                            className="w-full rounded-full font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md hover:from-indigo-500 hover:to-blue-500 hover:-translate-y-1 transition-all duration-200"
                          >
                            开始面试
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      {/* 登录弹窗 */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>登录后开始面试</DialogTitle>
          </DialogHeader>
          <div className="py-2 text-gray-600">
            登录账号后，您可以开始模拟面试，系统将记录您的面试表现并提供详细的评测报告。
          </div>
          <DialogFooter className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
            >
              取消
            </Button>
            <Button
              onClick={handleLoginSuccess}
              asChild
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            >
              <Link href="/auth/login">去登录</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ToastContainer position="top-center" />
    </div>
  );
}
