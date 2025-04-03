// components/function-card.tsx
import Link from "next/link";
import { TailwindFunction } from "@/lib/tailwind-data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Play, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FunctionCardProps {
  func: TailwindFunction;
  categoryId: string;
}

export default function FunctionCard({ func, categoryId }: FunctionCardProps) {
  // Generate a simple usage example for the preview
  const generateExample = () => {
    if (func.examples && func.examples.length > 0) {
      return func.examples[0].code;
    }
    
    // Fallback example if no examples are provided
    return `<div class="${func.name.toLowerCase()}">${func.name}</div>`;
  };
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg card-hover border border-border/40 h-full flex flex-col">
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-xl font-semibold flex-grow">{func.name}</h2>
          <Button variant="ghost" size="sm" asChild className="h-7 w-7 p-0">
            <Link href={`/${categoryId}/${func.id}/playground`} aria-label="Open in playground">
              <Play className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">{func.description}</p>
        
        <div className="space-y-4">
          {/* Preview of the code */}
          <div className="bg-secondary/70 dark:bg-secondary/20 rounded-md p-3 overflow-hidden text-xs font-mono h-16 flex items-center">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground">
              {generateExample()}
            </div>
          </div>
          
          {/* Badges for variants and examples */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center gap-1.5">
              <SlidersHorizontal className="h-3 w-3" />
              {func.variants.length} {func.variants.length === 1 ? 'variant' : 'variants'}
            </Badge>
            
            <Badge variant="outline" className="flex items-center gap-1.5">
              <Code className="h-3 w-3" />
              {func.examples.length} {func.examples.length === 1 ? 'example' : 'examples'}
            </Badge>
          </div>
          
          {/* Preview of variant values */}
          {func.variants.length > 0 && func.variants[0].values.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {func.variants[0].values.slice(0, 3).map((value, index) => (
                <Badge 
                  key={value} 
                  variant="secondary" 
                  className={cn(
                    "text-xs",
                    index === 0 ? "bg-primary/20 hover:bg-primary/30" : ""
                  )}
                >
                  {value}
                </Badge>
              ))}
              {func.variants[0].values.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{func.variants[0].values.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="outline" className="w-full group relative overflow-hidden">
          <Link href={`/${categoryId}/${func.id}`} className="flex justify-between items-center">
            <span className="relative z-10">View details</span>
            <ArrowRight className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-primary/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}