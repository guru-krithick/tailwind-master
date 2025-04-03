// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { Roboto_Mono } from 'next/font/google';

const GeistSans = Inter({ subsets: ['latin'] });
const GeistMono = Roboto_Mono({ subsets: ['latin'] });
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// Define CSS variables for the fonts
const fontSans = GeistSans.className;
const fontMono = GeistMono.className;

export const metadata: Metadata = {
  title: "TailwindMaster - Interactive Tailwind CSS Documentation",
  description: "Learn and experiment with Tailwind CSS utilities in an interactive playground",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fontSans} ${fontMono}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Changed to dark from system
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}