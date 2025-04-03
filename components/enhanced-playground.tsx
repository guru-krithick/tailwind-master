// components/enhanced-playground.tsx - Fixed unused compiledCode variable
"use client";

import { useState, useEffect } from "react";
import { CodeEditor } from "./code-editor";
import { LivePreview } from "./live-preview";
import { Button } from "./ui/button";
import { 
  Copy, 
  Check, 
  RefreshCw, 
  Download, 
  Code,
  FileType,
  Play,
  HelpCircle,
  LayoutGrid,
  Smartphone,
  Tablet,
  Laptop
} from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { cn } from "@/lib/utils";

interface PlaygroundProps {
  initialCode: {
    html: string;
    css: string;
  };
}

type DeviceView = "responsive" | "phone" | "tablet" | "laptop";

export function EnhancedPlayground({ initialCode }: PlaygroundProps) {
  // State
  const [htmlCode, setHtmlCode] = useState(initialCode.html);
  const [cssCode, setCssCode] = useState(initialCode.css);
  const [compiledCode, setCompiledCode] = useState(combineCode(initialCode.html, initialCode.css));
  const [copied, setCopied] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [activeTab, setActiveTab] = useState("html");
  const [deviceView, setDeviceView] = useState<DeviceView>("responsive");
  const [showGrid, setShowGrid] = useState(true);
  
  // Combine HTML and CSS
  function combineCode(html: string, css: string): string {
    if (!css) return html;
    return html.replace("</head>", `<style>${css}</style></head>`);
  }
  
  // Update preview when code changes
  useEffect(() => {
    if (autoRefresh) {
      setCompiledCode(combineCode(htmlCode, cssCode));
    }
  }, [htmlCode, cssCode, autoRefresh]);
  
  // Handle manual refresh
  const handleRefresh = () => {
    setCompiledCode(combineCode(htmlCode, cssCode));
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    const fullCode = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com?v=4.0.0"></script>
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
    setCompiledCode(combineCode(initialCode.html, initialCode.css));
  };
  
  // Export as HTML file
  const downloadHTML = () => {
    const fullCode = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com?v=4.0.0"></script>
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
    <div className="bg-gray-950 text-white border border-gray-800 rounded-lg overflow-hidden flex flex-col h-full">
      {/* Main Toolbar */}
      <div className="border-b border-gray-800 bg-gray-900 flex items-center justify-between p-2 gap-2">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-md bg-gray-800 border border-gray-700 text-gray-400"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>

          <div className="border-r border-gray-700 h-6 mx-1"></div>
          
          <div className="flex bg-gray-800 border border-gray-700 rounded-md p-0.5">
            <Button 
              variant={activeTab === "html" ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-7 px-3 rounded-sm text-xs",
                activeTab === "html" 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              )}
              onClick={() => setActiveTab("html")}
            >
              <Code className="h-3.5 w-3.5 mr-1.5" />
              HTML
            </Button>
            <Button 
              variant={activeTab === "css" ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-7 px-3 rounded-sm text-xs",
                activeTab === "css" 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              )}
              onClick={() => setActiveTab("css")}
            >
              <FileType className="h-3.5 w-3.5 mr-1.5" />
              CSS
            </Button>
          </div>
          
          <div className="border-r border-gray-700 h-6 mx-1"></div>
          
          <ToggleGroup 
            type="single" 
            value={deviceView} 
            onValueChange={(value) => value && setDeviceView(value as DeviceView)}
            className="bg-gray-800 border border-gray-700 rounded-md p-0.5"
          >
            <ToggleGroupItem 
              value="responsive" 
              className={cn(
                "h-7 w-7 rounded-sm",
                deviceView === "responsive" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="phone" 
              className={cn(
                "h-7 w-7 rounded-sm",
                deviceView === "phone" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              )}
            >
              <Smartphone className="h-3.5 w-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="tablet" 
              className={cn(
                "h-7 w-7 rounded-sm",
                deviceView === "tablet" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              )}
            >
              <Tablet className="h-3.5 w-3.5" />
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="laptop" 
              className={cn(
                "h-7 w-7 rounded-sm",
                deviceView === "laptop" 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              )}
            >
              <Laptop className="h-3.5 w-3.5" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="flex items-center gap-1.5">
          <div className="flex items-center">
            <Switch 
              id="grid" 
              checked={showGrid} 
              onCheckedChange={setShowGrid}
              className="scale-75 data-[state=checked]:bg-blue-600"
            />
            <Label htmlFor="grid" className="text-xs text-gray-400 ml-1.5">Grid</Label>
          </div>
          
          <div className="flex items-center">
            <Switch 
              id="auto-refresh" 
              checked={autoRefresh} 
              onCheckedChange={setAutoRefresh}
              className="scale-75 data-[state=checked]:bg-blue-600"
            />
            <Label htmlFor="auto-refresh" className="text-xs text-gray-400 ml-1.5">Auto-refresh</Label>
          </div>
          
          {!autoRefresh && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              className="h-7 px-2 text-xs bg-gray-800 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700 hover:border-gray-600"
            >
              <Play className="h-3.5 w-3.5 mr-1" />
              Run
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetCode}
            className="h-7 px-2 text-xs bg-gray-800 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700 hover:border-gray-600"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            Reset
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={copyToClipboard}
            className="h-7 px-2 text-xs bg-gray-800 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700 hover:border-gray-600"
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
            className="h-7 px-2 text-xs bg-gray-800 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700 hover:border-gray-600"
          >
            <Download className="h-3.5 w-3.5 mr-1" />
            Export
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-7 w-7 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Tailwind v4 Tips</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Quick reference for Tailwind CSS v4
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium text-gray-200">New in Tailwind v4:</h3>
                  <ul className="list-disc list-inside pl-2 text-gray-400">
                    <li><code className="bg-gray-800 px-1 rounded text-blue-400">@layer inline</code> - Type-safe OKLCH colors</li>
                    <li><code className="bg-gray-800 px-1 rounded text-blue-400">@custom-variant</code> - Create custom variants</li>
                    <li><code className="bg-gray-800 px-1 rounded text-blue-400">@keyframes</code> - Define animations directly in CSS</li>
                    <li><code className="bg-gray-800 px-1 rounded text-blue-400">text-balance</code> - Improved text balance property</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-200">Color Examples:</h3>
                  <ul className="list-disc list-inside pl-2 text-gray-400">
                    <li><code className="bg-gray-800 px-1 rounded text-blue-400">bg-blue-500</code> - Blue background (new OKLCH colors)</li>
                    <li><code className="bg-gray-800 px-1 rounded text-blue-400">text-primary</code> - Primary text color</li>
                    <li><code className="bg-gray-800 px-1 rounded text-blue-400">border-[#hex]</code> - Custom border color</li>
                  </ul>
                </div>
                <div className="border-t border-gray-800 pt-3">
                  <Button className="w-full" variant="default" asChild>
                    <a 
                      href="https://tailwindcss.com/docs" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Visit Tailwind v4 Documentation
                    </a>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 flex-grow overflow-hidden">
        {/* Code Editor Panel */}
        <div className="border-r border-gray-800 h-full flex flex-col">
          <div className="flex-grow overflow-hidden">
            {activeTab === "html" ? (
              <CodeEditor 
                value={htmlCode} 
                onChange={setHtmlCode}
                language="html"
                theme="vs-dark"
                height="100%"
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  padding: { top: 16 },
                  lineNumbers: "on",
                  glyphMargin: false,
                  folding: true,
                  lineDecorationsWidth: 0,
                  lineNumbersMinChars: 3,
                  suggest: { snippetsPreventQuickSuggestions: false },
                }}
              />
            ) : (
              <CodeEditor 
                value={cssCode} 
                onChange={setCssCode}
                language="css"
                theme="vs-dark"
                height="100%"
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  padding: { top: 16 },
                  lineNumbers: "on",
                  glyphMargin: false,
                  folding: true,
                  lineDecorationsWidth: 0,
                  lineNumbersMinChars: 3,
                }}
              />
            )}
          </div>
        </div>
        
        {/* Live Preview Panel */}
        <div className="h-full bg-gray-950 overflow-hidden">
          <div className={cn(
            "w-full h-full", 
            deviceView !== "responsive" ? "flex items-center justify-center bg-gray-900/30" : ""
          )}>
            <div className={cn(
              deviceView === "phone" ? "w-[375px] h-[667px] shadow-xl mx-auto border border-gray-800 rounded-lg overflow-hidden" :
              deviceView === "tablet" ? "w-[768px] h-[1024px] shadow-xl mx-auto scale-75 origin-center border border-gray-800 rounded-lg overflow-hidden" :
              deviceView === "laptop" ? "w-[1366px] h-[768px] shadow-xl mx-auto scale-[0.6] origin-center border border-gray-800 rounded-lg overflow-hidden" : 
              "w-full h-full"
            )}>
              <LivePreview 
                code={compiledCode}
                deviceView={deviceView}
                showGrid={showGrid}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}