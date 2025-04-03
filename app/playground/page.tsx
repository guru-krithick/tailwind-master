// app/playground/page.tsx
"use client";

import { EnhancedPlayground } from "@/components/enhanced-playground";
import { Header } from "@/components/header";

export default function PlaygroundPage() {
  // Initial HTML code for the playground with Tailwind v4 features
  const initialHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com?v=4.0.0"></script>
</head>
<body class="bg-gray-950 text-white min-h-screen font-sans antialiased">
  <!-- Header Section - Improved for tablet and theme responsiveness -->
  <header class="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm z-10 shadow-sm">
    <div class="container mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
      <!-- Logo -->
      <div class="flex items-center space-x-2 sm:space-x-3">
        <div class="bg-blue-600 dark:bg-blue-500 rounded-lg p-1.5 sm:p-2 shadow-md shadow-blue-600/10 dark:shadow-blue-500/20">
          <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <span class="font-bold text-base sm:text-lg tracking-tight text-gray-900 dark:text-white">TailwindMaster</span>
      </div>
      
      <!-- Navigation for Tablet and Desktop -->
      <nav class="hidden sm:flex items-center space-x-3 md:space-x-6">
        <a href="#" class="text-blue-600 dark:text-blue-400 text-sm md:text-base font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-600 dark:after:bg-blue-400 after:origin-bottom-right after:scale-x-100">Home</a>
        <a href="#" class="text-gray-700 dark:text-gray-400 text-sm md:text-base hover:text-gray-900 dark:hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-600 dark:after:bg-blue-400 after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform">Features</a>
        <a href="#" class="text-gray-700 dark:text-gray-400 text-sm md:text-base hover:text-gray-900 dark:hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-600 dark:after:bg-blue-400 after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform">Docs</a>
        <a href="#" class="text-gray-700 dark:text-gray-400 text-sm md:text-base hover:text-gray-900 dark:hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-600 dark:after:bg-blue-400 after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 after:transition-transform hidden md:inline-block">Blog</a>
      </nav>
      
      <!-- Mobile Menu Button -->
      <button class="sm:hidden rounded-lg bg-gray-100 dark:bg-gray-800 p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900">
        <svg class="w-5 h-5 text-gray-700 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      
      <!-- Theme Toggle Button (visible on all screens) -->
      <button class="ml-2 sm:ml-4 rounded-lg bg-gray-100 dark:bg-gray-800 p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900">
        <!-- Sun icon for dark mode -->
        <svg class="w-5 h-5 text-gray-700 dark:text-gray-400 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
        <!-- Moon icon for light mode -->
        <svg class="w-5 h-5 text-gray-700 dark:text-gray-400 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
      </button>
    </div>
  </header>

  <!-- Main Content -->
  <main class="container mx-auto px-4 py-12">
    <!-- Hero Section - Improved for tablet responsiveness -->
    <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-16 md:mb-20 px-4">
      <span class="bg-blue-600/20 dark:bg-blue-600/30 text-blue-500 dark:text-blue-300 text-sm font-medium py-1 px-3 rounded-full mb-4 inline-block">Tailwind CSS v4</span>
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-balance gradient-text">
        Welcome to <span class="text-blue-400 dark:text-blue-300">TailwindMaster</span>
      </h1>
      <p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto">
        A playground for learning and experimenting with the latest features of Tailwind CSS v4
      </p>
      <div class="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
        <button class="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 hover:scale-[1.02] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
          Get Started
        </button>
        <button class="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:ring-offset-2 focus:outline-none">
          <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          Watch Tutorial
        </button>
      </div>
    </div>

    <!-- Features Grid - Improved for tablet responsiveness -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-16 px-4">
      <!-- Feature 1 -->
      <div class="bg-white dark:bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 transition-colors duration-200 group hover:shadow-lg hover:shadow-blue-600/10">
        <div class="bg-blue-100 dark:bg-blue-600/20 p-3 sm:p-4 rounded-xl inline-block mb-4 sm:mb-5 group-hover:bg-blue-200 dark:group-hover:bg-blue-600/30 transition-colors duration-200">
          <svg class="w-6 sm:w-7 h-6 sm:h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">Fast & Efficient</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
          Tailwind v4 delivers improved performance with a brand new engine and optimized build process.
        </p>
      </div>
      
      <!-- Feature 2 -->
      <div class="bg-white dark:bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 hover:border-emerald-500/50 transition-colors duration-200 group hover:shadow-lg hover:shadow-emerald-600/10">
        <div class="bg-emerald-100 dark:bg-emerald-600/20 p-3 sm:p-4 rounded-xl inline-block mb-4 sm:mb-5 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-600/30 transition-colors duration-200">
          <svg class="w-6 sm:w-7 h-6 sm:h-7 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
          </svg>
        </div>
        <h3 class="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">Type-Safe Colors</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
          OKLCH color system for better color science and improved accessibility across devices.
        </p>
      </div>
      
      <!-- Feature 3 -->
      <div class="bg-white dark:bg-gray-900 rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 hover:border-purple-500/50 transition-colors duration-200 group hover:shadow-lg hover:shadow-purple-600/10 sm:col-span-2 lg:col-span-1 sm:max-w-md sm:mx-auto lg:max-w-none">
        <div class="bg-purple-100 dark:bg-purple-600/20 p-3 sm:p-4 rounded-xl inline-block mb-4 sm:mb-5 group-hover:bg-purple-200 dark:group-hover:bg-purple-600/30 transition-colors duration-200">
          <svg class="w-6 sm:w-7 h-6 sm:h-7 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
          </svg>
        </div>
        <h3 class="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">Custom Variants</h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm sm:text-base group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
          Create your own powerful variants with ease using the new custom variant API.
        </p>
      </div>
    </div>
  </main>

  <!-- Footer - Improved for tablet and theme responsiveness -->
  <footer class="border-t border-gray-200 dark:border-gray-800 py-6 sm:py-10">
    <div class="container mx-auto px-4 text-center">
      <div class="mx-auto w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-full mb-4 sm:mb-8"></div>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-4 sm:mb-6">
        <a href="#" class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Documentation</a>
        <a href="#" class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GitHub</a>
        <a href="#" class="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Components</a>
      </div>
      <p class="text-gray-600 dark:text-gray-400 text-sm">
        Made with <span class="text-red-500 dark:text-red-400">❤️</span> using TailwindCSS v4 - © 2025
      </p>
      
      <!-- Tablet/Mobile indicator - small text at bottom of footer -->
      <p class="text-gray-400 dark:text-gray-500 text-xs mt-4 hidden sm:block md:hidden">
        Tablet View Active
      </p>
      <p class="text-gray-400 dark:text-gray-500 text-xs mt-2 block sm:hidden">
        Mobile View Active
      </p>
    </div>
  </footer>
</body>
</html>`;

  // Initial CSS code showcasing Tailwind v4 features
  const initialCss = `/* Tailwind v4 Custom CSS */

/* Custom keyframes animation */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Apply custom animation to elements with .float class */
.float {
  animation: float 3s ease-in-out infinite;
}

/* Custom variant example - one of Tailwind v4's new features */
@custom-variant aria-selected (.aria-selected) {
  &[aria-selected="true"] {
    @apply bg-blue-600 dark:bg-blue-500 text-white;
  }
}

/* Dark mode support */
@custom-variant dark (.dark) {
  @media (prefers-color-scheme: dark) {
    :root & {
      @apply selector-scope;
    }
  }
}

/* Responsive fixes for mobile and tablet */
@media (max-width: 768px) {
  .responsive-container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .card-grid {
    gap: 1rem;
  }
}

/* Gradient text for headings */
.gradient-text {
  background-image: linear-gradient(135deg, #fff 0%, #a5f3fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

/* Dark mode gradient text */
.dark .gradient-text {
  background-image: linear-gradient(135deg, #e0f2fe 0%, #0ea5e9 100%);
}

/* Custom card styles using Tailwind v4 theme tokens */
.custom-card {
  background-color: oklch(0.2 0.2 240); /* OKLCH color format */
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.custom-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}

/* Theme example - with Tailwind v4 features */
@theme inline {
  /* Light theme variables */
  --color-primary: oklch(0.6 0.18 250);
  --color-secondary: oklch(0.65 0.18 190);
  --color-background: oklch(1.0 0 0);
  --color-surface: oklch(0.98 0 0);
  --color-text: oklch(0.2 0 0);
  --animate-duration: 0.3s;
  --radius-lg: 0.5rem;
  --shadow-primary: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  
  /* Dark theme variables */
  .dark {
    --color-primary: oklch(0.7 0.18 250);
    --color-secondary: oklch(0.75 0.18 190);
    --color-background: oklch(0.1 0 0);
    --color-surface: oklch(0.15 0 0);
    --color-text: oklch(0.95 0 0);
    --shadow-primary: 0 10px 15px -3px rgb(255 255 255 / 0.05);
  }
}

/* Media query for tablets to ensure proper spacing */
@media (min-width: 640px) and (max-width: 1023px) {
  .tablet-padding {
    padding: 1.5rem !important;
  }
  
  .tablet-font-size {
    font-size: 0.9rem !important;
  }
  
  .tablet-card {
    min-height: 180px;
  }
}`;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Logo and Header */}
      <Header />
      
      {/* Title and Description */}
      <div className="text-center py-4 sm:py-6 px-4 mb-1 sm:mb-2">
        <div className="inline-flex items-center justify-center px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-2 sm:mb-3">
          <span className="mr-1 sm:mr-1.5">✨</span> 
          Tailwind CSS v4
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400">
          Tailwind Playground
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-1 sm:mt-2 max-w-xl mx-auto">
          A beginner-friendly environment to learn and experiment with the latest features of Tailwind CSS v4
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-grow px-2 sm:px-4 pb-4 sm:pb-6 overflow-hidden">
        <div className="bg-white dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-lg sm:rounded-xl shadow-lg dark:shadow-xl h-full overflow-hidden">
          <EnhancedPlayground
            initialCode={{ html: initialHtml, css: initialCss }}
          />
        </div>
      </div>
      
      {/* Footer with theme toggle */}
      <div className="flex justify-center items-center py-2 sm:py-3 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <button className="mr-2 p-1.5 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200" aria-label="Toggle tablet view">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
        </button>
        <span>Made with Tailwind CSS v4 - © 2025</span>
      </div>
    </div>
  );
}