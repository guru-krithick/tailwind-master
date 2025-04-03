// app/[category]/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getCategoryById } from "@/lib/tailwind-data";
import FunctionCard from "@/components/function-card";
import { SearchBar } from "@/components/search-bar";
import { Header } from "@/components/header";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.category as string;
  const category = getCategoryById(categoryId);
  const [searchQuery, setSearchQuery] = useState("");

  if (!category) {
    return <div className="container mx-auto px-4 py-8">Category not found</div>;
  }

  const filteredFunctions = category.functions.filter(func =>
    func.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    func.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      
      <div className="mb-8">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link href="/">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to categories
          </Link>
        </Button>
        
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-3 rounded-lg ${category.color}`}>
            <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{category.name}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
        </div>
      </div>

      <SearchBar onSearch={setSearchQuery} placeholder="Search functions..." className="max-w-xl mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFunctions.map(func => (
          <FunctionCard key={func.id} func={func} categoryId={category.id} />
        ))}
      </div>
    </div>
  );
}