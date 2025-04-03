// components/playground.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { CodeEditor } from "./code-editor";
import { LivePreview } from "./live-preview";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { 
  Copy, 
  Check, 
  RefreshCw, 
  Download, 
  Smartphone, 
  Tablet, 
  Laptop, 
  LayoutGrid, 
  Code as CodeIcon,
  Eye
} from "lucide-react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { cn } from "@/lib/utils";
// import { useDebounce } from "@/hooks/use-debounce"; // We'll create this hook

type DeviceView = "responsive" | "phone" | "tablet" | "laptop";
type ViewMode = "split" | "editor" | "preview";

interface PlaygroundProps {
  initialCode: string;
}

// Create a debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function Playground({ initialCode }: PlaygroundProps) {
  // State
  const [editorCode, setEditorCode] = useState(initialCode);
  const [previewCode, setPreviewCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [deviceView, setDeviceView] = useState<DeviceView>("responsive");
  const [showGrid, setShowGrid] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [editorKey, setEditorKey] = useState(Date.now()); // Force re-render when needed
  
  // Use debounce for smoother preview updates
  const debouncedCode = useDebounce(editorCode, autoRefresh ? 300 : 100000);
  
  // Refs
  const codeEditorRef = useRef<any>(null);
  
  // Update preview code when debounced code changes or when manual refresh
  useEffect(() => {
    if (autoRefresh) {
      setPreviewCode(debouncedCode);
    }
  }, [debouncedCode, autoRefresh]);
  
  // Handle copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(editorCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Reset code to initial state
  const resetCode = () => {
    setEditorCode(initialCode);
    setPreviewCode(initialCode);
    // Force editor to refresh
    setEditorKey(Date.now());
  };
  
  // Handle code changes in editor
  const handleCodeChange = (newCode: string) => {
    setEditorCode(newCode);
  };
  
  // Apply changes manually
  const handleApplyChanges = () => {
    setPreviewCode(editorCode);
  };
  
  // Export code as HTML file
  const downloadHTML = () => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <title>TailwindMaster Export</title>
</head>
<body>
  ${editorCode}
</body>
</html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tailwind-export.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Format the code (uses editor API)
  const formatCode = () => {
    if (codeEditorRef.current) {
      codeEditorRef.current.getAction('editor.action.formatDocument')?.run();
    }
  };

  return (
    <div className="flex flex-col">
      {/* Toolbar */}
      <Card className="mb-4 overflow-hidden">
        <CardContent className="p-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Selector */}
            <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as ViewMode)}>
              <ToggleGroupItem value="split" aria-label="Split view">
                <LayoutGrid className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Split</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="editor" aria-label="Editor view">
                <CodeIcon className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Editor</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="preview" aria-label="Preview view">
                <Eye className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Preview</span>
              </ToggleGroupItem>
            </ToggleGroup>
            
            {/* Device View Selector (when in preview mode) */}
            {viewMode !== "editor" && (
              <ToggleGroup 
                type="single" 
                value={deviceView} 
                onValueChange={(value) => value && setDeviceView(value as DeviceView)}
                className="ml-2"
              >
                <ToggleGroupItem value="responsive" aria-label="Responsive view">
                  <LayoutGrid className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="phone" aria-label="Phone view">
                  <Smartphone className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="tablet" aria-label="Tablet view">
                  <Tablet className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="laptop" aria-label="Laptop view">
                  <Laptop className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            )}
            
            {/* Grid Toggle */}
            {viewMode !== "editor" && (
              <div className="flex items-center gap-1 ml-auto">
                <Switch 
                  id="show-grid" 
                  checked={showGrid} 
                  onCheckedChange={setShowGrid}
                  className="data-[state=checked]:bg-primary"
                />
                <Label htmlFor="show-grid" className="text-xs font-medium">Grid</Label>
              </div>
            )}
            
            {/* Auto-Refresh Toggle */}
            {viewMode !== "preview" && (
              <div className="flex items-center gap-1 ml-auto sm:ml-0">
                <Switch 
                  id="auto-refresh" 
                  checked={autoRefresh} 
                  onCheckedChange={setAutoRefresh}
                  className="data-[state=checked]:bg-primary"
                />
                <Label htmlFor="auto-refresh" className="text-xs font-medium">Auto-refresh</Label>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex gap-1 ml-auto">
              {/* Apply Changes Button (shown only when auto-refresh is off) */}
              {!autoRefresh && viewMode !== "preview" && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleApplyChanges}
                  className="h-8 px-2 text-xs"
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1" />
                  Apply
                </Button>
              )}
              
              {/* Format Code Button */}
              {viewMode !== "preview" && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={formatCode}
                  className="h-8 px-2 text-xs"
                >
                  <CodeIcon className="h-3.5 w-3.5 mr-1" />
                  Format
                </Button>
              )}
              
              {/* Reset Button */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetCode}
                className="h-8 px-2 text-xs"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                Reset
              </Button>
              
              {/* Copy Button */}
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
              
              {/* Export Button */}
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
        </CardContent>
      </Card>
      
      {/* Content Area */}
      {viewMode === "split" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-13rem)]">
          {/* Editor */}
          <Card className="overflow-hidden flex flex-col">
            <CardContent className="p-0 flex-grow">
              <CodeEditor 
                key={editorKey}
                value={editorCode} 
                onChange={handleCodeChange} 
                onMount={(editor) => { codeEditorRef.current = editor; }}
              />
            </CardContent>
          </Card>
          
          {/* Preview */}
          <Card className="overflow-hidden">
            <CardContent className={cn(
              "p-0 h-full", 
              deviceView !== "responsive" ? "flex items-center justify-center bg-muted/40" : ""
            )}>
              <div className={cn(
                deviceView === "phone" ? "w-[375px] h-[667px] shadow-xl mx-auto" :
                deviceView === "tablet" ? "w-[768px] h-[1024px] shadow-xl mx-auto scale-75 origin-center" :
                deviceView === "laptop" ? "w-[1366px] h-[768px] shadow-xl mx-auto scale-[0.6] origin-center" : 
                "w-full h-full"
              )}>
                <LivePreview 
                  code={previewCode} 
                  deviceView={deviceView} 
                  showGrid={showGrid} 
                />
              </div>
            </CardContent>
          </Card>
        </div>
      ) : viewMode === "editor" ? (
        <Card className="overflow-hidden h-[calc(100vh-13rem)]">
          <CardContent className="p-0 h-full">
            <CodeEditor 
              key={editorKey}
              value={editorCode} 
              onChange={handleCodeChange} 
              onMount={(editor) => { codeEditorRef.current = editor; }}
            />
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden h-[calc(100vh-13rem)]">
          <CardContent className={cn(
            "p-0 h-full", 
            deviceView !== "responsive" ? "flex items-center justify-center bg-muted/40" : ""
          )}>
            <div className={cn(
              deviceView === "phone" ? "w-[375px] h-[667px] shadow-xl mx-auto" :
              deviceView === "tablet" ? "w-[768px] h-[1024px] shadow-xl mx-auto scale-75 origin-center" :
              deviceView === "laptop" ? "w-[1366px] h-[768px] shadow-xl mx-auto scale-[0.6] origin-center" : 
              "w-full h-full"
            )}>
              <LivePreview 
                code={previewCode} 
                deviceView={deviceView} 
                showGrid={showGrid} 
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}