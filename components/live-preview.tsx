// components/live-preview.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface LivePreviewProps {
  code: string;
  cssCode?: string;
  deviceView?: "responsive" | "phone" | "laptop";
  showGrid?: boolean;
  theme?: string; // Add theme prop
}

export function LivePreview({ 
  code, 
  cssCode,
  deviceView = "responsive",
  showGrid = true,
  theme = "dark" // Default to dark theme
}: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Update preview immediately when code or theme changes
  useEffect(() => {
    const updatePreview = () => {
      if (!iframeRef.current) return;
      
      try {
        setIsLoading(true);
        
        const iframe = iframeRef.current;
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        
        if (!iframeDoc) {
          throw new Error("Cannot access iframe document");
        }

        // Extract the HTML content from the full document
        let htmlContent = code;
        
        // If the code appears to be a complete HTML document, extract just the body content
        if (code.includes('<!DOCTYPE html>') || code.includes('<html')) {
          // Create a template element to parse the HTML
          const parser = new DOMParser();
          const doc = parser.parseFromString(code, 'text/html');
          
          // Extract just the body content
          htmlContent = doc.body.innerHTML;
        }

        // Create a full HTML document with the current theme
        const fullHtml = `<!DOCTYPE html>
<html class="${theme}">
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
    
    /* Additional styles */
    ${cssCode || ''}
  </style>
</head>
<body class="bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
  ${htmlContent}
</body>
</html>`;

        // Use document.write for immediate rendering
        iframeDoc.open();
        iframeDoc.write(fullHtml);
        iframeDoc.close();
        
        // Reset error state if successful
        setError(null);
        
        // Short timeout to ensure content is rendered before removing loading state
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      } catch (err: unknown) {
        console.error("Preview error:", err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(`Error rendering preview: ${errorMessage}`);
        setIsLoading(false);
      }
    };

    // Create a new iframe for each update to avoid caching issues
    updatePreview();
  }, [code, cssCode, deviceView, showGrid, theme]); // Include theme in dependencies

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm z-10">
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
      )}
      
      {error && (
        <div className="absolute inset-0 bg-red-900/20 p-4 rounded-md z-20">
          <p className="text-red-400 font-mono text-sm">{error}</p>
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        title="Preview"
        className="w-full h-full border-0 bg-white dark:bg-gray-950"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}