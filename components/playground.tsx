// components/playground.tsx
"use client";

import { useState, useEffect } from "react";
import { CodeEditor } from "./code-editor";
import { LivePreview } from "./live-preview";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Copy, Check, RefreshCw } from "lucide-react";

interface PlaygroundProps {
  initialCode: string;
}

export function Playground({ initialCode }: PlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetCode = () => {
    setCode(initialCode);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium">Code Editor</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" /> Copy
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={resetCode}>
              <RefreshCw className="h-4 w-4 mr-1" /> Reset
            </Button>
          </div>
        </div>
        <Card className="flex-1 overflow-hidden">
          <CodeEditor value={code} onChange={setCode} />
        </Card>
      </div>
      
      <div className="flex flex-col h-full">
        <h2 className="text-lg font-medium mb-2">Preview</h2>
        <Card className="flex-1 p-6 overflow-auto">
          <LivePreview code={code} />
        </Card>
      </div>
    </div>
  );
}