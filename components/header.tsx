// components/enhanced-header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { 
  Book, 
  ChevronRight, 
  Github, 
  Menu, 
  Moon, 
  Search, 
  Sun, 
  X,
  Palette,
  Layout,
  Code
} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import { getCategoryById, getFunctionById } from "@/lib/tailwind-data";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

export function Header() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Get current path segments for breadcrumbs
  const segments = pathname?.split('/').filter(Boolean) || [];
  const categoryId = segments[0] || null;
  const functionId = segments[1] || null;
  const isPlayground = segments[2] === 'playground' || pathname === '/playground';
  
  const category = categoryId ? getCategoryById(categoryId) : null;
  const func = (categoryId && functionId) ? getFunctionById(categoryId, functionId) : null;

  // Handle scroll for header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-200",
        isScrolled 
          ? "bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 border-border/50" 
          : "bg-background border-border/30"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <div className="rounded-lg bg-primary p-1.5">
                <Book className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tight hidden md:block">TailwindMaster</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Button asChild variant="ghost" size="sm" className="h-8 gap-1">
                <Link href="/">
                  <Layout className="h-4 w-4 mr-1" />
                  Docs
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="h-8 gap-1">
                <Link href="/playground">
                  <Code className="h-4 w-4 mr-1" />
                  Playground
                </Link>
              </Button>
            </nav>
          </div>

          {/* Breadcrumbs (desktop only) */}
          {(categoryId || isPlayground) && (
            <div className="hidden md:flex items-center text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              
              {isPlayground && !categoryId && (
                <>
                  <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/50" />
                  <span className="text-foreground">Playground</span>
                </>
              )}
              
              {category && (
                <>
                  <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/50" />
                  {functionId ? (
                    <Link 
                      href={`/${categoryId}`}
                      className="hover:text-foreground transition-colors"
                    >
                      {category.name}
                    </Link>
                  ) : (
                    <span className="text-foreground">{category.name}</span>
                  )}
                </>
              )}
              
              {func && (
                <>
                  <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/50" />
                  {isPlayground ? (
                    <Link 
                      href={`/${categoryId}/${functionId}`}
                      className="hover:text-foreground transition-colors"
                    >
                      {func.name}
                    </Link>
                  ) : (
                    <span className="text-foreground">{func.name}</span>
                  )}
                </>
              )}
              
              {func && isPlayground && (
                <>
                  <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/50" />
                  <span className="text-foreground">Playground</span>
                </>
              )}
            </div>
          )}
          
          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile search toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Desktop search */}
            <div className="hidden md:block relative w-44 transition-all duration-200 focus-within:w-60">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-9 h-9 bg-background border-border/50 focus-visible:border-border"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            
            {/* Theme toggle */}
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
            
            {/* GitHub link */}
            <Button variant="outline" size="icon" asChild className="rounded-full hidden md:flex">
              <a href="https://github.com/yourname/tailwind-master" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg bg-primary p-1.5">
                        <Book className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <span className="font-bold text-xl">TailwindMaster</span>
                    </div>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                  </div>
                  
                  <nav className="flex flex-col space-y-2 mb-6">
                    <Button asChild variant="ghost" className="justify-start" size="sm">
                      <Link href="/">
                        <Layout className="h-4 w-4 mr-2" />
                        Documentation
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start" size="sm">
                      <Link href="/playground">
                        <Code className="h-4 w-4 mr-2" />
                        Playground
                      </Link>
                    </Button>
                  </nav>
                  
                  {isPlayground && (
                    <div className="border-t border-border/40 pt-4 pb-2">
                      <h3 className="text-sm font-medium mb-2">Playground</h3>
                      <div className="flex flex-col gap-1">
                        <Badge className="w-fit">
                          Tailwind v4
                        </Badge>
                      </div>
                    </div>
                  )}
                  
                  {category && (
                    <div className="border-t border-border/40 pt-4 pb-2">
                      <h3 className="text-sm font-medium mb-2">Current Category</h3>
                      <div className="flex flex-col gap-1">
                        <Button asChild variant="outline" size="sm" className="justify-start h-8">
                          <Link href={`/${category.id}`}>
                            <div className={cn(
                              "w-5 h-5 mr-2 rounded-md flex items-center justify-center",
                              category.color
                            )}>
                              <Palette className="h-3 w-3 text-white" />
                            </div>
                            {category.name}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {func && (
                    <div className="border-t border-border/40 pt-4">
                      <h3 className="text-sm font-medium mb-2">Current Function</h3>
                      <Button asChild variant="ghost" size="sm" className="justify-start w-full">
                        <Link href={`/${categoryId}/${functionId}`}>
                          {func.name}
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="justify-start w-full mt-1">
                        <Link href={`/${categoryId}/${functionId}/playground`}>
                          <Code className="h-3.5 w-3.5 mr-1.5" />
                          Open in Playground
                        </Link>
                      </Button>
                    </div>
                  )}
                  
                  <div className="mt-auto border-t border-border/40 pt-4">
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <a href="https://github.com/yourname/tailwind-master" target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Mobile search overlay */}
        {isMobileSearchOpen && (
          <div className="border-t border-border/30 py-2 px-1 md:hidden">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Tailwind utilities..."
                className="pl-9 pr-9 h-9"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                autoFocus
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-9 w-9"
                onClick={() => setIsMobileSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}