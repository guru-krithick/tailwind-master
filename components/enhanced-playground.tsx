// components/enhanced-playground.tsx
"use client";

import { useState, useEffect } from "react";
import { CodeEditor } from "./code-editor";
import { LivePreview } from "./live-preview";
import { Button } from "./ui/button";
import { useTheme } from "next-themes"; // Import useTheme
import {
  Copy,
  Check,
  RefreshCw,
  Download,
  Code,
  FileType,
  Play,
  LayoutGrid,
  Smartphone,
  Laptop,
  Maximize2,
  Minimize2,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { cn } from "@/lib/utils";

interface PlaygroundProps {
  initialCode: {
    html: string;
    css: string;
  };
}

type DeviceView = "responsive" | "phone" | "laptop";

export function EnhancedPlayground({ initialCode }: PlaygroundProps) {
  // State
  const [htmlCode, setHtmlCode] = useState(initialCode.html);
  const [cssCode, setCssCode] = useState(initialCode.css);
  const [compiledCode, setCompiledCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [activeTab, setActiveTab] = useState("html");
  const [deviceView, setDeviceView] = useState<DeviceView>("responsive");
  const [showGrid, setShowGrid] = useState(true);
  const [fullScreenMode, setFullScreenMode] = useState<
    "code" | "preview" | null
  >(null);
  const { theme } = useTheme(); // Get current theme

  // Combine HTML and CSS into a complete document
  function combineCode(html: string, css: string): string {
    return `<!DOCTYPE html>
<html class="${theme || "dark"}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com?v=4.0.0"></script>
  <style>
    /* Base theme tokens for both light and dark modes */
    :root {
      --radius: 0.625rem;
    }
    
    /* Light mode theme */
    html {
      background-color: white;
      color: #111827;
    }
    
    /* Dark mode theme */
    html.dark {
      background-color: #111827;
      color: #f9fafb;
    }
    
    /* Add any additional theme-related styles */
    ${css}
  </style>
</head>
<body class="bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
  ${html}
</body>
</html>`;
  }

  // Update preview when code or theme changes
  useEffect(() => {
    if (autoRefresh || !compiledCode) {
      setCompiledCode(combineCode(htmlCode, cssCode));
    }
  }, [htmlCode, cssCode, autoRefresh, theme]); // Add theme as dependency

  // Handle manual refresh
  const handleRefresh = () => {
    setCompiledCode(combineCode(htmlCode, cssCode));
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    const fullCode = combineCode(htmlCode, cssCode);
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
    const fullCode = combineCode(htmlCode, cssCode);
    const blob = new Blob([fullCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tailwind-project.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Toggle full screen mode
  const toggleFullScreen = (mode: "code" | "preview" | null) => {
    setFullScreenMode(fullScreenMode === mode ? null : mode);
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
            onValueChange={(value) =>
              value && setDeviceView(value as DeviceView)
            }
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
            <Label htmlFor="grid" className="text-xs text-gray-400 ml-1.5">
              Grid
            </Label>
          </div>

          <div className="flex items-center">
            <Switch
              id="auto-refresh"
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
              className="scale-75 data-[state=checked]:bg-blue-600"
            />
            <Label
              htmlFor="auto-refresh"
              className="text-xs text-gray-400 ml-1.5"
            >
              Auto-refresh
            </Label>
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
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 flex-grow overflow-hidden relative">
        {/* Code Editor Panel */}
        <div
          className={cn(
            "border-r border-gray-800 h-full flex flex-col transition-all duration-300 ease-in-out",
            fullScreenMode === "code"
              ? "lg:col-span-2 z-10"
              : fullScreenMode === "preview"
              ? "lg:col-span-0 lg:hidden"
              : "lg:col-span-1"
          )}
        >
          <div className="bg-gray-900 p-1 flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFullScreen("code")}
              className="h-6 w-6 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            >
              {fullScreenMode === "code" ? (
                <Minimize2 className="h-3.5 w-3.5" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" />
              )}
            </Button>
            {fullScreenMode === "code" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFullScreen(null)}
                className="h-6 w-6 ml-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
              >
                <ChevronsRight className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
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
        <div
          className={cn(
            "h-full bg-gray-950 overflow-hidden transition-all duration-300 ease-in-out",
            fullScreenMode === "preview"
              ? "lg:col-span-2 z-10"
              : fullScreenMode === "code"
              ? "lg:col-span-0 lg:hidden"
              : "lg:col-span-1"
          )}
        >
          <div className="bg-gray-900 p-1 flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFullScreen("preview")}
              className="h-6 w-6 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            >
              {fullScreenMode === "preview" ? (
                <Minimize2 className="h-3.5 w-3.5" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" />
              )}
            </Button>
            {fullScreenMode === "preview" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFullScreen(null)}
                className="h-6 w-6 ml-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
              >
                <ChevronsLeft className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
          <div
            className={cn(
              "w-full h-[calc(100%-2rem)]",
              deviceView !== "responsive"
                ? "flex items-center justify-center bg-gray-900/30"
                : ""
            )}
          >
            <div
              className={cn(
                deviceView === "phone"
                  ? "w-[375px] h-[667px] shadow-xl mx-auto border border-gray-800 rounded-lg overflow-hidden"
                  : deviceView === "laptop"
                  ? "w-[1366px] h-[768px] shadow-xl mx-auto scale-[0.6] origin-center border border-gray-800 rounded-lg overflow-hidden"
                  : "w-full h-full"
              )}
            >
              <LivePreview
                code={compiledCode}
                deviceView={deviceView}
                showGrid={showGrid}
                theme={theme || "dark"} // Pass the current theme
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
