// components/theme-provider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Apply theme changes to CSS variables on theme change
  const updateThemeVars = React.useCallback((theme: string) => {
    // With Tailwind v4, we don't need to manipulate classes for theming
    // The CSS variables in :root and media query handle light/dark modes
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  React.useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = props.defaultTheme || (prefersDark ? 'dark' : 'light');
    updateThemeVars(initialTheme);

    const handleThemeChange = (e: MediaQueryListEvent) => {
      updateThemeVars(e.matches ? 'dark' : 'light');
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, [props.defaultTheme, updateThemeVars]);

  return (
    <NextThemesProvider 
      {...props} 
    >
      {children}
    </NextThemesProvider>
  );
}