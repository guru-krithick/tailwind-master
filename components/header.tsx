// components/header.tsx
"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { BookOpen, Github, Moon, Sun } from "lucide-react";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="rounded-lg bg-primary p-1">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl tracking-tight">TailwindMaster</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          
          <Button variant="outline" size="icon" asChild className="rounded-full">
            <a href="https://github.com/yourname/tailwind-master" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}