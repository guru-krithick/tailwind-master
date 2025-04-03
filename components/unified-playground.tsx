// components/unified-playground.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { CodeEditor } from "./code-editor";
import { LivePreview } from "./live-preview";
import { Button } from "./ui/button";
import { 
  Copy, 
  Check, 
  RefreshCw, 
  Download, 
  Code,
  FileType,
  Play,
  HelpCircle,
  LayoutGrid,
  Smartphone,
  Tablet,
  Laptop,
  Info,
  X,
  Eye,
  BookOpen,
  Save,
  Share,
  FileCode,
  ChevronRight,
  ChevronDown,
  Plus,
  ExternalLink
} from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "./ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "./ui/tooltip";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Alert, AlertDescription } from "./ui/alert";
import { Badge } from "./ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface PlaygroundProps {
  initialCode: {
    html: string;
    css?: string;
  };
  title?: string;
  description?: string;
  showHeader?: boolean;
  functionName?: string;
  categoryName?: string;
}

type DeviceView = "responsive" | "phone" | "tablet" | "laptop";

// Template presets
const TEMPLATES = [
  {
    name: "Basic Layout",
    description: "Simple responsive layout with header, main content, and footer",
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com?v=4.0.0"></script>
</head>
<body class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
  <!-- Header -->
  <header class="bg-white dark:bg-gray-800 shadow">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="font-bold text-xl">My Website</div>
      <nav class="space-x-4">
        <a href="#" class="text-blue-600 dark:text-blue-400">Home</a>
        <a href="#" class="hover:text-blue-600 dark:hover:text-blue-400">About</a>
        <a href="#" class="hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-grow container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Welcome to Tailwind CSS v4</h1>
    <p class="mb-4">This is a basic responsive layout template built with Tailwind CSS.</p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-2">Card One</h2>
        <p class="text-gray-600 dark:text-gray-300">This is a sample card with Tailwind styling.</p>
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-2">Card Two</h2>
        <p class="text-gray-600 dark:text-gray-300">This is a sample card with Tailwind styling.</p>
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-2">Card Three</h2>
        <p class="text-gray-600 dark:text-gray-300">This is a sample card with Tailwind styling.</p>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-white dark:bg-gray-800 shadow">
    <div class="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
      <p>© 2025 My Website. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`,
    css: ''
  },
  {
    name: "Dashboard",
    description: "Modern dashboard layout with sidebar and components",
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com?v=4.0.0"></script>
</head>
<body class="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 text-white p-4 hidden md:block">
      <div class="flex items-center gap-2 mb-8 mt-2">
        <div class="bg-blue-500 rounded p-1">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h1 class="text-xl font-bold">Dashboard</h1>
      </div>
      
      <nav class="space-y-1">
        <a href="#" class="flex items-center gap-2 bg-gray-700 text-white p-3 rounded">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
          </svg>
          Dashboard
        </a>
        <a href="#" class="flex items-center gap-2 text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          Users
        </a>
        <a href="#" class="flex items-center gap-2 text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
          Analytics
        </a>
        <a href="#" class="flex items-center gap-2 text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          Calendar
        </a>
        <a href="#" class="flex items-center gap-2 text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
          </svg>
          Messages
        </a>
        <a href="#" class="flex items-center gap-2 text-gray-300 hover:bg-gray-700 hover:text-white p-3 rounded">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          Settings
        </a>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1">
      <!-- Header -->
      <header class="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
        <button class="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        
        <div class="hidden md:flex relative w-64">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
          <input type="text" placeholder="Search..." class="pl-10 pr-4 py-2 w-full bg-gray-100 dark:bg-gray-700 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        
        <div class="flex items-center gap-4">
          <button class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <svg class="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
          </button>
          <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            JD
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <h1 class="text-2xl font-bold mb-6">Dashboard Overview</h1>
        
        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 dark:text-gray-400 text-sm">Total Users</p>
                <h2 class="text-3xl font-bold">1,254</h2>
              </div>
              <div class="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </div>
            <p class="text-green-500 text-sm mt-2 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              12.5% increase
            </p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 dark:text-gray-400 text-sm">Revenue</p>
                <h2 class="text-3xl font-bold">$24,589</h2>
              </div>
              <div class="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <p class="text-green-500 text-sm mt-2 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              8.2% increase
            </p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 dark:text-gray-400 text-sm">Orders</p>
                <h2 class="text-3xl font-bold">536</h2>
              </div>
              <div class="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
              </div>
            </div>
            <p class="text-red-500 text-sm mt-2 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
              2.3% decrease
            </p>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 dark:text-gray-400 text-sm">Conversion</p>
                <h2 class="text-3xl font-bold">24.8%</h2>
              </div>
              <div class="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
            </div>
            <p class="text-green-500 text-sm mt-2 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              4.5% increase
            </p>
          </div>
        </div>
        
        <!-- Recent Activity -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
          <div class="p-4 border-b dark:border-gray-700">
            <h2 class="text-lg font-semibold">Recent Activity</h2>
          </div>
          <div class="p-4">
            <div class="space-y-4">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="font-medium">New user registered</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Jane Smith created a new account</p>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
              </div>
              
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-4">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="font-medium">Order completed</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Order #45678 has been completed</p>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">4 hours ago</p>
              </div>
              
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mr-4">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="font-medium">Payment failed</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">Payment for order #45679 failed to process</p>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</body>
</html>`,
    css: ''
  },
  {
    name: "Landing Page",
    description: "Modern landing page template for product or service",
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com?v=4.0.0"></script>
</head>
<body class="bg-white dark:bg-gray-900 min-h-screen">
  <!-- Navbar -->
  <nav class="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="flex items-center">
              <div class="bg-blue-600 text-white rounded p-1.5 mr-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <span class="text-xl font-bold text-gray-900 dark:text-white">Product</span>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <a href="#" class="text-blue-600 dark:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="#" class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Features</a>
              <a href="#" class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
              <a href="#" class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <a href="#" class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">Log in</a>
            <a href="#" class="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition">Sign up</a>
          </div>
        </div>
        <div class="flex md:hidden">
          <button class="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
            <svg class="h-6 w-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="pt-32 pb-20 md:pt-40 md:pb-28">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 md:pr-12">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Build beautiful websites with Tailwind CSS
          </h1>
          <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
            A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a href="#" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-base font-medium transition flex items-center justify-center">
              Get Started
              <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
            <a href="#" class="border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-3 rounded-lg text-base font-medium transition flex items-center justify-center">
              <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              Watch Demo
            </a>
          </div>
        </div>
        <div class="md:w-1/2 mt-12 md:mt-0">
          <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-xl overflow-hidden">
            <div class="p-1 bg-white/10">
              <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
                <div class="flex space-x-2 mb-4">
                  <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div class="space-y-4">
                  <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  <div class="h-4 bg-blue-200 dark:bg-blue-700 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-20 bg-gray-50 dark:bg-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Everything you need to build modern UIs
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Tailwind provides an extensive set of utility classes to help you build beautiful interfaces without writing custom CSS.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Feature 1 -->
        <div class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <div class="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-3 rounded-lg inline-block mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Responsive Design</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Build responsive designs with intuitive breakpoint prefixes like sm:, md:, lg:, and xl:.
          </p>
        </div>
        
        <!-- Feature 2 -->
        <div class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <div class="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-3 rounded-lg inline-block mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Dark Mode</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Add dark: prefixes to create interfaces that look beautiful in dark mode with zero additional effort.
          </p>
        </div>
        
        <!-- Feature 3 -->
        <div class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <div class="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-lg inline-block mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Mobile First</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Design for mobile devices first, then progressively enhance your design for larger screens.
          </p>
        </div>
        
        <!-- Feature 4 -->
        <div class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <div class="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 p-3 rounded-lg inline-block mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Component Design</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Create reusable components by combining multiple utility classes into cohesive designs.
          </p>
        </div>
        
        <!-- Feature 5 -->
        <div class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <div class="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg inline-block mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Blazing Fast</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Tailwind's build process ensures you only include the styles you actually use in your project.
          </p>
        </div>
        
        <!-- Feature 6 -->
        <div class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <div class="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-3 rounded-lg inline-block mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Customizable</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Tailor your design system to match your brand with a simple configuration file.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="py-20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Loved by developers worldwide
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Here's what people are saying about Tailwind CSS and how it's transformed their workflow.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Testimonial 1 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
              <span class="text-blue-600 dark:text-blue-400 font-bold text-lg">AB</span>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white">Alex Brown</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">Senior Frontend Developer</p>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-400">
            "Tailwind has completely changed how I build UIs. I can move so much faster and create more consistent designs without writing a single line of custom CSS."
          </p>
          <div class="mt-4 flex text-yellow-400">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
        </div>
        
        <!-- More testimonials... -->
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 bg-blue-600 text-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to try Tailwind CSS?</h2>
      <p class="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
        Join thousands of developers building beautiful, responsive websites with Tailwind CSS.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#" class="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg text-base font-medium transition">
          Get Started
        </a>
        <a href="#" class="bg-blue-700 hover:bg-blue-800 border border-blue-500 px-8 py-3 rounded-lg text-base font-medium transition">
          Learn More
        </a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div class="flex items-center mb-4">
            <div class="bg-blue-600 text-white rounded p-1.5 mr-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">Product</span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            A utility-first CSS framework for rapidly building custom designs.
          </p>
        </div>
        
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            Products
          </h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Features</a></li>
            <li><a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Pricing</a></li>
            <li><a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Resources</a></li>
            <li><a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Roadmap</a></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            Resources
          </h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Documentation</a></li>
            <li><a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Tutorials</a></li>
            <li><a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Blog</a></li>
            <li><a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Support</a></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            Legal
          </h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Privacy</a></li>
            <li><a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Terms</a></li>
            <li><a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">License</a></li>
            <li><a href="#" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Cookies</a></li>
          </ul>
        </div>
      </div>
      
      <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p class="text-center text-gray-500 dark:text-gray-400 text-sm">
          © 2025 Product, Inc. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</body>
</html>`,
    css: ''
  }
];

export function UnifiedPlayground({ 
  initialCode, 
  title, 
  description,
  showHeader = true,
  functionName,
  categoryName
}: PlaygroundProps) {
  // State for code and editor
  const [htmlCode, setHtmlCode] = useState(initialCode.html);
  const [cssCode, setCssCode] = useState(initialCode.css || "");
  const [currentTab, setCurrentTab] = useState<"html" | "css">("html");
  const [copied, setCopied] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showTips, setShowTips] = useState(true);
  const [deviceView, setDeviceView] = useState<DeviceView>("responsive");
  const [showGrid, setShowGrid] = useState(true);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // References for calculating heights
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for preview
  const [previewHtml, setPreviewHtml] = useState(initialCode.html);
  const [previewCss, setPreviewCss] = useState(initialCode.css || "");
  
  // Update preview when code changes (if auto-refresh is enabled)
  useEffect(() => {
    if (autoRefresh) {
      setPreviewHtml(htmlCode);
      setPreviewCss(cssCode);
    }
  }, [htmlCode, cssCode, autoRefresh]);
  
  // Handle manual refresh
  const handleRefresh = () => {
    setPreviewHtml(htmlCode);
    setPreviewCss(cssCode);
  };
  
  // Reset code to initial values
  const resetCode = () => {
    setHtmlCode(initialCode.html);
    setCssCode(initialCode.css || "");
    setPreviewHtml(initialCode.html);
    setPreviewCss(initialCode.css || "");
  };
  
  // Copy to clipboard
  const copyToClipboard = () => {
    const fullCode = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com?v=4.0.0"></script>
  <style>
${cssCode}
  </style>
</head>
<body>
  ${htmlCode}
</body>
</html>`;

    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Export as HTML file
  const downloadHTML = () => {
    const fullCode = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com?v=4.0.0"></script>
  <style>
${cssCode}
  </style>
</head>
<body>
  ${htmlCode}
</body>
</html>`;
    
    const blob = new Blob([fullCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tailwind-playground.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Load template
  const loadTemplate = (template: typeof TEMPLATES[0]) => {
    setHtmlCode(template.html);
    setCssCode(template.css);
    setPreviewHtml(template.html);
    setPreviewCss(template.css);
    setTemplateDialogOpen(false);
  };
  
  // Get combined code
  const getCombinedCode = () => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com?v=4.0.0"></script>
  <style>
${cssCode}
  </style>
</head>
<body>
  ${previewHtml}
</body>
</html>`;
  };

  return (
    <div ref={containerRef} className="h-full flex flex-col">
      {/* Header (optional) */}
      {showHeader && (
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                {title || (functionName ? `${functionName} Playground` : "Tailwind CSS Playground")}
              </h1>
              <p className="text-muted-foreground">
                {description || (functionName ? `Experiment with the ${functionName.toLowerCase()} utility in real-time` : "Interactive playground for experimenting with Tailwind CSS v4")}
              </p>
            </div>
            
            <div className="flex gap-2">
              {/* Template Selector */}
              <Drawer open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <FileCode className="h-4 w-4" />
                    <span className="hidden sm:inline">Templates</span>
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Select a Template</DrawerTitle>
                    <DrawerDescription>
                      Choose a starter template or create from scratch
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {TEMPLATES.map((template, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        className="h-auto p-4 flex flex-col items-start justify-start text-left gap-2"
                        onClick={() => loadTemplate(template)}
                      >
                        <div className="text-base font-medium">{template.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {template.description}
                        </div>
                      </Button>
                    ))}
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              
              {/* Reset Button */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={resetCode}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset code</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {/* Export Button */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={downloadHTML}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download HTML</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {/* Help Button */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            Tailwind CSS v4 Guide
                          </DialogTitle>
                          <DialogDescription>
                            Quick reference for common Tailwind classes and patterns
                          </DialogDescription>
                        </DialogHeader>
                        
                        <Tabs defaultValue="basics">
                          <TabsList className="grid grid-cols-3 mb-4">
                            <TabsTrigger value="basics">Basics</TabsTrigger>
                            <TabsTrigger value="responsive">Responsive</TabsTrigger>
                            <TabsTrigger value="features">V4 Features</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="basics" className="space-y-4">
                            <div>
                              <h3 className="font-medium mb-2">Layout</h3>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-sm p-2 bg-secondary/20 rounded">
                                  <code className="font-mono text-xs">flex</code>
                                  <p className="text-xs text-muted-foreground mt-1">Display as flexbox</p>
                                </div>
                                <div className="text-sm p-2 bg-secondary/20 rounded">
                                  <code className="font-mono text-xs">grid</code>
                                  <p className="text-xs text-muted-foreground mt-1">Display as grid</p>
                                </div>
                                <div className="text-sm p-2 bg-secondary/20 rounded">
                                  <code className="font-mono text-xs">items-center</code>
                                  <p className="text-xs text-muted-foreground mt-1">Align items center</p>
                                </div>
                                <div className="text-sm p-2 bg-secondary/20 rounded">
                                  <code className="font-mono text-xs">justify-between</code>
                                  <p className="text-xs text-muted-foreground mt-1">Space between</p>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-medium mb-2">Spacing</h3>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-sm p-2 bg-secondary/20 rounded">
                                  <code className="font-mono text-xs">p-4</code>
                                  <p className="text-xs text-muted-foreground mt-1">Padding: 1rem</p>
                                </div>
                                <div className="text-sm p-2 bg-secondary/20 rounded">
                                  <code className="font-mono text-xs">m-2</code>
                                  <p className="text-xs text-muted-foreground mt-1">Margin: 0.5rem</p>
                                </div>
                                <div className="text-sm p-2 bg-secondary/20 rounded">
                                  <code className="font-mono text-xs">gap-4</code>
                                  <p className="text-xs text-muted-foreground mt-1">Gap: 1rem</p>
                                </div>
                                <div className="text-sm p-2 bg-secondary/20 rounded">
                                  <code className="font-mono text-xs">space-y-2</code>
                                  <p className="text-xs text-muted-foreground mt-1">Vertical spacing</p>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="responsive" className="space-y-4">
                            <div>
                              <h3 className="font-medium mb-2">Responsive Breakpoints</h3>
                              <div className="grid gap-2">
                                <div className="text-sm p-2 bg-secondary/20 rounded">
                                  <code className="font-mono text-xs">sm:flex</code>
                                  <p className="text-xs text-muted-foreground mt-1">640px and up</p>
                                </div>
                                <div className="text-sm p-2 bg-secondary/20 rounded">
                                  <code className="font-mono text-xs">md:grid</code>
                                  <p className="text-xs text-muted-foreground mt-1">768px and up</p>
                                </div>
                                <div className="text-sm p-2 bg-secondary/20 rounded">
                                  <code className="font-mono text-xs">lg:hidden</code>
                                  <p className="text-xs text-muted-foreground mt-1">1024px and up</p>
                                </div>
                                <div className="text-sm p-2 bg-secondary/20 rounded">
                                  <code className="font-mono text-xs">xl:block</code>
                                  <p className="text-xs text-muted-foreground mt-1">1280px and up</p>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-medium mb-2">Example Usage</h3>
                              <pre className="text-xs p-3 bg-secondary/20 rounded-md overflow-x-auto">
                                <code className="font-mono">{`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>`}</code>
                              </pre>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="features" className="space-y-4">
                            <div>
                              <h3 className="font-medium mb-2">New in Tailwind v4</h3>
                              <div className="grid gap-2">
                                <div className="text-sm p-2 bg-secondary/20 rounded">
                                  <code className="font-mono text-xs">@theme inline</code>
                                  <p className="text-xs text-muted-foreground mt-1">Define CSS variables</p>
                                </div>
                                <div className="text-sm p-2 bg-secondary/20 rounded">
                                  <code className="font-mono text-xs">@custom-variant</code>
                                  <p className="text-xs text-muted-foreground mt-1">Create custom variants</p>
                                </div>
                                <div className="text-sm p-2 bg-secondary/20 rounded">
                                  <code className="font-mono text-xs">text-balance</code>
                                  <p className="text-xs text-muted-foreground mt-1">Balanced text wrapping</p>
                                </div>
                                <div className="text-sm p-2 bg-secondary/20 rounded">
                                  <code className="font-mono text-xs">bg-blue-500</code>
                                  <p className="text-xs text-muted-foreground mt-1">OKLCH colors</p>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="font-medium mb-2">Custom Variant Example</h3>
                              <pre className="text-xs p-3 bg-secondary/20 rounded-md overflow-x-auto">
                                <code className="font-mono">{`@custom-variant print (&:is(.print *)) {
  &[hidden-print="true"] {
    @apply hidden;
  }
}`}</code>
                              </pre>
                            </div>
                          </TabsContent>
                        </Tabs>
                        
                        <DialogFooter className="flex gap-2">
                          <Button asChild>
                            <a 
                              href="https://tailwindcss.com/docs" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="gap-1"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Official Docs
                            </a>
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tailwind CSS Help</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {/* Tips Banner (collapsible) */}
          {showTips && (
            <Alert className="mt-4 bg-primary/5 border-primary/20">
              <Info className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm flex flex-col sm:flex-row justify-between items-start sm:items-center w-full">
                <span>
                  {functionName ? 
                    `Edit HTML and experiment with the ${functionName.toLowerCase()} utility. Changes apply automatically as you type.` : 
                    "Edit HTML and CSS using Tailwind classes and see instant results."}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowTips(false)}
                  className="mt-2 sm:mt-0 border-primary/20 text-primary hover:text-primary hover:bg-primary/10"
                >
                  <X className="h-3 w-3 mr-1" />
                  Hide Tips
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
          {/* Version Badge */}
          <div className="flex justify-end mt-2">
            <Badge variant="outline" className="text-xs gap-1">
              <Code className="h-3 w-3" />
              Tailwind CSS v4.0.0
            </Badge>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow h-full">
        {/* Editor Section */}
        <div className="flex flex-col border rounded-lg overflow-hidden bg-background">
          {/* Editor Header */}
          <div className="border-b flex items-center justify-between p-2">
            <div className="flex items-center">
              <Tabs value={currentTab} onValueChange={(v) => setCurrentTab(v as "html" | "css")}>
                <TabsList className="h-8">
                  <TabsTrigger value="html" className="text-xs gap-1">
                    <Code className="h-3.5 w-3.5" />
                    HTML
                  </TabsTrigger>
                  <TabsTrigger value="css" className="text-xs gap-1">
                    <FileType className="h-3.5 w-3.5" />
                    CSS
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <Switch 
                  id="auto-refresh" 
                  checked={autoRefresh} 
                  onCheckedChange={setAutoRefresh}
                  className="scale-75"
                />
                <Label htmlFor="auto-refresh" className="text-xs ml-1.5">Auto-refresh</Label>
              </div>
              
              {!autoRefresh && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh}
                  className="h-7 px-2 text-xs gap-1"
                >
                  <Play className="h-3 w-3" />
                  Run
                </Button>
              )}
              
              <Button 
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="h-7 px-2 text-xs gap-1"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Editor Content */}
          <div className="flex-grow relative">
            {currentTab === "html" ? (
              <div className="absolute inset-0">
                <CodeEditor 
                  value={htmlCode} 
                  onChange={setHtmlCode} 
                  language="html"
                />
              </div>
            ) : (
              <div className="absolute inset-0">
                <CodeEditor 
                  value={cssCode} 
                  onChange={setCssCode} 
                  language="css"
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Preview Section */}
        <div className="flex flex-col border rounded-lg overflow-hidden bg-background">
          {/* Preview Header */}
          <div className="border-b flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-medium">Preview</h2>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Device View Toggle */}
              {!isMobile && (
                <ToggleGroup 
                  type="single" 
                  value={deviceView} 
                  onValueChange={(value) => value && setDeviceView(value as DeviceView)}
                  className="bg-secondary/20 rounded-md p-0.5"
                >
                  <ToggleGroupItem 
                    value="responsive" 
                    className="h-7 w-7 rounded-sm data-[state=on]:bg-background data-[state=on]:text-foreground"
                    aria-label="Responsive view"
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="phone" 
                    className="h-7 w-7 rounded-sm data-[state=on]:bg-background data-[state=on]:text-foreground"
                    aria-label="Phone view"
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="tablet" 
                    className="h-7 w-7 rounded-sm data-[state=on]:bg-background data-[state=on]:text-foreground"
                    aria-label="Tablet view"
                  >
                    <Tablet className="h-3.5 w-3.5" />
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="laptop" 
                    className="h-7 w-7 rounded-sm data-[state=on]:bg-background data-[state=on]:text-foreground"
                    aria-label="Laptop view"
                  >
                    <Laptop className="h-3.5 w-3.5" />
                  </ToggleGroupItem>
                </ToggleGroup>
              )}
              
              {/* Mobile Device Selection */}
              {isMobile && (
                <Select 
                  value={deviceView}
                  onValueChange={(value) => setDeviceView(value as DeviceView)}
                >
                  <SelectTrigger className="h-7 w-[130px] text-xs">
                    <SelectValue placeholder="View" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="responsive">Responsive</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="laptop">Laptop</SelectItem>
                  </SelectContent>
                </Select>
              )}
              
              {/* Grid Toggle */}
              <div className="flex items-center">
                <Switch 
                  id="show-grid" 
                  checked={showGrid} 
                  onCheckedChange={setShowGrid}
                  className="scale-75"
                />
                <Label htmlFor="show-grid" className="text-xs ml-1.5">Grid</Label>
              </div>
              
              {/* Preview Actions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Preview Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => window.open("about:blank", "_blank")?.document.write(getCombinedCode())}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in New Tab
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleRefresh}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setTemplateDialogOpen(true)}>
                    <FileCode className="h-4 w-4 mr-2" />
                    Load Template
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Preview Content */}
          <div className="flex-grow relative">
            <div 
              className={cn(
                "w-full h-full", 
                deviceView !== "responsive" ? "flex items-center justify-center bg-secondary/20" : ""
              )}
            >
              <div 
                className={cn(
                  "overflow-auto",
                  deviceView === "phone" ? "w-[375px] h-[667px] shadow-xl mx-auto border border-border rounded-lg" :
                  deviceView === "tablet" ? "w-[768px] h-[1024px] shadow-xl mx-auto scale-75 origin-center border border-border rounded-lg" :
                  deviceView === "laptop" ? "w-[1366px] h-[768px] shadow-xl mx-auto scale-[0.6] origin-center border border-border rounded-lg" : 
                  "w-full h-full"
                )}
              >
                <LivePreview 
                  code={getCombinedCode()}
                  deviceView={deviceView}
                  showGrid={showGrid}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}