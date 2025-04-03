// components/playground.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { CodeEditor } from "./code-editor";
import { LivePreview } from "./live-preview";
import { Button } from "./ui/button";
import { useTheme } from "next-themes"; // Import useTheme
import { 
  Copy, 
  Check, 
  RefreshCw, 
  Download,
  Code as CodeIcon,
  Eye,
  Info,
  X
} from "lucide-react";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";

interface PlaygroundProps {
  initialCode: string;
  initialCss?: string;
}

export function Playground({ initialCode, initialCss = "" }: PlaygroundProps) {
  // State for code and editor
  const [htmlCode, setHtmlCode] = useState(initialCode);
  const [cssCode, setCssCode] = useState(initialCss);
  const [currentTab, setCurrentTab] = useState<"html" | "css">("html");
  const [copied, setCopied] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showTips, setShowTips] = useState(true);
  const { theme } = useTheme(); // Get current theme
  
  // References for calculating heights
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  
  // State for preview
  const [previewHtml, setPreviewHtml] = useState(initialCode);
  const [previewCss, setPreviewCss] = useState(initialCss);
  
  // Update preview when code changes (if auto-refresh is enabled)
  useEffect(() => {
    if (autoRefresh) {
      setPreviewHtml(htmlCode);
      setPreviewCss(cssCode);
    }
  }, [htmlCode, cssCode, autoRefresh]);
  
  // Handle manual refresh
  const handleRefresh = () => {
    setPreviewHtml(htmlCode);
    setPreviewCss(cssCode);
  };
  
  // Reset code to initial values
  const resetCode = () => {
    setHtmlCode(initialCode);
    setCssCode(initialCss);
    setPreviewHtml(initialCode);
    setPreviewCss(initialCss);
  };
  
  // Copy to clipboard
  const copyToClipboard = () => {
    const fullCode = `<!DOCTYPE html>
<html class="${theme || 'dark'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com?v=4.1.1"></script>
  <style>
${cssCode}
  </style>
</head>
<body class="bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
  ${htmlCode}
</body>
</html>`;

    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Export as HTML file
  const downloadHTML = () => {
    const fullCode = `<!DOCTYPE html>
<html class="${theme || 'dark'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com?v=4.1.1"></script>
  <style>
${cssCode}
  </style>
</head>
<body class="bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
  ${htmlCode}
</body>
</html>`;
    
    const blob = new Blob([fullCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tailwind-playground.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div ref={containerRef} className="h-full flex flex-col">
      {/* Tips Banner (can be hidden) */}
      {showTips && (
        <div className="bg-blue-950/40 border border-blue-800/50 rounded-lg mb-4 px-4 py-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-base font-medium mb-1">Welcome to TailwindMaster Playground!</h3>
                <p className="text-gray-400 text-sm mb-2">
                  Edit HTML and CSS using Tailwind classes and see instant results.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <CodeIcon className="h-4 w-4 text-blue-400" />
                    <span>Edit HTML/CSS on the left, see changes on the right</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-blue-400" />
                    <span>Changes apply automatically as you type</span>
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
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow">
        {/* Editor Section */}
        <div className="flex flex-col border border-gray-800 rounded-lg overflow-hidden bg-gray-950">
          {/* Editor Header */}
          <div className="border-b border-gray-800 flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <Button
                variant={currentTab === "html" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentTab("html")}
                className="h-8 gap-1"
              >
                <CodeIcon className="h-3.5 w-3.5" />
                <span>HTML</span>
              </Button>
              <Button
                variant={currentTab === "css" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentTab("css")}
                className="h-8 gap-1"
              >
                <CodeIcon className="h-3.5 w-3.5" />
                <span>CSS</span>
              </Button>
              <Badge variant="outline" className="text-xs ml-2">
                Tailwind v4.1.1
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Switch 
                id="auto-refresh" 
                checked={autoRefresh} 
                onCheckedChange={setAutoRefresh}
                className="data-[state=checked]:bg-blue-600"
              />
              <label htmlFor="auto-refresh" className="text-xs text-gray-400">
                Auto-refresh
              </label>
            </div>
          </div>
          
          {/* Editor Content */}
          <div ref={editorRef} className="flex-grow relative">
            {currentTab === "html" ? (
              <div className="absolute inset-0">
                <CodeEditor 
                  value={htmlCode} 
                  onChange={setHtmlCode} 
                  language="html"
                />
              </div>
            ) : (
              <div className="absolute inset-0">
                <CodeEditor 
                  value={cssCode} 
                  onChange={setCssCode} 
                  language="css"
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Preview Section */}
        <div className="flex flex-col border border-gray-800 rounded-lg overflow-hidden bg-gray-950">
          {/* Preview Header */}
          <div className="border-b border-gray-800 flex items-center justify-between p-2">
            <h2 className="text-sm font-medium flex items-center gap-2">
              <Eye className="h-4 w-4 text-gray-400" />
              Live Preview
            </h2>
            
            <div className="flex items-center gap-1">
              {!autoRefresh && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh}
                  className="h-7"
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1" />
                  Refresh
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetCode}
                className="h-7"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                Reset
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyToClipboard}
                className="h-7"
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
                className="h-7"
              >
                <Download className="h-3.5 w-3.5 mr-1" />
                Export
              </Button>
            </div>
          </div>
          
          {/* Preview Content */}
          <div className="flex-grow">
            <LivePreview 
              code={previewHtml} 
              cssCode={previewCss}
              showGrid={true}
              theme={theme || "dark"} // Pass the current theme
            />
          </div>
        </div>
      </div>
    </div>
  );
}