// components/category-card.tsx
import Link from "next/link";
import { TailwindCategory } from "@/lib/tailwind-data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Layout, Type, MoveHorizontal, Palette, Zap } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "layout": <Layout className="h-5 w-5" />,
  "type": <Type className="h-5 w-5" />,
  "move-horizontal": <MoveHorizontal className="h-5 w-5" />,
  "palette": <Palette className="h-5 w-5" />,
  "zap": <Zap className="h-5 w-5" />,
};

interface CategoryCardProps {
  category: TailwindCategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const icon = iconMap[category.icon] || <Layout className="h-5 w-5" />;
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-md ${category.color}`}>
            <div className="text-white">
              {icon}
            </div>
          </div>
          <h2 className="text-xl font-semibold">{category.name}</h2>
        </div>
        <p className="text-muted-foreground mb-4">{category.description}</p>
        <p className="text-sm text-muted-foreground">
          {category.functions.length} function{category.functions.length !== 1 ? 's' : ''}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="outline" className="w-full group">
          <Link href={`/${category.id}`} className="flex justify-between items-center">
            <span>Explore</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}