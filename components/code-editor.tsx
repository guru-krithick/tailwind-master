// components/code-editor.tsx
"use client";
import { useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Avoid hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-96 bg-slate-100 dark:bg-slate-900 rounded-md"></div>
    );
  }

  return (
    <Editor
      height="500px"
      defaultLanguage="html"
      value={value}
      onChange={(val) => onChange(val || "")}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        tabSize: 2,
        automaticLayout: true,
        wordWrap: "on",
        lineNumbers: "on",
      }}
    />
  );
}