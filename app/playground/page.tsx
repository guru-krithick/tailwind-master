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
<body class="bg-gray-950 text-white min-h-screen">
  <!-- Header Section -->
  <header class="border-b border-gray-800">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <div class="bg-blue-600 rounded p-1.5">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <span class="font-bold text-lg tracking-tight">TailwindMaster</span>
      </div>
      
      <!-- Navigation for Desktop -->
      <nav class="hidden md:flex space-x-4">
        <a href="#" class="text-blue-400 font-medium">Home</a>
        <a href="#" class="text-gray-400 hover:text-white">Features</a>
        <a href="#" class="text-gray-400 hover:text-white">Docs</a>
        <a href="#" class="text-gray-400 hover:text-white">Blog</a>
      </nav>
      
      <!-- Mobile Menu Button -->
      <button class="md:hidden rounded-lg bg-gray-800 p-2">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
  </header>

  <!-- Main Content -->
  <main class="container mx-auto px-4 py-10">
    <!-- Hero Section -->
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 text-balance">
        Welcome to <span class="text-blue-400">TailwindMaster</span>
      </h1>
      <p class="text-xl text-gray-400 mb-8">
        A playground for learning Tailwind CSS v4
      </p>
      <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition duration-200">
        Get Started
      </button>
    </div>

    <!-- Features Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <!-- Feature 1 -->
      <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <div class="bg-blue-600/20 p-3 rounded-lg inline-block mb-4">
          <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Fast & Efficient</h3>
        <p class="text-gray-400">
          Tailwind v4 delivers improved performance
        </p>
      </div>
      
      <!-- Feature 2 -->
      <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <div class="bg-emerald-600/20 p-3 rounded-lg inline-block mb-4">
          <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Type-Safe Colors</h3>
        <p class="text-gray-400">
          OKLCH color system for better color science
        </p>
      </div>
      
      <!-- Feature 3 -->
      <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <div class="bg-purple-600/20 p-3 rounded-lg inline-block mb-4">
          <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Custom Variants</h3>
        <p class="text-gray-400">
          Create your own powerful variants with ease
        </p>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="border-t border-gray-800 py-8">
    <div class="container mx-auto px-4 text-center">
      <p class="text-gray-400">
        Made with TailwindCSS v4 - © 2025
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
    @apply bg-blue-600 text-white;
  }
}

/* Custom styles using Tailwind v4 theme tokens */
.custom-card {
  background-color: oklch(0.2 0.2 240); /* OKLCH color format */
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

/* Theme example - with Tailwind v4 features */
@theme inline {
  --color-primary: oklch(0.6 0.18 250);
  --animate-duration: 0.3s;
  --radius-lg: 0.5rem;
}`;

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-950">
      {/* Logo and Header */}
      <Header />
      {/* Title and Description */}
      <div className="text-center py-4 px-4">
        <h1 className="text-3xl font-bold text-white">
          <span className="text-blue-400">Tailwind</span> Playground
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          A beginner-friendly environment to learn and experiment with Tailwind
          CSS v4
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-grow px-4 pb-4 overflow-hidden">
        <EnhancedPlayground
          initialCode={{ html: initialHtml, css: initialCss }}
        />
      </div>
    </div>
  );
}
