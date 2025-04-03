// app/[category]/[function]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getCategoryById, getFunctionById } from "@/lib/tailwind-data";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function FunctionPage() {
  const params = useParams();
  const categoryId = params.category as string;
  const functionId = params.function as string;
  
  const category = getCategoryById(categoryId);
  const func = getFunctionById(categoryId, functionId);

  if (!category || !func) {
    return <div className="container mx-auto px-4 py-8">Function not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      
      <div className="mb-8">
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link href={`/${categoryId}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to {category.name}
          </Link>
        </Button>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{func.name}</h1>
          <p className="text-lg text-muted-foreground mb-4">{func.description}</p>
          <Link href={`/${categoryId}/${functionId}/playground`}>
            <Button className="gap-2">
              <Play className="h-4 w-4" />
              Open Playground
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Examples</h2>
          <div className="space-y-6">
            {func.examples.map((example, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <p className="mb-3 text-muted-foreground">{example.description}</p>
                  <div className="bg-slate-950 rounded-md p-4 overflow-x-auto">
                    <pre className="text-white text-sm">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Variants</h2>
          <Tabs defaultValue={func.variants[0]?.name.toLowerCase() || ""}>
            <TabsList className="mb-4">
              {func.variants.map(variant => (
                <TabsTrigger key={variant.name} value={variant.name.toLowerCase()}>
                  {variant.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {func.variants.map(variant => (
              <TabsContent key={variant.name} value={variant.name.toLowerCase()} className="space-y-4">
                <p className="text-muted-foreground">{variant.description}</p>
                <div className="flex flex-wrap gap-2">
                  {variant.values.map(value => (
                    <Badge key={value} variant="outline">{value}</Badge>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}