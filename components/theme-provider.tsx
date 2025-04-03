// components/theme-provider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Apply theme changes to CSS variables on theme change
  const updateThemeVars = React.useCallback((theme: string) => {
    // Update data-theme attribute for better CSS targeting
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  React.useEffect(() => {
    const initialTheme = props.defaultTheme || 'dark'; // Default to dark if not specified
    updateThemeVars(initialTheme);

    // Listen for theme changes from the ThemesProvider
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      updateThemeVars(isDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [props.defaultTheme, updateThemeVars]);

  return (
    <NextThemesProvider 
      {...props} 
    >
      {children}
    </NextThemesProvider>
  );
}