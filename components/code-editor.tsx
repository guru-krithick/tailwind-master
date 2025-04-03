// components/code-editor.tsx
"use client";

import { useEffect, useState } from "react";
import { Editor, OnMount } from "@monaco-editor/react";
import { loader } from "@monaco-editor/react";

// Configure Monaco Editor CDN path
loader.config({
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.39.0/min/vs"
  }
});

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onMount?: OnMount;
  language?: string;
  height?: string;
}

export function CodeEditor({ 
  value, 
  onChange, 
  onMount,
  language = "html",
  height = "100%"
}: CodeEditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState<"vs-dark" | "vs-light">("vs-dark");
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [editorLoadError, setEditorLoadError] = useState<string | null>(null);

  // Check for dark mode
  useEffect(() => {
    setIsMounted(true);
    
    // Check if dark mode is enabled
    const isDarkMode = document.documentElement.classList.contains('dark');
    setTheme(isDarkMode ? "vs-dark" : "vs-light");
    
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setTheme(isDark ? "vs-dark" : "vs-light");
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle editor before mount
  const handleEditorWillMount = (monaco: typeof import("monaco-editor")) => {
    // Initialize editor with HTML, CSS, and JavaScript IntelliSense
    monaco.languages.html.htmlDefaults.setOptions({
      format: {
        indentInnerHtml: true,
        wrapLineLength: 120,
        wrapAttributes: 'auto',
      }
    });
    
    // Define Tailwind CSS class completions
    const tailwindCompletions = [
      // Layout
      { label: 'container', detail: 'Set the max-width to match the min-width of the current breakpoint' },
      { label: 'flex', detail: 'Create a flex container' },
      { label: 'grid', detail: 'Create a grid container' },
      
      // Flexbox
      { label: 'flex-row', detail: 'Set flex-direction: row' },
      { label: 'flex-col', detail: 'Set flex-direction: column' },
      { label: 'justify-start', detail: 'Set justify-content: flex-start' },
      { label: 'justify-center', detail: 'Set justify-content: center' },
      { label: 'items-center', detail: 'Set align-items: center' },
      
      // Spacing
      { label: 'p-4', detail: 'Set padding: 1rem' },
      { label: 'm-4', detail: 'Set margin: 1rem' },
      
      // Typography
      { label: 'text-lg', detail: 'Set font-size: 1.125rem' },
      { label: 'font-bold', detail: 'Set font-weight: 700' },
      
      // Colors
      { label: 'text-white', detail: 'Set text color to white' },
      { label: 'bg-blue-500', detail: 'Set background color to blue-500' },
    ];
    
    // Register Tailwind CSS class completions
    monaco.languages.registerCompletionItemProvider('html', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        };
        
        return {
          suggestions: tailwindCompletions.map(item => ({
            label: item.label,
            kind: monaco.languages.CompletionItemKind.Keyword,
            detail: item.detail,
            insertText: item.label,
            range
          }))
        };
      }
    });
  };

  // Handle the editor mounting
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    setEditorLoaded(true);
    
    // Add format document action
    editor.addAction({
      id: 'format-document',
      label: 'Format Document',
      keybindings: [
        monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF
      ],
      run: (ed) => {
        ed.getAction('editor.action.formatDocument')?.run();
      }
    });
    
    // Pass the editor instance to the parent component
    if (onMount) {
      onMount(editor, monaco);
    }
  };

  // Handle editor load errors
  const handleEditorLoadError = (error: Error) => {
    console.error("Monaco Editor load error:", error);
    setEditorLoadError(`Failed to load editor: ${error.message}`);
  };

  if (!isMounted) {
    return (
      <div className="w-full h-full bg-secondary/30 animate-pulse rounded-md flex items-center justify-center">
        <div className="text-muted-foreground">Loading editor...</div>
      </div>
    );
  }

  if (editorLoadError) {
    return (
      <div className="w-full h-full bg-destructive/10 rounded-md flex items-center justify-center p-4">
        <div className="text-destructive text-sm">
          <p className="font-bold">Editor Error:</p>
          <p>{editorLoadError}</p>
          <p className="mt-2">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Editor
        height={height}
        defaultLanguage={language}
        value={value}
        onChange={(val) => onChange(val || "")}
        theme={theme}
        beforeMount={handleEditorWillMount}
        onMount={handleEditorDidMount}
        loading={
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        }
        onError={handleEditorLoadError}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          tabSize: 2,
          automaticLayout: true,
          wordWrap: "on",
          lineNumbers: "on",
          renderLineHighlight: "all",
          scrollbar: {
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
            useShadows: true
          },
          padding: {
            top: 16,
            bottom: 16
          },
          bracketPairColorization: {
            enabled: true
          },
          formatOnPaste: true,
          autoIndent: "full",
          suggest: {
            showKeywords: true,
            showSnippets: true,
            preview: true
          }
        }}
      />

      {!editorLoaded && (
        <div className="absolute inset-0 bg-background/90 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
            <div className="text-muted-foreground">Loading editor...</div>
          </div>
        </div>
      )}
    </div>
  );
}