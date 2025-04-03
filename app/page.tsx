// app/page.tsx
"use client";

import { useState } from "react";
import { getAllCategories } from "@/lib/tailwind-data";
import CategoryCard from "@/components/category-card";
import { SearchBar } from "@/components/search-bar";
import { Header } from "@/components/header";

export default function Home() {
  const categories = getAllCategories();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            TailwindMaster Docs
          </h1>
          <p className="text-lg text-muted-foreground">
            The ultimate guide to Tailwind CSS utilities, with interactive examples and playground
          </p>
        </div>

        <SearchBar onSearch={setSearchQuery} placeholder="Search categories..." className="max-w-xl mx-auto mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}