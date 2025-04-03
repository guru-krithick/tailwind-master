// app/[category]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getCategoryById } from "@/lib/tailwind-data";
import FunctionCard from "@/components/function-card";
import { SearchBar } from "@/components/search-bar";
import { Header } from "@/components/header";
import { ChevronLeft, Info, Grid, LayoutList, BookOpen, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.category as string;
  const category = getCategoryById(categoryId);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [functionsGroupBy, setFunctionsGroupBy] = useState<"all" | "popular">("all");
  const [popularFunctions, setPopularFunctions] = useState<string[]>([]);

  useEffect(() => {
    if (category) {
      // Save to recent categories in localStorage
      try {
        const stored = localStorage.getItem('recentCategories') || '[]';
        const recentCategories = JSON.parse(stored) as string[];
        
        // Remove if already exists and add to beginning
        const newRecent = [
          categoryId,
          ...recentCategories.filter(id => id !== categoryId)
        ].slice(0, 5); // Keep only 5 most recent
        
        localStorage.setItem('recentCategories', JSON.stringify(newRecent));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      
      // Set popular functions (in a real app, this might come from analytics)
      // Here we're just using the first few functions as "popular"
      setPopularFunctions(category.functions.slice(0, 5).map(f => f.id));
    }
  }, [category, categoryId]);

  const filteredFunctions = category?.functions.filter(func =>
    func.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    func.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
          <div className="text-center p-8 border border-destructive/30 rounded-lg">
            <h2 className="text-2xl font-bold text-destructive mb-2">Category not found</h2>
            <p className="text-muted-foreground mb-6">The requested Tailwind category could not be found.</p>
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Back Link */}
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm" className="mb-4 gap-1 text-muted-foreground">
            <Link href="/">
              <ChevronLeft className="h-4 w-4" />
              Back to categories
            </Link>
          </Button>
        </div>
        
        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div className="flex items-start gap-4">
            <div className={cn("p-4 rounded-lg flex-shrink-0", category.color)}>
              <div className="text-white">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
              <p className="text-muted-foreground max-w-2xl">{category.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="gap-1 px-2 py-1">
                  <FileCode className="h-3 w-3" />
                  {category.functions.length} {category.functions.length === 1 ? 'utility' : 'utilities'}
                </Badge>
                
                <Badge variant="secondary" className="gap-1 px-2 py-1">
                  {category.id}
                </Badge>
              </div>
            </div>
          </div>
          
          <div>
            <Button asChild variant="outline" className="gap-2">
              <a 
                href={`https://tailwindcss.com/docs/guides/${category.id}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <BookOpen className="h-4 w-4" />
                Official Documentation
              </a>
            </Button>
          </div>
        </div>
        
        {/* Category Content */}
        <div>
          {/* Info Alert */}
          <Alert className="mb-6 bg-primary/5 border-primary/20">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm">
              All {category.name.toLowerCase()} utilities can be combined with responsive breakpoints (sm:, md:, lg:, xl:) 
              and state variants (hover:, focus:, dark:).
            </AlertDescription>
          </Alert>
          
          {/* Search and View Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <SearchBar 
              onSearch={setSearchQuery} 
              placeholder={`Search ${category.name} utilities...`}
              className="w-full md:max-w-xs"
            />
            
            <div className="flex items-center gap-3">
              <ToggleGroup 
                type="single" 
                value={functionsGroupBy} 
                onValueChange={(value) => setFunctionsGroupBy(value as "all" | "popular")}
                className="bg-secondary/20 rounded-md p-0.5"
              >
                <ToggleGroupItem 
                  value="all" 
                  className="text-xs px-3 rounded-sm data-[state=on]:bg-background data-[state=on]:text-foreground"
                >
                  All
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="popular" 
                  className="text-xs px-3 rounded-sm data-[state=on]:bg-background data-[state=on]:text-foreground"
                >
                  Popular
                </ToggleGroupItem>
              </ToggleGroup>
              
              <ToggleGroup 
                type="single" 
                value={viewMode} 
                onValueChange={(value) => setViewMode(value as "grid" | "list")}
                className="bg-secondary/20 rounded-md p-0.5"
              >
                <ToggleGroupItem 
                  value="grid" 
                  className="h-7 w-7 rounded-sm data-[state=on]:bg-background data-[state=on]:text-foreground"
                  aria-label="Grid view"
                >
                  <Grid className="h-3.5 w-3.5" />
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="list" 
                  className="h-7 w-7 rounded-sm data-[state=on]:bg-background data-[state=on]:text-foreground"
                  aria-label="List view"
                >
                  <LayoutList className="h-3.5 w-3.5" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
          
          {/* Functions List */}
          <Tabs defaultValue="utilities" className="mb-6">
            <TabsList>
              <TabsTrigger value="utilities">Utilities</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>
            
            <TabsContent value="utilities">
              {filteredFunctions.length === 0 ? (
                <div className="text-center py-12 border border-dashed rounded-lg bg-secondary/20">
                  <p className="text-muted-foreground mb-4">No utilities found matching your search</p>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>Clear Search</Button>
                </div>
              ) : (
                <div className={cn(
                  viewMode === "grid" 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                )}>
                  {filteredFunctions
                    .filter(func => 
                      functionsGroupBy === "all" || 
                      (functionsGroupBy === "popular" && popularFunctions.includes(func.id))
                    )
                    .map(func => (
                      <FunctionCard 
                        key={func.id} 
                        func={func} 
                        categoryId={category.id} 
                        viewMode={viewMode}
                        featured={popularFunctions.includes(func.id)}
                      />
                    ))
                  }
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="examples">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Examples of combined utilities */}
                <div className="bg-white dark:bg-gray-900 rounded-lg border p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">Responsive Example</h3>
                  <pre className="mb-3 text-sm bg-secondary/20 p-3 rounded-md overflow-x-auto">
                    <code>{`<div class="hidden md:block">
  Shows on medium screens and up
</div>`}</code>
                  </pre>
                  <p className="text-sm text-muted-foreground">
                    This element is hidden by default, but displays as a block on medium screens and larger.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-900 rounded-lg border p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">State Variants Example</h3>
                  <pre className="mb-3 text-sm bg-secondary/20 p-3 rounded-md overflow-x-auto">
                    <code>{`<button class="bg-blue-500 hover:bg-blue-700 text-white">
  Hover Me
</button>`}</code>
                  </pre>
                  <p className="text-sm text-muted-foreground">
                    This button changes its background color when hovered.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-900 rounded-lg border p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">Group Hover Example</h3>
                  <pre className="mb-3 text-sm bg-secondary/20 p-3 rounded-md overflow-x-auto">
                    <code>{`<div class="group">
  <div>Parent Element</div>
  <div class="text-gray-500 group-hover:text-blue-500">
    Changes on parent hover
  </div>
</div>`}</code>
                  </pre>
                  <p className="text-sm text-muted-foreground">
                    The text color changes when the parent element is hovered.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-900 rounded-lg border p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">Dark Mode Example</h3>
                  <pre className="mb-3 text-sm bg-secondary/20 p-3 rounded-md overflow-x-auto">
                    <code>{`<div class="bg-white dark:bg-gray-800 text-black dark:text-white">
  Adapts to light/dark mode
</div>`}</code>
                  </pre>
                  <p className="text-sm text-muted-foreground">
                    This element has different background and text colors in light vs dark mode.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            TailwindMaster - Interactive documentation for Tailwind CSS v4
          </p>
        </div>
      </footer>
    </div>
  );
}