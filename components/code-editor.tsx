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

// Tailwind v4 CSS completions
const tailwindV4Classes = [
  // Basic Layout
  { label: 'flex', detail: 'Create a flex container' },
  { label: 'grid', detail: 'Create a grid container' },
  { label: 'block', detail: 'Set display: block' },
  { label: 'inline', detail: 'Set display: inline' },
  { label: 'hidden', detail: 'Set display: none' },
  
  // Flexbox & Grid
  { label: 'flex-row', detail: 'Set flex-direction: row' },
  { label: 'flex-col', detail: 'Set flex-direction: column' },
  { label: 'justify-start', detail: 'Set justify-content: flex-start' },
  { label: 'justify-end', detail: 'Set justify-content: flex-end' },
  { label: 'justify-center', detail: 'Set justify-content: center' },
  { label: 'justify-between', detail: 'Set justify-content: space-between' },
  { label: 'items-start', detail: 'Set align-items: flex-start' },
  { label: 'items-end', detail: 'Set align-items: flex-end' },
  { label: 'items-center', detail: 'Set align-items: center' },
  { label: 'grid-cols-1', detail: 'Create a single column grid' },
  { label: 'grid-cols-2', detail: 'Create a 2-column grid' },
  { label: 'grid-cols-3', detail: 'Create a 3-column grid' },
  { label: 'gap-1', detail: 'Set gap: 0.25rem' },
  { label: 'gap-2', detail: 'Set gap: 0.5rem' },
  { label: 'gap-4', detail: 'Set gap: 1rem' },
  
  // Spacing
  { label: 'p-0', detail: 'Set padding: 0' },
  { label: 'p-1', detail: 'Set padding: 0.25rem' },
  { label: 'p-2', detail: 'Set padding: 0.5rem' },
  { label: 'p-4', detail: 'Set padding: 1rem' },
  { label: 'px-4', detail: 'Set padding-left and padding-right: 1rem' },
  { label: 'py-2', detail: 'Set padding-top and padding-bottom: 0.5rem' },
  { label: 'm-0', detail: 'Set margin: 0' },
  { label: 'm-1', detail: 'Set margin: 0.25rem' },
  { label: 'm-2', detail: 'Set margin: 0.5rem' },
  { label: 'm-4', detail: 'Set margin: 1rem' },
  { label: 'mx-auto', detail: 'Set margin-left and margin-right: auto' },
  
  // Sizing
  { label: 'w-full', detail: 'Set width: 100%' },
  { label: 'w-1/2', detail: 'Set width: 50%' },
  { label: 'w-1/3', detail: 'Set width: 33.333333%' },
  { label: 'w-1/4', detail: 'Set width: 25%' },
  { label: 'h-full', detail: 'Set height: 100%' },
  { label: 'h-screen', detail: 'Set height: 100vh' },
  { label: 'min-h-screen', detail: 'Set min-height: 100vh' },
  
  // Typography
  { label: 'text-xs', detail: 'Set font-size: 0.75rem' },
  { label: 'text-sm', detail: 'Set font-size: 0.875rem' },
  { label: 'text-base', detail: 'Set font-size: 1rem' },
  { label: 'text-lg', detail: 'Set font-size: 1.125rem' },
  { label: 'text-xl', detail: 'Set font-size: 1.25rem' },
  { label: 'text-2xl', detail: 'Set font-size: 1.5rem' },
  { label: 'font-thin', detail: 'Set font-weight: 100' },
  { label: 'font-light', detail: 'Set font-weight: 300' },
  { label: 'font-normal', detail: 'Set font-weight: 400' },
  { label: 'font-medium', detail: 'Set font-weight: 500' },
  { label: 'font-semibold', detail: 'Set font-weight: 600' },
  { label: 'font-bold', detail: 'Set font-weight: 700' },
  { label: 'text-center', detail: 'Set text-align: center' },
  { label: 'text-left', detail: 'Set text-align: left' },
  { label: 'text-right', detail: 'Set text-align: right' },
  { label: 'text-balance', detail: 'Set text-wrap: balance (New in v4)' },
  
  // Colors (v4 format)
  { label: 'text-white', detail: 'Set color: white' },
  { label: 'text-black', detail: 'Set color: black' },
  { label: 'text-blue-400', detail: 'Set color: OKLCH blue (Tailwind v4)' },
  { label: 'text-gray-400', detail: 'Set color: OKLCH gray (Tailwind v4)' },
  { label: 'bg-white', detail: 'Set background-color: white' },
  { label: 'bg-black', detail: 'Set background-color: black' },
  { label: 'bg-blue-600', detail: 'Set background-color: OKLCH blue (Tailwind v4)' },
  { label: 'bg-gray-900', detail: 'Set background-color: OKLCH gray (Tailwind v4)' },
  
  // Borders
  { label: 'border', detail: 'Add a border with default width' },
  { label: 'border-2', detail: 'Add a border with width: 2px' },
  { label: 'border-gray-800', detail: 'Set border-color: OKLCH gray (Tailwind v4)' },
  { label: 'rounded', detail: 'Set border-radius: 0.25rem' },
  { label: 'rounded-md', detail: 'Set border-radius: 0.375rem' },
  { label: 'rounded-lg', detail: 'Set border-radius: 0.5rem' },
  { label: 'rounded-xl', detail: 'Set border-radius: 0.75rem' },
  { label: 'rounded-full', detail: 'Set border-radius: 9999px' },
  
  // Effects
  { label: 'shadow', detail: 'Add a small shadow' },
  { label: 'shadow-md', detail: 'Add a medium shadow' },
  { label: 'shadow-lg', detail: 'Add a large shadow' },
  { label: 'shadow-xl', detail: 'Add an extra large shadow' },
  { label: 'opacity-0', detail: 'Set opacity: 0' },
  { label: 'opacity-50', detail: 'Set opacity: 0.5' },
  { label: 'opacity-100', detail: 'Set opacity: 1' },
  
  // Transitions & Animation
  { label: 'transition', detail: 'Add transition to property: all' },
  { label: 'duration-200', detail: 'Set transition-duration: 200ms' },
  { label: 'ease-in', detail: 'Set transition-timing-function: cubic-bezier(0.4, 0, 1, 1)' },
  { label: 'ease-out', detail: 'Set transition-timing-function: cubic-bezier(0, 0, 0.2, 1)' },
  { label: 'animate-spin', detail: 'Apply a spinning animation' },
  { label: 'animate-pulse', detail: 'Apply a pulsing animation' },
  
  // Interactivity
  { label: 'hover:bg-blue-700', detail: 'Set background-color on hover' },
  { label: 'focus:outline-none', detail: 'Remove outline on focus' },
  { label: 'active:bg-blue-800', detail: 'Set background-color on active' },
  { label: 'group', detail: 'Define a group for applying styles to children' },
  { label: 'group-hover:text-white', detail: 'Set text color on group hover' },
  
  // Layout
  { label: 'container', detail: 'Set the max-width to match the current breakpoint' },
  { label: 'mx-auto', detail: 'Set margin-left and margin-right to auto' },
  { label: 'overflow-hidden', detail: 'Set overflow: hidden' },
  { label: 'overflow-auto', detail: 'Set overflow: auto' },
  { label: 'overflow-scroll', detail: 'Set overflow: scroll' },
  
  // Tailwind v4 specific
  { label: '@theme inline', detail: 'Define CSS variables (New in v4)' },
  { label: '@custom-variant', detail: 'Create custom variants (New in v4)' },
  { label: '@keyframes', detail: 'Define animations directly in CSS (New in v4)' }
];

// CSS v4 completions
const tailwindV4CSS = [
  { label: '@theme', detail: 'Define theme tokens in Tailwind v4' },
  { label: '@custom-variant', detail: 'Create custom variants in Tailwind v4' },
  { label: '@keyframes', detail: 'Define animations in Tailwind v4' },
  { label: 'oklch', detail: 'OKLCH color format used in Tailwind v4' },
  { label: '--radius-lg', detail: 'Token for large border radius' },
  { label: '--color-primary', detail: 'Token for primary color' },
  { label: '--animate-duration', detail: 'Token for animation duration' }
];

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onMount?: OnMount;
  language?: string;
  theme?: string;
  height?: string;
  options?: any;
}

export function CodeEditor({ 
  value, 
  onChange, 
  onMount,
  language = "html",
  theme = "vs-dark",
  height = "100%",
  options = {}
}: CodeEditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  // Avoid hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle the editor mounting
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // Register Tailwind v4 completions
    if (language === 'html') {
      monaco.languages.registerCompletionItemProvider('html', {
        provideCompletionItems: (model: { getWordUntilPosition: (arg0: any) => any; }, position: { lineNumber: any; }) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn
          };
          
          return {
            suggestions: tailwindV4Classes.map(item => ({
              label: item.label,
              kind: monaco.languages.CompletionItemKind.Keyword,
              detail: item.detail,
              insertText: item.label,
              range
            }))
          };
        }
      });
    } else if (language === 'css') {
      monaco.languages.registerCompletionItemProvider('css', {
        provideCompletionItems: (model: { getWordUntilPosition: (arg0: any) => any; }, position: { lineNumber: any; }) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn
          };
          
          return {
            suggestions: tailwindV4CSS.map(item => ({
              label: item.label,
              kind: monaco.languages.CompletionItemKind.Keyword,
              detail: item.detail,
              insertText: item.label,
              range
            }))
          };
        }
      });
    }
    
    // Pass the editor instance to the parent
    if (onMount) {
      onMount(editor, monaco);
    }
  };

  if (!isMounted) {
    return (
      <div className="w-full h-full bg-gray-900 p-4 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading editor...</div>
      </div>
    );
  }

  const defaultOptions = {
    fontSize: 14,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: "on",
    padding: { top: 16 },
    lineNumbers: "on",
    folding: true,
    theme: "vs-dark",
    automaticLayout: true
  };

  return (
    <Editor
      height={height}
      defaultLanguage={language}
      language={language}
      value={value}
      onChange={(val) => onChange(val || "")}
      theme={theme}
      onMount={handleEditorDidMount}
      options={{...defaultOptions, ...options}}
      loading={
        <div className="w-full h-full flex items-center justify-center bg-gray-900">
          <div className="h-7 w-7">
            <svg 
              className="animate-spin h-full w-full text-blue-500" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      }
    />
  );
}