// components/live-preview.tsx - Added cssCode prop
"use client";

import { useEffect, useRef, useState } from "react";

interface LivePreviewProps {
  code: string;
  cssCode?: string; // Added the cssCode prop
  deviceView?: "responsive" | "phone" | "tablet" | "laptop";
  showGrid?: boolean;
}

export function LivePreview({ 
  code, 
  cssCode,
  deviceView = "responsive",
  showGrid = true
}: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Update preview immediately when code changes
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

        // Prepare the content with Tailwind v4
        const htmlContent = code;
        
        // Use document.write for immediate rendering
        iframeDoc.open();
        iframeDoc.write(htmlContent);
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
  }, [code, deviceView, showGrid]);

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