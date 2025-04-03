// components/category-card.tsx
import Link from "next/link";
import { TailwindCategory } from "@/lib/tailwind-data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Layout, Type, MoveHorizontal, Palette, Zap, Layers, Box, Grid2X2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Expanded icon map for more variety
const iconMap: Record<string, React.ReactNode> = {
  "layout": <Layout className="h-5 w-5" />,
  "type": <Type className="h-5 w-5" />,
  "move-horizontal": <MoveHorizontal className="h-5 w-5" />,
  "palette": <Palette className="h-5 w-5" />,
  "zap": <Zap className="h-5 w-5" />,
  "layers": <Layers className="h-5 w-5" />,
  "box": <Box className="h-5 w-5" />,
  "grid": <Grid2X2 className="h-5 w-5" />,
};

interface CategoryCardProps {
  category: TailwindCategory;
  featured?: boolean; // Added the featured prop
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const icon = iconMap[category.icon] || <Layout className="h-5 w-5" />;
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg card-hover border border-border/40 group">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={cn(
            "p-3 rounded-xl transition-all duration-300 group-hover:scale-110", 
            category.color
          )}>
            <div className="text-white">
              {icon}
            </div>
          </div>
          <h2 className="text-xl font-semibold">{category.name}</h2>
        </div>
        <p className="text-muted-foreground mb-6 line-clamp-2">{category.description}</p>
        
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="px-2.5 py-1 text-xs font-medium">
            {category.functions.length} {category.functions.length === 1 ? 'utility' : 'utilities'}
          </Badge>
          
          <div className="flex -space-x-2">
            {[...Array(Math.min(3, category.functions.length))].map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border-2 border-background",
                  i === 0 ? "bg-primary text-primary-foreground" : 
                  i === 1 ? "bg-secondary text-secondary-foreground" : 
                  "bg-muted text-muted-foreground"
                )}
              >
                {category.functions[i]?.name.charAt(0).toUpperCase() || "•"}
              </div>
            ))}
            
            {category.functions.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-background border-2 border-border flex items-center justify-center text-xs font-medium">
                +{category.functions.length - 3}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="outline" className="w-full group overflow-hidden relative">
          <Link href={`/${category.id}`} className="flex justify-between items-center">
            <span className="relative z-10">Explore</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
            <div className="absolute inset-0 bg-primary/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}