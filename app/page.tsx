// app/page.tsx - Fixed line 178 with proper quote escaping
// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { getAllCategories } from "@/lib/tailwind-data";
import CategoryCard from "@/components/category-card";
import { SearchBar } from "@/components/search-bar";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Code, Star, History } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const categories = getAllCategories();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentCategories, setRecentCategories] = useState<string[]>([]);
  const [activeTab] = useState("all");

  // Load recent categories from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('recentCategories');
      if (stored) {
        setRecentCategories(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading recent categories:', error);
    }
  }, []);

  // Filter categories based on search query and active tab
  const filteredCategories = categories.filter(category => {
    // Search filter
    const matchesSearch = 
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tab filter
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "layout" && 
        (category.id === "layout" || category.id === "flexbox-grid")) 
      return matchesSearch;
    if (activeTab === "styling" && 
        (category.id === "typography" || category.id === "backgrounds" || 
         category.id === "borders" || category.id === "effects")) 
      return matchesSearch;
    if (activeTab === "recent" && recentCategories.includes(category.id)) 
      return matchesSearch;
    
    return false;
  });

  // Popular categories (you can customize this list)
  const popularCategories = [
    "flexbox-grid",
    "typography",
    "spacing",
    "effects"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto mb-12 pt-6 md:pt-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              TailwindMaster Docs
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The ultimate guide to Tailwind CSS v4 utilities, with interactive examples and playground. 
              Learn, experiment, and master modern CSS.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="gap-2">
              <Link href="/playground">
                <Code className="h-5 w-5" />
                Open Playground
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2">
              <a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer">
                <BookOpen className="h-5 w-5" />
                Official Tailwind Docs
              </a>
            </Button>
          </div>
        </div>

        {/* Search and Tabs */}
        <div className="mb-10">
          <SearchBar 
            onSearch={setSearchQuery} 
            placeholder="Search Tailwind utilities..." 
            className="max-w-2xl mx-auto mb-8"
          />
        </div>

        {/* Recent Categories Section (conditionally rendered) */}
        {activeTab === "recent" && recentCategories.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <History className="h-5 w-5 mr-2 text-muted-foreground" />
              <h2 className="text-2xl font-bold">Recently Viewed</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories
                .filter(category => recentCategories.includes(category.id))
                .map(category => (
                  <CategoryCard key={category.id} category={category} />
                ))}
            </div>
          </div>
        )}

        {/* Popular Categories Section (conditionally rendered on "all" tab) */}
        {activeTab === "all" && searchQuery === "" && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Star className="h-5 w-5 mr-2 text-yellow-500" />
              <h2 className="text-2xl font-bold">Popular Categories</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories
                .filter(category => popularCategories.includes(category.id))
                .map(category => (
                  <CategoryCard key={category.id} category={category} featured={true} />
                ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
                <ArrowRight className="h-4 w-4" />
                <span>Explore all categories below</span>
              </Button>
            </div>
          </div>
        )}

        {/* Main Categories Grid */}
        <div className="mb-8">
          {activeTab !== "recent" && searchQuery === "" && activeTab !== "all" && (
            <h2 className="text-2xl font-bold mb-6">
              {activeTab === "layout" ? "Layout Categories" : "Styling Categories"}
            </h2>
          )}
          
          {activeTab === "all" && searchQuery === "" && (
            <h2 className="text-2xl font-bold mb-6">All Categories</h2>
          )}
          
          {searchQuery !== "" && (
            <h2 className="text-2xl font-bold mb-6">
              Search Results for &quot;{searchQuery}&quot;
            </h2>
          )}
          
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map(category => (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                  featured={popularCategories.includes(category.id) && activeTab !== "all"}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed rounded-lg bg-secondary/20">
              <p className="text-muted-foreground mb-4">No categories found matching your search</p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>Clear Search</Button>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            TailwindMaster - Interactive documentation for Tailwind CSS v4
          </p>
        </div>
      </footer>
    </div>
  );
}