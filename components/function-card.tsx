// components/function-card.tsx
import Link from "next/link";
import { TailwindFunction } from "@/lib/tailwind-data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Code, 
  Play, 
  SlidersHorizontal, 
  Star,
  ChevronRight,
  Copy,
  Check
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "./ui/tooltip";

interface FunctionCardProps {
  func: TailwindFunction;
  categoryId: string;
  viewMode?: "grid" | "list";
  featured?: boolean;
}

export default function FunctionCard({ 
  func, 
  categoryId, 
  viewMode = "grid",
  featured = false 
}: FunctionCardProps) {
  const [copied, setCopied] = useState(false);
  
  // Generate a simple usage example for the preview
  const generateExample = () => {
    if (func.examples && func.examples.length > 0) {
      return func.examples[0].code;
    }
    
    // Fallback example if no examples are provided
    return `<div class="${func.name.toLowerCase()}">${func.name}</div>`;
  };
  
  // Copy code to clipboard
  const copyExampleCode = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    navigator.clipboard.writeText(generateExample());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Grid view mode
  if (viewMode === "grid") {
    return (
      <Card 
        className={cn(
          "overflow-hidden transition-all duration-300 hover:shadow-lg border-border/40 h-full flex flex-col group",
          featured ? "card-hover ring-1 ring-primary/20" : "card-hover"
        )}
      >
        <CardContent className="p-6 flex-grow">
          {featured && (
            <div className="flex justify-end -mt-2 -mr-2 mb-2">
              <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/25 gap-1 text-xs">
                <Star className="h-3 w-3" />
                Popular
              </Badge>
            </div>
          )}
          
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-xl font-semibold flex-grow">{func.name}</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" asChild className="h-7 w-7 p-0">
                    <Link href={`/${categoryId}/${func.id}/playground`} aria-label="Open in playground">
                      <Play className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Open in playground</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <p className="text-muted-foreground mb-4 line-clamp-2">{func.description}</p>
          
          <div className="space-y-4">
            {/* Preview of the code */}
            <div className="bg-secondary/70 dark:bg-secondary/20 rounded-md p-3 overflow-hidden text-xs font-mono h-16 flex items-center relative group">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground">
                {generateExample()}
              </div>
              
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={copyExampleCode}
                  className="h-6 w-6 bg-background/80 backdrop-blur-sm border border-border/30 hover:bg-background"
                >
                  {copied ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
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
  
  // List view mode
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200 hover:shadow-md border-border/40 group",
      featured ? "bg-primary/5" : ""
    )}>
      <CardContent className="p-4 flex items-center">
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-medium">{func.name}</h2>
            {featured && (
              <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/25 gap-1 text-xs">
                <Star className="h-3 w-3" />
                Popular
              </Badge>
            )}
          </div>
          
          <p className="text-muted-foreground text-sm mb-2 line-clamp-1">{func.description}</p>
          
          <div className="flex flex-wrap gap-1.5">
            {func.variants.length > 0 && 
              func.variants[0].values.slice(0, 4).map(value => (
                <Badge 
                  key={value} 
                  variant="outline" 
                  className="text-xs"
                >
                  {value}
                </Badge>
              ))
            }
            {func.variants.length > 0 && func.variants[0].values.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{func.variants[0].values.length - 4}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                  <Link href={`/${categoryId}/${func.id}/playground`} aria-label="Open in playground">
                    <Play className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Open in playground</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button asChild variant="ghost" size="sm" className="h-8 mr-2">
            <Link href={`/${categoryId}/${func.id}`} className="flex items-center">
              <span className="sr-only md:not-sr-only md:inline-block md:mr-1">Details</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}