// components/live-preview.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface LivePreviewProps {
  code: string;
  deviceView?: "responsive" | "phone" | "tablet" | "laptop";
  showGrid?: boolean;
}

export function LivePreview({ 
  code, 
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

        // Prepare HTML content with Tailwind
        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <script src="https://cdn.tailwindcss.com?v=3.4.1"></script>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                  padding: 1rem;
                  margin: 0;
                  transition: all 0.3s ease;
                  min-height: 100vh;
                  ${showGrid ? `
                    background-size: 1rem 1rem;
                    background-image: 
                      linear-gradient(to right, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
                  ` : ''}
                }
                
                * {
                  box-sizing: border-box;
                }
              </style>
            </head>
            <body class="${deviceView === 'phone' || deviceView === 'tablet' ? 'device-frame' : ''}">
              ${code || '<div class="text-gray-400">Add some HTML to see the preview...</div>'}
            </body>
          </html>
        `;
        
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
      } catch (err: any) {
        console.error("Preview error:", err);
        setError(`Error rendering preview: ${err.message || String(err)}`);
        setIsLoading(false);
      }
    };

    // Force iframe reload for each update
    const resetIframe = () => {
      if (!iframeRef.current) return;
      
      // Replace the iframe to ensure clean state
      const parent = iframeRef.current.parentNode;
      if (parent) {
        const oldIframe = iframeRef.current;
        const newIframe = document.createElement('iframe');
        
        // Copy attributes from old iframe
        Array.from(oldIframe.attributes).forEach(attr => {
          newIframe.setAttribute(attr.name, attr.value);
        });
        
        // Replace old with new
        parent.replaceChild(newIframe, oldIframe);
        iframeRef.current = newIframe as HTMLIFrameElement;
        
        // Setup iframe once it's loaded
        newIframe.onload = updatePreview;
      }
    };
    
    // For minor code changes, update directly
    if (iframeRef.current && iframeRef.current.contentWindow) {
      updatePreview();
    } else {
      // For first load or major changes, reset the iframe
      resetIframe();
    }
  }, [code, showGrid, deviceView]);

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 bg-destructive/10 dark:bg-destructive/20 p-4 rounded-md z-20">
          <p className="text-destructive dark:text-destructive/90 text-sm font-mono">{error}</p>
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        title="Preview"
        className="w-full h-full border-0 rounded-md bg-white dark:bg-gray-950"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}