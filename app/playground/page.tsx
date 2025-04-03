// app/playground/page.tsx
"use client";

import { EnhancedPlayground } from "@/components/enhanced-playground";
import { Header } from "@/components/header";

export default function PlaygroundPage() {
  // Simplified initial HTML code for the playground
  const initialHtml = `<header class="border-b border-gray-800 sticky top-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm z-10 shadow-sm">
  <div class="container mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
    <!-- Logo -->
    <div class="flex items-center space-x-2 sm:space-x-3">
      <div class="bg-blue-600 dark:bg-blue-500 rounded-lg p-1.5 sm:p-2 shadow-md">
        <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      </div>
      <span class="font-bold text-base sm:text-lg tracking-tight text-gray-900 dark:text-white">TailwindMaster</span>
    </div>
    
    <!-- Navigation -->
    <nav class="hidden sm:flex items-center space-x-6">
      <a href="#" class="text-blue-600 dark:text-blue-400 text-base font-medium">Home</a>
      <a href="#" class="text-gray-700 dark:text-gray-400 text-base hover:text-gray-900 dark:hover:text-white">Features</a>
      <a href="#" class="text-gray-700 dark:text-gray-400 text-base hover:text-gray-900 dark:hover:text-white">Docs</a>
      <a href="#" class="text-gray-700 dark:text-gray-400 text-base hover:text-gray-900 dark:hover:text-white">Blog</a>
    </nav>
  </div>
</header>

<!-- Main Content -->
<main class="container mx-auto px-4 py-12">
  <!-- Hero Section -->
  <div class="text-center max-w-3xl mx-auto mb-16">
    <span class="bg-blue-600/20 dark:bg-blue-600/30 text-blue-500 dark:text-blue-300 text-sm font-medium py-1 px-3 rounded-full mb-4 inline-block">Tailwind CSS v4</span>
    <h1 class="text-4xl md:text-5xl font-bold mb-6 gradient-text">
      Custom Variants
    </h1>
    <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
      Create your own powerful variants with ease using the new custom variant API.
    </p>
    <div class="flex flex-wrap gap-4 justify-center">
      <button class="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition shadow-md hover:shadow-lg">
        Get Started
      </button>
      <button class="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium px-6 py-3 rounded-lg transition flex items-center gap-2">
        Documentation
      </button>
    </div>
  </div>

  <!-- Feature Cards -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
    <div class="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 transition-colors group hover:shadow-lg">
      <div class="bg-blue-100 dark:bg-blue-600/20 p-4 rounded-xl inline-block mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-600/30 transition-colors">
        <svg class="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      </div>
      <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Fast & Efficient</h3>
      <p class="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
        Tailwind v4 delivers improved performance with a brand new engine and optimized build process.
      </p>
    </div>
  </div>
</main>`;

  // Initial CSS showcasing Tailwind v4 features
  const initialCss = `/* Custom variant example - one of Tailwind v4's new features */
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

/* Gradient text for headings */
.gradient-text {
  background-image: linear-gradient(135deg, #3b82f6 0%, #93c5fd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

/* Dark mode gradient text */
.dark .gradient-text {
  background-image: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
}`;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-950">
      <Header />
      
      <div className="flex-grow flex flex-col">
        <EnhancedPlayground
          initialCode={{ html: initialHtml, css: initialCss }}
        />
      </div>
    </div>
  );
}