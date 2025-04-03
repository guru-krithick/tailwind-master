// components/streamlined-playground.tsx
"use client";

import { useState, useEffect } from "react";
import { CodeEditor } from "./code-editor";
import { LivePreview } from "./live-preview";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Copy, 
  Check, 
  RefreshCw, 
  Download, 
  Code,
  Eye,
  BookOpen,
  Info,
  X,
  HelpCircle
} from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface StreamlinedPlaygroundProps {
  initialCode: {
    html: string;
  };
}

export function StreamlinedPlayground({ initialCode }: StreamlinedPlaygroundProps) {
  // State
  const [htmlCode, setHtmlCode] = useState(initialCode.html);
  const [previewCode, setPreviewCode] = useState(initialCode.html);
  const [copied, setCopied] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showTips, setShowTips] = useState(true);
  const [editorHeight, setEditorHeight] = useState('calc(100vh - 220px)');
  
  // Update preview when code changes
  useEffect(() => {
    if (autoRefresh) {
      setPreviewCode(htmlCode);
    }
  }, [htmlCode, autoRefresh]);
  
  // Handle window resize to adjust editor height
  useEffect(() => {
    const handleResize = () => {
      // Adjust height to fit available space
      setEditorHeight(`calc(100vh - 220px)`);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial height
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Handle manual refresh
  const handleRefresh = () => {
    setPreviewCode(htmlCode);
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    const fullCode = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
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
    setPreviewCode(initialCode.html);
  };
  
  // Export as HTML file
  const downloadHTML = () => {
    const fullCode = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
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
    <div className="flex flex-col h-full space-y-4">
      {/* Tips banner (collapsible) */}
      {showTips && (
        <Card className="bg-blue-950/40 border-blue-800/50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="flex-grow">
                  <h3 className="text-base font-medium mb-1">Welcome to TailwindMaster Playground!</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    Edit HTML and CSS using Tailwind classes and see instant results. Perfect for beginners!
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-blue-400" />
                      <span className="text-xs">Edit HTML on the left, see changes on the right</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-400" />
                      <span className="text-xs">Changes apply automatically as you type</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowTips(false)}
                className="h-6 w-6 rounded-full"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow h-full">
        {/* Editor Section */}
        <Card className="flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <div className="flex items-center">
              <Code className="h-5 w-5 mr-2" />
              <h2 className="font-medium">Code Editor</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Switch 
                  id="auto-refresh" 
                  checked={autoRefresh} 
                  onCheckedChange={setAutoRefresh}
                  className="scale-75"
                />
                <Label htmlFor="auto-refresh" className="text-xs ml-1.5">Auto-refresh</Label>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tailwind CSS Help</DialogTitle>
                    <DialogDescription>
                      Quick reference for common Tailwind classes
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h3 className="font-medium">Layout:</h3>
                      <ul className="list-disc list-inside pl-2 text-muted-foreground">
                        <li><code className="bg-gray-100 dark:bg-gray-800 px-1">flex</code> - Flexbox container</li>
                        <li><code className="bg-gray-100 dark:bg-gray-800 px-1">grid</code> - Grid container</li>
                        <li><code className="bg-gray-100 dark:bg-gray-800 px-1">hidden</code> - Hide element</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium">Spacing:</h3>
                      <ul className="list-disc list-inside pl-2 text-muted-foreground">
                        <li><code className="bg-gray-100 dark:bg-gray-800 px-1">p-4</code> - Padding (1rem)</li>
                        <li><code className="bg-gray-100 dark:bg-gray-800 px-1">m-2</code> - Margin (0.5rem)</li>
                        <li><code className="bg-gray-100 dark:bg-gray-800 px-1">space-x-2</code> - Horizontal spacing</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium">Colors:</h3>
                      <ul className="list-disc list-inside pl-2 text-muted-foreground">
                        <li><code className="bg-gray-100 dark:bg-gray-800 px-1">text-blue-500</code> - Text color</li>
                        <li><code className="bg-gray-100 dark:bg-gray-800 px-1">bg-gray-100</code> - Background color</li>
                      </ul>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="flex-grow overflow-hidden">
            <CodeEditor 
              value={htmlCode} 
              onChange={setHtmlCode}
              height={editorHeight}
            />
          </div>
        </Card>
        
        {/* Preview Section */}
        <Card className="flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <div className="flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              <h2 className="font-medium">Live Preview</h2>
            </div>
            <div className="flex items-center gap-1">
              {!autoRefresh && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh}
                  className="h-7 px-2 text-xs"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Refresh
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetCode}
                className="h-7 px-2 text-xs"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Reset
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyToClipboard}
                className="h-7 px-2 text-xs"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={downloadHTML}
                className="h-7 px-2 text-xs"
              >
                <Download className="h-3 w-3 mr-1" />
                Export
              </Button>
            </div>
          </div>
          <div className="flex-grow bg-white dark:bg-gray-950 overflow-hidden">
            <LivePreview 
              code={previewCode} 
              showGrid={true} 
              height={editorHeight}
            />
          </div>
        </Card>
      </div>

      {/* Learning Resources (Collapsible) */}
      <Collapsible className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <h3 className="text-sm font-medium">Tailwind CSS Quick Reference</h3>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              <span>Show Resources</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="mt-2">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Layout & Flexbox</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1">flex</code> - Display: flex</li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1">items-center</code> - Align-items: center</li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1">justify-between</code> - Space between</li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1">gap-4</code> - Gap: 1rem</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Typography & Colors</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1">text-lg</code> - Font-size: 1.125rem</li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1">font-bold</code> - Font-weight: 700</li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1">text-blue-600</code> - Text color</li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1">bg-gray-100</code> - Background color</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Sizing & Spacing</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1">w-full</code> - Width: 100%</li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1">h-screen</code> - Height: 100vh</li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1">p-4</code> - Padding: 1rem</li>
                    <li><code className="bg-gray-100 dark:bg-gray-800 px-1">m-2</code> - Margin: 0.5rem</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-center mt-4">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer" className="text-xs">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Open Full Documentation
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}