// app/[category]/[function]/playground/page.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getCategoryById, getFunctionById } from "@/lib/tailwind-data";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Playground } from "@/components/playground";
import { Suspense } from "react";

// Loading component
function PlaygroundSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-10 w-64 bg-secondary/40 animate-pulse rounded-md"></div>
      <div className="h-8 w-96 bg-secondary/30 animate-pulse rounded-md"></div>
      <div className="h-[calc(100vh-15rem)] w-full bg-secondary/20 animate-pulse rounded-md"></div>
    </div>
  );
}

export default function PlaygroundPage() {
  const params = useParams();
  const categoryId = params.category as string;
  const functionId = params.function as string;
  
  const category = getCategoryById(categoryId);
  const func = getFunctionById(categoryId, functionId);

  if (!category || !func) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Header />
        <div className="mt-8 p-8 text-center rounded-lg border border-destructive/20 bg-destructive/5">
          <h2 className="text-2xl font-bold text-destructive mb-2">Function not found</h2>
          <p className="text-muted-foreground">The requested Tailwind utility function could not be found.</p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/">
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Use first example as a starting point or provide a default
  const initialCode = func.examples.length > 0 
    ? func.examples[0].code 
    : `<div class="flex items-center justify-center min-h-[300px] bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center p-8 rounded-lg shadow-lg">
  <div>
    <h1 class="text-3xl font-bold mb-4">Welcome to ${func.name} Playground</h1>
    <p class="text-lg">Start editing to see your changes live!</p>
  </div>
</div>`;

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link href={`/${categoryId}/${functionId}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to {func.name}
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">
          {func.name} Playground
        </h1>
        <p className="text-muted-foreground mb-6">
          Experiment with the {func.name.toLowerCase()} utility in real-time
        </p>
      </div>

      <Suspense fallback={<PlaygroundSkeleton />}>
        <Playground initialCode={initialCode} />
      </Suspense>
    </div>
  );
}