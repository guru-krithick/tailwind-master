// app/[category]/[function]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getCategoryById, getFunctionById } from "@/lib/tailwind-data";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  Play, 
  Copy, 
  Check, 
  Code,
  ArrowRight,
  FileCode,
  Palette,
  ExternalLink,
  Info
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function FunctionPage() {
  const params = useParams();
  const categoryId = params.category as string;
  const functionId = params.function as string;
  
  const category = getCategoryById(categoryId);
  const func = getFunctionById(categoryId, functionId);
  
  const [copiedExampleIndex, setCopiedExampleIndex] = useState<number | null>(null);
  
  // Save to recent categories in localStorage
  useEffect(() => {
    if (category) {
      try {
        const stored = localStorage.getItem('recentCategories') || '[]';
        const recentCategories = JSON.parse(stored) as string[];
        
        // Remove if already exists and add to beginning
        const newRecent = [
          category.id,
          ...recentCategories.filter(id => id !== category.id)
        ].slice(0, 5); // Keep only 5 most recent
        
        localStorage.setItem('recentCategories', JSON.stringify(newRecent));
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    }
  }, [category]);
  
  // Copy example code to clipboard
  const copyExampleCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedExampleIndex(index);
    setTimeout(() => setCopiedExampleIndex(null), 2000);
  };

  if (!category || !func) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-destructive">Function not found</CardTitle>
              <CardDescription>
                The requested Tailwind utility function could not be found.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Top Navigation */}
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm" className="mb-4 gap-1 text-muted-foreground">
            <Link href={`/${categoryId}`}>
              <ChevronLeft className="h-4 w-4" />
              Back to {category.name}
            </Link>
          </Button>
        </div>
        
        {/* Function Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-3">
              <div className={cn("p-2.5 rounded-md", category.color)}>
                <div className="text-white">
                  <Code className="h-4 w-4" />
                </div>
              </div>
              <h1 className="text-3xl font-bold">{func.name}</h1>
            </div>
            
            <p className="text-lg text-muted-foreground mb-4 max-w-2xl">
              {func.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="gap-1 px-2 py-1">
                <Palette className="h-3 w-3" />
                {category.name}
              </Badge>
              
              {func.variants.length > 0 && (
                <Badge variant="outline" className="gap-1 px-2 py-1">
                  {func.variants.length} {func.variants.length === 1 ? 'variant' : 'variants'}
                </Badge>
              )}
              
              {func.examples.length > 0 && (
                <Badge variant="outline" className="gap-1 px-2 py-1">
                  {func.examples.length} {func.examples.length === 1 ? 'example' : 'examples'}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button asChild variant="outline" className="gap-2">
              <a 
                href={`https://tailwindcss.com/docs/guides/${func.id}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                Official Docs
              </a>
            </Button>
            
            <Button asChild className="gap-2">
              <Link href={`/${categoryId}/${functionId}/playground`}>
                <Play className="h-4 w-4" />
                Open Playground
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Usage Alert */}
        {func.examples.length > 0 && (
          <Alert className="mb-8 bg-primary/5 border-primary/20">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription className="text-sm">
              Basic usage: <code className="px-1.5 py-0.5 bg-primary/10 rounded text-primary font-mono text-xs">{func.examples[0].code}</code>
            </AlertDescription>
          </Alert>
        )}
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Examples */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileCode className="h-5 w-5 text-muted-foreground" />
                Examples
              </h2>
              
              <div className="space-y-6">
                {func.examples.map((example, index) => (
                  <Card key={index} className="overflow-hidden border border-border/60 group">
                    <CardHeader className="bg-secondary/30 border-b border-border/50 py-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          {example.description}
                        </CardTitle>
                        
                        <div className="flex gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => copyExampleCode(example.code, index)}
                                >
                                  {copiedExampleIndex === index ? (
                                    <Check className="h-3.5 w-3.5 text-green-500" />
                                  ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">
                                  {copiedExampleIndex === index ? 'Copied!' : 'Copy code'}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                                  asChild
                                >
                                  <Link href={`/${categoryId}/${functionId}/playground?code=${encodeURIComponent(example.code)}`}>
                                    <Play className="h-3.5 w-3.5" />
                                  </Link>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">Try in playground</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="overflow-x-auto">
                          <pre className="text-sm p-4 pb-12 bg-secondary/10 w-full">
                            <code>{example.code}</code>
                          </pre>
                        </div>
                        
                        <div className="absolute bottom-0 right-0 p-2">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            asChild 
                            className="h-7 gap-1 text-xs opacity-80 hover:opacity-100"
                          >
                            <Link href={`/${categoryId}/${functionId}/playground?code=${encodeURIComponent(example.code)}`}>
                              <span>Edit in playground</span>
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Live Preview Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="p-6 border rounded-lg bg-white dark:bg-gray-950">
                    {/* Insert live preview component here */}
                    <div className="flex justify-center items-center min-h-[200px]">
                      <div>
                        <p className="text-center text-muted-foreground mb-3">
                          Try the {func.name} utility with different values
                        </p>
                        <div className="flex justify-center">
                          <Button asChild>
                            <Link href={`/${categoryId}/${functionId}/playground`}>
                              <Play className="h-4 w-4 mr-2" />
                              Open Interactive Playground
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Right Column - Variants & Reference */}
          <div className="lg:col-span-1 space-y-8">
            {/* Variants */}
            {func.variants.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Variants</h2>
                <Card>
                  <Tabs defaultValue={func.variants[0]?.name.toLowerCase() || ""}>
                    <TabsList className="w-full mb-1 p-1">
                      {func.variants.map(variant => (
                        <TabsTrigger 
                          key={variant.name} 
                          value={variant.name.toLowerCase()}
                          className="text-xs"
                        >
                          {variant.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {func.variants.map(variant => (
                      <TabsContent 
                        key={variant.name} 
                        value={variant.name.toLowerCase()} 
                        className="p-4 pt-3"
                      >
                        <p className="text-muted-foreground mb-3 text-sm">
                          {variant.description}
                        </p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                          {variant.values.map(value => (
                            <Badge 
                              key={value} 
                              variant="outline" 
                              className="justify-center py-1.5 px-2"
                            >
                              {value}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="mt-4 pt-3 border-t">
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="example" className="border-none">
                              <AccordionTrigger className="py-2 text-sm">
                                Usage example
                              </AccordionTrigger>
                              <AccordionContent>
                                <pre className="text-xs bg-secondary/20 p-2 rounded-md overflow-x-auto">
                                  <code>{`<div class="${func.name.toLowerCase()}-${variant.values[0]}">${variant.name}: ${variant.values[0]}</div>`}</code>
                                </pre>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </Card>
              </div>
            )}
            
            {/* Reference & Tips */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Tips & Reference</h2>
              <Card>
                <CardContent className="p-4 pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="responsive" className="border-b">
                      <AccordionTrigger className="py-3 text-sm">
                        Responsive Variants
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-2 text-sm">
                          All utilities support responsive variants:
                        </p>
                        <pre className="text-xs bg-secondary/20 p-2 rounded-md overflow-x-auto">
                          <code>{`<div class="sm:${func.name.toLowerCase()}-${func.variants[0]?.values[0] || 'value'} 
  md:${func.name.toLowerCase()}-${func.variants[0]?.values[1] || 'other-value'}">
  Responsive ${func.name}
</div>`}</code>
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="hover" className="border-b">
                      <AccordionTrigger className="py-3 text-sm">
                        Hover & Focus States
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-2 text-sm">
                          Add interactive states to your utilities:
                        </p>
                        <pre className="text-xs bg-secondary/20 p-2 rounded-md overflow-x-auto">
                          <code>{`<div class="hover:${func.name.toLowerCase()}-${func.variants[0]?.values[0] || 'value'} 
  focus:${func.name.toLowerCase()}-${func.variants[0]?.values[1] || 'other-value'}">
  Interactive ${func.name}
</div>`}</code>
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="dark" className="border-b">
                      <AccordionTrigger className="py-3 text-sm">
                        Dark Mode
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground mb-2 text-sm">
                          Apply different styles in dark mode:
                        </p>
                        <pre className="text-xs bg-secondary/20 p-2 rounded-md overflow-x-auto">
                          <code>{`<div class="${func.name.toLowerCase()}-${func.variants[0]?.values[0] || 'value'} 
  dark:${func.name.toLowerCase()}-${func.variants[0]?.values[1] || 'other-value'}">
  Dark Mode ${func.name}
</div>`}</code>
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <div className="mt-4 pt-2">
                    <Button asChild variant="outline" className="w-full gap-1.5 text-sm">
                      <Link href={`/${categoryId}/${functionId}/playground`}>
                        <Play className="h-4 w-4" />
                        Experiment in Playground
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Related Functions */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Related Functions</h2>
              <Card>
                <CardContent className="p-4 pt-6">
                  <div className="space-y-2">
                    {category.functions
                      .filter(f => f.id !== func.id)
                      .slice(0, 5)
                      .map(relatedFunc => (
                        <Button 
                          key={relatedFunc.id} 
                          asChild 
                          variant="ghost" 
                          className="w-full justify-start h-auto py-2"
                        >
                          <Link href={`/${categoryId}/${relatedFunc.id}`}>
                            <div className="flex flex-col items-start">
                              <span>{relatedFunc.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {relatedFunc.description.substring(0, 60)}...
                              </span>
                            </div>
                          </Link>
                        </Button>
                      ))}
                    
                    {category.functions.length > 6 && (
                      <Button 
                        asChild 
                        variant="outline" 
                        className="w-full mt-2 text-xs"
                      >
                        <Link href={`/${categoryId}`}>
                          View all {category.name} utilities
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            TailwindMaster - Interactive documentation for Tailwind CSS v4
          </p>
        </div>
      </footer>
    </div>
  );
}