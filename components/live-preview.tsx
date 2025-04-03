// components/live-preview.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface LivePreviewProps {
  code: string;
}

export function LivePreview({ code }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (iframeRef.current) {
      try {
        const document = iframeRef.current.contentDocument;
        if (document) {
          document.open();
          document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                  body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    padding: 1rem;
                  }
                </style>
              </head>
              <body>
                ${code}
              </body>
            </html>
          `);
          document.close();
          setError(null);
        }
      } catch (err) {
        setError(`Error rendering preview: ${err}`);
      }
    }
  }, [code]);

  return (
    <div className="w-full h-full relative">
      {error && (
        <div className="absolute inset-0 bg-red-50 dark:bg-red-900/20 p-4 rounded-md">
          <p className="text-red-500 dark:text-red-300 text-sm font-mono">{error}</p>
        </div>
      )}
      <iframe
        ref={iframeRef}
        title="Preview"
        className="w-full h-full border-0 rounded-md bg-white dark:bg-gray-950"
        sandbox="allow-scripts"
      />
    </div>
  );
}