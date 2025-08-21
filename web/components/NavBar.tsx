'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from "next/navigation"
import { ThemeToggle } from "./theme-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { LogOut, User } from "lucide-react"

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  
  useEffect(() => {
    // 从 localStorage 获取用户信息
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        setUser(JSON.parse(userStr))
      } catch (e) {
        console.error('Failed to parse user data', e)
      }
    }
  }, [])
  
  // 退出登录函数
  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/')
  }
  
  // 导航项目
  const navItems = [
    { title: "首页", href: "/", active: pathname === "/" },
    { title: "模拟面试", href: "/interviews", active: pathname.startsWith("/interviews") },
    { title: "评测报告", href: "/reports", active: pathname.startsWith("/reports") },
    { title: "学习资源", href: "/resources", active: pathname.startsWith("/resources") }
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 mr-4">
          <img src="/logo-ai.svg" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-blue-600">InterviewMaster AI</span>
        </div>
        
        <nav className="flex-1 flex items-center justify-center">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className={item.active 
                    ? "border-b-2 border-blue-500 text-blue-500 font-medium pb-1" 
                    : "text-muted-foreground hover:text-foreground"}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-9 w-9 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors">
                  {user.name[0].toUpperCase()}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>退出登录</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <button className="h-9 w-9 rounded-full bg-blue-500 text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="5"/>
                  <path d="M20 21a8 8 0 1 0-16 0"/>
                </svg>
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}