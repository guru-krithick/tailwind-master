// components/search-bar.tsx
"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ onSearch, placeholder = "Search...", className }: SearchBarProps) {
  return (
    <div className={cn("relative transition-all", className)}>
      <div className="relative rounded-full border border-input bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          className="rounded-full border-0 pl-10 pr-4 py-6 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}