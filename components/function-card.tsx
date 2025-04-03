// components/function-card.tsx
import Link from "next/link";
import { TailwindFunction } from "@/lib/tailwind-data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FunctionCardProps {
  func: TailwindFunction;
  categoryId: string;
}

export default function FunctionCard({ func, categoryId }: FunctionCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-3">{func.name}</h2>
        <p className="text-muted-foreground mb-4">{func.description}</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <div className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md">
            {func.variants.length} variant{func.variants.length !== 1 ? 's' : ''}
          </div>
          <div className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md">
            {func.examples.length} example{func.examples.length !== 1 ? 's' : ''}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/${categoryId}/${func.id}`} className="flex justify-between items-center">
            <span>View details</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}