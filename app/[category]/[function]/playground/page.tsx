// app/[category]/[function]/playground/page.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getCategoryById, getFunctionById } from "@/lib/tailwind-data";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Playground } from "@/components/playground";

export default function PlaygroundPage() {
  const params = useParams();
  const categoryId = params.category as string;
  const functionId = params.function as string;
  
  const category = getCategoryById(categoryId);
  const func = getFunctionById(categoryId, functionId);

  if (!category || !func) {
    return <div className="container mx-auto px-4 py-8">Function not found</div>;
  }

  // Use first example as a starting point
  const initialCode = func.examples.length > 0 
    ? func.examples[0].code 
    : '<div>Example</div>';

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
        <p className="text-muted-foreground">
          Experiment with the {func.name.toLowerCase()} utility in real-time
        </p>
      </div>

      <Playground initialCode={initialCode} />
    </div>
  );
}