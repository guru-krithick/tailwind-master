// components/beginner-playground.tsx
"use client";

import { useState, useEffect } from "react";
import { CodeEditor } from "./code-editor";
import { LivePreview } from "./live-preview";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Copy, 
  Check, 
  RefreshCw, 
  Download, 
  Info,
  BookOpen,
  Zap,
  Puzzle,
  MessageSquare,
  Code
} from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { cn } from "@/lib/utils";

interface BeginnerPlaygroundProps {
  initialCode: {
    html: string;
    css: string;
  };
}

export function BeginnerPlayground({ initialCode }: BeginnerPlaygroundProps) {
  // State
  const [htmlCode, setHtmlCode] = useState(initialCode.html);
  const [cssCode, setCssCode] = useState(initialCode.css);
  const [previewCode, setPreviewCode] = useState(combineCode(initialCode.html, initialCode.css));
  const [copied, setCopied] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showTips, setShowTips] = useState(true);
  const [activeTab, setActiveTab] = useState("html");
  
  // Combine HTML and CSS
  function combineCode(html: string, css: string): string {
    if (!css) return html;
    return html.replace("</head>", `<style>${css}</style></head>`);
  }
  
  // Update preview when code changes
  useEffect(() => {
    if (autoRefresh) {
      setPreviewCode(combineCode(htmlCode, cssCode));
    }
  }, [htmlCode, cssCode, autoRefresh]);
  
  // Handle manual refresh
  const handleRefresh = () => {
    setPreviewCode(combineCode(htmlCode, cssCode));
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    const fullCode = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  ${cssCode ? `<style>${cssCode}</style>` : ''}
</head>
<body>
  ${htmlCode}
</body>
</html>`;

    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Reset code
  const resetCode = () => {
    setHtmlCode(initialCode.html);
    setCssCode(initialCode.css);
    setPreviewCode(combineCode(initialCode.html, initialCode.css));
  };
  
  // Export as HTML file
  const downloadHTML = () => {
    const fullCode = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  ${cssCode ? `<style>${cssCode}</style>` : ''}
</head>
<body>
  ${htmlCode}
</body>
</html>`;
    
    const blob = new Blob([fullCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tailwind-project.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Beginner Info Section */}
      {showTips && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Info className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h3 className="text-lg font-medium mb-1">Welcome to TailwindMaster Playground!</h3>
                  <p className="text-muted-foreground mb-3">
                    Edit HTML and CSS using Tailwind classes and see instant results. Perfect for beginners!
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="text-sm">Edit HTML on the left, see changes on the right</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="text-sm">Changes apply automatically as you type</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Puzzle className="h-4 w-4 text-primary" />
                      <span className="text-sm">Use Tailwind CSS classes to style your HTML</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-primary" />
                      <span className="text-sm">Switch between HTML and CSS tabs to edit both</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowTips(false)}
                className="text-xs"
              >
                Hide Tips
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[600px]">
        {/* Editor Section */}
        <div className="flex flex-col h-full">
          <Card className="flex-grow flex flex-col h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Code size={20} />
                  Code Editor
                </CardTitle>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span className="text-xs">Help</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Tailwind CSS Tips</DialogTitle>
                            <DialogDescription>
                              Here are some helpful tips for using Tailwind CSS
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 text-sm">
                            <div>
                              <h3 className="font-medium">Basic Classes:</h3>
                              <ul className="list-disc list-inside pl-2 text-muted-foreground">
                                <li><code>text-blue-500</code> - Sets text color to blue</li>
                                <li><code>bg-gray-100</code> - Sets background color to light gray</li>
                                <li><code>p-4</code> - Adds padding (1rem) on all sides</li>
                                <li><code>m-2</code> - Adds margin (0.5rem) on all sides</li>
                                <li><code>flex</code> - Creates a flexbox container</li>
                              </ul>
                            </div>
                            <div>
                              <h3 className="font-medium">Layout Examples:</h3>
                              <pre className="bg-secondary/30 p-2 rounded-md overflow-x-auto">
                                &lt;div class="flex items-center justify-between"&gt;
                                  &lt;div class="bg-blue-100 p-4 rounded-lg"&gt;...&lt;/div&gt;
                                  &lt;div class="bg-green-100 p-4 rounded-lg"&gt;...&lt;/div&gt;
                                &lt;/div&gt;
                              </pre>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Get help with Tailwind CSS</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <CardDescription>
                <div className="flex items-center justify-between">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-[200px] grid-cols-2">
                      <TabsTrigger value="html" className="text-xs">HTML</TabsTrigger>
                      <TabsTrigger value="css" className="text-xs">CSS</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="flex items-center gap-2">
                    <Switch 
                      id="auto-refresh" 
                      checked={autoRefresh} 
                      onCheckedChange={setAutoRefresh}
                    />
                    <Label htmlFor="auto-refresh" className="text-xs">Auto-refresh</Label>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 flex-grow">
              <div className="h-full">
                {activeTab === "html" ? (
                  <CodeEditor 
                    value={htmlCode} 
                    onChange={setHtmlCode}
                    language="html"
                  />
                ) : (
                  <CodeEditor 
                    value={cssCode} 
                    onChange={setCssCode}
                    language="css"
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Preview Section */}
        <div className="flex flex-col h-full">
          <Card className="flex-grow flex flex-col h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Live Preview</CardTitle>
                <div className="flex items-center gap-2">
                  {!autoRefresh && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleRefresh}
                      className="h-8 px-2 text-xs"
                    >
                      <RefreshCw className="h-3.5 w-3.5 mr-1" />
                      Refresh
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetCode}
                    className="h-8 px-2 text-xs"
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    Reset
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={copyToClipboard}
                    className="h-8 px-2 text-xs"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={downloadHTML}
                    className="h-8 px-2 text-xs"
                  >
                    <Download className="h-3.5 w-3.5 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
              <CardDescription>
                See your Tailwind CSS design come to life
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 bg-white dark:bg-gray-950 flex-grow relative">
              <div className="absolute inset-0 border border-dashed border-gray-200 dark:border-gray-800 rounded-b-lg overflow-hidden">
                <LivePreview code={previewCode} showGrid={true} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Code Explanation Section (Beginner-friendly feature) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Understanding Your Code</CardTitle>
          <CardDescription>
            Learn what each part of your Tailwind code does
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Common Tailwind Classes Used:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                <div className="bg-secondary/20 p-2 rounded-md text-xs">
                  <code className="font-bold">flex</code>
                  <p className="text-muted-foreground mt-1">Creates a flexible box layout</p>
                </div>
                <div className="bg-secondary/20 p-2 rounded-md text-xs">
                  <code className="font-bold">items-center</code>
                  <p className="text-muted-foreground mt-1">Centers items vertically</p>
                </div>
                <div className="bg-secondary/20 p-2 rounded-md text-xs">
                  <code className="font-bold">justify-between</code>
                  <p className="text-muted-foreground mt-1">Spaces items evenly horizontally</p>
                </div>
                <div className="bg-secondary/20 p-2 rounded-md text-xs">
                  <code className="font-bold">p-4</code>
                  <p className="text-muted-foreground mt-1">Adds padding (1rem) to all sides</p>
                </div>
                <div className="bg-secondary/20 p-2 rounded-md text-xs">
                  <code className="font-bold">rounded-lg</code>
                  <p className="text-muted-foreground mt-1">Adds rounded corners (large)</p>
                </div>
                <div className="bg-secondary/20 p-2 rounded-md text-xs">
                  <code className="font-bold">text-sm</code>
                  <p className="text-muted-foreground mt-1">Sets font size to small</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <Button variant="outline" asChild>
                <a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Open Tailwind CSS Documentation
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}