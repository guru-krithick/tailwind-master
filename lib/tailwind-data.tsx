// lib/tailwind-data.ts - Enhanced for Tailwind v4
// Complete documentation with beginner-friendly descriptions and examples

export type TailwindFunction = {
  id: string;
  name: string;
  description: string;
  category: string;
  examples: {
    code: string;
    description: string;
  }[];
  variants: {
    name: string;
    values: string[];
    description: string;
  }[];
};

export type TailwindCategory = {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color class
  functions: TailwindFunction[];
};

export const categories: TailwindCategory[] = [
  // --- Layout Category ---
  {
    id: "layout",
    name: "Layout",
    description: "Utilities for controlling the overall layout and positioning of elements on your page. These foundational utilities help establish the structural framework of your design and control how elements are displayed, positioned, and respond to different screen sizes.",
    icon: "layout",
    color: "bg-blue-500",
    functions: [
      {
        id: "container",
        name: "Container",
        description: "The container utility creates a responsive, centered wrapper with max-width constraints that align with Tailwind's breakpoints. It's the foundation for most layouts, ensuring content doesn't stretch too wide on large screens while maximizing available space on smaller devices. Note that in Tailwind v4, the container doesn't add padding by default—combine with px-{size} utilities for padding.",
        category: "layout",
        examples: [
          { 
            code: '<div class="container mx-auto px-4">Your content here</div>', 
            description: "Basic container with horizontal auto margins and padding" 
          },
          { 
            code: '<div class="container mx-auto px-4 sm:px-6 lg:px-8">\n  <h1 class="text-2xl font-bold">Responsive Container</h1>\n  <p>This container has responsive padding that increases at larger breakpoints.</p>\n</div>', 
            description: "Container with responsive padding that adapts to screen size" 
          },
          { 
            code: '<!-- Complete page layout with container -->\n<header class="bg-blue-500">\n  <div class="container mx-auto px-4 py-6">\n    <h1 class="text-white text-2xl font-bold">Website Title</h1>\n  </div>\n</header>\n\n<main class="container mx-auto px-4 py-8">\n  <section class="bg-white rounded-lg shadow p-6">\n    <h2 class="text-xl font-semibold mb-4">Main Content</h2>\n    <p>Content that stays at a readable width and is centered on larger screens.</p>\n  </section>\n</main>', 
            description: "Real-world example showing container in a full page layout" 
          }
        ],
        variants: [
          { 
            name: "Breakpoints", 
            values: ["sm", "md", "lg", "xl", "2xl"], 
            description: "By default, the container applies a different max-width at each breakpoint that matches the minimum width of the corresponding breakpoint: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px). For example, at the 'md' breakpoint, the container's max-width becomes 768px." 
          },
        ],
      },
      {
        id: "box-decoration-break",
        name: "Box Decoration Break",
        description: "Controls how element decorations (like background, border, shadow, etc.) behave when the element breaks across multiple lines or columns. This is particularly useful for styling inline elements that may wrap, such as highlighted text or links. In Tailwind v4, this utility helps ensure consistent styling across fragmented content.",
        category: "layout",
        examples: [
          { 
            code: '<span class="box-decoration-slice bg-gradient-to-r from-blue-400 to-purple-500 text-white px-2">\n  This text might wrap across multiple lines with the gradient sliced at each line break.\n</span>', 
            description: "Default 'slice' behavior that cuts off decorations at line breaks" 
          },
          { 
            code: '<span class="box-decoration-clone bg-gradient-to-r from-blue-400 to-purple-500 text-white px-2">\n  This text will have the complete gradient applied to each line when it wraps, making each line look like a complete element.\n</span>', 
            description: "Clone behavior that repeats decorations on each line segment" 
          },
          { 
            code: '<!-- Real-world example: Highlighted text that spans multiple lines -->\n<p class="text-lg leading-relaxed">\n  Regular text with \n  <mark class="box-decoration-clone bg-yellow-200 px-1">\n    some highlighted content that might wrap across multiple lines while maintaining consistent highlighting\n  </mark>\n  and then continue with regular text.\n</p>', 
            description: "Practical example with highlighted text that maintains consistent styling when wrapping" 
          }
        ],
        variants: [
          { 
            name: "Type", 
            values: ["slice", "clone"], 
            description: "slice: breaks decorations at line breaks (default), clone: duplicates decorations on each line segment to make each piece look like a complete element" 
          },
        ],
      },
      {
        id: "box-sizing",
        name: "Box Sizing",
        description: "Determines how the total width and height of an element is calculated. This fundamental layout utility controls whether padding and border are included in the element's dimensions or added to them. Understanding box-sizing is crucial for creating predictable layouts, especially when working with percentage-based widths.",
        category: "layout",
        examples: [
          { 
            code: '<div class="box-border w-64 p-4 border-4 border-blue-500 bg-blue-100">\n  This has a total width of 64px (including padding and border).\n</div>', 
            description: "Border-box model (default in Tailwind) - width includes padding and border" 
          },
          { 
            code: '<div class="box-content w-64 p-4 border-4 border-green-500 bg-green-100">\n  This has a content width of 64px plus padding and border (total: 64px + 32px + 8px = 104px).\n</div>', 
            description: "Content-box model - width applies only to content, padding and border are added" 
          },
          { 
            code: '<!-- Comparing box models side by side -->\n<div class="flex gap-4">\n  <div class="box-border w-40 p-4 border-2 border-blue-500 bg-blue-100">\n    <p class="text-sm font-semibold">box-border</p>\n    <p class="text-sm">Width: 160px total</p>\n  </div>\n  <div class="box-content w-40 p-4 border-2 border-green-500 bg-green-100">\n    <p class="text-sm font-semibold">box-content</p>\n    <p class="text-sm">Width: 160px + 32px padding + 4px border = 196px total</p>\n  </div>\n</div>', 
            description: "Visual comparison of both box-sizing models" 
          }
        ],
        variants: [
          { 
            name: "Type", 
            values: ["border", "content"], 
            description: "border: padding and border included in width/height (default in Tailwind), content: padding and border added to width/height (traditional CSS box model)" 
          },
        ],
      },
      {
        id: "display",
        name: "Display",
        description: "Controls how an element is rendered in the document flow. The display property is one of the most important CSS properties for controlling layout and behavior. It determines if an element generates a block or inline box, or a different type of formatting context like flex, grid, or none (hidden). In Tailwind v4, all display utilities benefit from improved compatibility with OKLCH colors and other modern CSS features.",
        category: "layout",
        examples: [
          { 
            code: '<div class="block">Block element takes full width</div>\n<span class="inline">Inline element</span>\n<span class="inline">takes only needed width</span>', 
            description: "Basic block and inline display" 
          },
          { 
            code: '<div class="hidden sm:block">\n  This content is hidden on mobile but visible on sm screens and up\n</div>', 
            description: "Responsive display showing/hiding elements based on screen size" 
          },
          { 
            code: '<!-- Common display patterns -->\n<nav class="bg-gray-100 p-4">\n  <div class="container mx-auto flex items-center justify-between">\n    <div class="text-xl font-bold">Logo</div>\n    <!-- Hidden on mobile, block on md and up -->\n    <div class="hidden md:block">\n      <div class="flex gap-4">\n        <a href="#" class="text-blue-500 hover:text-blue-700">Home</a>\n        <a href="#" class="text-blue-500 hover:text-blue-700">About</a>\n        <a href="#" class="text-blue-500 hover:text-blue-700">Contact</a>\n      </div>\n    </div>\n    <!-- Visible on mobile only -->\n    <button class="block md:hidden">\n      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>\n      </svg>\n    </button>\n  </div>\n</nav>', 
            description: "Real-world responsive navigation using display utilities" 
          }
        ],
        variants: [
          {
            name: "Type",
            values: [
              "block", "inline-block", "inline", "flex", "inline-flex", "grid", "inline-grid",
              "table", "inline-table", "table-row", "table-cell", "flow-root", "contents", "hidden",
            ],
            description: "block: generates a block element box, inline: generates an inline element, inline-block: generates an inline-level block container, flex: generates a flex container, grid: generates a grid container, hidden: removes the element from the flow and makes it invisible, flow-root: generates a block element with its own block formatting context, contents: makes the container disappear, preserving its children"
          },
        ],
      },
      {
        id: "aspect-ratio",
        name: "Aspect Ratio",
        description: "Sets the preferred aspect ratio for an element, which will be maintained as the element resizes. This is extremely useful for responsive design, particularly with images, videos, and other media to prevent layout shifts during page load. In Tailwind v4, the aspect-ratio utility has enhanced browser support and performance.",
        category: "layout",
        examples: [
          { 
            code: '<div class="aspect-square bg-blue-200 w-full max-w-md">\n  This div will always be perfectly square.\n</div>', 
            description: "Square aspect ratio (1:1)" 
          },
          { 
            code: '<div class="aspect-video bg-green-200 w-full max-w-xl">\n  This div maintains a 16:9 aspect ratio like a video.\n</div>', 
            description: "Video aspect ratio (16:9), perfect for embedding responsive videos" 
          },
          { 
            code: '<!-- Image with maintained aspect ratio -->\n<div class="aspect-[4/3] bg-gray-200 w-full max-w-lg overflow-hidden">\n  <img src="example.jpg" alt="Example" class="w-full h-full object-cover" />\n</div>', 
            description: "Custom aspect ratio (4:3) with an image that maintains proportions" 
          },
          { 
            code: '<!-- Responsive card with image maintaining aspect ratio -->\n<div class="max-w-sm rounded-lg overflow-hidden shadow-lg">\n  <div class="aspect-[3/2] bg-gray-100">\n    <img class="w-full h-full object-cover" src="example.jpg" alt="Card image">\n  </div>\n  <div class="p-4">\n    <h3 class="font-bold text-xl mb-2">Card Title</h3>\n    <p class="text-gray-700">The image above maintains a 3:2 aspect ratio regardless of card width.</p>\n  </div>\n</div>', 
            description: "Real-world example of a card with responsive image maintaining aspect ratio" 
          }
        ],
        variants: [
          { 
            name: "Ratio", 
            values: ["auto", "square", "video", "[custom]"], 
            description: "auto: no aspect ratio enforced, square: 1:1 ratio, video: 16:9 ratio, [custom]: arbitrary values using bracket notation like aspect-[4/3]" 
          },
        ],
      },
      {
        id: "columns",
        name: "Columns",
        description: "Creates multi-column text layouts, similar to newspaper or magazine columns. This allows long blocks of text to flow naturally across multiple columns, improving readability on larger screens. In Tailwind v4, columns utilities have better support across browsers and work well with other modern CSS features.",
        category: "layout",
        examples: [
          { 
            code: '<div class="columns-2 gap-8">\n  <p>This is the first paragraph of text that will flow across multiple columns.</p>\n  <p>This is another paragraph that continues the text flow. The text automatically balances across the columns.</p>\n  <p>Here\'s even more text to demonstrate how content flows from one column to the next, similar to a newspaper layout.</p>\n</div>', 
            description: "Basic two-column layout with gap between columns" 
          },
          { 
            code: '<!-- Responsive columns that adapt to screen size -->\n<div class="columns-1 md:columns-2 lg:columns-3 gap-6">\n  <p class="mb-4">First paragraph that spans across columns based on screen size.</p>\n  <p class="mb-4">Second paragraph continuing the text flow.</p>\n  <p class="mb-4">Third paragraph with more content.</p>\n  <p class="mb-4">Fourth paragraph demonstrating the distribution.</p>\n  <p class="mb-4">Fifth paragraph showing how text balances.</p>\n</div>', 
            description: "Responsive columns that increase with screen size" 
          },
          { 
            code: '<!-- Article with column-spanning heading -->\n<article class="columns-1 md:columns-2 gap-8 prose max-w-4xl mx-auto">\n  <h2 class="column-span-all text-2xl font-bold mb-4">This Heading Spans All Columns</h2>\n  <p>First paragraph of the article with substantial text content...</p>\n  <p>Second paragraph continuing the article text flow...</p>\n  <p>Third paragraph with more content to demonstrate distribution...</p>\n  <div class="aspect-video bg-gray-200 mb-4 break-inside-avoid">\n    <!-- An image or embed that avoids breaking across columns -->\n    <div class="flex items-center justify-center h-full">Image placeholder</div>\n  </div>\n  <p>Fourth paragraph after the media element...</p>\n</article>', 
            description: "Magazine-style layout with column-spanning heading and media" 
          }
        ],
        variants: [
          { 
            name: "Count", 
            values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "auto"], 
            description: "Number of columns to create: columns-1 through columns-12 specify a fixed number of columns, columns-auto lets the browser determine the optimal number based on width and content" 
          },
        ],
      },
      {
        id: "break-after",
        name: "Break After",
        description: "Controls how page, column, or region breaks should behave after an element. This is especially useful for print layouts and multi-column content where you need to control where breaks occur. In Tailwind v4, break utilities have improved support across browsers and printing contexts.",
        category: "layout",
        examples: [
          { 
            code: '<h2 class="break-after-page">Chapter Title</h2>\n<p>This content will start on a new page when printed.</p>', 
            description: "Forces a page break after the heading when printed" 
          },
          { 
            code: '<div class="columns-2">\n  <section class="break-after-column">\n    <h3>First Column Section</h3>\n    <p>This section will force the next content to start in the next column.</p>\n  </section>\n  <section>\n    <h3>Second Column Section</h3>\n    <p>This section starts in the second column because of the break-after-column above.</p>\n  </section>\n</div>', 
            description: "Forces a column break in a multi-column layout" 
          },
          { 
            code: '<!-- Print-optimized document structure -->\n<article class="max-w-prose mx-auto">\n  <h1 class="text-3xl font-bold mb-6">Document Title</h1>\n  <section>\n    <h2 class="text-2xl font-semibold mb-4">First Section</h2>\n    <p class="mb-4">Content for the first section...</p>\n    <p class="mb-4 break-after-page">Last paragraph of this section, forcing the next section to start on a new page when printed.</p>\n  </section>\n  <section>\n    <h2 class="text-2xl font-semibold mb-4">Second Section</h2>\n    <p class="mb-4">This section will start on a new page when printed.</p>\n  </section>\n</article>', 
            description: "Document with print-optimized breaks for better page layout" 
          }
        ],
        variants: [
          { 
            name: "Type", 
            values: ["auto", "avoid", "always", "all", "page", "left", "right", "column"], 
            description: "auto: default browser behavior, avoid: avoid breaks after element, always: always insert a break after, page: force page break after, column: force column break after, left/right: force page break to left/right pages in duplex printing" 
          },
        ],
      },
      {
        id: "break-before",
        name: "Break Before",
        description: "Controls how page, column, or region breaks should behave before an element. Similar to break-after but affects the space before the element. This provides precise control for print layouts and multi-column content, ensuring content flows naturally across pages and columns.",
        category: "layout",
        examples: [
          { 
            code: '<h2 class="break-before-page">New Chapter</h2>\n<p>This heading and all content below it will start on a new page when printed.</p>', 
            description: "Forces content to start on a new page when printed" 
          },
          { 
            code: '<div class="columns-2">\n  <section>\n    <h3>First Section</h3>\n    <p>Content in the first column...</p>\n  </section>\n  <section class="break-before-column">\n    <h3>Second Section</h3>\n    <p>This section forces itself to start in a new column.</p>\n  </section>\n</div>', 
            description: "Forces a section to begin in a new column in multi-column layout" 
          },
          { 
            code: '<!-- Table of contents with chapter breaks -->\n<article class="max-w-prose mx-auto">\n  <h1 class="text-3xl font-bold mb-6">Book Title</h1>\n  <div class="mb-12">\n    <h2 class="text-xl font-semibold mb-4">Table of Contents</h2>\n    <ul class="space-y-2">\n      <li>Chapter 1: Introduction</li>\n      <li>Chapter 2: Main Concepts</li>\n      <li>Chapter 3: Advanced Techniques</li>\n    </ul>\n  </div>\n  <h2 class="text-2xl font-bold mb-6 break-before-page">Chapter 1: Introduction</h2>\n  <p class="mb-4">Introduction content...</p>\n  <h2 class="text-2xl font-bold mb-6 break-before-page">Chapter 2: Main Concepts</h2>\n  <p class="mb-4">Main concepts content...</p>\n</article>', 
            description: "Book-like layout with chapters starting on new pages when printed" 
          }
        ],
        variants: [
          { 
            name: "Type", 
            values: ["auto", "avoid", "always", "all", "page", "left", "right", "column"], 
            description: "auto: default browser behavior, avoid: avoid breaks before element, always: always insert a break before, page: force page break before, column: force column break before, left/right: force page break to left/right pages in duplex printing" 
          },
        ],
      },
      {
        id: "break-inside",
        name: "Break Inside",
        description: "Controls how page, column, or region breaks should behave inside an element. This prevents elements from being split across pages, columns, or regions, which is essential for maintaining the integrity of content blocks like figures, tables, or cards in multi-column layouts and print contexts.",
        category: "layout",
        examples: [
          { 
            code: '<div class="columns-2">\n  <figure class="break-inside-avoid mb-4">\n    <div class="bg-gray-200 aspect-video mb-2"></div>\n    <figcaption class="text-sm text-gray-600">This figure won\'t be split across columns</figcaption>\n  </figure>\n  <p>Regular paragraph text that can flow naturally between columns...</p>\n</div>', 
            description: "Prevents a figure from being split across columns" 
          },
          { 
            code: '<!-- Multi-column article with non-breaking elements -->\n<article class="columns-1 md:columns-2 gap-8">\n  <h2 class="column-span-all text-2xl font-bold mb-4">Article Title</h2>\n  <p class="mb-4">First paragraph of text that can flow between columns...</p>\n  <blockquote class="break-inside-avoid bg-gray-100 p-4 border-l-4 border-blue-500 mb-4">\n    <p class="italic">This important quote won\'t break across columns, maintaining its visual integrity.</p>\n  </blockquote>\n  <p class="mb-4">Another paragraph continuing the article...</p>\n  <table class="break-inside-avoid-page w-full mb-4 border-collapse border border-gray-300">\n    <tr>\n      <th class="border border-gray-300 p-2">Header 1</th>\n      <th class="border border-gray-300 p-2">Header 2</th>\n    </tr>\n    <tr>\n      <td class="border border-gray-300 p-2">Data 1</td>\n      <td class="border border-gray-300 p-2">Data 2</td>\n    </tr>\n  </table>\n  <p class="mb-4">Final paragraph of the article...</p>\n</article>', 
            description: "Article with quotes and tables that won't break across columns or pages" 
          },
          { 
            code: '<!-- Card grid with non-breaking cards -->\n<div class="columns-1 sm:columns-2 lg:columns-3 gap-6">\n  <div class="break-inside-avoid-column mb-6 bg-white rounded-lg shadow-md overflow-hidden">\n    <div class="bg-blue-500 h-48"></div>\n    <div class="p-4">\n      <h3 class="font-bold text-lg mb-2">Card Title</h3>\n      <p class="text-gray-700">This entire card will stay together in one column.</p>\n    </div>\n  </div>\n  <!-- More cards... -->\n</div>', 
            description: "Card grid where each card remains intact within a column" 
          }
        ],
        variants: [
          { 
            name: "Type", 
            values: ["auto", "avoid", "avoid-page", "avoid-column", "avoid-region"], 
            description: "auto: default browser behavior (allows breaks), avoid: avoid breaks inside element, avoid-page: avoid page breaks inside, avoid-column: avoid column breaks inside, avoid-region: avoid region breaks inside" 
          },
        ],
      },
      {
        id: "object-fit",
        name: "Object Fit",
        description: "Controls how replaced elements like images and videos should be resized and positioned within their containers. This is crucial for responsive design, allowing media to adapt beautifully to different container dimensions without distortion. In Tailwind v4, object-fit utilities work seamlessly with aspect-ratio and other modern layout features.",
        category: "layout",
        examples: [
          { 
            code: '<div class="w-full h-64 bg-gray-200">\n  <img class="w-full h-full object-cover" src="example.jpg" alt="Cover example">\n</div>', 
            description: "Cover: image fills container while maintaining aspect ratio, may crop edges" 
          },
          { 
            code: '<div class="w-full h-64 bg-gray-200">\n  <img class="w-full h-full object-contain" src="example.jpg" alt="Contain example">\n</div>', 
            description: "Contain: image fits entirely within container while maintaining aspect ratio, may have space around it" 
          },
          { 
            code: '<!-- Comparison of different object-fit values -->\n<div class="grid grid-cols-1 md:grid-cols-3 gap-4">\n  <div class="aspect-video bg-gray-100">\n    <img class="w-full h-full object-cover" src="example.jpg" alt="Cover">\n    <p class="text-center text-sm mt-2">object-cover</p>\n  </div>\n  <div class="aspect-video bg-gray-100">\n    <img class="w-full h-full object-contain" src="example.jpg" alt="Contain">\n    <p class="text-center text-sm mt-2">object-contain</p>\n  </div>\n  <div class="aspect-video bg-gray-100">\n    <img class="w-full h-full object-fill" src="example.jpg" alt="Fill">\n    <p class="text-center text-sm mt-2">object-fill</p>\n  </div>\n</div>', 
            description: "Visual comparison of different object-fit values" 
          },
          { 
            code: '<!-- Hero section with background image -->\n<section class="relative h-96">\n  <img class="absolute inset-0 w-full h-full object-cover" src="hero.jpg" alt="Hero image">\n  <div class="absolute inset-0 bg-black bg-opacity-40"></div>\n  <div class="relative h-full flex items-center justify-center p-6 text-white">\n    <div class="text-center">\n      <h1 class="text-4xl font-bold mb-4">Welcome to Our Site</h1>\n      <p class="text-xl">Discover amazing content and services</p>\n    </div>\n  </div>\n</section>', 
            description: "Real-world example of a hero section with object-cover for the background image" 
          }
        ],
        variants: [
          { 
            name: "Fit", 
            values: ["contain", "cover", "fill", "none", "scale-down"], 
            description: "contain: scales to fit entirely within box, maintaining aspect ratio; cover: fills entire box, maintaining aspect ratio (may crop); fill: stretches to fill box, ignoring aspect ratio; none: not resized; scale-down: like contain or none, whichever is smaller" 
          },
        ],
      },
      {
        id: "object-position",
        name: "Object Position",
        description: "Controls the positioning of replaced elements like images and videos within their containing box when using object-fit. This allows you to focus on specific parts of media that should remain visible when cropped. In Tailwind v4, object-position works fluidly with other modern layout utilities and supports logical properties for better RTL handling.",
        category: "layout",
        examples: [
          { 
            code: '<div class="w-full h-64 bg-gray-200">\n  <img class="w-full h-full object-cover object-center" src="example.jpg" alt="Centered image">\n</div>', 
            description: "Center positioning (default)" 
          },
          { 
            code: '<div class="w-full h-64 bg-gray-200">\n  <img class="w-full h-full object-cover object-top" src="example.jpg" alt="Top-aligned image">\n</div>', 
            description: "Top positioning - ensures the top of the image remains visible when cropped" 
          },
          { 
            code: '<!-- Gallery with different focus points -->\n<div class="grid grid-cols-2 md:grid-cols-3 gap-4">\n  <div class="aspect-square bg-gray-100 overflow-hidden">\n    <img class="w-full h-full object-cover object-center" src="image1.jpg" alt="Center focused">\n  </div>\n  <div class="aspect-square bg-gray-100 overflow-hidden">\n    <img class="w-full h-full object-cover object-top" src="image2.jpg" alt="Top focused">\n  </div>\n  <div class="aspect-square bg-gray-100 overflow-hidden">\n    <img class="w-full h-full object-cover object-bottom" src="image3.jpg" alt="Bottom focused">\n  </div>\n  <div class="aspect-square bg-gray-100 overflow-hidden">\n    <img class="w-full h-full object-cover object-left" src="image4.jpg" alt="Left focused">\n  </div>\n  <div class="aspect-square bg-gray-100 overflow-hidden">\n    <img class="w-full h-full object-cover object-right" src="image5.jpg" alt="Right focused">\n  </div>\n  <div class="aspect-square bg-gray-100 overflow-hidden">\n    <img class="w-full h-full object-cover object-left-top" src="image6.jpg" alt="Top-left focused">\n  </div>\n</div>', 
            description: "Gallery demonstrating different object-position values for photo composition" 
          },
          { 
            code: '<!-- Product image with focus on details -->\n<div class="w-full max-w-md mx-auto">\n  <div class="aspect-[4/3] bg-gray-100 overflow-hidden mb-4 rounded-lg">\n    <img class="w-full h-full object-cover object-bottom" src="product.jpg" alt="Product details" />\n  </div>\n  <div class="flex gap-2 overflow-x-auto py-2">\n    <!-- Thumbnail navigation -->\n    <button class="w-16 h-16 flex-shrink-0 rounded overflow-hidden border-2 border-blue-500">\n      <img class="w-full h-full object-cover object-top" src="product.jpg" alt="View top" />\n    </button>\n    <button class="w-16 h-16 flex-shrink-0 rounded overflow-hidden border-2 border-transparent hover:border-blue-500">\n      <img class="w-full h-full object-cover object-center" src="product.jpg" alt="View center" />\n    </button>\n    <button class="w-16 h-16 flex-shrink-0 rounded overflow-hidden border-2 border-transparent hover:border-blue-500">\n      <img class="w-full h-full object-cover object-bottom" src="product.jpg" alt="View bottom" />\n    </button>\n  </div>\n</div>', 
            description: "Product imagery that uses object-position to highlight different parts of the product" 
          }
        ],
        variants: [
          { 
            name: "Position", 
            values: ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], 
            description: "Positions the image within its container when using object-fit: bottom, center (default), top, left, right, and combined positions like left-top (top-left corner)" 
          },
        ],
      },
      {
        id: "overflow",
        name: "Overflow",
        description: "Controls what happens to content that extends beyond its container's boundaries. This is essential for managing how scrolling behaves, whether content should be clipped, or if scrollbars should appear. In Tailwind v4, overflow utilities have improved handling with modern scrolling behaviors and are fully compatible with other layout utilities.",
        category: "layout",
        examples: [
          { 
            code: '<div class="overflow-hidden h-32 w-full bg-gray-100 rounded">\n  <p class="p-4">This content is clipped if it overflows the container height...</p>\n  <p class="p-4">Additional content that extends beyond the visible area will be hidden.</p>\n  <p class="p-4">More content to demonstrate overflow.</p>\n</div>', 
            description: "Hidden overflow - content extending beyond container is clipped" 
          },
          { 
            code: '<div class="overflow-auto h-32 w-full bg-gray-100 rounded">\n  <p class="p-4">This container has scrollbars when needed...</p>\n  <p class="p-4">Additional content that extends beyond the visible area can be scrolled to.</p>\n  <p class="p-4">More content to demonstrate overflow.</p>\n  <p class="p-4">Even more content to ensure scrolling is necessary.</p>\n</div>', 
            description: "Auto overflow - scrollbars appear only when content overflows" 
          },
          { 
            code: '<!-- Horizontal scrolling container -->\n<div class="overflow-x-auto overflow-y-hidden h-32 w-full bg-gray-100 rounded">\n  <div class="flex space-x-4 p-4">\n    <div class="flex-shrink-0 w-48 h-20 bg-blue-200 rounded-lg flex items-center justify-center">Card 1</div>\n    <div class="flex-shrink-0 w-48 h-20 bg-blue-300 rounded-lg flex items-center justify-center">Card 2</div>\n    <div class="flex-shrink-0 w-48 h-20 bg-blue-400 rounded-lg flex items-center justify-center">Card 3</div>\n    <div class="flex-shrink-0 w-48 h-20 bg-blue-500 rounded-lg flex items-center justify-center">Card 4</div>\n    <div class="flex-shrink-0 w-48 h-20 bg-blue-600 rounded-lg flex items-center justify-center">Card 5</div>\n  </div>\n</div>', 
            description: "Horizontal-only scrolling container for a card carousel" 
          },
          { 
            code: '<!-- Code block with scroll -->\n<div class="max-w-xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">\n  <div class="flex items-center px-4 py-2 bg-gray-900">\n    <div class="h-3 w-3 rounded-full bg-red-500 mr-2"></div>\n    <div class="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>\n    <div class="h-3 w-3 rounded-full bg-green-500"></div>\n  </div>\n  <div class="overflow-auto max-h-80 p-4 text-sm font-mono text-gray-200">\n    <pre>// This code block has overflow-auto to allow scrolling\nfunction exampleCode() {\n  const longFunction = () => {\n    console.log("This is a long function");\n    console.log("With multiple lines");\n    console.log("To demonstrate scrolling");\n    return Array(50).fill(0).map((_, i) => `Line ${i + 1} of the output`);\n  };\n  \n  return longFunction();\n}</pre>\n  </div>\n</div>', 
            description: "Code block with scrollable content - common pattern for displaying code samples" 
          }
        ],
        variants: [
          { 
            name: "Behavior", 
            values: ["auto", "hidden", "clip", "visible", "scroll"], 
            description: "auto: adds scrollbars only when necessary; hidden: clips overflow content with no scrollbars; clip: like hidden but doesn't allow scrolling interactions at all; visible: content can overflow without being clipped; scroll: always shows scrollbars even when not needed" 
          },
          {
            name: "Direction", 
            values: ["overflow-x", "overflow-y"], 
            description: "overflow-x: controls horizontal overflow behavior; overflow-y: controls vertical overflow behavior - these can be combined with any behavior value (e.g., overflow-x-auto overflow-y-hidden)"
          }
        ],
      },
      {
        id: "overscroll-behavior",
        name: "Overscroll Behavior",
        description: "Controls what happens when a user scrolls beyond the boundaries of a scrolling area. This prevents scroll chaining, where reaching the end of a scrollable element causes the parent container or page to scroll. In Tailwind v4, overscroll utilities provide improved handling of nested scrollable areas for a more polished user experience.",
        category: "layout",
        examples: [
          { 
            code: '<div class="h-screen overflow-auto overscroll-contain">\n  <!-- Long scrollable content -->\n  <div class="h-[200vh] bg-gradient-to-b from-blue-100 to-blue-500 p-6">\n    <h2 class="text-xl font-bold">Contained Overscroll Example</h2>\n    <p>Scroll to the bottom - notice that when you reach the end, the page behind doesn\'t scroll (no bounce/scroll chaining).</p>\n  </div>\n</div>', 
            description: "Contained overscroll - prevents scroll chaining and bounce effects" 
          },
          { 
            code: '<!-- Modal with independent scrolling area -->\n<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">\n  <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] flex flex-col">\n    <div class="p-4 border-b">\n      <h2 class="text-xl font-bold">Modal Title</h2>\n    </div>\n    <div class="overflow-y-auto overscroll-contain p-4 flex-grow">\n      <!-- Modal content that might be lengthy -->\n      <div class="space-y-4">\n        <p>This modal body can scroll independently.</p>\n        <p>When you reach the end of this scrollable area, the page behind won\'t scroll.</p>\n        <!-- Add more content to make it scrollable -->\n        <div class="h-96 bg-gray-100 rounded flex items-center justify-center">Tall content area</div>\n        <p>More content after the tall area.</p>\n      </div>\n    </div>\n    <div class="p-4 border-t">\n      <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Close</button>\n    </div>\n  </div>\n</div>', 
            description: "Modal with independent scrolling that doesn't affect the page behind it" 
          },
          { 
            code: '<!-- Chat interface with message list and fixed input -->\n<div class="flex flex-col h-96 border rounded-lg shadow-md">\n  <!-- Header -->\n  <div class="bg-gray-100 p-3 border-b">\n    <h3 class="font-medium">Chat Window</h3>\n  </div>\n  <!-- Message area with contained overscroll -->\n  <div class="flex-grow overflow-y-auto overscroll-contain p-4 space-y-4">\n    <!-- Messages -->\n    <div class="bg-blue-100 p-3 rounded-lg ml-auto max-w-[80%]">\n      <p>Hello! This is a message from me.</p>\n    </div>\n    <div class="bg-gray-100 p-3 rounded-lg mr-auto max-w-[80%]">\n      <p>Hi there! This is a reply message.</p>\n    </div>\n    <!-- Add more messages to make it scrollable -->\n    <div class="bg-blue-100 p-3 rounded-lg ml-auto max-w-[80%]">\n      <p>Once you reach the top or bottom of this message list, the scroll won\'t "chain" to the page.</p>\n    </div>\n  </div>\n  <!-- Fixed input area -->\n  <div class="p-3 border-t bg-white">\n    <div class="flex">\n      <input type="text" class="flex-grow border rounded-l-lg p-2" placeholder="Type a message...">\n      <button class="bg-blue-500 text-white p-2 rounded-r-lg">Send</button>\n    </div>\n  </div>\n</div>', 
            description: "Chat interface with contained scrolling for messages list, preventing overscroll bounce effects" 
          }
        ],
        variants: [
          { 
            name: "Behavior", 
            values: ["auto", "contain", "none"], 
            description: "auto: default browser behavior (may include bounce effects and scroll chaining); contain: prevents scroll chaining but may still show bounce effects; none: prevents both scroll chaining and bounce effects" 
          },
          {
            name: "Direction", 
            values: ["overscroll-x", "overscroll-y"], 
            description: "overscroll-x: controls horizontal overscroll behavior; overscroll-y: controls vertical overscroll behavior"
          }
        ],
      },
      {
        id: "position",
        name: "Position",
        description: "Determines how an element is positioned in the document flow. This fundamental layout utility influences how elements are stacked, how they interact with other elements, and how they respond to scrolling. In Tailwind v4, position utilities are enhanced with better interoperability with other layout utilities like Grid and Flexbox.",
        category: "layout",
        examples: [
          { 
            code: '<div class="relative bg-gray-200 p-8 h-32">\n  <div class="absolute top-0 right-0 bg-blue-500 text-white p-2">Absolute to parent</div>\n  <p>This is the relative parent container.</p>\n</div>', 
            description: "Basic positioning with relative parent and absolute child" 
          },
          { 
            code: '<div class="h-64 bg-gray-100 p-8 overflow-y-auto relative">\n  <div class="sticky top-0 bg-white z-10 p-4 border-b font-bold">Sticky Header</div>\n  <div class="py-4">\n    <p>Content that will scroll beneath the sticky header...</p>\n    <p class="mt-4">More content to enable scrolling.</p>\n    <p class="mt-4">Keep scrolling to see the sticky header in action.</p>\n    <p class="mt-4">Even more content to ensure scrolling is possible.</p>\n  </div>\n</div>', 
            description: "Sticky header that remains visible while scrolling" 
          },
          { 
            code: '<!-- Fixed navigation with scrollable content -->\n<div class="h-64 bg-gray-100 relative">\n  <div class="fixed top-0 left-0 right-0 bg-blue-600 text-white p-4">\n    <div class="mx-auto max-w-7xl flex justify-between items-center">\n      <div class="font-bold">Fixed Navigation</div>\n      <div class="flex space-x-4">\n        <a href="#" class="hover:text-blue-200">Home</a>\n        <a href="#" class="hover:text-blue-200">About</a>\n        <a href="#" class="hover:text-blue-200">Contact</a>\n      </div>\n    </div>\n  </div>\n  <div class="pt-16 p-4"><!-- Adjust padding-top to account for fixed header -->\n    <h2 class="text-xl font-bold mb-4">Page Content</h2>\n    <p>This content scrolls beneath the fixed navigation bar.</p>\n  </div>\n</div>', 
            description: "Fixed navigation bar that remains in place while the page scrolls" 
          },
          { 
            code: '<!-- Modal or dialog with an overlay -->\n<div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">\n  <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 m-4 relative">\n    <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">\n      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>\n      </svg>\n    </button>\n    <h2 class="text-xl font-bold mb-4">Modal Title</h2>\n    <p class="mb-6">This modal uses fixed positioning to display over the page content with an overlay.</p>\n    <div class="flex justify-end space-x-2">\n      <button class="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>\n      <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Confirm</button>\n    </div>\n  </div>\n</div>', 
            description: "Modal overlay using fixed positioning to appear above page content" 
          }
        ],
        variants: [
          { 
            name: "Type", 
            values: ["static", "relative", "absolute", "fixed", "sticky"], 
            description: "static: default normal flow positioning; relative: positioned relative to normal position, creates a positioning context; absolute: positioned relative to nearest positioned ancestor; fixed: positioned relative to viewport, stays in place during scrolling; sticky: hybrid of relative and fixed, toggles between them based on scroll position" 
          },
        ],
      },
      {
        id: "inset",
        name: "Top / Right / Bottom / Left",
        description: "Controls the placement of positioned elements (absolute, fixed, or sticky) by setting the distance from each edge of their containing box. These utilities are used with positioned elements to precisely control their location. In Tailwind v4, these utilities support logical properties for better RTL language support and have improved integration with layout containment.",
        category: "layout",
        examples: [
          { 
            code: '<div class="relative h-32 w-full bg-gray-200">\n  <div class="absolute inset-0 bg-blue-200 bg-opacity-50">Full overlay (inset-0)</div>\n</div>', 
            description: "Using inset-0 to create a full overlay within a container" 
          },
          { 
            code: '<div class="relative h-64 w-full bg-gray-200">\n  <div class="absolute top-0 right-0 bg-red-500 p-2 text-white">Top Right</div>\n  <div class="absolute top-0 left-0 bg-blue-500 p-2 text-white">Top Left</div>\n  <div class="absolute bottom-0 right-0 bg-green-500 p-2 text-white">Bottom Right</div>\n  <div class="absolute bottom-0 left-0 bg-yellow-500 p-2 text-white">Bottom Left</div>\n</div>', 
            description: "Positioning elements in the four corners of a container" 
          },
          { 
            code: '<!-- Notification badge on an icon -->\n<div class="relative inline-block">\n  <svg class="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>\n  </svg>\n  <div class="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">3</div>\n</div>', 
            description: "Notification badge positioned at the top-right of an icon" 
          },
          { 
            code: '<!-- Hero section with centered content and image background -->\n<div class="relative h-96 overflow-hidden">\n  <!-- Background image with overlay -->\n  <div class="absolute inset-0">\n    <img src="example.jpg" alt="Background" class="w-full h-full object-cover">\n    <div class="absolute inset-0 bg-black bg-opacity-40"></div>\n  </div>\n  <!-- Centered content -->\n  <div class="absolute inset-0 flex items-center justify-center">\n    <div class="text-white text-center p-4">\n      <h1 class="text-4xl font-bold mb-4">Welcome to our Website</h1>\n      <p class="text-xl mb-6">Discover amazing features and content</p>\n      <button class="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium">Get Started</button>\n    </div>\n  </div>\n</div>', 
            description: "Hero section with background image and centered content using absolute positioning" 
          }
        ],
        variants: [
          { 
            name: "Edges", 
            values: ["inset", "inset-x", "inset-y", "top", "right", "bottom", "left", "start", "end"], 
            description: "inset: all sides at once; inset-x: left and right; inset-y: top and bottom; top/right/bottom/left: individual sides; start/end: logical properties for RTL support (start corresponds to left in LTR and right in RTL)" 
          },
          {
            name: "Size", 
            values: ["0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "5", "6", "8", "10", "12", "14", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "72", "80", "96", "auto", "1/2", "1/3", "2/3", "1/4", "2/4", "3/4", "full"],
            description: "Distance from the edge: number values use the spacing scale where 1 = 0.25rem (4px); fractional values represent portions of the containing element; auto applies browser-determined value; full = 100%"
          }
        ],
      },
      {
        id: "visibility",
        name: "Visibility",
        description: "Controls whether an element is visually perceivable without affecting its layout. Unlike display:none (which removes the element from the flow), visibility: hidden makes an element invisible while still occupying space. In Tailwind v4, visibility utilities have improved interaction with animation and transition utilities for more sophisticated UI effects.",
        category: "layout",
        examples: [
          { 
            code: '<div class="space-y-4">\n  <div class="p-4 bg-blue-100 rounded">Visible element</div>\n  <div class="invisible p-4 bg-red-100 rounded">Invisible element (still takes up space)</div>\n  <div class="p-4 bg-green-100 rounded">Another visible element</div>\n</div>', 
            description: "Comparing visible and invisible elements - note that the invisible element still occupies space" 
          },
          { 
            code: '<!-- Tooltip implementation -->\n<div class="relative inline-block">\n  <button class="bg-blue-500 text-white px-4 py-2 rounded">Hover me</button>\n  <div class="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-gray-900 text-white text-sm px-3 py-1 rounded pointer-events-none transition-opacity opacity-0 group-hover:opacity-100">\n    Tooltip text\n    <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>\n  </div>\n</div>', 
            description: "Tooltip using visibility and opacity for a smooth appearance effect" 
          },
          { 
            code: '<!-- Accessible content for screen readers only -->\n<button class="relative px-4 py-2 bg-blue-500 text-white rounded">\n  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>\n  </svg>\n  <span class="sr-only">Previous page</span>\n</button>', 
            description: "Making content visually hidden but accessible to screen readers using the sr-only utility (which uses specialized visibility techniques)" 
          },
          { 
            code: '<!-- Loading state with placeholder -->\n<div class="max-w-md mx-auto border rounded-lg overflow-hidden shadow-md flex flex-col h-96">\n  <div class="border-b p-3 bg-white">\n    <h3 class="font-bold">Chat with Support</h3>\n  </div>\n  \n  <div class="max-h-[calc(100%-8rem)] overflow-y-auto flex-grow p-4 bg-gray-50">\n    <div class="flex flex-col space-y-3">\n      <div class="bg-gray-200 p-3 rounded-lg self-start max-w-[80%]">\n        <p>Hello! How can I help you today?</p>\n      </div>\n      <div class="bg-blue-500 text-white p-3 rounded-lg self-end max-w-[80%]">\n        <p>I\'m having an issue with my recent order.</p>\n      </div>\n      <div class="bg-gray-200 p-3 rounded-lg self-start max-w-[80%]">\n        <p>I\'m sorry to hear that. Could you provide your order number?</p>\n      </div>\n      <div class="bg-blue-500 text-white p-3 rounded-lg self-end max-w-[80%]">\n        <p>Sure, it\'s #12345-67890.</p>\n      </div>\n      <div class="bg-gray-200 p-3 rounded-lg self-start max-w-[80%]">\n        <p>Thank you! I can see your order. What seems to be the issue?</p>\n      </div>\n      <div class="bg-blue-500 text-white p-3 rounded-lg self-end max-w-[80%]">\n        <p>I received the wrong item in my package.</p>\n      </div>\n      <div class="bg-gray-200 p-3 rounded-lg self-start max-w-[80%]">\n        <p>I understand. I\'ll help you resolve this right away. Could you describe what you received versus what you ordered?</p>\n      </div>\n    </div>\n  </div>\n  \n  <div class="p-3 bg-white border-t">\n    <div class="flex items-center space-x-2">\n      <input type="text" class="flex-grow p-2 border rounded-md" placeholder="Type a message...">\n      <button class="bg-blue-500 text-white p-2 rounded-md">\n        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>', 
            description: "Content placeholder that uses visibility to swap in real content when loaded" 
          }
        ],
        variants: [
          { 
            name: "State", 
            values: ["visible", "invisible", "collapse"], 
            description: "visible: normal visibility; invisible: element is not visible but still occupies space in layout; collapse: specialized value primarily for table rows/columns to remove them while potentially redistributing space" 
          },
        ],
      },
      {
        id: "z-index",
        name: "Z-Index",
        description: "Controls the stacking order of positioned elements (those with a position value other than static). Higher z-index values appear on top of elements with lower values. This is vital for creating layered interfaces like modals, tooltips, and sticky headers. In Tailwind v4, z-index utilities have better integration with stacking contexts created by modern CSS properties.",
        category: "layout",
        examples: [
          { 
            code: '<div class="relative h-32 w-full">\n  <div class="absolute inset-0 bg-blue-200 z-0">Background layer (z-0)</div>\n  <div class="absolute inset-y-0 left-1/4 right-1/4 bg-blue-400 z-10">Middle layer (z-10)</div>\n  <div class="absolute inset-y-0 left-1/3 right-1/3 flex items-center justify-center bg-blue-600 text-white z-20">Top layer (z-20)</div>\n</div>', 
            description: "Basic z-index stacking of three overlapping elements" 
          },
          { 
            code: '<!-- Dropdown menu with proper stacking -->\n<div class="relative inline-block text-left">\n  <div>\n    <button class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">Options</button>\n  </div>\n  <div class="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">\n    <div class="py-1" role="menu" aria-orientation="vertical">\n      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Account settings</a>\n      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Support</a>\n      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>\n    </div>\n  </div>\n</div>', 
            description: "Dropdown menu that uses z-index to appear above other content" 
          },
          { 
            code: '<!-- Complex UI with multiple stacking layers -->\n<div class="relative min-h-screen bg-gray-100 p-4">\n  <!-- Fixed header with shadow (high z-index) -->\n  <header class="fixed top-0 inset-x-0 bg-white shadow-md z-40 px-4 py-3">\n    <div class="max-w-7xl mx-auto flex justify-between items-center">\n      <div class="font-bold text-lg">Site Title</div>\n      <nav class="space-x-4">\n        <a href="#" class="text-gray-700 hover:text-blue-600">Home</a>\n        <a href="#" class="text-gray-700 hover:text-blue-600">About</a>\n        <a href="#" class="text-gray-700 hover:text-blue-600">Contact</a>\n      </nav>\n    </div>\n  </header>\n\n  <!-- Main content (goes beneath header) -->\n  <main class="pt-16 max-w-7xl mx-auto">\n    <div class="relative bg-white rounded-lg shadow-md p-6 my-4">\n      <h2 class="text-xl font-bold mb-4">Content with Tooltip</h2>\n      <p>This paragraph has a \n        <span class="relative inline-block">\n          tooltip\n          <span class="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 bg-gray-900 text-white text-xs px-2 py-1 rounded z-10">I\'m a tooltip with z-10</span>\n        </span>\n        that appears above it with a higher z-index.\n      </p>\n    </div>\n  </main>\n\n  <!-- Modal (highest z-index) -->\n  <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">\n    <div class="bg-white rounded-lg max-w-md w-full p-6">\n      <h3 class="text-lg font-medium mb-4">Modal Dialog</h3>\n      <p class="mb-4">This modal has the highest z-index (z-50) to appear above all other content.</p>\n      <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Close</button>\n    </div>\n  </div>\n</div>', 
            description: "Complex UI demonstrating z-index layering with header, tooltip, and modal" 
          },
          { 
            code: '<!-- Important note on stacking contexts -->\n<div class="relative transform" style="transform: translateZ(0);">\n  <!-- This creates a stacking context -->\n  <div class="relative bg-white p-4 border rounded z-10">I have z-10</div>\n  \n  <!-- This is outside the stacking context -->\n  <div class="absolute inset-0 m-8 bg-blue-200 z-20">I have z-20 but appear BEHIND the z-10 element because it\'s in a different stacking context</div>\n</div>\n\n<p class="text-sm text-gray-500 mt-4">NOTE: z-index only works between elements within the same stacking context. Many CSS properties create new stacking contexts (transform, opacity < 1, filter, etc.)</p>', 
            description: "Demonstrating how stacking contexts affect z-index behavior" 
          }
        ],
        variants: [
          { 
            name: "Level", 
            values: ["0", "10", "20", "30", "40", "50", "auto", "-10", "-20", "-30", "-40", "-50"], 
            description: "Numeric values represent the stacking level, with higher numbers appearing on top. z-auto defers to the browser's default stacking algorithm. Negative values place elements behind their siblings with auto z-index."
          },
        ],
      },
    ],
  },

  // --- Flexbox & Grid Category ---
  {
    id: "flexbox-grid",
    name: "Flexbox & Grid",
    description: "Powerful utilities for creating flexible, responsive layouts using CSS Flexbox and Grid. These modern layout systems make it easier to design complex interfaces that adapt to different screen sizes. In Tailwind v4, Flexbox and Grid utilities are enhanced with better support for logical properties (start/end instead of left/right) and improved interaction with other modern CSS features.",
    icon: "grid",
    color: "bg-green-500",
    functions: [
      {
        id: "flex-direction",
        name: "Flex Direction",
        description: "Controls the direction in which flex items are placed in the flex container. This is fundamental for responsive layouts where you might want elements to stack vertically on mobile but appear side-by-side on larger screens. The flex direction utility is often your starting point when building a flex-based layout and works alongside other flex utilities like justify-content and align-items.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="flex flex-row gap-4">\n  <div class="p-4 bg-blue-100">Item 1</div>\n  <div class="p-4 bg-blue-200">Item 2</div>\n  <div class="p-4 bg-blue-300">Item 3</div>\n</div>', 
            description: "Default row direction (horizontal, left to right)" 
          },
          { 
            code: '<div class="flex flex-col gap-4">\n  <div class="p-4 bg-green-100">Item 1</div>\n  <div class="p-4 bg-green-200">Item 2</div>\n  <div class="p-4 bg-green-300">Item 3</div>\n</div>', 
            description: "Column direction (vertical, top to bottom)" 
          },
          { 
            code: '<!-- Responsive layout: column on mobile, row on desktop -->\n<div class="flex flex-col md:flex-row gap-6">\n  <div class="w-full md:w-1/3 p-4 bg-gray-100 rounded-lg">\n    <h2 class="font-bold text-lg mb-2">Sidebar</h2>\n    <p>This will be on top on mobile, but to the left on desktop.</p>\n  </div>\n  <div class="w-full md:w-2/3 p-4 bg-white rounded-lg shadow">\n    <h2 class="font-bold text-xl mb-4">Main Content</h2>\n    <p>This will be below the sidebar on mobile, but to the right on desktop.</p>\n  </div>\n</div>', 
            description: "Common responsive pattern - stacks vertically on small screens, horizontally on larger ones" 
          }
        ],
        variants: [
          { 
            name: "Direction", 
            values: ["row", "row-reverse", "col", "col-reverse"], 
            description: "row: items arranged horizontally (default), row-reverse: items arranged horizontally in reverse order, col: items arranged vertically, col-reverse: items arranged vertically in reverse order" 
          },
        ],
      },
      {
        id: "flex-wrap",
        name: "Flex Wrap",
        description: "Controls whether flex items should wrap onto multiple lines or be forced into a single line. This is essential for responsive design, allowing items to adapt to different screen sizes by either wrapping to new lines when space is limited or maintaining a single row or column. Flex wrap works with flex-direction to determine the layout behavior.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="flex flex-wrap gap-4">\n  <div class="p-4 bg-blue-100 w-32">Item 1</div>\n  <div class="p-4 bg-blue-200 w-32">Item 2</div>\n  <div class="p-4 bg-blue-300 w-32">Item 3</div>\n  <div class="p-4 bg-blue-400 w-32">Item 4</div>\n  <div class="p-4 bg-blue-500 w-32">Item 5</div>\n</div>', 
            description: "Items wrap to the next line when they run out of space" 
          },
          { 
            code: '<div class="flex flex-nowrap overflow-x-auto gap-4 p-4 bg-gray-100">\n  <div class="flex-shrink-0 p-4 bg-blue-100 w-32">Item 1</div>\n  <div class="flex-shrink-0 p-4 bg-blue-200 w-32">Item 2</div>\n  <div class="flex-shrink-0 p-4 bg-blue-300 w-32">Item 3</div>\n  <div class="flex-shrink-0 p-4 bg-blue-400 w-32">Item 4</div>\n  <div class="flex-shrink-0 p-4 bg-blue-500 w-32">Item 5</div>\n  <div class="flex-shrink-0 p-4 bg-blue-600 w-32">Item 6</div>\n  <div class="flex-shrink-0 p-4 bg-blue-700 w-32">Item 7</div>\n</div>', 
            description: "Items don't wrap but instead create a horizontal scrolling container" 
          },
          { 
            code: '<!-- Tag/chip cloud that wraps -->\n<div class="flex flex-wrap gap-2 max-w-lg">\n  <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">HTML</div>\n  <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">CSS</div>\n  <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">JavaScript</div>\n  <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">React</div>\n  <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Tailwind CSS</div>\n  <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Node.js</div>\n  <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Express</div>\n  <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">MongoDB</div>\n  <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">GraphQL</div>\n  <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">TypeScript</div>\n</div>', 
            description: "Tag cloud that wraps tags to multiple lines as needed" 
          },
          { 
            code: '<!-- Horizontal scrolling cards vs wrapping cards based on screen size -->\n<div class="md:flex md:flex-wrap flex flex-nowrap overflow-x-auto md:overflow-visible gap-4 pb-4">\n  <div class="flex-shrink-0 md:flex-shrink w-64 md:w-1/3 lg:w-1/4 bg-white rounded-lg shadow-md overflow-hidden">\n    <div class="h-32 bg-blue-300"></div>\n    <div class="p-4">\n      <h3 class="font-bold">Card 1</h3>\n      <p class="text-gray-600">Cards scroll horizontally on mobile but wrap on desktop.</p>\n    </div>\n  </div>\n  <!-- Repeat for multiple cards -->\n  <div class="flex-shrink-0 md:flex-shrink w-64 md:w-1/3 lg:w-1/4 bg-white rounded-lg shadow-md overflow-hidden">\n    <div class="h-32 bg-blue-400"></div>\n    <div class="p-4">\n      <h3 class="font-bold">Card 2</h3>\n      <p class="text-gray-600">The layout changes based on screen size.</p>\n    </div>\n  </div>\n  <div class="flex-shrink-0 md:flex-shrink w-64 md:w-1/3 lg:w-1/4 bg-white rounded-lg shadow-md overflow-hidden">\n    <div class="h-32 bg-blue-500"></div>\n    <div class="p-4">\n      <h3 class="font-bold">Card 3</h3>\n      <p class="text-gray-600">This is a responsive pattern for card layouts.</p>\n    </div>\n  </div>\n</div>', 
            description: "Responsive pattern: scrolling cards on mobile, wrapping grid on desktop" 
          }
        ],
        variants: [
          { 
            name: "Wrap", 
            values: ["wrap", "wrap-reverse", "nowrap"], 
            description: "wrap: items wrap onto multiple lines when needed, wrap-reverse: items wrap onto multiple lines in reverse order, nowrap: items are forced into a single line (default)" 
          },
        ],
      },
      {
        id: "flex",
        name: "Flex",
        description: "Sets how a flex item grows or shrinks to fit available space. This shorthand combines flex-grow, flex-shrink, and flex-basis into a single declaration, controlling how items resize within their container. Understanding the flex utility is key to creating responsive, flexible layouts where elements adapt properly to different screen sizes and content amounts.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="flex gap-4">\n  <div class="flex-1 p-4 bg-blue-100">flex-1: Grows and shrinks as needed</div>\n  <div class="flex-1 p-4 bg-blue-200">flex-1: Equal growing with sibling</div>\n</div>', 
            description: "Basic flex-1 example where items grow equally to fill the container" 
          },
          { 
            code: '<div class="flex gap-4">\n  <div class="flex-none w-32 p-4 bg-blue-100">Fixed width</div>\n  <div class="flex-1 p-4 bg-blue-200">Flexible width</div>\n  <div class="flex-initial w-64 p-4 bg-blue-300">Initial width, can shrink</div>\n</div>', 
            description: "Comparing flex-none, flex-1, and flex-initial behaviors" 
          },
          { 
            code: '<!-- Sidebar and main content layout -->\n<div class="flex flex-col md:flex-row h-screen">\n  <!-- Sidebar - fixed width on desktop, full width on mobile -->\n  <div class="flex-none md:w-64 bg-gray-100 p-4 border-b md:border-r md:border-b-0">\n    <h2 class="font-bold text-lg mb-4">Sidebar</h2>\n    <nav class="space-y-2">\n      <a href="#" class="block px-3 py-2 rounded hover:bg-gray-200">Dashboard</a>\n      <a href="#" class="block px-3 py-2 rounded hover:bg-gray-200">Projects</a>\n      <a href="#" class="block px-3 py-2 rounded hover:bg-gray-200">Calendar</a>\n      <a href="#" class="block px-3 py-2 rounded hover:bg-gray-200">Reports</a>\n    </nav>\n  </div>\n  <!-- Main content - grows to fill remaining space -->\n  <div class="flex-1 overflow-auto p-6">\n    <h1 class="text-2xl font-bold mb-6">Main Content</h1>\n    <p class="mb-4">This area will grow to fill all available space. The sidebar has a fixed width on desktop, but expands to full width on mobile.</p>\n    <p>The layout is responsive and will stack vertically on smaller screens.</p>\n  </div>\n</div>', 
            description: "Common sidebar layout pattern using flex utilities" 
          },
          { 
            code: '<!-- Form with label and input field alignment -->\n<form class="max-w-md space-y-4">\n  <div class="flex flex-wrap items-center gap-4">\n    <label for="name" class="flex-none w-24">Name:</label>\n    <input id="name" type="text" class="flex-1 min-w-64 border rounded px-3 py-2">\n  </div>\n  <div class="flex flex-wrap items-center gap-4">\n    <label for="email" class="flex-none w-24">Email:</label>\n    <input id="email" type="email" class="flex-1 min-w-64 border rounded px-3 py-2">\n  </div>\n  <div class="flex flex-wrap items-start gap-4">\n    <label for="message" class="flex-none w-24 pt-2">Message:</label>\n    <textarea id="message" class="flex-1 min-w-64 border rounded px-3 py-2 h-32"></textarea>\n  </div>\n  <div class="self-end mt-6 flex justify-end">\n    <button type="button" class="px-4 py-2 border rounded mr-2">Cancel</button>\n    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Save Changes</button>\n  </div>\n</form>', 
            description: "Form layout with consistent label widths and flexible input fields" 
          }
        ],
        variants: [
          { 
            name: "Value", 
            values: ["1", "auto", "initial", "none"], 
            description: "flex-1: grow and shrink as needed, take up any available space (1 1 0%), flex-auto: grow and shrink based on content size (1 1 auto), flex-initial: shrink but don't grow (0 1 auto), flex-none: don't grow or shrink (0 0 auto)" 
          },
        ],
      },
      {
        id: "flex-grow",
        name: "Flex Grow",
        description: "Controls the ability of a flex item to grow when there is extra space in the flex container. This utility helps distribute available space proportionally between flex items. Items with higher grow values receive a larger portion of the available space. In Tailwind v4, flex-grow utilities work better with other layout features and responsive variants.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="flex gap-4">\n  <div class="grow-0 p-4 w-20 bg-blue-100">Not growing</div>\n  <div class="grow p-4 bg-blue-300">Growing to fill available space</div>\n  <div class="grow-0 p-4 w-20 bg-blue-100">Not growing</div>\n</div>', 
            description: "Basic contrast between grow and grow-0 items" 
          },
          { 
            code: '<div class="flex gap-4">\n  <div class="grow p-4 bg-blue-100">Grow: 1</div>\n  <div class="grow-[2] p-4 bg-blue-300">Grow: 2 (gets 2x the extra space)</div>\n  <div class="grow p-4 bg-blue-100">Grow: 1</div>\n</div>', 
            description: "Using arbitrary values to distribute space proportionally" 
          },
          { 
            code: '<!-- App layout with header, main, and footer -->\n<div class="flex flex-col min-h-screen">\n  <!-- Header - doesn\'t grow -->\n  <header class="grow-0 shrink-0 bg-blue-600 text-white p-4">\n    <h1 class="text-xl font-bold">App Title</h1>\n  </header>\n  \n  <!-- Main content - grows to fill available space -->\n  <main class="grow p-6 overflow-auto">\n    <h2 class="text-xl font-bold mb-4">Main Content</h2>\n    <p class="mb-4">This area will grow to push the footer to the bottom of the viewport, even when content is short.</p>\n    <p>The header and footer remain at fixed heights.</p>\n  </main>\n  \n  <!-- Footer - doesn\'t grow -->\n  <footer class="grow-0 shrink-0 bg-gray-200 p-4 text-center">\n    <p>&copy; 2025 Example Company</p>\n  </footer>\n</div>', 
            description: "Common page layout with sticky footer using flex-grow" 
          },
          { 
            code: '<!-- Card with flexible header and footer -->\n<div class="flex flex-col h-80 w-64 bg-white rounded-lg shadow-md overflow-hidden">\n  <!-- Card header - fixed height -->\n  <div class="grow-0 shrink-0 bg-blue-500 text-white p-4">\n    <h3 class="font-bold">Card Title</h3>\n  </div>\n  \n  <!-- Card content - grows to fill available space -->\n  <div class="grow overflow-auto p-4">\n    <p class="text-sm">This content area grows to fill the available space between the header and footer.</p>\n    <p class="text-sm mt-2">It will scroll if the content is too long to fit.</p>\n    <p class="text-sm mt-2">Additional content...</p>\n    <p class="text-sm mt-2">More content...</p>\n  </div>\n  \n  <!-- Card footer - fixed height -->\n  <div class="grow-0 shrink-0 bg-gray-100 p-3 border-t flex justify-end">\n    <button class="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">Action</button>\n  </div>\n</div>', 
            description: "Card with fixed header/footer and flexible content area" 
          }
        ],
        variants: [
          { 
            name: "Value", 
            values: ["0", "1"], 
            description: "grow-0: item doesn't grow (flex-grow: 0), grow: item can grow to take up available space (flex-grow: 1); arbitrary values can be specified using square bracket notation, e.g., grow-[2]" 
          },
        ],
      },
      {
        id: "flex-shrink",
        name: "Flex Shrink",
        description: "Controls the ability of a flex item to shrink when there isn't enough space in the flex container. This is crucial for responsive designs, determining how items behave when space becomes limited. Items with higher shrink values will reduce their size more aggressively when needed. In Tailwind v4, flex-shrink utilities have improved responsive behavior.",
        category: "flexbox-grid",
        examples: [
          {
            code: '<div class="flex w-80 bg-gray-100 overflow-hidden">\n  <div class="shrink p-4 bg-blue-100 whitespace-nowrap">Can shrink when needed</div>\n  <div class="shrink-0 p-4 bg-blue-300 whitespace-nowrap">Won\'t ever shrink</div>\n</div>',
            description: "Comparing shrink vs shrink-0 (non-shrinking) items"
          },
          {
            code: '<!-- Horizontal navigation with shrinking menu items -->\n<nav class="flex w-full bg-white border-b overflow-x-auto">\n  <a href="#" class="shrink-0 px-6 py-4 text-blue-600 border-b-2 border-blue-600 font-medium">Home</a>\n  <a href="#" class="shrink px-6 py-4 text-gray-700 hover:text-blue-600 whitespace-nowrap">Our Products</a>\n  <a href="#" class="shrink px-6 py-4 text-gray-700 hover:text-blue-600 whitespace-nowrap">Customer Support</a>\n  <a href="#" class="shrink px-6 py-4 text-gray-700 hover:text-blue-600 whitespace-nowrap">Documentation</a>\n  <a href="#" class="shrink px-6 py-4 text-gray-700 hover:text-blue-600 whitespace-nowrap">Resources</a>\n  <a href="#" class="shrink-0 ml-auto px-6 py-4 bg-blue-600 text-white">Contact Us</a>\n</nav>',
            description: "Navigation bar with shrinking menu items and non-shrinking action button"
          },
          {
            code: '<!-- File browser panel with resizable sections -->\n<div class="flex h-80 bg-white border rounded overflow-hidden">\n  <!-- Sidebar - can shrink when space is limited -->\n  <div class="shrink w-64 min-w-20 bg-gray-100 border-r p-4 overflow-auto">\n    <h3 class="font-bold mb-3">Folders</h3>\n    <ul class="space-y-1">\n      <li><a href="#" class="block px-2 py-1 rounded hover:bg-gray-200">Documents</a></li>\n      <li><a href="#" class="block px-2 py-1 rounded hover:bg-gray-200">Images</a></li>\n      <li><a href="#" class="block px-2 py-1 rounded hover:bg-gray-200">Videos</a></li>\n      <li><a href="#" class="block px-2 py-1 rounded hover:bg-gray-200">Downloads</a></li>\n    </ul>\n  </div>\n  \n  <!-- Main content - grows and can shrink -->\n  <div class="grow shrink min-w-0 p-4 overflow-auto">\n    <h2 class="text-lg font-bold mb-3">Files</h2>\n    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">\n      <!-- File items -->\n      <div class="p-3 border rounded hover:bg-gray-50">\n        <div class="w-full aspect-square bg-blue-100 mb-2 flex items-center justify-center text-blue-500">DOC</div>\n        <div class="truncate text-sm">Document.docx</div>\n      </div>\n      <!-- More file items -->\n    </div>\n  </div>\n  \n  <!-- Preview panel - won\'t shrink -->\n  <div class="shrink-0 w-80 bg-gray-50 border-l p-4">\n    <h3 class="font-bold mb-3">Preview</h3>\n    <div class="bg-white border rounded p-4 h-60 flex items-center justify-center">\n      <p class="text-gray-500">Select a file to preview</p>\n    </div>\n  </div>\n</div>',
            description: "File browser with resizable panels using flex-shrink"
          }
        ],
        variants: [
          { 
            name: "Value", 
            values: ["0", "1"], 
            description: "shrink-0: item doesn't shrink (flex-shrink: 0), shrink: item can shrink when needed (flex-shrink: 1); arbitrary values can be specified using square bracket notation, e.g., shrink-[2]" 
          },
        ],
      },
      {
        id: "order",
        name: "Order",
        description: "Controls the order in which flex or grid items appear within their container, regardless of their source order in the HTML. This is powerful for responsive designs, allowing you to rearrange elements based on screen size without changing the HTML structure. In Tailwind v4, order utilities have improved integration with other layout systems and better accessibility considerations.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="flex">\n  <div class="order-3 p-4 bg-blue-300">First in HTML, third visually</div>\n  <div class="order-1 p-4 bg-blue-100">Second in HTML, first visually</div>\n  <div class="order-2 p-4 bg-blue-200">Third in HTML, second visually</div>\n</div>', 
            description: "Basic ordering of flex items regardless of source order" 
          },
          { 
            code: '<!-- Responsive reordering -->\n<div class="flex flex-col sm:flex-row">\n  <!-- On mobile: 1st, On desktop: 2nd -->\n  <div class="order-1 sm:order-2 p-4 bg-green-100 sm:w-1/3">\n    <h2 class="font-bold">Sidebar</h2>\n    <p>On mobile, I appear first. On desktop, I move to the right.</p>\n  </div>\n  \n  <!-- On mobile: 2nd, On desktop: 1st -->\n  <div class="order-2 sm:order-1 p-4 bg-blue-100 sm:w-2/3">\n    <h2 class="font-bold">Main Content</h2>\n    <p>On mobile, I appear second. On desktop, I move to the left.</p>\n  </div>\n</div>', 
            description: "Responsive ordering that changes based on screen size" 
          },
          { 
            code: '<!-- Card with responsive element reordering -->\n<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">\n  <!-- Image - top on mobile, left on desktop -->\n  <div class="order-1 md:order-1 md:w-1/3 h-48 md:h-auto bg-blue-300 flex items-center justify-center">\n    <span class="text-white font-bold">Image</span>\n  </div>\n  \n  <div class="flex flex-col md:flex-row">\n    <!-- Title - first in content on all screens -->\n    <div class="order-1 p-4 md:w-2/3">\n      <h2 class="text-xl font-bold">Card Title</h2>\n      <p class="mt-2 text-gray-600">Card description that explains more about the item.</p>\n      \n      <!-- Action buttons - last on mobile, moves up on desktop -->\n      <div class="order-3 md:order-2 mt-4 flex space-x-2">\n        <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Action</button>\n        <button class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">Secondary</button>\n      </div>\n      \n      <!-- Metadata - middle on mobile, last on desktop -->\n      <div class="order-2 md:order-3 mt-4 pt-4 border-t text-sm text-gray-500">\n        <p>Created: April 3, 2025</p>\n        <p>Category: Example</p>\n      </div>\n    </div>\n  </div>\n</div>', 
            description: "Card with complex responsive reordering of elements" 
          },
          { 
            code: '<!-- Hero section with reversed source order for better semantics -->\n<section class="bg-gray-100 py-16">\n  <div class="container mx-auto px-4">\n    <div class="flex flex-wrap items-center">\n      <!-- Content - semantically first in HTML, visually second on desktop -->\n      <div class="w-full lg:w-1/2 order-2 lg:order-1 mt-8 lg:mt-0">\n        <h1 class="text-3xl md:text-4xl font-bold mb-4">Better HTML Structure with Order</h1>\n        <p class="text-lg text-gray-700 mb-6">By using the order utility, we can put the most important content first in the HTML (better for SEO and screen readers) while visually displaying it where it makes sense in the design.</p>\n        <button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Get Started</button>\n      </div>\n      \n      <!-- Image - semantically second in HTML, visually first on desktop -->\n      <div class="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center">\n        <div class="w-full max-w-md h-64 bg-blue-200 rounded-lg flex items-center justify-center">\n          <span class="text-blue-800 font-bold">Hero Image</span>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>', 
            description: "Semantic HTML order with visual reordering for a hero section" 
          }
        ],
        variants: [
          { 
            name: "Value", 
            values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "first", "last", "none"], 
            description: "Numeric values (1-12) set the order position, first is equivalent to order: -9999, last is equivalent to order: 9999, none resets to the default order: 0" 
          },
        ],
      },
      {
        id: "grid-template-columns",
        name: "Grid Template Columns",
        description: "Defines the columns in a CSS Grid layout. This utility allows you to create complex, two-dimensional layouts with precise control over both rows and columns. Grid Template Columns sets up the horizontal tracks in your grid, defining how many columns you want and how they should size themselves. In Tailwind v4, grid utilities have enhanced support for modern features like subgrid and masonry layouts.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="grid grid-cols-3 gap-4">\n  <div class="bg-blue-100 p-4">Column 1</div>\n  <div class="bg-blue-200 p-4">Column 2</div>\n  <div class="bg-blue-300 p-4">Column 3</div>\n</div>', 
            description: "Basic 3-column grid with equal width columns" 
          },
          { 
            code: '<div class="grid grid-cols-12 gap-4">\n  <div class="col-span-4 bg-green-100 p-4">Spans 4 columns</div>\n  <div class="col-span-8 bg-green-200 p-4">Spans 8 columns</div>\n  <div class="col-span-6 bg-green-300 p-4">Spans 6 columns</div>\n  <div class="col-span-6 bg-green-400 p-4">Spans 6 columns</div>\n</div>', 
            description: "12-column grid with items spanning multiple columns" 
          },
          { 
            code: '<!-- Responsive grid that changes based on screen size -->\n<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">\n  <div class="bg-white p-6 rounded-lg shadow-md">\n    <h3 class="font-bold text-lg mb-2">Card 1</h3>\n    <p>This grid responsively adapts from 1 column on mobile, to 4 columns on extra large screens.</p>\n  </div>\n  <!-- More cards... -->\n  <div class="bg-white p-6 rounded-lg shadow-md">\n    <h3 class="font-bold text-lg mb-2">Card 2</h3>\n    <p>Each card takes full width on mobile, half width on medium screens, and so on.</p>\n  </div>\n  <div class="bg-white p-6 rounded-lg shadow-md">\n    <h3 class="font-bold text-lg mb-2">Card 3</h3>\n    <p>This creates a responsive card grid that works across all devices.</p>\n  </div>\n  <div class="bg-white p-6 rounded-lg shadow-md">\n    <h3 class="font-bold text-lg mb-2">Card 4</h3>\n    <p>No media queries needed - just Tailwind\'s responsive utilities.</p>\n  </div>\n</div>', 
            description: "Advanced responsive grid layout that adapts across breakpoints" 
          },
          { 
            code: '<!-- Complex layout with mixed column sizes -->\n<div class="grid grid-cols-6 gap-4">\n  <div class="col-span-6 md:col-span-4 bg-purple-100 p-4 rounded-lg">\n    <h2 class="font-bold mb-2">Main Content</h2>\n    <p>This area spans 4 of 6 columns on medium screens and up, but full width on mobile.</p>\n  </div>\n  <div class="col-span-6 md:col-span-2 bg-purple-200 p-4 rounded-lg">\n    <h2 class="font-bold mb-2">Sidebar</h2>\n    <p>This area spans 2 of 6 columns on medium screens and up, but full width on mobile.</p>\n  </div>\n  <div class="col-span-3 md:col-span-2 bg-purple-300 p-4 rounded-lg">\n    <h3 class="font-bold">Section 1</h3>\n    <p>Half width on mobile, 2/6 on desktop.</p>\n  </div>\n  <div class="col-span-3 md:col-span-2 bg-purple-300 p-4 rounded-lg">\n    <h3 class="font-bold">Section 2</h3>\n    <p>Half width on mobile, 2/6 on desktop.</p>\n  </div>\n  <div class="col-span-6 md:col-span-2 bg-purple-300 p-4 rounded-lg">\n    <h3 class="font-bold">Section 3</h3>\n    <p>Full width on mobile, 2/6 on desktop.</p>\n  </div>\n</div>', 
            description: "Complex layout with different column spans at various breakpoints" 
          }
        ],
        variants: [
          { 
            name: "Columns", 
            values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "none"], 
            description: "Specifies the number of columns in the grid. grid-cols-3 creates three equal-width columns. grid-cols-none removes any explicitly defined columns. You can also use arbitrary values with grid-cols-[200px_1fr_2fr] for custom column patterns." 
          },
        ],
      },
      {
        id: "grid-column",
        name: "Grid Column Start / End",
        description: "Controls how an element spans across columns in a CSS Grid. Using grid-column-start and grid-column-end (or the shorthand grid-column), you can position items precisely within a grid, making them span multiple columns, or place them in specific column tracks. Combined with responsive variants, this provides powerful control over complex layouts at different screen sizes.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="grid grid-cols-4 gap-4">\n  <div class="bg-blue-100 p-4">1</div>\n  <div class="col-span-2 bg-blue-300 p-4">Spans 2 columns</div>\n  <div class="bg-blue-100 p-4">4</div>\n</div>', 
            description: "Basic example of an item spanning multiple columns" 
          },
          { 
            code: '<div class="grid grid-cols-6 gap-4">\n  <div class="col-start-2 col-span-4 bg-green-200 p-4">Starts at column 2, spans 4 columns</div>\n  <div class="col-start-1 col-end-3 bg-green-300 p-4">From column 1 to 3</div>\n  <div class="col-end-7 col-span-2 bg-green-400 p-4">Spans 2 columns, ends at column 7</div>\n  <div class="col-start-1 col-end-7 bg-green-500 p-4">Full width (columns 1-7)</div>\n</div>', 
            description: "Explicit positioning using start and end column lines" 
          },
          { 
            code: '<!-- Magazine-style layout with varying column spans -->\n<div class="grid grid-cols-12 gap-6">\n  <!-- Header spanning all columns -->\n  <header class="col-span-12 bg-blue-600 text-white p-6 rounded-lg">\n    <h1 class="text-2xl font-bold">Magazine Layout</h1>\n  </header>\n  \n  <!-- Main article spanning 8 columns -->\n  <article class="col-span-12 md:col-span-8 bg-white p-6 rounded-lg shadow-md">\n    <h2 class="text-xl font-bold mb-4">Main Feature Article</h2>\n    <p class="mb-4">This is the main content area that spans 8 columns on medium screens and up.</p>\n    <p>It takes full width on mobile for better readability on small screens.</p>\n  </article>\n  \n  <!-- Sidebar spanning 4 columns -->\n  <aside class="col-span-12 md:col-span-4 bg-gray-100 p-6 rounded-lg">\n    <h3 class="font-bold mb-3">Related Content</h3>\n    <ul class="space-y-2">\n      <li>Sidebar item 1</li>\n      <li>Sidebar item 2</li>\n      <li>Sidebar item 3</li>\n    </ul>\n  </aside>\n  \n  <!-- Three feature boxes, each spanning 4 columns -->\n  <div class="col-span-12 md:col-span-4 bg-blue-100 p-4 rounded-lg">\n    <h3 class="font-bold mb-2">Feature 1</h3>\n    <p>Each of these spans 4 columns on desktop.</p>\n  </div>\n  <div class="col-span-12 md:col-span-4 bg-blue-100 p-4 rounded-lg">\n    <h3 class="font-bold mb-2">Feature 2</h3>\n    <p>On mobile they stack vertically for better readability.</p>\n  </div>\n  <div class="col-span-12 md:col-span-4 bg-blue-100 p-4 rounded-lg">\n    <h3 class="font-bold mb-2">Feature 3</h3>\n    <p>This creates a responsive, magazine-style layout.</p>\n  </div>\n  \n  <!-- Footer spanning full width -->\n  <footer class="col-span-12 bg-gray-200 p-4 rounded-lg text-center">\n    <p>Footer content</p>\n  </footer>\n</div>', 
            description: "Magazine-style responsive layout with varied column spans" 
          },
          { 
            code: '<!-- Advanced grid layout with column spans and precise placement -->\n<div class="grid grid-cols-6 gap-4 p-4 bg-gray-100 rounded-lg">\n  <!-- Header area -->\n  <div class="col-span-6 p-4 bg-blue-500 text-white rounded-lg">\n    <h1 class="text-xl font-bold">Grid Layout Example</h1>\n  </div>\n  \n  <!-- Sidebar -->\n  <div class="col-span-6 sm:col-span-2 md:col-span-1 row-span-3 p-4 bg-blue-200 rounded-lg">\n    <h2 class="font-bold mb-2">Sidebar</h2>\n    <ul class="space-y-2 text-sm">\n      <li>Navigation 1</li>\n      <li>Navigation 2</li>\n      <li>Navigation 3</li>\n    </ul>\n  </div>\n  \n  <!-- Main content area -->\n  <div class="col-span-6 sm:col-span-4 md:col-span-4 row-span-2 p-4 bg-white rounded-lg shadow-md">\n    <h2 class="text-lg font-bold mb-2">Main Content</h2>\n    <p>This is the main content area that spans different numbers of columns based on screen size.</p>\n  </div>\n  \n  <!-- Right sidebar -->\n  <div class="col-span-6 sm:col-span-6 md:col-span-1 row-span-3 p-4 bg-blue-100 rounded-lg">\n    <h2 class="font-bold mb-2">Right Bar</h2>\n    <div class="space-y-3">\n      <div class="p-2 bg-white rounded">Widget 1</div>\n      <div class="p-2 bg-white rounded">Widget 2</div>\n    </div>\n  </div>\n  \n  <!-- Lower content blocks -->\n  <div class="col-span-3 sm:col-span-2 md:col-span-2 p-4 bg-green-100 rounded-lg">\n    <h3 class="font-bold">Section A</h3>\n    <p class="text-sm">Content for section A.</p>\n  </div>\n  \n  <div class="col-span-3 sm:col-span-2 md:col-span-2 p-4 bg-green-100 rounded-lg">\n    <h3 class="font-bold">Section B</h3>\n    <p class="text-sm">Content for section B.</p>\n  </div>\n  \n  <!-- Footer -->\n  <div class="col-span-6 p-4 bg-gray-200 rounded-lg text-center">\n    <p>Footer content</p>\n  </div>\n</div>', 
            description: "Complex dashboard-like layout with responsive column spans and grid placement" 
          }
        ],
        variants: [
          { 
            name: "Span", 
            values: ["auto", "span-1", "span-2", "span-3", "span-4", "span-5", "span-6", "span-7", "span-8", "span-9", "span-10", "span-11", "span-12", "span-full", "start-1", "start-2", "start-3", "start-4", "start-5", "start-6", "start-7", "start-auto", "end-1", "end-2", "end-3", "end-4", "end-5", "end-6", "end-7", "end-auto"], 
            description: "col-span-{number}: spans the specified number of columns; col-span-full: spans all columns; col-start-{number}: starts at the specified column line; col-end-{number}: ends at the specified column line; auto values use grid auto-placement algorithm" 
          },
        ],
      },
      {
        id: "grid-template-rows",
        name: "Grid Template Rows",
        description: "Defines the rows in a CSS Grid layout, allowing you to control the vertical tracks in your grid. While grid-template-columns handles the horizontal structure, grid-template-rows governs the height of each row. This is essential for creating well-defined grid layouts where you need control over both dimensions. In Tailwind v4, row utilities have improved compatibility with container queries and logical properties.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="grid grid-rows-3 grid-flow-col gap-4 h-48">\n  <div class="bg-blue-100 p-4">Row 1, Col 1</div>\n  <div class="bg-blue-200 p-4">Row 2, Col 1</div>\n  <div class="bg-blue-300 p-4">Row 3, Col 1</div>\n  <div class="bg-green-100 p-4">Row 1, Col 2</div>\n  <div class="bg-green-200 p-4">Row 2, Col 2</div>\n  <div class="bg-green-300 p-4">Row 3, Col 2</div>\n</div>', 
            description: "Basic 3-row grid with columns flowing automatically" 
          },
          { 
            code: '<div class="grid grid-rows-[200px_1fr_auto] gap-4 h-96 bg-gray-100 p-4 rounded-lg">\n  <div class="bg-blue-100 p-4 rounded">Fixed height (200px)</div>\n  <div class="bg-blue-200 p-4 rounded">Flexible height (1fr)</div>\n  <div class="bg-blue-300 p-4 rounded">Auto height based on content</div>\n</div>', 
            description: "Mixed row heights with fixed, flexible, and auto values" 
          },
          { 
            code: '<!-- App layout with header, content, and footer -->\n<div class="grid grid-rows-[auto_1fr_auto] h-screen">\n  <!-- Header with fixed height based on content -->\n  <header class="bg-blue-600 text-white p-4">\n    <h1 class="text-xl font-bold">Application Title</h1>\n  </header>\n  \n  <!-- Main content area that takes remaining space -->\n  <main class="overflow-auto p-6">\n    <div class="max-w-4xl mx-auto">\n      <h2 class="text-2xl font-bold mb-4">Main Content</h2>\n      <p class="mb-4">This area will grow to fill the available vertical space, pushing the footer to the bottom.</p>\n      <p class="mb-4">The grid-rows-[auto_1fr_auto] creates a layout with:</p>\n      <ul class="list-disc pl-6 space-y-2 mb-4">\n        <li>Header: height based on its content (auto)</li>\n        <li>Main: takes all remaining space (1fr)</li>\n        <li>Footer: height based on its content (auto)</li>\n      </ul>\n      \n      <p>This produces a classic "sticky footer" layout without needing flexbox.</p>\n      \n      <!-- Add more content to demonstrate scrolling -->\n      <div class="h-96 mt-8 bg-gray-100 rounded-lg flex items-center justify-center">\n        <p>Scroll area to show overflow behavior</p>\n      </div>\n    </div>\n  </main>\n  \n  <!-- Footer with fixed height based on content -->\n  <footer class="bg-gray-200 p-4 text-center">\n    <p>&copy; 2025 Example Company</p>\n  </footer>\n</div>', 
            description: "Full-page app layout with header, scrollable content, and footer" 
          },
          { 
            code: '<!-- Dashboard layout with grid rows and columns -->\n<div class="grid grid-rows-[auto_1fr_auto] grid-cols-12 min-h-screen gap-4 p-4">\n  <!-- Header spanning all columns -->\n  <header class="col-span-12 bg-blue-600 text-white p-4 rounded-lg">\n    <div class="flex justify-between items-center">\n      <h1 class="text-xl font-bold">Dashboard</h1>\n      <div>\n        <button class="px-4 py-2 bg-blue-700 rounded hover:bg-blue-800">Sign Out</button>\n      </div>\n    </div>\n  </header>\n  \n  <!-- Sidebar spanning full height of middle row -->\n  <aside class="col-span-12 md:col-span-3 row-span-1 bg-gray-100 p-4 rounded-lg overflow-auto">\n    <nav class="space-y-2">\n      <a href="#" class="block p-2 bg-blue-500 text-white rounded">Dashboard</a>\n      <a href="#" class="block p-2 hover:bg-gray-200 rounded">Analytics</a>\n      <a href="#" class="block p-2 hover:bg-gray-200 rounded">Reports</a>\n      <a href="#" class="block p-2 hover:bg-gray-200 rounded">Users</a>\n      <a href="#" class="block p-2 hover:bg-gray-200 rounded">Settings</a>\n    </nav>\n  </aside>\n  \n  <!-- Main content area -->\n  <main class="col-span-12 md:col-span-9 row-span-1 overflow-auto">\n    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">\n      <!-- Dashboard widgets -->\n      <div class="bg-white p-4 rounded-lg shadow-md">Widget 1</div>\n      <div class="bg-white p-4 rounded-lg shadow-md">Widget 2</div>\n      <div class="bg-white p-4 rounded-lg shadow-md">Widget 3</div>\n      <div class="bg-white p-4 rounded-lg shadow-md">Widget 4</div>\n      <div class="bg-white p-4 rounded-lg shadow-md">Widget 5</div>\n      <div class="bg-white p-4 rounded-lg shadow-md">Widget 6</div>\n    </div>\n  </main>\n  \n  <!-- Footer spanning all columns -->\n  <footer class="col-span-12 bg-gray-200 p-4 rounded-lg text-center">\n    <p>Footer content</p>\n  </footer>\n</div>', 
            description: "Complex dashboard layout combining row and column templates" 
          }
        ],
        variants: [
          { 
            name: "Rows", 
            values: ["1", "2", "3", "4", "5", "6", "none"], 
            description: "Specifies the number of rows in the grid. grid-rows-3 creates three equal-height rows. grid-rows-none removes explicitly defined rows. You can also use arbitrary values with grid-rows-[200px_1fr_auto] for custom row patterns." 
          },
        ],
      },
      {
        id: "grid-row",
        name: "Grid Row Start / End",
        description: "Controls how an element spans across rows in a CSS Grid. Similar to grid-column utilities, grid-row-start and grid-row-end (or the shorthand grid-row) let you position items vertically within a grid. This allows for precise placement and spanning across multiple rows. When combined with responsive variants, you gain powerful control over complex layouts that adapt to different screen sizes.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="grid grid-rows-3 grid-cols-3 gap-4 h-64">\n  <div class="row-span-2 bg-blue-300 p-4">Spans 2 rows</div>\n  <div class="bg-blue-100 p-4">1 row, 1 column</div>\n  <div class="bg-blue-100 p-4">1 row, 1 column</div>\n  <div class="row-span-3 bg-green-300 p-4">Spans all 3 rows</div>\n  <div class="bg-blue-100 p-4">1 row, 1 column</div>\n  <div class="bg-blue-100 p-4">1 row, 1 column</div>\n  <div class="bg-blue-100 p-4">1 row, 1 column</div>\n</div>', 
            description: "Basic example of items spanning multiple rows" 
          },
          { 
            code: '<div class="grid grid-rows-5 grid-cols-4 gap-4 h-80">\n  <div class="row-start-2 row-span-3 col-span-2 bg-purple-200 p-4">\n    Starts at row 2, spans 3 rows\n  </div>\n  <div class="row-start-1 row-end-3 col-start-3 col-end-5 bg-purple-300 p-4">\n    From row 1 to 3, columns 3-5\n  </div>\n  <div class="row-start-3 row-end-6 col-start-3 col-end-5 bg-purple-400 p-4">\n    From row 3 to 6, columns 3-5\n  </div>\n</div>', 
            description: "Explicit positioning using start and end row lines" 
          },
          { 
            code: '<!-- Complex grid layout with mixed row and column spans -->\n<div class="grid grid-cols-4 grid-rows-4 gap-4 h-96 p-4 bg-gray-100 rounded-lg">\n  <!-- Header area -->\n  <div class="col-span-4 row-span-1 bg-blue-500 text-white p-4 rounded-lg flex items-center">\n    <h1 class="text-xl font-bold">Grid Dashboard</h1>\n  </div>\n  \n  <!-- Main content area -->\n  <div class="col-span-2 row-span-2 bg-white p-4 rounded-lg shadow-md overflow-auto">\n    <h2 class="font-bold mb-2">Main Content</h2>\n    <p>This area spans 2 columns and 2 rows, creating a large content section.</p>\n    <div class="mt-4 h-20 bg-blue-50 rounded p-3">Additional content area</div>\n  </div>\n  \n  <!-- Right sidebar spanning 3 rows -->\n  <div class="col-span-2 row-span-3 col-start-3 row-start-2 bg-blue-100 p-4 rounded-lg">\n    <h2 class="font-bold mb-2">Analytics</h2>\n    <div class="space-y-4">\n      <div class="h-20 bg-white rounded-lg p-3 shadow-sm">Chart 1</div>\n      <div class="h-20 bg-white rounded-lg p-3 shadow-sm">Chart 2</div>\n      <div class="h-20 bg-white rounded-lg p-3 shadow-sm">Chart 3</div>\n    </div>\n  </div>\n  \n  <!-- Bottom widgets -->\n  <div class="col-span-1 row-span-1 bg-green-100 p-4 rounded-lg">\n    <h3 class="font-bold text-sm">Widget A</h3>\n  </div>\n  \n  <div class="col-span-1 row-span-1 bg-green-100 p-4 rounded-lg">\n    <h3 class="font-bold text-sm">Widget B</h3>\n  </div>\n  \n  <!-- Footer -->\n  <div class="col-span-4 row-span-1 bg-gray-200 p-3 rounded-lg flex items-center justify-center">\n    <p class="text-sm text-gray-600">Footer</p>\n  </div>\n</div>', 
            description: "Dashboard layout with complex row and column positioning" 
          },
          { 
            code: '<!-- Responsive layout that changes row spans based on screen size -->\n<div class="grid grid-cols-1 md:grid-cols-3 grid-rows-none md:grid-rows-4 gap-4 p-4 bg-gray-100 rounded-lg min-h-[600px]">\n  <div class="bg-white p-4 rounded-lg shadow-md row-span-1 md:row-span-2">\n    <h2 class="font-bold mb-2">Section A</h2>\n    <p>This section spans 1 row on mobile and 2 rows on desktop.</p>\n  </div>\n  \n  <div class="bg-white p-4 rounded-lg shadow-md row-span-1 md:row-span-4">\n    <h2 class="font-bold mb-2">Section B</h2>\n    <p>This section spans 1 row on mobile and all 4 rows on desktop.</p>\n    <div class="mt-4 space-y-2">\n      <div class="h-8 bg-gray-100 rounded"></div>\n      <div class="h-8 bg-gray-100 rounded"></div>\n      <div class="h-8 bg-gray-100 rounded"></div>\n    </div>\n  </div>\n  \n  <div class="bg-white p-4 rounded-lg shadow-md row-span-1 md:row-span-2">\n    <h2 class="font-bold mb-2">Section C</h2>\n    <p>This section spans 1 row on mobile and 2 rows on desktop.</p>\n  </div>\n  \n  <div class="bg-white p-4 rounded-lg shadow-md md:col-span-2 row-span-1 md:col-start-1 md:row-start-3">\n    <h2 class="font-bold mb-2">Section D</h2>\n    <p>This section spans 1 row on mobile and desktop, but takes 2 columns on desktop.</p>\n  </div>\n  \n  <div class="bg-white p-4 rounded-lg shadow-md md:col-span-2 row-span-1 md:col-start-1 md:row-start-4">\n    <h2 class="font-bold mb-2">Section E</h2>\n    <p>This section spans 1 row on mobile and desktop, but takes 2 columns on desktop.</p>\n  </div>\n</div>', 
            description: "Responsive layout with different row spans at different breakpoints" 
          }
        ],
        variants: [
          { 
            name: "Span", 
            values: ["auto", "span-1", "span-2", "span-3", "span-4", "span-5", "span-6", "span-full", "start-1", "start-2", "start-3", "start-4", "start-5", "start-6", "start-7", "start-auto", "end-1", "end-2", "end-3", "end-4", "end-5", "end-6", "end-7", "end-auto"], 
            description: "row-span-{number}: spans the specified number of rows; row-span-full: spans all rows; row-start-{number}: starts at the specified row line; row-end-{number}: ends at the specified row line; auto values use grid auto-placement algorithm" 
          },
        ],
      },
      {
        id: "grid-auto-flow",
        name: "Grid Auto Flow",
        description: "Controls how the auto-placement algorithm works in CSS Grid, determining how items that aren't explicitly placed are automatically arranged. This utility helps manage the flow direction and density of automatically placed grid items. In Tailwind v4, grid-auto-flow utilities have improved compatibility with other grid features like grid-template-areas.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="grid grid-cols-3 grid-auto-flow-row gap-4">\n  <div class="bg-blue-100 p-4">1</div>\n  <div class="bg-blue-200 p-4">2</div>\n  <div class="bg-blue-300 p-4">3</div>\n  <div class="col-span-2 bg-blue-400 p-4">4 (spans 2 cols)</div>\n  <div class="bg-blue-500 p-4">5</div>\n  <div class="bg-blue-200 p-4">6</div>\n</div>', 
            description: "Default row flow - items fill rows first, moving to next row when needed" 
          },
          { 
            code: '<div class="grid grid-rows-3 grid-auto-flow-col gap-4 h-64">\n  <div class="bg-green-100 p-4">1</div>\n  <div class="bg-green-200 p-4">2</div>\n  <div class="bg-green-300 p-4">3</div>\n  <div class="row-span-2 bg-green-400 p-4">4 (spans 2 rows)</div>\n  <div class="bg-green-500 p-4">5</div>\n  <div class="bg-green-200 p-4">6</div>\n</div>', 
            description: "Column flow - items fill columns first, moving to next column when needed" 
          },
          { 
            code: '<!-- Dense packing for more efficient space usage -->\n<div class="grid grid-cols-3 grid-auto-flow-dense gap-4 p-4 bg-gray-100 rounded-lg">\n  <div class="bg-blue-100 p-4 rounded">1</div>\n  <div class="col-span-2 bg-blue-200 p-4 rounded">2 (spans 2 cols)</div>\n  <div class="col-span-2 bg-blue-300 p-4 rounded">3 (spans 2 cols)</div>\n  <div class="bg-blue-400 p-4 rounded">4</div>\n  <div class="bg-blue-500 p-4 rounded">5</div>\n  <!-- Note how item 5 fills the gap that would be left in normal flow -->\n</div>', 
            description: "Dense flow - fills in gaps by placing smaller items in available spaces" 
          },
          { 
            code: '<!-- Interactive gallery with mixed item sizes -->\n<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 grid-auto-flow-dense gap-3 p-4 bg-gray-100 rounded-lg">\n  <!-- Regular items -->\n  <div class="bg-blue-100 aspect-square rounded-lg flex items-center justify-center">1</div>\n  \n  <!-- Wide items -->\n  <div class="col-span-2 bg-blue-200 aspect-[2/1] rounded-lg flex items-center justify-center">Wide</div>\n  \n  <!-- Regular items -->\n  <div class="bg-blue-100 aspect-square rounded-lg flex items-center justify-center">3</div>\n  <div class="bg-blue-100 aspect-square rounded-lg flex items-center justify-center">4</div>\n  \n  <!-- Tall item -->\n  <div class="row-span-2 bg-blue-300 aspect-[1/2] rounded-lg flex items-center justify-center">Tall</div>\n  \n  <!-- Regular items -->\n  <div class="bg-blue-100 aspect-square rounded-lg flex items-center justify-center">6</div>\n  <div class="bg-blue-100 aspect-square rounded-lg flex items-center justify-center">7</div>\n  \n  <!-- Large item -->\n  <div class="col-span-2 row-span-2 bg-blue-400 aspect-square rounded-lg flex items-center justify-center">Large</div>\n  \n  <!-- More regular items to fill space -->\n  <div class="bg-blue-100 aspect-square rounded-lg flex items-center justify-center">9</div>\n  <div class="bg-blue-100 aspect-square rounded-lg flex items-center justify-center">10</div>\n  <div class="bg-blue-100 aspect-square rounded-lg flex items-center justify-center">11</div>\n  <div class="bg-blue-100 aspect-square rounded-lg flex items-center justify-center">12</div>\n</div>', 
            description: "Gallery-style layout with dense packing of different sized items" 
          }
        ],
        variants: [
          { 
            name: "Flow", 
            values: ["row", "col", "dense", "row-dense", "col-dense"], 
            description: "row: fills each row in order, moving to next row when full (default); col: fills each column in order, moving to next column when full; dense: attempts to fill holes earlier in the grid; row-dense: dense algorithm with row direction; col-dense: dense algorithm with column direction" 
          },
        ],
      },
      {
        id: "grid-auto-columns",
        name: "Grid Auto Columns",
        description: "Sets the size of implicitly created columns in a CSS Grid. While grid-template-columns defines explicit columns, grid-auto-columns controls the sizing of automatically generated columns that aren't explicitly defined. This is particularly useful for grids where the number of columns may vary or when using grid-auto-flow: column to create columns dynamically.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="grid grid-flow-col auto-cols-auto gap-4 p-4 bg-gray-100 rounded-lg">\n  <div class="bg-blue-100 p-4 rounded">Auto-sized column</div>\n  <div class="bg-blue-200 p-4 rounded">Content determines width</div>\n  <div class="bg-blue-300 p-4 rounded">Another auto-sized column</div>\n</div>', 
            description: "Auto columns sized based on their content" 
          },
          { 
            code: '<div class="grid grid-flow-col auto-cols-fr gap-4 p-4 bg-gray-100 rounded-lg">\n  <div class="bg-green-100 p-4 rounded">1fr</div>\n  <div class="bg-green-200 p-4 rounded">1fr</div>\n  <div class="bg-green-300 p-4 rounded">1fr</div>\n</div>', 
            description: "Auto columns that each take an equal fraction of available space" 
          },
          { 
            code: '<!-- Horizontal scrolling content with fixed column widths -->\n<div class="grid grid-flow-col auto-cols-[250px] gap-6 overflow-x-auto p-6 bg-gray-100 rounded-lg">\n  <div class="bg-white p-4 rounded-lg shadow-md h-64">\n    <h3 class="font-bold mb-2">Card 1</h3>\n    <p>Each card has a fixed width of 250px.</p>\n  </div>\n  <div class="bg-white p-4 rounded-lg shadow-md h-64">\n    <h3 class="font-bold mb-2">Card 2</h3>\n    <p>The container scrolls horizontally when needed.</p>\n  </div>\n  <div class="bg-white p-4 rounded-lg shadow-md h-64">\n    <h3 class="font-bold mb-2">Card 3</h3>\n    <p>This creates a carousel-like effect.</p>\n  </div>\n  <div class="bg-white p-4 rounded-lg shadow-md h-64">\n    <h3 class="font-bold mb-2">Card 4</h3>\n    <p>You can add as many cards as needed.</p>\n  </div>\n  <div class="bg-white p-4 rounded-lg shadow-md h-64">\n    <h3 class="font-bold mb-2">Card 5</h3>\n    <p>The grid-flow-col makes items flow into new columns.</p>\n  </div>\n</div>', 
            description: "Horizontal scrolling card layout with fixed width columns" 
          },
          { 
            code: '<!-- Mixed auto columns sizes -->\n<div class="grid grid-flow-col auto-cols-[min-content_1fr_max-content] gap-4 p-4 bg-gray-100 rounded-lg">\n  <div class="bg-purple-100 p-4 rounded whitespace-nowrap">Min content (width of content)</div>\n  <div class="bg-purple-200 p-4 rounded">Flexible (1fr)</div>\n  <div class="bg-purple-300 p-4 rounded whitespace-nowrap">Max content (width of content)</div>\n  \n  <!-- These go into implicit columns -->  \n  <div class="bg-purple-100 p-4 rounded whitespace-nowrap">Min content (next set)</div>\n  <div class="bg-purple-200 p-4 rounded">Flexible (next set)</div>\n  <div class="bg-purple-300 p-4 rounded whitespace-nowrap">Max content (next set)</div>\n</div>', 
            description: "Grid with repeating pattern of auto column sizes" 
          }
        ],
        variants: [
          { 
            name: "Size", 
            values: ["auto", "min", "max", "fr"], 
            description: "auto-cols-auto: size based on content; auto-cols-min: minimum size to fit content (min-content); auto-cols-max: maximum size to fit content (max-content); auto-cols-fr: equal fraction of available space (1fr); also supports arbitrary values with auto-cols-[200px] syntax" 
          },
        ],
      },
      {
        id: "grid-auto-rows",
        name: "Grid Auto Rows",
        description: "Sets the size of implicitly created rows in a CSS Grid. Similar to grid-auto-columns, this utility controls the sizing of automatically generated rows that aren't explicitly defined with grid-template-rows. This is essential for grids with dynamic content where the number of rows isn't known in advance or when using grid-auto-flow: row.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="grid grid-cols-3 auto-rows-auto gap-4 p-4 bg-gray-100 rounded-lg">\n  <div class="bg-blue-100 p-4 rounded">Auto-sized row</div>\n  <div class="bg-blue-200 p-8 rounded">Taller content</div>\n  <div class="bg-blue-300 p-4 rounded">Auto-sized row</div>\n  <div class="bg-blue-100 p-4 rounded">Next row</div>\n  <div class="bg-blue-200 p-4 rounded">Next row</div>\n  <div class="bg-blue-300 p-4 rounded">Next row</div>\n</div>', 
            description: "Auto rows sized based on their content" 
          },
          { 
            code: '<div class="grid grid-cols-3 auto-rows-[100px] gap-4 p-4 bg-gray-100 rounded-lg">\n  <div class="bg-green-100 p-4 rounded">Fixed height</div>\n  <div class="bg-green-200 p-4 rounded overflow-auto">Scrolling if content exceeds 100px height</div>\n  <div class="bg-green-300 p-4 rounded">Fixed height</div>\n  <div class="bg-green-100 p-4 rounded">Fixed height</div>\n  <div class="bg-green-200 p-4 rounded">Fixed height</div>\n  <div class="bg-green-300 p-4 rounded">Fixed height</div>\n</div>', 
            description: "Fixed height auto rows" 
          },
          { 
            code: '<!-- Dynamic content grid with minimum row height -->\n<div class="grid grid-cols-2 md:grid-cols-3 auto-rows-[minmax(100px,auto)] gap-4 p-4 bg-gray-100 rounded-lg">\n  <div class="bg-white p-4 rounded-lg shadow-md">\n    <h3 class="font-bold mb-2">Card 1</h3>\n    <p>Each row is at least 100px tall, but will expand if the content requires more space.</p>\n  </div>\n  <div class="bg-white p-4 rounded-lg shadow-md">\n    <h3 class="font-bold mb-2">Card 2</h3>\n    <p>Short content</p>\n  </div>\n  <div class="bg-white p-4 rounded-lg shadow-md">\n    <h3 class="font-bold mb-2">Card 3</h3>\n    <p>This creates a balanced grid with consistent minimum heights but flexible when needed.</p>\n    <p class="mt-2">Additional content that makes this card taller will cause the entire row to expand.</p>\n  </div>\n  <div class="bg-white p-4 rounded-lg shadow-md">\n    <h3 class="font-bold mb-2">Card 4</h3>\n    <p>Short content</p>\n  </div>\n  <div class="bg-white p-4 rounded-lg shadow-md">\n    <h3 class="font-bold mb-2">Card 5</h3>\n    <p>Each card in the same row will match the height of the tallest card.</p>\n  </div>\n</div>', 
            description: "Grid with minimum row height that expands for content" 
          },
          { 
            code: '<!-- Masonry-style layout with auto rows -->\n<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[50px] gap-4 p-4 bg-gray-100 rounded-lg">\n  <div class="row-span-2 bg-blue-100 p-4 rounded-lg">Height: 2 units</div>\n  <div class="row-span-3 bg-blue-200 p-4 rounded-lg">Height: 3 units</div>\n  <div class="row-span-1 bg-blue-300 p-4 rounded-lg">Height: 1 unit</div>\n  <div class="row-span-4 bg-blue-400 p-4 rounded-lg">Height: 4 units</div>\n  <div class="row-span-2 bg-blue-500 p-4 rounded-lg">Height: 2 units</div>\n  <div class="row-span-3 bg-blue-600 p-4 rounded-lg text-white">Height: 3 units</div>\n  <div class="row-span-2 bg-blue-700 p-4 rounded-lg text-white">Height: 2 units</div>\n  <div class="row-span-1 bg-blue-800 p-4 rounded-lg text-white">Height: 1 unit</div>\n  <div class="row-span-3 bg-blue-900 p-4 rounded-lg text-white">Height: 3 units</div>\n</div>', 
            description: "Masonry-inspired layout with row spans and fixed unit size" 
          }
        ],
        variants: [
          { 
            name: "Size", 
            values: ["auto", "min", "max", "fr"], 
            description: "auto-rows-auto: size based on content; auto-rows-min: minimum size to fit content (min-content); auto-rows-max: maximum size to fit content (max-content); auto-rows-fr: equal fraction of available space (1fr); also supports arbitrary values with auto-rows-[100px] or complex values like auto-rows-[minmax(100px,auto)]" 
          },
        ],
      },
      {
        id: "gap",
        name: "Gap",
        description: "Controls the spacing between rows and columns in grid and flexbox layouts. This utility provides a clean, consistent way to create gutters between elements without using margins that might cause layout issues. In Tailwind v4, gap utilities work with all layout modes and have improved compatibility with other spacing utilities.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="grid grid-cols-3 gap-4">\n  <div class="bg-blue-100 p-4 rounded">Item 1</div>\n  <div class="bg-blue-100 p-4 rounded">Item 2</div>\n  <div class="bg-blue-100 p-4 rounded">Item 3</div>\n  <div class="bg-blue-100 p-4 rounded">Item 4</div>\n  <div class="bg-blue-100 p-4 rounded">Item 5</div>\n  <div class="bg-blue-100 p-4 rounded">Item 6</div>\n</div>', 
            description: "Grid with uniform gap between all items (1rem)" 
          },
          { 
            code: '<div class="grid grid-cols-3 gap-x-8 gap-y-4">\n  <div class="bg-green-100 p-4 rounded">Item 1</div>\n  <div class="bg-green-100 p-4 rounded">Item 2</div>\n  <div class="bg-green-100 p-4 rounded">Item 3</div>\n  <div class="bg-green-100 p-4 rounded">Item 4</div>\n  <div class="bg-green-100 p-4 rounded">Item 5</div>\n  <div class="bg-green-100 p-4 rounded">Item 6</div>\n</div>', 
            description: "Grid with different horizontal (2rem) and vertical (1rem) gaps" 
          },
          { 
            code: '<!-- Flex layout with gap -->\n<div class="flex flex-wrap gap-4">\n  <div class="bg-blue-100 p-4 rounded-lg">Flex item 1</div>\n  <div class="bg-blue-200 p-4 rounded-lg">Flex item 2</div>\n  <div class="bg-blue-300 p-4 rounded-lg">Flex item 3</div>\n  <div class="bg-blue-400 p-4 rounded-lg">Flex item 4</div>\n  <div class="bg-blue-500 p-4 rounded-lg text-white">Flex item 5</div>\n</div>', 
            description: "Flexbox layout with gap between items" 
          },
          { 
            code: '<!-- Responsive gap that changes with screen size -->\n<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8">\n  <div class="bg-purple-100 p-4 rounded-lg">Item 1</div>\n  <div class="bg-purple-100 p-4 rounded-lg">Item 2</div>\n  <div class="bg-purple-100 p-4 rounded-lg">Item 3</div>\n  <div class="bg-purple-100 p-4 rounded-lg">Item 4</div>\n  <div class="bg-purple-100 p-4 rounded-lg">Item 5</div>\n  <div class="bg-purple-100 p-4 rounded-lg">Item 6</div>\n  <div class="bg-purple-100 p-4 rounded-lg">Item 7</div>\n  <div class="bg-purple-100 p-4 rounded-lg">Item 8</div>\n</div>', 
            description: "Responsive grid with gap that increases on larger screens" 
          }
        ],
        variants: [
          { 
            name: "Size", 
            values: ["0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "5", "6", "8", "10", "12", "14", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "72", "80", "96"], 
            description: "gap-{size}: applies to both row and column gaps; gap-x-{size}: applies only to column gaps; gap-y-{size}: applies only to row gaps; all using Tailwind's spacing scale where 1 unit = 0.25rem (4px)" 
          },
        ],
      },
      {
        id: "justify-content",
        name: "Justify Content",
        description: "Controls how items are positioned along the main axis of a flex or grid container. For a flex row, this is horizontal alignment; for a flex column, this is vertical alignment. This utility is fundamental for distributing space and aligning items within containers. In Tailwind v4, justify utilities have improved compatibility with logical properties for better RTL support.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="flex justify-start bg-gray-100 p-4 rounded-lg">\n  <div class="bg-blue-100 p-4 rounded">Start</div>\n  <div class="bg-blue-200 p-4 rounded">Center</div>\n  <div class="bg-blue-300 p-4 rounded">End</div>\n</div>', 
            description: "Items aligned to the start of the container" 
          },
          { 
            code: '<div class="flex justify-center bg-gray-100 p-4 rounded-lg">\n  <div class="bg-green-100 p-4 rounded">Start</div>\n  <div class="bg-green-200 p-4 rounded">Center</div>\n  <div class="bg-green-300 p-4 rounded">End</div>\n</div>', 
            description: "Items centered horizontally in the container" 
          },
          { 
            code: '<div class="flex justify-end bg-gray-100 p-4 rounded-lg">\n  <div class="bg-purple-100 p-4 rounded">Start</div>\n  <div class="bg-purple-200 p-4 rounded">Center</div>\n  <div class="bg-purple-300 p-4 rounded">End</div>\n</div>', 
            description: "Items aligned to the end of the container" 
          },
          { 
            code: '<!-- Distribute space between items -->\n<div class="flex justify-between bg-gray-100 p-4 rounded-lg">\n  <div class="bg-blue-100 p-4 rounded">First</div>\n  <div class="bg-blue-200 p-4 rounded">Middle</div>\n  <div class="bg-blue-300 p-4 rounded">Last</div>\n</div>', 
            description: "Space distributed between items (first item at start, last at end)" 
          },
          { 
            code: '<!-- Distribute space around items -->\n<div class="flex justify-around bg-gray-100 p-4 rounded-lg">\n  <div class="bg-green-100 p-4 rounded">First</div>\n  <div class="bg-green-200 p-4 rounded">Middle</div>\n  <div class="bg-green-300 p-4 rounded">Last</div>\n</div>', 
            description: "Space distributed around items (equal space around each item)" 
          },
          { 
            code: '<!-- Equal spacing between items -->\n<div class="flex justify-evenly bg-gray-100 p-4 rounded-lg">\n  <div class="bg-purple-100 p-4 rounded">First</div>\n  <div class="bg-purple-200 p-4 rounded">Middle</div>\n  <div class="bg-purple-300 p-4 rounded">Last</div>\n</div>', 
            description: "Space distributed evenly between items (equal space between items)" 
          },
          { 
            code: '<!-- Common layout patterns with justify-content -->\n<nav class="bg-white py-4 rounded-lg shadow-md mb-4">\n  <!-- Container with items at opposite ends -->\n  <div class="container mx-auto px-4 flex justify-between items-center">\n    <div class="font-bold text-xl">Logo</div>\n    <div class="flex space-x-4">\n      <a href="#" class="text-blue-600">Home</a>\n      <a href="#" class="text-gray-600">About</a>\n      <a href="#" class="text-gray-600">Contact</a>\n    </div>\n  </div>\n</nav>\n\n<footer class="bg-gray-100 py-4 rounded-lg mt-4">\n  <!-- Container with centered content -->\n  <div class="container mx-auto px-4 flex justify-center">\n    <p class="text-gray-600">&copy; 2025 Example Company</p>\n  </div>\n</footer>', 
            description: "Common layout patterns with different justify values" 
          }
        ],
        variants: [
          { 
            name: "Alignment", 
            values: ["normal", "start", "end", "center", "between", "around", "evenly", "stretch"], 
            description: "normal: default browser behavior; start: items packed at start of container; end: items packed at end of container; center: items centered in container; between: items evenly distributed with first at start and last at end; around: items evenly distributed with equal space around each; evenly: items evenly distributed with equal space between each; stretch: items stretched to fill container" 
          },
        ],
      },
      {
        id: "justify-items",
        name: "Justify Items",
        description: "Controls alignment of grid items along their inline (row) axis within their grid areas. While justify-content controls the alignment of the entire grid container's contents, justify-items controls individual grid items within their cells. This is particularly useful for grid layouts where you want consistent alignment of items within their allocated spaces.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="grid grid-cols-3 justify-items-start gap-4 bg-gray-100 p-4 rounded-lg">\n  <div class="bg-blue-100 p-4 rounded">Start aligned</div>\n  <div class="bg-blue-200 p-4 rounded">Start aligned</div>\n  <div class="bg-blue-300 p-4 rounded">Start aligned</div>\n  <div class="bg-blue-100 p-4 rounded">Start aligned</div>\n  <div class="bg-blue-200 p-4 rounded">Start aligned</div>\n  <div class="bg-blue-300 p-4 rounded">Start aligned</div>\n</div>', 
            description: "Grid items aligned to the start (left) of their grid cells" 
          },
          { 
            code: '<div class="grid grid-cols-3 justify-items-center gap-4 bg-gray-100 p-4 rounded-lg">\n  <div class="bg-green-100 p-4 rounded">Centered</div>\n  <div class="bg-green-200 p-4 rounded">Centered</div>\n  <div class="bg-green-300 p-4 rounded">Centered</div>\n  <div class="bg-green-100 p-4 rounded">Centered</div>\n  <div class="bg-green-200 p-4 rounded">Centered</div>\n  <div class="bg-green-300 p-4 rounded">Centered</div>\n</div>', 
            description: "Grid items centered horizontally within their grid cells" 
          },
          { 
            code: '<div class="grid grid-cols-3 justify-items-end gap-4 bg-gray-100 p-4 rounded-lg">\n  <div class="bg-purple-100 p-4 rounded">End aligned</div>\n  <div class="bg-purple-200 p-4 rounded">End aligned</div>\n  <div class="bg-purple-300 p-4 rounded">End aligned</div>\n  <div class="bg-purple-100 p-4 rounded">End aligned</div>\n  <div class="bg-purple-200 p-4 rounded">End aligned</div>\n  <div class="bg-purple-300 p-4 rounded">End aligned</div>\n</div>', 
            description: "Grid items aligned to the end (right) of their grid cells" 
          },
          { 
            code: '<div class="grid grid-cols-3 justify-items-stretch gap-4 bg-gray-100 p-4 rounded-lg">\n  <div class="bg-blue-100 p-4 rounded">Stretched</div>\n  <div class="bg-blue-200 p-4 rounded">Stretched</div>\n  <div class="bg-blue-300 p-4 rounded">Stretched</div>\n  <div class="bg-blue-100 p-4 rounded">Stretched</div>\n  <div class="bg-blue-200 p-4 rounded">Stretched</div>\n  <div class="bg-blue-300 p-4 rounded">Stretched</div>\n</div>', 
            description: "Grid items stretched to fill their grid cells horizontally (default behavior)" 
          },
          { 
            code: '<!-- Card layout with centered content in each cell -->\n<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center p-4 bg-gray-100 rounded-lg">\n  <div class="max-w-sm bg-white rounded-lg shadow-md overflow-hidden w-full">\n    <div class="h-40 bg-blue-200"></div>\n    <div class="p-4">\n      <h3 class="font-bold mb-2">Card Title 1</h3>\n      <p class="text-gray-600">Each card is centered in its grid cell but maintains its width.</p>\n    </div>\n  </div>\n  <div class="max-w-sm bg-white rounded-lg shadow-md overflow-hidden w-full">\n    <div class="h-40 bg-blue-300"></div>\n    <div class="p-4">\n      <h3 class="font-bold mb-2">Card Title 2</h3>\n      <p class="text-gray-600">Using justify-items-center creates a balanced, centered layout.</p>\n    </div>\n  </div>\n  <div class="max-w-sm bg-white rounded-lg shadow-md overflow-hidden w-full">\n    <div class="h-40 bg-blue-400"></div>\n    <div class="p-4">\n      <h3 class="font-bold mb-2">Card Title 3</h3>\n      <p class="text-gray-600">This works well for consistent width items in a grid.</p>\n    </div>\n  </div>\n</div>', 
            description: "Card layout with items centered in their cells" 
          }
        ],
        variants: [
          { 
            name: "Alignment", 
            values: ["auto", "start", "end", "center", "stretch"], 
            description: "auto: uses align value from item's justify-self property or stretch if not set; start: items aligned to start of their grid area; end: items aligned to end of their grid area; center: items centered within their grid area; stretch: items stretched to fill their grid area horizontally" 
          },
        ],
      },
      {
        id: "justify-self",
        name: "Justify Self",
        description: "Controls the alignment of an individual grid item along the inline (row) axis within its grid cell. While justify-items applies to all items in a grid, justify-self lets you override that behavior for specific items. This gives you precise control over the horizontal positioning of individual elements in a grid layout.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="grid grid-cols-3 gap-4 bg-gray-100 p-4 rounded-lg">\n  <div class="justify-self-start bg-blue-100 p-4 rounded">Start</div>\n  <div class="justify-self-center bg-blue-200 p-4 rounded">Center</div>\n  <div class="justify-self-end bg-blue-300 p-4 rounded">End</div>\n  <div class="justify-self-stretch bg-blue-400 p-4 rounded">Stretch</div>\n  <div class="bg-blue-500 p-4 rounded text-white">Default</div>\n  <div class="bg-blue-600 p-4 rounded text-white">Default</div>\n</div>', 
            description: "Grid with different justify-self values applied to individual items" 
          },
          { 
            code: '<!-- Form with label and input alignment -->\n<div class="grid grid-cols-[200px_1fr] gap-4 p-4 bg-gray-100 rounded-lg max-w-lg">\n  <label class="justify-self-end self-center font-medium">Username:</label>\n  <input type="text" class="justify-self-start px-3 py-2 border rounded">\n  \n  <label class="justify-self-end self-center font-medium">Email:</label>\n  <input type="email" class="justify-self-start px-3 py-2 border rounded">\n  \n  <label class="justify-self-end self-center font-medium">Password:</label>\n  <input type="password" class="justify-self-start px-3 py-2 border rounded">\n  \n  <div class="col-span-2 justify-self-center mt-2">\n    <button class="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>\n  </div>\n</div>', 
            description: "Form with labels right-aligned and inputs left-aligned using justify-self" 
          },
          { 
            code: '<!-- Dashboard with mixed content alignment -->\n<div class="grid grid-cols-3 gap-6 p-6 bg-gray-100 rounded-lg">\n  <div class="col-span-3 justify-self-center bg-white p-4 rounded-lg shadow-md w-2/3 text-center">\n    <h1 class="text-2xl font-bold mb-2">Dashboard Overview</h1>\n    <p>This header uses justify-self-center to center it in the grid</p>\n  </div>\n  \n  <div class="bg-white p-4 rounded-lg shadow-md h-40 flex items-center justify-center">\n    <div class="text-center">\n      <div class="text-2xl font-bold">86%</div>\n      <div class="text-gray-500">Completion</div>\n    </div>\n  </div>\n  \n  <div class="justify-self-stretch bg-white p-4 rounded-lg shadow-md h-40">\n    <h2 class="font-bold mb-2">Activity</h2>\n    <div class="flex flex-col gap-2">\n      <div class="h-4 bg-blue-100 rounded w-3/4"></div>\n      <div class="h-4 bg-blue-200 rounded w-1/2"></div>\n      <div class="h-4 bg-blue-300 rounded w-4/5"></div>\n    </div>\n  </div>\n  \n  <div class="justify-self-end bg-white p-4 rounded-lg shadow-md h-40 w-5/6">\n    <h2 class="font-bold mb-2">Notifications</h2>\n    <ul class="text-sm space-y-1">\n      <li class="py-1 border-b">New message received</li>\n      <li class="py-1 border-b">Task completed</li>\n      <li class="py-1">System update</li>\n    </ul>\n  </div>\n  \n  <div class="col-span-3 justify-self-stretch bg-white p-4 rounded-lg shadow-md">\n    <h2 class="font-bold mb-2">Recent Activity</h2>\n    <p>This footer stretches across the entire grid width</p>\n  </div>\n</div>', 
            description: "Dashboard with different alignments for various components" 
          }
        ],
        variants: [
          { 
            name: "Alignment", 
            values: ["auto", "start", "end", "center", "stretch"], 
            description: "auto: uses inherited value or stretch; start: aligns item to start of its grid area; end: aligns item to end of its grid area; center: centers item within its grid area; stretch: stretches item to fill its grid area horizontally" 
          },
        ],
      },
      {
        id: "align-content",
        name: "Align Content",
        description: "Controls how rows of content are positioned in a multi-line flex container or a grid container along the cross axis. In a flex column layout, this controls horizontal alignment; in a flex row layout, this controls vertical alignment. This is particularly useful when there are multiple rows of content with extra space in the container. In Tailwind v4, align utilities have improved compatibility with logical properties for better RTL support.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="flex flex-wrap content-start h-64 bg-gray-100 p-4 rounded-lg">\n  <div class="w-1/3 p-2"><div class="bg-blue-100 p-4 rounded">1</div></div>\n  <div class="w-1/3 p-2"><div class="bg-blue-200 p-4 rounded">2</div></div>\n  <div class="w-1/3 p-2"><div class="bg-blue-300 p-4 rounded">3</div></div>\n  <div class="w-1/3 p-2"><div class="bg-blue-400 p-4 rounded">4</div></div>\n  <div class="w-1/3 p-2"><div class="bg-blue-500 p-4 rounded text-white">5</div></div>\n</div>', 
            description: "Multi-line flex with rows aligned to the top of container" 
          },
          { 
            code: '<div class="flex flex-wrap content-center h-64 bg-gray-100 p-4 rounded-lg">\n  <div class="w-1/3 p-2"><div class="bg-green-100 p-4 rounded">1</div></div>\n  <div class="w-1/3 p-2"><div class="bg-green-200 p-4 rounded">2</div></div>\n  <div class="w-1/3 p-2"><div class="bg-green-300 p-4 rounded">3</div></div>\n  <div class="w-1/3 p-2"><div class="bg-green-400 p-4 rounded">4</div></div>\n  <div class="w-1/3 p-2"><div class="bg-green-500 p-4 rounded text-white">5</div></div>\n</div>', 
            description: "Multi-line flex with rows centered vertically in container" 
          },
          { 
            code: '<div class="flex flex-wrap content-end h-64 bg-gray-100 p-4 rounded-lg">\n  <div class="w-1/3 p-2"><div class="bg-purple-100 p-4 rounded">1</div></div>\n  <div class="w-1/3 p-2"><div class="bg-purple-200 p-4 rounded">2</div></div>\n  <div class="w-1/3 p-2"><div class="bg-purple-300 p-4 rounded">3</div></div>\n  <div class="w-1/3 p-2"><div class="bg-purple-400 p-4 rounded">4</div></div>\n  <div class="w-1/3 p-2"><div class="bg-purple-500 p-4 rounded text-white">5</div></div>\n</div>', 
            description: "Multi-line flex with rows aligned to the bottom of container" 
          },
          { 
            code: '<div class="flex flex-wrap content-between h-64 bg-gray-100 p-4 rounded-lg">\n  <div class="w-1/3 p-2"><div class="bg-blue-100 p-4 rounded">1</div></div>\n  <div class="w-1/3 p-2"><div class="bg-blue-200 p-4 rounded">2</div></div>\n  <div class="w-1/3 p-2"><div class="bg-blue-300 p-4 rounded">3</div></div>\n  <div class="w-1/3 p-2"><div class="bg-blue-400 p-4 rounded">4</div></div>\n  <div class="w-1/3 p-2"><div class="bg-blue-500 p-4 rounded text-white">5</div></div>\n</div>', 
            description: "Space distributed between rows (first row at top, last at bottom)" 
          },
          { 
            code: '<div class="flex flex-wrap content-around h-64 bg-gray-100 p-4 rounded-lg">\n  <div class="w-1/3 p-2"><div class="bg-green-100 p-4 rounded">1</div></div>\n  <div class="w-1/3 p-2"><div class="bg-green-200 p-4 rounded">2</div></div>\n  <div class="w-1/3 p-2"><div class="bg-green-300 p-4 rounded">3</div></div>\n  <div class="w-1/3 p-2"><div class="bg-green-400 p-4 rounded">4</div></div>\n  <div class="w-1/3 p-2"><div class="bg-green-500 p-4 rounded text-white">5</div></div>\n</div>', 
            description: "Space distributed around rows" 
          },
          { 
            code: '<div class="flex flex-wrap content-evenly h-64 bg-gray-100 p-4 rounded-lg">\n  <div class="w-1/3 p-2"><div class="bg-purple-100 p-4 rounded">1</div></div>\n  <div class="w-1/3 p-2"><div class="bg-purple-200 p-4 rounded">2</div></div>\n  <div class="w-1/3 p-2"><div class="bg-purple-300 p-4 rounded">3</div></div>\n  <div class="w-1/3 p-2"><div class="bg-purple-400 p-4 rounded">4</div></div>\n  <div class="w-1/3 p-2"><div class="bg-purple-500 p-4 rounded text-white">5</div></div>\n</div>', 
            description: "Space distributed evenly between rows" 
          },
          { 
            code: '<!-- Grid example with align-content -->\n<div class="grid grid-cols-3 content-start gap-4 h-64 bg-gray-100 p-4 rounded-lg">\n  <div class="bg-blue-100 p-4 rounded">1</div>\n  <div class="bg-blue-200 p-4 rounded">2</div>\n  <div class="bg-blue-300 p-4 rounded">3</div>\n  <div class="bg-blue-400 p-4 rounded">4</div>\n  <div class="bg-blue-500 p-4 rounded text-white">5</div>\n  <div class="bg-blue-600 p-4 rounded text-white">6</div>\n</div>', 
            description: "Grid with rows aligned to the top" 
          }
        ],
        variants: [
          { 
            name: "Alignment", 
            values: ["normal", "start", "end", "center", "between", "around", "evenly", "stretch"], 
            description: "normal: default browser behavior; start: content packed at start of container; end: content packed at end of container; center: content centered in container; between: content evenly distributed with first at start and last at end; around: content evenly distributed with equal space around each; evenly: content evenly distributed with equal space between each; stretch: lines stretched to fill container" 
          },
        ],
      },
      {
        id: "align-items",
        name: "Align Items",
        description: "Controls how flex or grid items are aligned along the cross axis of their container. In a flex row layout, this governs vertical alignment; in a flex column layout, this controls horizontal alignment. This utility is essential for controlling how items align in relation to each other within a row or column. In Tailwind v4, align utilities have improved compatibility with logical properties for better RTL support.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="flex items-start h-32 bg-gray-100 p-4 rounded-lg">\n  <div class="bg-blue-100 p-4 rounded">Short</div>\n  <div class="bg-blue-200 p-8 rounded">Medium</div>\n  <div class="bg-blue-300 p-12 rounded">Tall</div>\n</div>', 
            description: "Items aligned to the top of the container" 
          },
          { 
            code: '<div class="flex items-center h-32 bg-gray-100 p-4 rounded-lg">\n  <div class="bg-green-100 p-4 rounded">Short</div>\n  <div class="bg-green-200 p-8 rounded">Medium</div>\n  <div class="bg-green-300 p-12 rounded">Tall</div>\n</div>', 
            description: "Items aligned to the vertical center of the container" 
          },
          { 
            code: '<div class="flex items-end h-32 bg-gray-100 p-4 rounded-lg">\n  <div class="bg-purple-100 p-4 rounded">Short</div>\n  <div class="bg-purple-200 p-8 rounded">Medium</div>\n  <div class="bg-purple-300 p-12 rounded">Tall</div>\n</div>', 
            description: "Items aligned to the bottom of the container" 
          },
          { 
            code: '<div class="flex items-baseline h-32 bg-gray-100 p-4 rounded-lg">\n  <div class="bg-blue-100 p-4 text-3xl rounded">Large</div>\n  <div class="bg-blue-200 p-4 rounded">Normal</div>\n  <div class="bg-blue-300 p-4 text-sm rounded">Small</div>\n</div>', 
            description: "Items aligned by their baselines" 
          },
          { 
            code: '<div class="flex items-stretch h-32 bg-gray-100 p-4 rounded-lg">\n  <div class="bg-green-100 p-4 rounded">Stretch</div>\n  <div class="bg-green-200 p-4 rounded">to</div>\n  <div class="bg-green-300 p-4 rounded">container</div>\n</div>', 
            description: "Items stretched to fill the container's height" 
          },
          { 
            code: '<!-- Common pattern: vertically centered header -->\n<header class="flex items-center justify-between bg-blue-600 text-white p-4 rounded-lg">\n  <div class="flex items-center">\n    <svg class="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="none">\n      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>\n      <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2"/>\n      <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2"/>\n    </svg>\n    <h1 class="text-xl font-bold">Company Name</h1>\n  </div>\n  \n  <nav class="flex items-center space-x-4">\n    <a href="#" class="hover:underline">Home</a>\n    <a href="#" class="hover:underline">About</a>\n    <a href="#" class="hover:underline">Contact</a>\n    <button class="bg-white text-blue-600 px-4 py-2 rounded font-medium">Sign In</button>\n  </nav>\n</header>', 
            description: "Navigation bar with vertically centered items" 
          },
          { 
            code: '<!-- Card with vertical alignment -->\n<div class="flex items-center bg-white p-4 rounded-lg shadow-md">\n  <div class="flex-shrink-0 h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">\n    <svg class="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">\n      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />\n    </svg>\n  </div>\n  <div class="ml-4">\n    <h3 class="text-lg font-medium">John Doe</h3>\n    <p class="text-gray-600">Software Engineer</p>\n  </div>\n  <div class="ml-auto flex items-center gap-2">\n    <button class="bg-blue-100 text-blue-600 px-3 py-1 rounded">Message</button>\n    <button class="bg-gray-100 text-gray-600 px-3 py-1 rounded">Profile</button>\n  </div>\n</div>', 
            description: "Card with content vertically centered using items-center" 
          }
        ],
        variants: [
          { 
            name: "Alignment", 
            values: ["start", "end", "center", "baseline", "stretch"], 
            description: "start: items aligned to start of cross axis; end: items aligned to end of cross axis; center: items centered on cross axis; baseline: items aligned by their text baselines; stretch: items stretched to fill the container along the cross axis (default)" 
          },
        ],
      },
      {
        id: "align-self",
        name: "Align Self",
        description: "Controls how an individual flex or grid item is aligned along the cross axis, overriding the container's align-items setting. This utility allows for precise control over the alignment of specific items within a flex or grid container, letting you create exceptions to the overall alignment pattern. In Tailwind v4, align-self utilities have improved compatibility with logical properties for better RTL support.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="flex items-center h-32 bg-gray-100 p-4 rounded-lg">\n  <div class="self-start bg-blue-100 p-4 rounded">Start</div>\n  <div class="bg-blue-200 p-4 rounded">Center (from container)</div>\n  <div class="self-end bg-blue-300 p-4 rounded">End</div>\n  <div class="self-stretch bg-blue-400 p-4 rounded">Stretch</div>\n  <div class="self-baseline bg-blue-500 p-4 text-lg text-white rounded">Baseline</div>\n</div>', 
            description: "Items with different self-alignment in a centered container" 
          },
          { 
            code: '<!-- Form with custom alignment for specific elements -->\n<form class="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">\n  <h2 class="text-xl font-bold mb-4">Account Settings</h2>\n  \n  <div class="flex items-center mb-4">\n    <label class="w-32 text-gray-700">Username:</label>\n    <input type="text" class="flex-1 px-3 py-2 border rounded" value="johndoe" />\n  </div>\n  \n  <div class="flex items-center mb-4">\n    <label class="w-32 text-gray-700">Email:</label>\n    <input type="email" class="flex-1 px-3 py-2 border rounded" value="john@example.com" />\n  </div>\n  \n  <div class="flex mb-4">\n    <label class="w-32 self-start pt-2 text-gray-700">Bio:</label>\n    <textarea class="flex-1 px-3 py-2 border rounded h-24"></textarea>\n  </div>\n  \n  <div class="flex mb-4">\n    <label class="w-32 self-center text-gray-700">Profile Image:</label>\n    <div class="flex-1">\n      <div class="flex items-center">\n        <div class="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>\n        <button class="px-3 py-1 bg-gray-200 rounded text-sm">Upload New</button>\n      </div>\n    </div>\n  </div>\n  \n  <div class="self-end mt-6 flex justify-end">\n    <button type="button" class="px-4 py-2 border rounded mr-2">Cancel</button>\n    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Save Changes</button>\n  </div>\n</form>', 
            description: "Form with label aligned to the top for textarea using self-start" 
          },
          { 
            code: '<!-- Card with featured element -->\n<div class="flex items-start bg-white rounded-lg shadow-md overflow-hidden">\n  <div class="flex-1 p-4">\n    <h3 class="font-bold mb-1">Product Name</h3>\n    <p class="text-gray-600 text-sm mb-3">This is a brief description of the product that explains its features and benefits.</p>\n    <div class="flex items-center text-sm text-gray-500">\n      <span>$49.99</span>\n      <span class="mx-2">•</span>\n      <span>In Stock</span>\n    </div>\n  </div>\n  \n  <div class="self-stretch flex flex-col">\n    <div class="bg-green-500 text-white text-xs font-bold px-2 py-1 self-end">SALE</div>\n    <div class="flex-grow flex items-center justify-center p-4 bg-gray-50">\n      <div class="w-24 h-24 bg-blue-100 rounded flex items-center justify-center">\n        <span class="text-blue-600 font-medium">Image</span>\n      </div>\n    </div>\n    <button class="self-stretch bg-blue-600 text-white py-2 px-4 text-sm font-medium">Add to Cart</button>\n  </div>\n</div>', 
            description: "Product card with self-aligned elements" 
          },
          { 
            code: '<!-- Timeline with alternating content alignment -->\n<div class="relative max-w-3xl mx-auto py-8">\n  <!-- Center line -->\n  <div class="absolute inset-0 flex justify-center">\n    <div class="w-0.5 h-full bg-gray-200"></div>\n  </div>\n  \n  <!-- Timeline items -->\n  <div class="relative z-10 space-y-12">\n    <div class="flex items-center">\n      <div class="flex-1 pr-8 text-right">\n        <h3 class="font-bold text-lg">First Event</h3>\n        <p class="text-gray-600">This happened first in the timeline.</p>\n      </div>\n      <div class="self-center flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900"></div>\n      <div class="flex-1 pl-8"></div>\n    </div>\n    \n    <div class="flex items-center">\n      <div class="flex-1 pr-8"></div>\n      <div class="self-center flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900"></div>\n      <div class="flex-1 pl-8">\n        <h3 class="font-bold text-lg">Second Event</h3>\n        <p class="text-gray-600">This followed shortly after the first event.</p>\n      </div>\n    </div>\n    \n    <div class="flex items-center">\n      <div class="flex-1 pr-8 text-right">\n        <h3 class="font-bold text-lg">Third Event</h3>\n        <p class="text-gray-600">The timeline continues with this event.</p>\n      </div>\n      <div class="self-center flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900"></div>\n      <div class="flex-1 pl-8"></div>\n    </div>\n  </div>\n</div>', 
            description: "Timeline with self-centered markers" 
          }
        ],
        variants: [
          { 
            name: "Alignment", 
            values: ["auto", "start", "end", "center", "stretch", "baseline"], 
            description: "auto: uses the parent container's align-items value; start: aligns to the start of the cross axis; end: aligns to the end of the cross axis; center: centers on the cross axis; stretch: stretches to fill the container on the cross axis; baseline: aligns by the text baseline" 
          },
        ],
      },
      {
        id: "place-content",
        name: "Place Content",
        description: "A shorthand utility that sets both align-content and justify-content properties at once. This makes it quicker to center or distribute space for content in both dimensions within a flex or grid container. In Tailwind v4, place utilities have improved compatibility with logical properties for better RTL support and work seamlessly with other layout features.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="grid grid-cols-3 place-content-center h-64 bg-gray-100 p-4 rounded-lg gap-4">\n  <div class="bg-blue-100 p-4 rounded">1</div>\n  <div class="bg-blue-200 p-4 rounded">2</div>\n  <div class="bg-blue-300 p-4 rounded">3</div>\n  <div class="bg-blue-400 p-4 rounded">4</div>\n</div>', 
            description: "Grid with content centered both horizontally and vertically" 
          },
          { 
            code: '<div class="grid grid-cols-3 place-content-start h-64 bg-gray-100 p-4 rounded-lg gap-4">\n  <div class="bg-green-100 p-4 rounded">1</div>\n  <div class="bg-green-200 p-4 rounded">2</div>\n  <div class="bg-green-300 p-4 rounded">3</div>\n  <div class="bg-green-400 p-4 rounded">4</div>\n</div>', 
            description: "Grid with content aligned to the top-left" 
          },
          { 
            code: '<div class="grid grid-cols-3 place-content-end h-64 bg-gray-100 p-4 rounded-lg gap-4">\n  <div class="bg-purple-100 p-4 rounded">1</div>\n  <div class="bg-purple-200 p-4 rounded">2</div>\n  <div class="bg-purple-300 p-4 rounded">3</div>\n  <div class="bg-purple-400 p-4 rounded">4</div>\n</div>', 
            description: "Grid with content aligned to the bottom-right" 
          },
          { 
            code: '<div class="grid grid-cols-3 place-content-between h-64 bg-gray-100 p-4 rounded-lg gap-4">\n  <div class="bg-blue-100 p-4 rounded">1</div>\n  <div class="bg-blue-200 p-4 rounded">2</div>\n  <div class="bg-blue-300 p-4 rounded">3</div>\n  <div class="bg-blue-400 p-4 rounded">4</div>\n  <div class="bg-blue-500 p-4 rounded text-white">5</div>\n  <div class="bg-blue-600 p-4 rounded text-white">6</div>\n</div>', 
            description: "Grid with content distributed evenly with first items at start and last items at end" 
          },
          { 
            code: '<!-- Loading state centered in container -->\n<div class="h-96 w-full bg-gray-100 rounded-lg flex place-content-center">\n  <div class="flex flex-col items-center">\n    <div class="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>\n    <p class="text-gray-600">Loading content...</p>\n  </div>\n</div>', 
            description: "Loading spinner perfectly centered in container using place-content-center" 
          },
          { 
            code: '<!-- 404 page with centered content -->\n<div class="min-h-[500px] bg-gray-50 rounded-lg flex place-content-center text-center p-4">\n  <div>\n    <div class="text-6xl font-bold text-gray-300 mb-4">404</div>\n    <h1 class="text-2xl font-bold mb-2">Page Not Found</h1>\n    <p class="text-gray-600 mb-6 max-w-md">We couldn\'t find the page you\'re looking for. It might have been moved or deleted.</p>\n    <button class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Go Back Home</button>\n  </div>\n</div>', 
            description: "404 error page with centered content" 
          }
        ],
        variants: [
          { 
            name: "Alignment", 
            values: ["start", "end", "center", "between", "around", "evenly", "stretch"], 
            description: "start: packs content at start in both dimensions; end: packs content at end in both dimensions; center: centers content in both dimensions; between: distributes content with space between in both dimensions; around: distributes content with space around in both dimensions; evenly: distributes content with equal space between items in both dimensions; stretch: stretches items to fill the container in both dimensions" 
          },
        ],
      },
      {
        id: "place-items",
        name: "Place Items",
        description: "A shorthand utility that sets both align-items and justify-items properties at once. This allows for quick positioning of all grid or flex items within their individual areas or cells. Place-items is particularly useful in grid layouts where you want consistent alignment behavior in both dimensions. In Tailwind v4, place utilities work seamlessly with other layout properties and have improved RTL support.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="grid grid-cols-3 place-items-center gap-4 h-64 bg-gray-100 p-4 rounded-lg">\n  <div class="bg-blue-100 p-4 rounded">1</div>\n  <div class="bg-blue-200 p-4 rounded">2</div>\n  <div class="bg-blue-300 p-4 rounded">3</div>\n  <div class="bg-blue-400 p-4 rounded">4</div>\n  <div class="bg-blue-500 p-4 rounded text-white">5</div>\n  <div class="bg-blue-600 p-4 rounded text-white">6</div>\n</div>', 
            description: "Grid with all items centered within their cells" 
          },
          { 
            code: '<div class="grid grid-cols-3 place-items-start gap-4 h-64 bg-gray-100 p-4 rounded-lg">\n  <div class="bg-green-100 p-4 rounded">1</div>\n  <div class="bg-green-200 p-4 rounded">2</div>\n  <div class="bg-green-300 p-4 rounded">3</div>\n  <div class="bg-green-400 p-4 rounded">4</div>\n  <div class="bg-green-500 p-4 rounded text-white">5</div>\n  <div class="bg-green-600 p-4 rounded text-white">6</div>\n</div>', 
            description: "Grid with all items aligned to the top-left of their cells" 
          },
          { 
            code: '<div class="grid grid-cols-3 place-items-end gap-4 h-64 bg-gray-100 p-4 rounded-lg">\n  <div class="bg-purple-100 p-4 rounded">1</div>\n  <div class="bg-purple-200 p-4 rounded">2</div>\n  <div class="bg-purple-300 p-4 rounded">3</div>\n  <div class="bg-purple-400 p-4 rounded">4</div>\n  <div class="bg-purple-500 p-4 rounded text-white">5</div>\n  <div class="bg-purple-600 p-4 rounded text-white">6</div>\n</div>', 
            description: "Grid with all items aligned to the bottom-right of their cells" 
          },
          { 
            code: '<div class="grid grid-cols-3 place-items-stretch gap-4 h-64 bg-gray-100 p-4 rounded-lg">\n  <div class="bg-blue-100 p-4 rounded">1</div>\n  <div class="bg-blue-200 p-4 rounded">2</div>\n  <div class="bg-blue-300 p-4 rounded">3</div>\n  <div class="bg-blue-400 p-4 rounded">4</div>\n  <div class="bg-blue-500 p-4 rounded text-white">5</div>\n  <div class="bg-blue-600 p-4 rounded text-white">6</div>\n</div>', 
            description: "Grid with all items stretched to fill their cells in both dimensions" 
          },
          { 
            code: '<!-- Image gallery with centered thumbnails -->\n<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-4 p-4 bg-gray-100 rounded-lg">\n  <div class="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center">Image 1</div>\n  <div class="w-24 h-24 bg-blue-200 rounded-lg flex items-center justify-center">Image 2</div>\n  <div class="w-24 h-24 bg-blue-300 rounded-lg flex items-center justify-center">Image 3</div>\n  <div class="w-24 h-24 bg-blue-400 rounded-lg flex items-center justify-center">Image 4</div>\n  <div class="w-24 h-24 bg-blue-500 rounded-lg flex items-center justify-center text-white">Image 5</div>\n  <div class="w-24 h-24 bg-blue-600 rounded-lg flex items-center justify-center text-white">Image 6</div>\n  <div class="w-24 h-24 bg-blue-700 rounded-lg flex items-center justify-center text-white">Image 7</div>\n  <div class="w-24 h-24 bg-blue-800 rounded-lg flex items-center justify-center text-white">Image 8</div>\n</div>', 
            description: "Image gallery with centered thumbnails using place-items-center" 
          },
          { 
            code: '<!-- Icon grid with consistent alignment -->\n<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 place-items-center gap-8 p-6 bg-white rounded-lg shadow-md">\n  <div class="flex flex-col items-center text-center">\n    <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">\n      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />\n      </svg>\n    </div>\n    <span class="text-sm font-medium">Home</span>\n  </div>\n  <div class="flex flex-col items-center text-center">\n    <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">\n      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />\n      </svg>\n    </div>\n    <span class="text-sm font-medium">Profile</span>\n  </div>\n  <div class="flex flex-col items-center text-center">\n    <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-2">\n      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />\n      </svg>\n    </div>\n    <span class="text-sm font-medium">Notifications</span>\n  </div>\n  <div class="flex flex-col items-center text-center">\n    <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-2">\n      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />\n        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />\n      </svg>\n    </div>\n    <span class="text-sm font-medium">Settings</span>\n  </div>\n</div>', 
            description: "Icon grid with consistent centered alignment for icon-label pairs" 
          }
        ],
        variants: [
          { 
            name: "Alignment", 
            values: ["start", "end", "center", "stretch"], 
            description: "start: aligns items to start in both dimensions; end: aligns items to end in both dimensions; center: centers items in both dimensions; stretch: stretches items to fill their grid areas in both dimensions" 
          },
        ],
      },
      {
        id: "place-self",
        name: "Place Self",
        description: "A shorthand utility that sets both align-self and justify-self properties at once. This allows for positioning an individual grid or flex item within its grid area or flex line, overriding the container's place-items settings. Place-self is perfect for creating exceptions to the overall alignment pattern without needing separate utilities for each axis. In Tailwind v4, place-self utilities have better RTL language support and improved compatibility with other layout properties.",
        category: "flexbox-grid",
        examples: [
          { 
            code: '<div class="grid grid-cols-3 gap-4 place-items-start h-64 bg-gray-100 p-4 rounded-lg">\n  <div class="bg-blue-100 p-4 rounded">Start (default)</div>\n  <div class="place-self-center bg-blue-300 p-4 rounded">Centered</div>\n  <div class="place-self-end bg-blue-500 p-4 rounded text-white">End</div>\n  <div class="place-self-stretch bg-blue-200 p-4 rounded">Stretch</div>\n  <div class="bg-blue-400 p-4 rounded">Start (default)</div>\n  <div class="bg-blue-600 p-4 rounded text-white">Start (default)</div>\n</div>', 
            description: "Grid with individual items positioned differently within their cells" 
          },
          { 
            code: '<!-- Product showcase with featured item -->\n<div class="grid grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-gray-100 rounded-lg">\n  <div class="bg-white p-4 rounded-lg shadow-sm">\n    <div class="aspect-square bg-gray-200 mb-2 rounded"></div>\n    <h3 class="font-medium">Product 1</h3>\n    <p class="text-gray-600 text-sm">$29.99</p>\n  </div>\n  \n  <div class="place-self-center bg-white p-6 rounded-lg shadow-lg transform md:scale-110 col-span-2 md:col-span-1 row-span-2">\n    <div class="aspect-square bg-blue-100 mb-3 rounded"></div>\n    <div class="relative">\n      <span class="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>\n      <h3 class="font-bold text-lg">Featured Product</h3>\n      <p class="text-gray-700">Special featured product with discount.</p>\n      <p class="font-medium text-lg mt-2">$49.99</p>\n      <button class="mt-3 w-full bg-blue-600 text-white py-2 rounded">Add to Cart</button>\n    </div>\n  </div>\n  \n  <div class="bg-white p-4 rounded-lg shadow-sm">\n    <div class="aspect-square bg-gray-200 mb-2 rounded"></div>\n    <h3 class="font-medium">Product 3</h3>\n    <p class="text-gray-600 text-sm">$34.99</p>\n  </div>\n  \n  <div class="bg-white p-4 rounded-lg shadow-sm">\n    <div class="aspect-square bg-gray-200 mb-2 rounded"></div>\n    <h3 class="font-medium">Product 4</h3>\n    <p class="text-gray-600 text-sm">$24.99</p>\n  </div>\n</div>', 
            description: "Product grid with a featured item centered and highlighted" 
          },
          { 
            code: '<!-- Dashboard stats with varied alignments -->\n<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-100 rounded-lg">\n  <div class="place-self-stretch bg-white p-4 rounded-lg shadow-sm">\n    <h3 class="font-medium text-gray-500 mb-1">Total Users</h3>\n    <p class="text-3xl font-bold">12,634</p>\n    <p class="text-sm text-green-600 mt-2">+12% from last month</p>\n  </div>\n  \n  <div class="place-self-center bg-white p-6 rounded-lg shadow-md">\n    <div class="flex flex-col items-center">\n      <div class="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-3">\n        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />\n        </svg>\n      </div>\n      <p class="text-xl font-bold">2,845</p>\n      <p class="text-sm text-gray-600">Active Accounts</p>\n    </div>\n  </div>\n  \n  <div class="place-self-end bg-white p-4 rounded-lg shadow-sm lg:col-span-2">\n    <div class="flex justify-between items-start">\n      <div>\n        <h3 class="font-medium text-gray-500 mb-1">Revenue</h3>\n        <p class="text-3xl font-bold">$34,252</p>\n        <p class="text-sm text-red-600 mt-2">-2.5% from last month</p>\n      </div>\n      <div class="h-16 w-32 bg-gray-200 rounded"></div>\n    </div>\n  </div>\n</div>', 
            description: "Dashboard with stat cards using different self-alignment" 
          }
        ],
        variants: [
          { 
            name: "Alignment", 
            values: ["auto", "start", "end", "center", "stretch"], 
            description: "auto: uses the parent's place-items values or default alignment; start: places the item at the start in both dimensions; end: places the item at the end in both dimensions; center: centers the item in both dimensions; stretch: stretches the item to fill its grid area in both dimensions" 
          },
        ],
      },
    ],
  },

  // --- Spacing Category ---
  {
    id: "spacing",
    name: "Spacing",
    description: "Utilities for controlling padding, margin, and space between elements. Consistent spacing is crucial for creating harmonious layouts and establishing visual rhythm in your designs. In Tailwind v4, spacing utilities have been enhanced with support for logical properties and more intuitive responsive behaviors.",
    icon: "move-horizontal",
    color: "bg-yellow-500",
    functions: [
      {
        id: "padding",
        name: "Padding",
        description: "Adds space inside an element's borders, between the element's content and its border. Padding creates breathing room within components, improves readability, and makes UI elements more touchable. Tailwind's padding utilities follow a consistent spacing scale based on 0.25rem (4px) increments that create harmonious, proportional spacing throughout your design.",
        category: "spacing",
        examples: [
          { 
            code: '<div class="p-4 bg-blue-100 rounded">Padding on all sides (1rem)</div>', 
            description: "Basic padding on all sides (1rem / 16px)" 
          },
          { 
            code: '<div class="px-4 py-2 bg-green-100 rounded">Horizontal and vertical padding</div>', 
            description: "Different padding on horizontal (1rem) and vertical (0.5rem) axes" 
          },
          { 
            code: '<div class="pt-8 pr-4 pb-12 pl-4 bg-yellow-100 rounded">\n  Different padding on each side\n</div>', 
            description: "Individual padding for each side (top: 2rem, right: 1rem, bottom: 3rem, left: 1rem)" 
          },
          { 
            code: '<!-- Responsive padding example -->\n<div class="p-4 md:p-8 lg:p-12 bg-purple-100 rounded-lg">\n  <h2 class="text-xl font-bold mb-4">Card Title</h2>\n  <p>This card has padding that increases on larger screens, providing appropriate spacing for different devices.</p>\n</div>', 
            description: "Responsive padding that increases on larger screens" 
          }
        ],
        variants: [
          { 
            name: "Sides", 
            values: ["p", "px", "py", "pt", "pr", "pb", "pl"], 
            description: "p: all sides, px: left and right (horizontal), py: top and bottom (vertical), pt: top only, pr: right only, pb: bottom only, pl: left only" 
          },
          { 
            name: "Size", 
            values: ["0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "5", "6", "8", "10", "12", "14", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "72", "80", "96"], 
            description: "Tailwind's spacing scale where 1 unit = 0.25rem (4px). Examples: p-4 = 1rem (16px), p-8 = 2rem (32px), p-0.5 = 0.125rem (2px)" 
          },
        ],
      },
      {
        id: "margin",
        name: "Margin",
        description: "Adds space outside an element's borders, controlling the distance between elements. Margin creates separation between components and helps establish rhythm in your layouts. Unlike padding, margin can be negative and can collapse between adjacent elements. In Tailwind v4, margin utilities fully support logical properties for better RTL language support.",
        category: "spacing",
        examples: [
          { 
            code: '<div class="m-4 bg-blue-100 p-4 rounded">Margin on all sides (1rem)</div>', 
            description: "Basic margin on all sides - notice the space around the element" 
          },
          { 
            code: '<div class="mx-auto max-w-md bg-green-100 p-4 rounded">Horizontally centered with auto margins</div>', 
            description: "Using mx-auto to center an element horizontally (when it has a width)" 
          },
          { 
            code: '<div>\n  <p class="mb-4">This paragraph has margin below it.</p>\n  <p class="mb-4">This creates consistent spacing between paragraphs.</p>\n  <p>This is the last paragraph with no bottom margin.</p>\n</div>', 
            description: "Using vertical margins to create rhythm between text elements" 
          },
          { 
            code: '<!-- Responsive margins example -->\n<div class="flex flex-col md:flex-row">\n  <div class="bg-blue-100 p-4 rounded md:mr-6 mb-6 md:mb-0">\n    <h2 class="text-lg font-bold">First Card</h2>\n    <p>This card has bottom margin on mobile, right margin on desktop.</p>\n  </div>\n  <div class="bg-blue-100 p-4 rounded">\n    <h2 class="text-lg font-bold">Second Card</h2>\n    <p>This card adapts to the layout changes.</p>\n  </div>\n</div>', 
            description: "Responsive margins that change based on screen size and layout" 
          },
          { 
            code: '<!-- Negative margins for special layouts -->\n<div class="relative py-16 bg-gray-100">\n  <div class="mx-auto max-w-4xl">\n    <div class="bg-white rounded-lg shadow-lg p-8 -mt-12 relative z-10">\n      <h2 class="text-2xl font-bold mb-4">Overlapping Card</h2>\n      <p>This card uses negative margin to create an overlapping effect.</p>\n    </div>\n  </div>\n</div>', 
            description: "Using negative margin to create an overlapping element" 
          }
        ],
        variants: [
          { 
            name: "Sides", 
            values: ["m", "mx", "my", "mt", "mr", "mb", "ml"], 
            description: "m: all sides, mx: left and right (horizontal), my: top and bottom (vertical), mt: top only, mr: right only, mb: bottom only, ml: left only" 
          },
          { 
            name: "Size", 
            values: ["0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "5", "6", "8", "10", "12", "14", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "72", "80", "96", "auto", "-0.5", "-1", "-1.5", "-2", "-2.5", "-3", "-3.5", "-4", "-5", "-6", "-8", "-10", "-12", "-14", "-16", "-20", "-24", "-28", "-32", "-36", "-40", "-44", "-48", "-52", "-56", "-60", "-64", "-72", "-80", "-96"], 
            description: "Tailwind's spacing scale with 1 unit = 0.25rem (4px), plus auto value and negative values. Examples: m-4 = 1rem (16px), m-auto = margin: auto, -m-4 = -1rem (-16px)" 
          },
        ],
      },
      {
        id: "space-between",
        name: "Space Between",
        description: "Controls the spacing between child elements without adding margin to the first or last element. This is particularly useful for consistent spacing in stacks and rows of elements where you want equal spacing between items but no extra space at the edges. In Tailwind v4, space utilities have improved integration with flexbox, grid, and other layout systems.",
        category: "spacing",
        examples: [
          { 
            code: '<div class="flex flex-col space-y-4">\n  <div class="bg-blue-100 p-4 rounded">First item</div>\n  <div class="bg-blue-200 p-4 rounded">Second item</div>\n  <div class="bg-blue-300 p-4 rounded">Third item</div>\n</div>', 
            description: "Vertical spacing between flex items (1rem gaps)" 
          },
          { 
            code: '<div class="flex space-x-4">\n  <div class="bg-green-100 p-4 rounded">First item</div>\n  <div class="bg-green-200 p-4 rounded">Second item</div>\n  <div class="bg-green-300 p-4 rounded">Third item</div>\n</div>', 
            description: "Horizontal spacing between flex items (1rem gaps)" 
          },
          { 
            code: '<!-- Responsive space adjustments -->\n<div class="flex flex-col space-y-2 md:space-y-4 lg:space-y-8">\n  <div class="bg-purple-100 p-4 rounded">First item</div>\n  <div class="bg-purple-200 p-4 rounded">Second item</div>\n  <div class="bg-purple-300 p-4 rounded">Third item</div>\n</div>', 
            description: "Responsive spacing that increases on larger screens" 
          },
          { 
            code: '<!-- Combining horizontal and vertical spacing -->\n<div class="flex flex-col space-y-6">\n  <div class="flex space-x-4">\n    <div class="bg-blue-100 p-4 rounded">Row 1, Item 1</div>\n    <div class="bg-blue-200 p-4 rounded">Row 1, Item 2</div>\n    <div class="bg-blue-300 p-4 rounded">Row 1, Item 3</div>\n  </div>\n  <div class="flex space-x-4">\n    <div class="bg-green-100 p-4 rounded">Row 2, Item 1</div>\n    <div class="bg-green-200 p-4 rounded">Row 2, Item 2</div>\n    <div class="bg-green-300 p-4 rounded">Row 2, Item 3</div>\n  </div>\n</div>', 
            description: "Combining vertical and horizontal spacing for grid-like layouts" 
          },
          { 
            code: '<!-- Dividing elements with space and lines -->\n<div class="flex flex-col divide-y divide-gray-200">\n  <div class="py-4">First item in a divided list</div>\n  <div class="py-4">Second item with divider above and below</div>\n  <div class="py-4">Third item in the list</div>\n</div>', 
            description: "Combining space utilities with dividers for list-like components" 
          }
        ],
        variants: [
          { 
            name: "Axis", 
            values: ["space-x", "space-y", "space-x-reverse", "space-y-reverse"], 
            description: "space-x: horizontal spacing between elements; space-y: vertical spacing between elements; space-x-reverse: horizontal spacing in reverse order; space-y-reverse: vertical spacing in reverse order" 
          },
          { 
            name: "Size", 
            values: ["0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "5", "6", "8", "10", "12", "14", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "72", "80", "96"], 
            description: "Uses Tailwind's spacing scale where 1 unit = 0.25rem (4px). Examples: space-x-4 = 1rem (16px) horizontal spacing, space-y-8 = 2rem (32px) vertical spacing" 
          },
        ],
      },
    ],
  },

  // --- Sizing Category ---
  {
    id: "sizing",
    name: "Sizing",
    description: "Utilities for controlling the width and height of elements. Proper sizing is essential for responsive layouts, ensuring content fits appropriately within its container and adapts to different screen sizes. In Tailwind v4, sizing utilities have been enhanced with more logical values and better integration with container queries.",
    icon: "maximize-2",
    color: "bg-orange-500",
    functions: [
      {
        id: "width",
        name: "Width",
        description: "Controls the width of an element. Width utilities provide a comprehensive system for sizing elements, from fixed pixel widths to percentage-based and viewport-relative values. These utilities form the foundation of responsive layouts, allowing elements to appropriately scale and adapt to different screen sizes.",
        category: "sizing",
        examples: [
          { 
            code: '<div class="space-y-4">\n  <div class="w-full bg-blue-100 p-2">w-full (100% width)</div>\n  <div class="w-1/2 bg-blue-200 p-2">w-1/2 (50% width)</div>\n  <div class="w-1/3 bg-blue-300 p-2">w-1/3 (33.333% width)</div>\n  <div class="w-1/4 bg-blue-400 p-2">w-1/4 (25% width)</div>\n  <div class="w-1/5 bg-blue-500 p-2 text-white">w-1/5 (20% width)</div>\n</div>', 
            description: "Fractional width examples" 
          },
          { 
            code: '<div class="space-y-4">\n  <div class="w-0 bg-green-100 p-2">w-0 (0px width - content only visible due to padding)</div>\n  <div class="w-px bg-green-200 p-2">w-px (1px width - content only visible due to padding)</div>\n  <div class="w-4 bg-green-300 p-2">w-4 (1rem / 16px width)</div>\n  <div class="w-12 bg-green-400 p-2">w-12 (3rem / 48px width)</div>\n  <div class="w-64 bg-green-500 p-2 text-white">w-64 (16rem / 256px width)</div>\n</div>', 
            description: "Fixed width examples using Tailwind's spacing scale" 
          },
          { 
            code: '<div class="w-screen h-16 bg-purple-100 mb-4 overflow-hidden">\n  <div class="p-4">w-screen (100vw - viewport width)</div>\n</div>\n\n<div class="bg-gray-100 p-4 mb-4">\n  <div class="max-w-md bg-purple-200 p-4">max-w-md (28rem / 448px max width)</div>\n</div>\n\n<div class="bg-gray-100 p-4">\n  <div class="min-w-[300px] w-1/4 bg-purple-300 p-4">min-w-[300px] w-1/4 (minimum width with percentage)</div>\n</div>', 
            description: "Other width values: viewport width, max width, min width" 
          },
          { 
            code: '<!-- Responsive width example -->\n<div class="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-blue-100 p-4 rounded">\n  <h2 class="font-bold mb-2">Responsive Width</h2>\n  <p>This element\'s width changes at different screen sizes:</p>\n  <ul class="list-disc pl-5 space-y-1 text-sm">\n    <li>Mobile: 100% width</li>\n    <li>Small screens: 66.666% width</li>\n    <li>Medium screens: 50% width</li>\n    <li>Large screens: 33.333% width</li>\n    <li>Extra large screens: 25% width</li>\n  </ul>\n</div>', 
            description: "Responsive width that decreases as screen size increases" 
          },
          { 
            code: '<!-- Common width patterns in layout -->\n<div class="bg-gray-100 p-6 rounded-lg">\n  <div class="mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-md">\n    <h2 class="text-2xl font-bold mb-4">Centered Container with Max Width</h2>\n    <p>Using max-w-4xl (56rem / 896px) with mx-auto creates a centered container with a maximum width.</p>\n    <p class="mt-4">This is useful for maintaining readable text line lengths on larger screens while utilizing full width on smaller screens.</p>\n  </div>\n</div>', 
            description: "Centered container with maximum width - common pattern for main content" 
          }
        ],
        variants: [
          { 
            name: "Size", 
            values: ["0", "px", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "5", "6", "7", "8", "9", "10", "11", "12", "14", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "72", "80", "96", "auto", "1/2", "1/3", "2/3", "1/4", "2/4", "3/4", "1/5", "2/5", "3/5", "4/5", "1/6", "2/6", "3/6", "4/6", "5/6", "1/12", "2/12", "3/12", "4/12", "5/12", "6/12", "7/12", "8/12", "9/12", "10/12", "11/12", "full", "screen", "min", "max", "fit"], 
            description: "Fixed values use the spacing scale (w-4 = 1rem); fractional values are percentages (w-1/2 = 50%); special values: auto (browser determined), full (100%), screen (100vw), min (min-content), max (max-content), fit (fit-content)" 
          },
        ],
      },
      {
        id: "min-width",
        name: "Min-Width",
        description: "Sets the minimum width an element can have, preventing it from becoming narrower than the specified value. Min-width is essential for responsive design, ensuring elements maintain usability and readability even on small screens or when their container is resized. In Tailwind v4, min-width utilities have enhanced compatibility with flexbox and grid layouts.",
        category: "sizing",
        examples: [
          { 
            code: '<div class="flex flex-wrap gap-4">\n  <div class="min-w-0 bg-blue-100 p-2 truncate">min-w-0 (shrink to 0 if needed, with text truncation)</div>\n  <div class="min-w-full bg-blue-200 p-2">min-w-full (minimum 100% width of parent)</div>\n  <div class="min-w-[200px] bg-blue-300 p-2">min-w-[200px] (custom minimum width)</div>\n</div>', 
            description: "Different min-width values" 
          },
          { 
            code: '<!-- Preventing flex item from shrinking too much -->\n<div class="flex gap-4 bg-gray-100 p-4 rounded overflow-x-auto">\n  <div class="min-w-[150px] flex-shrink bg-white p-4 rounded shadow">\n    <h3 class="font-bold">Card 1</h3>\n    <p>This card won\'t shrink below 150px width.</p>\n  </div>\n  <div class="min-w-[150px] flex-shrink bg-white p-4 rounded shadow">\n    <h3 class="font-bold">Card 2</h3>\n    <p>This card won\'t shrink below 150px width.</p>\n  </div>\n  <div class="min-w-[150px] flex-shrink bg-white p-4 rounded shadow">\n    <h3 class="font-bold">Card 3</h3>\n    <p>This card won\'t shrink below 150px width.</p>\n  </div>\n</div>', 
            description: "Using min-width to prevent flex items from shrinking too much" 
          },
          { 
            code: '<!-- Form input with min-width for better UX -->\n<form class="max-w-md mx-auto p-4 bg-white rounded shadow">\n  <div class="mb-4">\n    <label class="block text-gray-700 mb-2" for="name">Full Name</label>\n    <input id="name" type="text" class="w-full min-w-[250px] px-3 py-2 border rounded" placeholder="John Doe">\n  </div>\n  <div class="flex justify-end">\n    <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>\n  </div>\n</form>', 
            description: "Using min-width on form inputs for better user experience" 
          },
          { 
            code: '<!-- Table with min-width to ensure readability -->\n<div class="overflow-x-auto">\n  <table class="min-w-full bg-white border">\n    <thead>\n      <tr class="bg-gray-100">\n        <th class="min-w-[100px] p-3 text-left border-b">ID</th>\n        <th class="min-w-[200px] p-3 text-left border-b">Name</th>\n        <th class="min-w-[200px] p-3 text-left border-b">Email</th>\n        <th class="min-w-[150px] p-3 text-left border-b">Role</th>\n        <th class="min-w-[120px] p-3 text-left border-b">Actions</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td class="p-3 border-b">001</td>\n        <td class="p-3 border-b">Jane Smith</td>\n        <td class="p-3 border-b">jane@example.com</td>\n        <td class="p-3 border-b">Admin</td>\n        <td class="p-3 border-b">\n          <button class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Edit</button>\n        </td>\n      </tr>\n      <tr>\n        <td class="p-3 border-b">002</td>\n        <td class="p-3 border-b">John Davis</td>\n        <td class="p-3 border-b">john@example.com</td>\n        <td class="p-3 border-b">User</td>\n        <td class="p-3 border-b">\n          <button class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Edit</button>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>', 
            description: "Table with min-width columns to ensure content readability" 
          }
        ],
        variants: [
          { 
            name: "Size", 
            values: ["0", "full", "min", "max", "fit"], 
            description: "min-w-0: 0px minimum width (useful in flex layouts); min-w-full: 100% of container width; min-w-min: min-content width; min-w-max: max-content width; min-w-fit: fit-content width; arbitrary values can be specified with min-w-[200px] syntax" 
          },
        ],
      },
      {
        id: "max-width",
        name: "Max-Width",
        description: "Sets the maximum width an element can have, preventing it from growing beyond the specified value. Max-width is fundamental to creating responsive designs that maintain readability and aesthetics across different screen sizes. It's particularly useful for constraining content width for optimal readability on larger screens. In Tailwind v4, max-width utilities have enhanced compatibility with container queries.",
        category: "sizing",
        examples: [
          { 
            code: '<div class="space-y-4">\n  <div class="max-w-xs bg-blue-100 p-2">max-w-xs (20rem / 320px max width)</div>\n  <div class="max-w-sm bg-blue-200 p-2">max-w-sm (24rem / 384px max width)</div>\n  <div class="max-w-md bg-blue-300 p-2">max-w-md (28rem / 448px max width)</div>\n  <div class="max-w-lg bg-blue-400 p-2 text-white">max-w-lg (32rem / 512px max width)</div>\n  <div class="max-w-xl bg-blue-500 p-2 text-white">max-w-xl (36rem / 576px max width)</div>\n</div>', 
            description: "Common max-width size presets" 
          },
          { 
            code: '<div class="space-y-4">\n  <div class="max-w-none bg-green-100 p-2">max-w-none (no maximum width)</div>\n  <div class="max-w-full bg-green-200 p-2">max-w-full (100% maximum width)</div>\n  <div class="max-w-[50vw] bg-green-300 p-2">max-w-[50vw] (50% of viewport width)</div>\n  <div class="max-w-prose bg-green-400 p-2 text-white">max-w-prose (65ch, optimized for readability)</div>\n</div>', 
            description: "Special max-width values" 
          },
          { 
            code: '<!-- Article with readable width -->\n<article class="mx-auto max-w-prose bg-white p-6 rounded-lg shadow-md">\n  <h1 class="text-2xl font-bold mb-4">Using Max Width for Readability</h1>\n  <p class="mb-4">Long lines of text are hard to read. Research suggests that the optimal line length for reading is around 65 characters. That\'s why Tailwind provides the max-w-prose utility, which sets a maximum width of 65 characters.</p>\n  <p class="mb-4">This makes your content more readable by preventing lines from becoming too long on larger screens, while still allowing the content to be fully responsive and take up the available width on smaller screens.</p>\n  <p>The max-w-prose utility is perfect for blog posts, articles, and other content-heavy pages where reading comfort is a priority.</p>\n</article>', 
            description: "Using max-w-prose for optimal reading experience in an article" 
          },
          { 
            code: '<!-- Responsive layout with different max-widths -->\n<div class="mx-auto max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl bg-white p-6 rounded-lg shadow-md">\n  <h2 class="text-xl font-bold mb-4">Responsive Max Width</h2>\n  <p class="mb-4">This container has different maximum widths depending on the screen size:</p>\n  <ul class="list-disc pl-5 space-y-1">\n    <li>Mobile: 100% width</li>\n    <li>SM screens: max-w-xl (36rem / 576px)</li>\n    <li>MD screens: max-w-3xl (48rem / 768px)</li>\n    <li>LG screens: max-w-5xl (64rem / 1024px)</li>\n    <li>XL screens: max-w-7xl (80rem / 1280px)</li>\n  </ul>\n  <p class="mt-4">This allows the layout to adapt to different screen sizes while maintaining appropriate content width.</p>\n</div>', 
            description: "Responsive container with different max-widths at different breakpoints" 
          },
          { 
            code: '<!-- Card with constrained image -->\n<div class="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">\n  <div>\n    <img class="h-48 w-full max-w-full object-cover" src="https://images.unsplash.com/photo-1552581234-26160f608093" alt="Mountain landscape">\n  </div>\n  <div class="p-6">\n    <h3 class="font-bold text-xl mb-2">Mountain View</h3>\n    <p class="text-gray-700">The max-w-full on the image ensures it never exceeds its container width while maintaining its aspect ratio.</p>\n    <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">View Details</button>\n  </div>\n</div>', 
            description: "Card with image using max-width to ensure proper containment" 
          }
        ],
        variants: [
          { 
            name: "Size", 
            values: ["0", "none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "full", "min", "max", "fit", "prose", "screen-sm", "screen-md", "screen-lg", "screen-xl", "screen-2xl"], 
            description: "max-w-none: no maximum width; size presets (max-w-sm, max-w-md, etc.): predefined pixel widths; max-w-full: 100% of container; max-w-prose: 65ch for optimal reading; max-w-screen-{breakpoint}: match a specific breakpoint width; arbitrary values can be set with max-w-[500px] syntax" 
          },
        ],
      },
      {
        id: "height",
        name: "Height",
        description: "Controls the height of an element. Height utilities let you set fixed, percentage-based, or content-based heights for elements. While it's generally best to let content determine height in responsive design, these utilities are essential when you need precise vertical control, such as for fixed-height containers, equal-height cards, or viewport-relative sizing.",
        category: "sizing",
        examples: [
          { 
            code: '<div class="flex gap-4 items-end h-40 bg-gray-100 p-4">\n  <div class="h-full bg-blue-100 p-2">h-full (100% of parent)</div>\n  <div class="h-1/2 bg-blue-200 p-2">h-1/2 (50% of parent)</div>\n  <div class="h-1/4 bg-blue-300 p-2">h-1/4 (25% of parent)</div>\n  <div class="h-16 bg-blue-400 p-2 text-white">h-16 (4rem / 64px)</div>\n  <div class="h-auto bg-blue-500 p-2 text-white">h-auto (content height)</div>\n</div>', 
            description: "Common height values demonstration" 
          },
          { 
            code: '<div class="h-screen w-full bg-blue-100 flex items-center justify-center">\n  <div class="max-w-md bg-white p-6 rounded-lg shadow-lg">\n    <h2 class="text-xl font-bold mb-2">Full Viewport Height</h2>\n    <p>This parent div has h-screen, making it the full height of the viewport.</p>\n    <p class="mt-4">h-screen is useful for full-page layouts, heroes, and landing sections.</p>\n  </div>\n</div>', 
            description: "Using h-screen for full viewport height" 
          },
          { 
            code: '<!-- Equal height cards with different content amounts -->\n<div class="grid grid-cols-1 md:grid-cols-3 gap-6">\n  <div class="h-64 bg-white rounded-lg shadow-md p-4 flex flex-col">\n    <h3 class="font-bold text-lg mb-2">Card 1</h3>\n    <p>Short content.</p>\n    <div class="mt-auto pt-4">\n      <button class="px-4 py-2 bg-blue-600 text-white rounded-lg w-full">Action</button>\n    </div>\n  </div>\n  <div class="h-64 bg-white rounded-lg shadow-md p-4 flex flex-col">\n    <h3 class="font-bold text-lg mb-2">Card 2</h3>\n    <p>This card has more content than the first card, but thanks to the fixed height, all cards remain the same height regardless of content.</p>\n    <div class="mt-auto pt-4">\n      <button class="px-4 py-2 bg-blue-600 text-white rounded-lg w-full">Action</button>\n    </div>\n  </div>\n  <div class="h-64 bg-white rounded-lg shadow-md p-4 flex flex-col">\n    <h3 class="font-bold text-lg mb-2">Card 3</h3>\n    <p>Medium amount of content that shows how the button is aligned to the bottom using mt-auto.</p>\n    <div class="mt-auto pt-4">\n      <button class="px-4 py-2 bg-blue-600 text-white rounded-lg w-full">Action</button>\n    </div>\n  </div>\n</div>', 
            description: "Equal height cards with bottom-aligned buttons using fixed height" 
          },
          { 
            code: '<!-- Responsive height -->\n<div class="h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">\n  <div class="text-center">\n    <p>Responsive Height Element</p>\n    <p class="text-sm font-normal mt-2">Height increases at each breakpoint</p>\n  </div>\n</div>', 
            description: "Element with responsive height that increases at each breakpoint" 
          },
          { 
            code: '<!-- Fixed height container with scrollable content -->\n<div class="h-64 overflow-auto bg-white rounded-lg shadow-md">\n  <div class="sticky top-0 bg-white border-b px-4 py-2 font-bold">Scrollable Container</div>\n  <div class="p-4">\n    <p class="mb-4">This container has a fixed height of 16rem (64px) with scrollable content.</p>\n    <p class="mb-4">When content exceeds the container height, it becomes scrollable.</p>\n    <p class="mb-4">This is useful for areas like chat messages, feeds, or long lists where you want to constrain the height.</p>\n    <p class="mb-4">Notice how the header stays sticky at the top when scrolling.</p>\n    <p class="mb-4">More content to demonstrate scrolling...</p>\n    <p class="mb-4">Even more content to ensure scrolling is necessary.</p>\n    <p class="mb-4">Fixed height containers like this are common in dashboards and admin interfaces.</p>\n    <p>The end of the scrollable content.</p>\n  </div>\n</div>', 
            description: "Fixed height container with scrollable content and sticky header" 
          }
        ],
        variants: [
          { 
            name: "Size", 
            values: ["0", "px", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "5", "6", "7", "8", "9", "10", "11", "12", "14", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "72", "80", "96", "auto", "1/2", "1/3", "2/3", "1/4", "2/4", "3/4", "1/5", "2/5", "3/5", "4/5", "1/6", "2/6", "3/6", "4/6", "5/6", "full", "screen", "min", "max", "fit"], 
            description: "Fixed values use the spacing scale (h-4 = 1rem); fractional values are percentages (h-1/2 = 50%); special values: auto (determined by content), full (100%), screen (100vh), min (min-content), max (max-content), fit (fit-content); arbitrary values can be set with h-[50vh] syntax" 
          },
        ],
      },
      {
        id: "min-height",
        name: "Min-Height",
        description: "Sets the minimum height an element can have, ensuring it doesn't become shorter than the specified value. Min-height is essential for responsive designs where you need to establish a baseline height for elements regardless of their content. This is particularly useful for maintaining the visual integrity of UI components when content is sparse.",
        category: "sizing",
        examples: [
          { 
            code: '<div class="space-y-4">\n  <div class="min-h-0 bg-blue-100 p-2">min-h-0 (no minimum height)</div>\n  <div class="min-h-full bg-blue-200 p-2">min-h-full (100% of parent\'s height, if parent has explicit height)</div>\n  <div class="min-h-screen bg-blue-300 p-2">min-h-screen (100vh, full viewport height)</div>\n  <div class="min-h-[200px] bg-blue-400 p-2 text-white">min-h-[200px] (custom minimum height)</div>\n</div>', 
            description: "Different min-height values" 
          },
          { 
            code: '<!-- Hero section with minimum height -->\n<section class="min-h-[50vh] bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white p-8">\n  <div class="max-w-3xl text-center">\n    <h1 class="text-4xl font-bold mb-4">Welcome to Our Platform</h1>\n    <p class="text-xl mb-8">This hero section has a minimum height of 50% of the viewport, ensuring it has visual impact even on large screens.</p>\n    <div class="flex flex-wrap justify-center gap-4">\n      <button class="px-6 py-3 bg-white text-blue-600 rounded-lg font-bold">Get Started</button>\n      <button class="px-6 py-3 bg-transparent border-2 border-white rounded-lg font-bold">Learn More</button>\n    </div>\n  </div>\n</section>', 
            description: "Hero section with minimum viewport height for visual impact" 
          },
          { 
            code: '<!-- Cards with minimum height -->\n<div class="grid grid-cols-1 md:grid-cols-3 gap-6">\n  <div class="min-h-[200px] bg-white rounded-lg shadow-md p-4 flex flex-col">\n    <h3 class="font-bold text-lg mb-2">Card 1</h3>\n    <p>Short content that doesn\'t fill the card.</p>\n    <div class="mt-auto pt-4">\n      <button class="px-4 py-2 bg-blue-600 text-white rounded-lg w-full">Action</button>\n    </div>\n  </div>\n  <div class="min-h-[200px] bg-white rounded-lg shadow-md p-4 flex flex-col">\n    <h3 class="font-bold text-lg mb-2">Card 2</h3>\n    <p>This card has more content that would naturally make it taller than Card 1. The min-height ensures a minimum size, but allows expansion for larger content.</p>\n    <div class="mt-auto pt-4">\n      <button class="px-4 py-2 bg-blue-600 text-white rounded-lg w-full">Action</button>\n    </div>\n  </div>\n  <div class="min-h-[200px] bg-white rounded-lg shadow-md p-4 flex flex-col">\n    <h3 class="font-bold text-lg mb-2">Card 3</h3>\n    <p>Medium amount of content.</p>\n    <div class="mt-auto pt-4">\n      <button class="px-4 py-2 bg-blue-600 text-white rounded-lg w-full">Action</button>\n    </div>\n  </div>\n</div>', 
            description: "Cards with minimum height that can still expand for larger content" 
          },
          { 
            code: '<!-- Responsive app layout with minimum height -->\n<div class="min-h-screen flex flex-col bg-gray-100">\n  <header class="bg-white shadow-sm p-4">\n    <div class="max-w-7xl mx-auto flex justify-between items-center">\n      <h1 class="font-bold text-lg">App Name</h1>\n      <button class="p-2 bg-gray-200 rounded-full">\n        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />\n        </svg>\n      </button>\n    </div>\n  </header>\n  \n  <main class="flex-grow p-4 flex items-center justify-center">\n    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-6">\n      <h2 class="text-xl font-bold mb-4">Content Area</h2>\n      <p>This area will always be tall enough to push the footer to the bottom, even if there isn\'t much content.</p>\n      <p class="mt-4">The min-h-screen on the wrapper combined with flex-grow on this main content area creates a layout where the footer is always at the bottom of the viewport or below if content pushes it down.</p>\n    </div>\n  </main>\n  \n  <footer class="bg-white border-t p-4 text-center text-gray-600">\n    <p>&copy; 2025 Example Company</p>\n  </footer>\n</div>', 
            description: "App layout with minimum screen height to ensure footer positioning" 
          }
        ],
        variants: [
          { 
            name: "Size", 
            values: ["0", "full", "screen", "min", "max", "fit"], 
            description: "min-h-0: no minimum height; min-h-full: 100% of parent height (if parent has explicit height); min-h-screen: 100vh (full viewport height); min-h-min: min-content height; min-h-max: max-content height; min-h-fit: fit-content height; arbitrary values can be specified with min-h-[200px] syntax" 
          },
        ],
      },
      {
        id: "max-height",
        name: "Max-Height",
        description: "Sets the maximum height an element can have, preventing it from growing beyond the specified value. Max-height is crucial for controlling content overflow and maintaining consistent layouts regardless of content length. It's commonly used for creating scrollable sections, constraining tall elements, and ensuring elements fit properly within their container.",
        category: "sizing",
        examples: [
          { 
            code: '<div class="space-y-4">\n  <div class="max-h-40 overflow-auto bg-blue-100 p-4 rounded">\n    <p class="mb-2">This content is in a container with max-h-40 (10rem / 160px).</p>\n    <p class="mb-2">When content exceeds this height, scrolling is enabled with overflow-auto.</p>\n    <p class="mb-2">This ensures the container never exceeds its maximum height.</p>\n    <p class="mb-2">Additional content to demonstrate scrolling behavior.</p>\n    <p class="mb-2">More content to make sure scrolling is visible.</p>\n    <p>Even more content for scrolling purposes.</p>\n  </div>\n  \n  <div class="max-h-full bg-blue-200 p-4 rounded">\n    <p>max-h-full (100% of parent\'s height if parent has explicit height)</p>\n  </div>\n  \n  <div class="max-h-screen bg-blue-300 p-4 rounded">\n    <p>max-h-screen (100vh, full viewport height)</p>\n  </div>\n</div>', 
            description: "Different max-height values with scrollable content" 
          },
          { 
            code: '<!-- Image with constrained height -->\n<div class="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">\n  <div class="max-h-64 overflow-hidden">\n    <img class="w-full object-cover" src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e" alt="Landscape">\n  </div>\n  <div class="p-6">\n    <h3 class="font-bold text-xl mb-2">Constrained Image Height</h3>\n    <p class="text-gray-700">Using max-h-64 on the image container ensures the image doesn\'t take up too much vertical space, creating a more balanced card design.</p>\n    <p class="mt-4 text-gray-700">The image maintains its aspect ratio with object-cover while being limited in height.</p>\n  </div>\n</div>', 
            description: "Image with constrained height using max-height and object-fit" 
          },
          { 
            code: '<!-- Dropdown menu with maximum height -->\n<div class="relative inline-block text-left">\n  <div>\n    <button class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700">\n      Dropdown Menu\n      <svg class="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">\n        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />\n      </svg>\n    </button>\n  </div>\n\n  <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">\n    <div class="max-h-60 overflow-auto py-1" role="menu">\n      <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100" role="menuitem">Account settings</a>\n      <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100" role="menuitem">Support</a>\n      <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100" role="menuitem">License</a>\n      <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100" role="menuitem">Item 4</a>\n      <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100" role="menuitem">Item 5</a>\n      <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100" role="menuitem">Item 6</a>\n      <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100" role="menuitem">Item 7</a>\n      <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100" role="menuitem">Item 8</a>\n      <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100" role="menuitem">Item 9</a>\n      <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100" role="menuitem">Item 10</a>\n    </div>\n  </div>\n</div>', 
            description: "Dropdown menu with maximum height and scrolling for long lists" 
          },
          { 
            code: '<!-- Chat interface with scrollable message area -->\n<div class="max-w-md mx-auto border rounded-lg overflow-hidden shadow-md flex flex-col h-96">\n  <div class="border-b p-3 bg-white">\n    <h3 class="font-bold">Chat with Support</h3>\n  </div>\n  \n  <div class="max-h-[calc(100%-8rem)] overflow-y-auto flex-grow p-4 bg-gray-50">\n    <div class="flex flex-col space-y-3">\n      <div class="bg-gray-200 p-3 rounded-lg self-start max-w-[80%]">\n        <p>Hello! How can I help you today?</p>\n      </div>\n      <div class="bg-blue-500 text-white p-3 rounded-lg self-end max-w-[80%]">\n        <p>I\'m having an issue with my recent order.</p>\n      </div>\n      <div class="bg-gray-200 p-3 rounded-lg self-start max-w-[80%]">\n        <p>I\'m sorry to hear that. Could you provide your order number?</p>\n      </div>\n      <div class="bg-blue-500 text-white p-3 rounded-lg self-end max-w-[80%]">\n        <p>Sure, it\'s #12345-67890.</p>\n      </div>\n      <div class="bg-gray-200 p-3 rounded-lg self-start max-w-[80%]">\n        <p>Thank you! I can see your order. What seems to be the issue?</p>\n      </div>\n      <div class="bg-blue-500 text-white p-3 rounded-lg self-end max-w-[80%]">\n        <p>I received the wrong item in my package.</p>\n      </div>\n      <div class="bg-gray-200 p-3 rounded-lg self-start max-w-[80%]">\n        <p>I understand. I\'ll help you resolve this right away. Could you describe what you received versus what you ordered?</p>\n      </div>\n    </div>\n  </div>\n  \n  <div class="p-3 bg-white border-t">\n    <div class="flex items-center space-x-2">\n      <input type="text" class="flex-grow p-2 border rounded-md" placeholder="Type a message...">\n      <button class="bg-blue-500 text-white p-2 rounded-md">\n        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>', 
            description: "Chat interface with scrollable message area using max-height and CSS calc()" 
          }
        ],
        variants: [
          { 
            name: "Size", 
            values: ["0", "none", "full", "screen", "min", "max", "fit"], 
            description: "max-h-0: 0px maximum height (useful for transitions); max-h-none: no maximum height; max-h-full: 100% of parent height (if parent has explicit height); max-h-screen: 100vh (full viewport height); max-h-min: min-content height; max-h-max: max-content height; max-h-fit: fit-content height; arbitrary values can be specified with max-h-[500px] syntax" 
          },
        ],
      },
    ],
  },

  // --- Typography Category ---
  {
    id: "typography",
    name: "Typography",
    description: "Utilities for controlling text styling including font size, weight, line height, letter spacing, text alignment, and more. Typography is fundamental to good design and readability. In Tailwind v4, typography utilities take advantage of modern CSS features like text-balance, better font metric overrides, and OKLCH color space for more vibrant text colors.",
    icon: "type",
    color: "bg-purple-500",
    functions: [
      {
        id: "font-family",
        name: "Font Family",
        description: "Sets the font family (typeface) for text. Font family is one of the most important typographic choices for establishing the visual tone of your content and ensuring readability. Tailwind's font family utilities provide system font stacks that look great across different devices and operating systems without requiring custom font loading. In Tailwind v4, font metrics are better handled to reduce layout shift.",
        category: "typography",
        examples: [
          { 
            code: '<p class="font-sans">The quick brown fox jumps over the lazy dog. (Sans-serif)</p>\n<p class="font-serif">The quick brown fox jumps over the lazy dog. (Serif)</p>\n<p class="font-mono">The quick brown fox jumps over the lazy dog. (Monospace)</p>', 
            description: "Three main font families: sans-serif, serif, and monospace" 
          },
          { 
            code: '<!-- Combining font families with other typography utilities -->\n<article class="max-w-2xl mx-auto p-4">\n  <h1 class="font-serif text-3xl font-bold mb-4">Article Title with Serif Font</h1>\n  <p class="font-sans text-gray-700 mb-4">This article uses a sans-serif font for the body text, which is generally more readable on screens. The heading above uses a serif font to create typographic contrast and visual hierarchy.</p>\n  <pre class="font-mono bg-gray-100 p-4 rounded mb-4">// Code example using monospace font\nfunction example() {\n  return "Monospace fonts are essential for code";\n}</pre>\n  <p class="font-sans text-gray-700">Combining different font families strategically can enhance both aesthetics and readability.</p>\n</article>', 
            description: "Strategic use of different font families in a document" 
          },
          { 
            code: '<!-- Font family in a modern interface -->\n<div class="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">\n  <div class="bg-gradient-to-r from-purple-500 to-blue-500 p-8 text-white">\n    <h2 class="font-sans text-2xl font-bold">Dashboard Overview</h2>\n    <p class="font-sans text-sm">Welcome back to your analytics dashboard</p>\n  </div>\n  <div class="p-6">\n    <div class="mb-6">\n      <h3 class="font-sans text-lg font-semibold mb-2">Statistics</h3>\n      <div class="grid grid-cols-3 gap-4 text-center">\n        <div>\n          <p class="font-mono text-xl font-bold">1,234</p>\n          <p class="font-sans text-xs text-gray-600">Views</p>\n        </div>\n        <div>\n          <p class="font-mono text-xl font-bold">$5,678</p>\n          <p class="font-sans text-xs text-gray-600">Revenue</p>\n        </div>\n        <div>\n          <p class="font-mono text-xl font-bold">90%</p>\n          <p class="font-sans text-xs text-gray-600">Satisfaction</p>\n        </div>\n      </div>\n    </div>\n    <div>\n      <h3 class="font-sans text-lg font-semibold mb-2">Recent Activity</h3>\n      <div class="text-sm space-y-2">\n        <p class="font-sans">New comment on your post</p>\n        <p class="font-sans">Invoice #12345 paid</p>\n        <p class="font-sans">New subscriber to your newsletter</p>\n      </div>\n    </div>\n  </div>\n</div>', 
            description: "Modern interface using sans-serif for UI and monospace for data" 
          }
        ],
        variants: [
          { 
            name: "Family", 
            values: ["sans", "serif", "mono"], 
            description: "font-sans: UI-optimized sans-serif stack (e.g., system-ui, Roboto, Helvetica); font-serif: classic serif stack (e.g., Georgia, Cambria, Times); font-mono: monospace stack for code and tabular data (e.g., SFMono, Consolas, monospace); You can extend this in your Tailwind config to add custom fonts" 
          },
        ],
      },
      {
        id: "font-size",
        name: "Font Size",
        description: "Controls the size of text. Tailwind provides a comprehensive type scale that follows a harmonious progression, making it easy to create consistent typography across your project. Each text size utility also sets an appropriate default line-height, which you can override with line-height utilities when needed. In Tailwind v4, font-size utilities are enhanced with improved default line heights and support for modern CSS units.",
        category: "typography",
        examples: [
          { 
            code: '<p class="text-xs">Extra small text (0.75rem).</p>\n<p class="text-sm">Small text (0.875rem).</p>\n<p class="text-base">Base text (1rem).</p>\n<p class="text-lg">Large text (1.125rem).</p>\n<p class="text-xl">Extra large text (1.25rem).</p>\n<p class="text-2xl">2xl text (1.5rem).</p>\n<p class="text-3xl">3xl text (1.875rem).</p>\n<p class="text-4xl">4xl text (2.25rem).</p>\n<p class="text-5xl">5xl text (3rem).</p>', 
            description: "The complete Tailwind font size scale" 
          },
          { 
            code: '<!-- Typography hierarchy example -->\n<article class="max-w-2xl mx-auto p-4">\n  <h1 class="text-4xl font-bold mb-4">Main Heading (text-4xl)</h1>\n  <h2 class="text-2xl font-semibold mb-3">Subheading (text-2xl)</h2>\n  <p class="text-base mb-4">This is regular body text (text-base) that forms the main content of the article. It should be easily readable with an optimal line length.</p>\n  <blockquote class="border-l-4 border-gray-300 pl-4 italic text-lg mb-4">\n    This is a blockquote that stands out with slightly larger text (text-lg).  \n  </blockquote>\n  <p class="text-base mb-4">Back to the regular body text size. Typography is about creating a clear visual hierarchy to guide readers through your content.</p>\n  <h3 class="text-xl font-semibold mb-2">Section Title (text-xl)</h3>\n  <p class="text-base mb-6">More body text at the regular size. Consistent use of text sizes helps create a rhythm throughout your content.</p>\n  <div class="bg-gray-100 p-4 rounded-lg">\n    <h4 class="text-lg font-medium mb-2">Note (text-lg)</h4>\n    <p class="text-sm">This is smaller text (text-sm) for less important information or secondary content.</p>\n  </div>\n</article>', 
            description: "Creating a typographic hierarchy with different font sizes" 
          },
          { 
            code: '<!-- Responsive typography -->\n<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight mb-4">\n  Responsive heading that scales with screen size\n</h1>\n<p class="text-sm sm:text-base md:text-lg max-w-prose mb-8">\n  This paragraph also changes size based on the screen width, ensuring readability on all devices while maintaining proportions with the heading.\n</p>\n<div class="flex space-x-4">\n  <button class="bg-blue-600 text-white px-4 py-2 rounded text-xs sm:text-sm md:text-base">\n    Primary Button\n  </button>\n  <button class="border border-blue-600 text-blue-600 px-4 py-2 rounded text-xs sm:text-sm md:text-base">\n    Secondary Button\n  </button>\n</div>', 
            description: "Responsive typography that scales appropriately across different breakpoints" 
          },
          { 
            code: '<!-- Modern pricing card with varied text sizes -->\n<div class="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">\n  <div class="bg-blue-600 p-6 text-white text-center">\n    <h3 class="text-lg font-semibold uppercase tracking-wide">Pro Plan</h3>\n    <div class="mt-2">\n      <span class="text-5xl font-bold">$49</span>\n      <span class="text-sm">/month</span>\n    </div>\n  </div>\n  <div class="p-6">\n    <ul class="space-y-3">\n      <li class="flex items-center">\n        <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />\n        </svg>\n        <span>10 users included</span>\n      </li>\n      <li class="flex items-center">\n        <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />\n        </svg>\n        <span>2 GB of storage</span>\n      </li>\n      <li class="flex items-center">\n        <svg class="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />\n        </svg>\n        <span>Priority email support</span>\n      </li>\n    </ul>\n    <button class="mt-6 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold">\n      Start your trial\n    </button>\n    <p class="mt-4 text-xs text-center text-gray-500">\n      Cancel anytime. No credit card required for trial.\n    </p>\n  </div>\n</div>', 
            description: "Pricing card with varied text sizes for visual hierarchy" 
          }
        ],
        variants: [
          { 
            name: "Size", 
            values: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"], 
            description: "xs: extra small (0.75rem), sm: small (0.875rem), base: base size (1rem), lg: large (1.125rem), xl: extra large (1.25rem), 2xl: 1.5rem, 3xl: 1.875rem, 4xl: 2.25rem, 5xl: 3rem, 6xl: 3.75rem, 7xl: 4.5rem, 8xl: 6rem, 9xl: 8rem" 
          },
        ],
      },
      {
        id: "font-smoothing",
        name: "Font Smoothing",
        description: "Controls the font smoothing and antialiasing applied to text, which can dramatically improve text rendering on certain screens and operating systems. These utilities are especially useful for light text on dark backgrounds, custom fonts, and larger text where rendering quality is more noticeable. In Tailwind v4, font smoothing has improved integration with system fonts.",
        category: "typography",
        examples: [
          { 
            code: '<div class="font-bold text-xl mb-4">Default smoothing</div>\n<div class="antialiased font-bold text-xl mb-4">Antialiased (smoother)</div>\n<div class="subpixel-antialiased font-bold text-xl">Subpixel antialiased</div>', 
            description: "Comparison of font smoothing options" 
          },
          { 
            code: '<!-- Dark mode with antialiased text -->\n<div class="bg-gray-900 text-white p-6 rounded-lg antialiased">\n  <h2 class="text-2xl font-bold mb-4">Antialiased Text on Dark Background</h2>\n  <p class="mb-4">Antialiasing makes text appear smoother and can significantly improve readability, especially for light text on dark backgrounds like this example.</p>\n  <p>Notice how the text appears more crisp and defined compared to the default rendering.</p>\n</div>', 
            description: "Antialiasing applied to light text on dark background" 
          },
          { 
            code: '<!-- Feature comparison card with subpixel antialiasing -->\n<div class="bg-white shadow-md rounded-lg overflow-hidden subpixel-antialiased">\n  <div class="bg-blue-600 text-white p-4">\n    <h3 class="text-xl font-bold">Subpixel Antialiasing</h3>\n    <p class="text-sm">For sharp text rendering on light backgrounds</p>\n  </div>\n  <div class="p-6">\n    <p class="mb-4">Subpixel antialiasing leverages the RGB subpixels in LCD screens to render text with extra sharpness. This setting is optimized for:</p>\n    <ul class="list-disc pl-5 space-y-2">\n      <li>Dark text on light backgrounds</li>\n      <li>Small to medium text sizes</li>\n      <li>When text clarity is a top priority</li>\n    </ul>\n    <p class="mt-4 text-sm text-gray-600">Note: Subpixel antialiasing has the most noticeable effect on high-density LCD displays. Its effect may vary across different screens and operating systems.</p>\n  </div>\n</div>', 
            description: "Subpixel antialiasing for dark text on light background" 
          },
          { 
            code: '<!-- Side-by-side comparison -->\n<div class="grid grid-cols-1 md:grid-cols-2 gap-6">\n  <div class="bg-gray-800 text-white p-6 rounded-lg">\n    <h3 class="text-xl font-bold mb-2">Without Antialiasing</h3>\n    <p class="mb-4">This text is rendered without antialiasing applied. It may appear more jagged or pixelated, especially at larger sizes or on high-density displays.</p>\n    <button class="px-4 py-2 bg-white text-gray-800 rounded">Button Example</button>\n  </div>\n  \n  <div class="bg-gray-800 text-white p-6 rounded-lg antialiased">\n    <h3 class="text-xl font-bold mb-2">With Antialiasing</h3>\n    <p class="mb-4">This text has antialiasing applied. Notice how it appears smoother and potentially more readable, especially for light text on dark backgrounds.</p>\n    <button class="px-4 py-2 bg-white text-gray-800 rounded">Button Example</button>\n  </div>\n</div>', 
            description: "Side-by-side comparison of antialiased and default text" 
          }
        ],
        variants: [
          { 
            name: "Style", 
            values: ["antialiased", "subpixel-antialiased"], 
            description: "antialiased: applies font smoothing for smoother text (best for light text on dark backgrounds); subpixel-antialiased: uses subpixel rendering for sharper text (best for dark text on light backgrounds, on LCD displays)" 
          },
        ],
      },
      {
        id: "font-style",
        name: "Font Style",
        description: "Controls whether text is displayed in an italic style or with normal font style. Italic text can add emphasis, indicate citations or titles, or create visual contrast within your typography. Font style utilities are simple but powerful for adding typographic nuance to your content. In Tailwind v4, font style utilities integrate better with custom fonts and variable fonts.",
        category: "typography",
        examples: [
          { 
            code: '<p class="italic">This text is italic.</p>\n<p class="not-italic">This text is not italic (normal).</p>', 
            description: "Basic italic and normal font styles" 
          },
          { 
            code: '<!-- Using italics for emphasis in content -->\n<article class="max-w-2xl mx-auto p-4">\n  <h1 class="text-2xl font-bold mb-4">The Art of Typography</h1>\n  <p class="mb-4">Typography is more than just choosing a font. It\'s about creating a <span class="italic">visual hierarchy</span> that guides readers through your content and enhances readability.</p>\n  <p class="mb-4">As Robert Bringhurst stated in <span class="italic">The Elements of Typographic Style</span>, "Typography exists to honor content."</p>\n  <blockquote class="border-l-4 border-gray-300 pl-4 mb-4 italic">\n    Good typography can make the difference between a pleasant, engaging reading experience and one that is frustrating and tiresome.\n  </blockquote>\n  <p>The goal of thoughtful typography is <span class="not-italic font-bold">not merely decoration</span>, but to serve the reader.</p>\n</article>', 
            description: "Using italics strategically for emphasis, titles, and quotes" 
          },
          { 
            code: '<!-- Combining italic with other typography utilities -->\n<div class="space-y-4">\n  <p class="text-lg font-serif italic">Serif italic text</p>\n  <p class="text-lg font-sans italic">Sans-serif italic text</p>\n  <p class="text-lg font-mono italic">Monospace italic text</p>\n  <p class="text-lg font-bold italic">Bold italic text</p>\n  <p class="text-lg font-light italic">Light italic text</p>\n</div>',
            description: "Combining italic with different font families and weights"
          },
          {
            code: '<!-- Italic text in a modern card design -->\n<div class="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">\n  <div class="bg-blue-600 p-6 text-white">\n    <h2 class="text-xl font-bold">Modern Card Design</h2>\n    <p class="italic">This card uses italic text for the subtitle, creating a nice contrast with the bold title.</p>\n  </div>\n  <div class="p-6">\n    <p>Content goes here. The italic style adds a touch of elegance to the design.</p>\n  </div>\n</div>', 
            description: "Italic text in a modern card design" 
          }
        ],
        variants: [
          { 
            name: "Style", 
            values: ["italic", "not-italic"], 
            description: "italic: applies italic style to text; not-italic: normal font style" 
          },
        ],
      },
      {
        id: "font-weight",
        name: "Font Weight",
        description: "Controls the weight (thickness) of the font. Font weight is essential for establishing visual hierarchy, emphasis, and readability. Tailwind provides a range of font weights from thin to black, allowing you to create contrast and focus within your typography. In Tailwind v4, font weight utilities are optimized for variable fonts and better integration with custom typefaces.",
        category: "typography",
        examples: [
          { 
            code: '<p class="font-thin">Thin (100)</p>\n<p class="font-extralight">Extra Light (200)</p>\n<p class="font-light">Light (300)</p>\n<p class="font-normal">Normal (400)</p>\n<p class="font-medium">Medium (500)</p>\n<p class="font-semibold">Semi Bold (600)</p>\n<p class="font-bold">Bold (700)</p>\n<p class="font-extrabold">Extra Bold (800)</p>\n<p class="font-black">Black (900)</p>', 
            description: "Different font weights from thin to black" 
          },
          { 
            code: '<!-- Font weight in a modern card design -->\n<div class="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">\n  <div class="bg-blue-600 p-6 text-white">\n    <h2 class="text-2xl font-bold mb-2">Modern Card Design</h2>\n    <p class="text-lg font-medium italic">Subtitle with medium weight and italic style</p>\n  </div>\n  <div class="p-6">\n    <p>This card uses different font weights to create a clear hierarchy.</p>\n    <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">\n      Call to Action\n    </button>\n  </div>\n</div>', 
            description: "Font weight used in a modern card design" 
          },
          { 
            code: '<!-- Responsive typography with varying weights -->\n<h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">\n  Responsive Heading\n</h1>\n<p class="text-base md:text-lg lg:text-xl font-normal mb-4">\n  This paragraph uses a normal font weight, but you can adjust it based on screen size.\n</p>\n<p class="text-sm md:text-base lg:text-lg font-semibold">\n  This text is semi-bold and adjusts size responsively.\n</p>',
            description: "Responsive typography with varying font weights"
          },
          { 
            code: '<!-- Font weight in a modern interface -->\n<div class="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">\n  <div class="bg-gradient-to-r from-purple-500 to-blue-500 p-8 text-white">\n    <h2 class="text-2xl font-extrabold mb-4">Dashboard Overview</h2>\n    <p class="font-semibold">Welcome back to your analytics dashboard</p>\n  </div>\n  <div class="p-6">\n    <div class="mb-6">\n      <h3 class="text-lg font-semibold mb-2">Statistics</h3>\n      <div class="grid grid-cols-3 gap-4 text-center">\n        <div>\n          <p class="font-bold text-xl">1,234</p>\n          <p class="font-normal text-sm text-gray-600">Views</p>\n        </div>\n        <div>\n          <p class="font-bold text-xl">$5,678</p>\n          <p class="font-normal text-sm text-gray-600">Revenue</p>\n        </div>\n        <div>\n          <p class="font-bold text-xl">90%</p>\n          <p class="font-normal text-sm text-gray-600">Satisfaction</p>\n        </div>\n      </div>\n    </div>\n    <div>\n      <h3 class="text-lg font-semibold mb-2">Recent Activity</h3>\n      <div class="text-sm space-y-2">\n        <p class="font-normal">New comment on your post</p>\n        <p class="font-normal">Invoice #12345 paid</p>\n        <p class="font-normal">New subscriber to your newsletter</p>\n      </div>\n    </div>\n  </div>\n</div>', 
            description: "Font weight used in a modern interface" 
          }
        ],
        variants: [
          { 
            name: "Weight", 
            values: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"], 
            description: "font-thin: 100, font-extralight: 200, font-light: 300, font-normal: 400, font-medium: 500, font-semibold: 600, font-bold: 700, font-extrabold: 800, font-black: 900" 
          },
        ],
      },
      {
        id: "letter-spacing",
        name: "Letter Spacing",
        description: "Controls the spacing between letters (characters) in text. Letter spacing can enhance readability, create a more modern look, or add emphasis to specific text elements. Tailwind provides utilities for adjusting letter spacing from tighter to looser settings. In Tailwind v4, letter spacing utilities are optimized for variable fonts and better integration with custom typefaces.",
        category: "typography",
        examples: [
          { 
            code: '<p class="tracking-tight">Tight letter spacing</p>\n<p class="tracking-normal">Normal letter spacing</p>\n<p class="tracking-wide">Wide letter spacing</p>', 
            description: "Different letter spacing options" 
          },
          { 
            code: '<!-- Letter spacing in a modern card design -->\n<div class="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">\n  <div class="bg-blue-600 p-6 text-white">\n    <h2 class="text-2xl font-bold mb-2 tracking-wide">Modern Card Design</h2>\n    <p class="text-lg font-medium tracking-normal italic">Subtitle with normal tracking and italic style</p>\n  </div>\n  <div class="p-6">\n    <p>This card uses different letter spacings to create a clear hierarchy.</p>\n    <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">\n      Call to Action\n    </button>\n  </div>\n</div>', 
            description: "Letter spacing used in a modern card design" 
          },
          { 
            code: '<!-- Responsive typography with varying letter spacing -->\n<h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">\n  Responsive Heading\n</h1>\n<p class="text-base md:text-lg lg:text-xl font-normal mb-4 tracking-normal">\n  This paragraph uses normal letter spacing, but you can adjust it based on screen size.\n</p>\n<p class="text-sm md:text-base lg:text-lg font-semibold tracking-wide">\n  This text has wide letter spacing and adjusts size responsively.\n</p>',
            description: "Responsive typography with varying letter spacing"
          },
          {
            code: '<!-- Letter spacing in a modern interface -->\n<div class="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">\n  <div class="bg-gradient-to-r from-purple-500 to-blue-500 p-8 text-white">\n    <h2 class="text-2xl font-extrabold mb-4 tracking-tight">Dashboard Overview</h2>\n    <p class="font-semibold tracking-normal">Welcome back to your analytics dashboard</p>\n  </div>\n  <div class="p-6">\n    <div class="mb-6">\n      <h3 class="text-lg font-semibold mb-2 tracking-wide">Statistics</h3>\n      <div class="grid grid-cols-3 gap-4 text-center">\n        <div>\n          <p class="font-bold text-xl tracking-tight">1,234</p>\n          <p class="font-normal text-sm text-gray-600 tracking-normal">Views</p>\n        </div>\n        <div>\n          <p class="font-bold text-xl tracking-tight">$5,678</p>\n          <p class="font-normal text-sm text-gray-600 tracking-normal">Revenue</p>\n        </div>\n        <div>\n          <p class="font-bold text-xl tracking-tight">90%</p>\n          <p class="font-normal text-sm text-gray-600 tracking-normal">Satisfaction</p>\n        </div>\n      </div>\n    </div>\n    <div>\n      <h3 class="text-lg font-semibold mb-2 tracking-wide">Recent Activity</h3>\n      <div class="text-sm space-y-2">\n        <p class="font-normal tracking-normal">New comment on your post</p>\n        <p class="font-normal tracking-normal">Invoice #12345 paid</p>\n        <p class="font-normal tracking-normal">New subscriber to your newsletter</p>\n      </div>\n    </div>\n  </div>\n</div>', 
            description: "Letter spacing used in a modern interface" 
          }
        ],
        variants: [
          { 
            name: "Spacing", 
            values: ["tight", "normal", "wide"], 
            description: "tracking-tight: tighter letter spacing; tracking-normal: normal letter spacing; tracking-wide: wider letter spacing" 
          },
        ],
      },
      {
        id: "line-height",
        name: "Line Height",
        description: "Controls the height of lines of text. Line height is crucial for readability and visual comfort, especially in longer paragraphs. Tailwind provides a range of line height utilities that can be applied to text elements to ensure optimal spacing between lines. In Tailwind v4, line height utilities are optimized for variable fonts and better integration with custom typefaces.",
        category: "typography",
        examples: [
          { 
            code: '<p class="leading-none">No extra space between lines (leading-none)</p>\n<p class="leading-tight">Tight line height (leading-tight)</p>\n<p class="leading-normal">Normal line height (leading-normal)</p>\n<p class="leading-relaxed">Relaxed line height (leading-relaxed)</p>\n<p class="leading-loose">Loose line height (leading-loose)</p>', 
            description: "Different line heights from none to loose" 
          },
          { 
            code: '<!-- Line height in a modern card design -->\n<div class="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">\n  <div class="bg-blue-600 p-6 text-white">\n    <h2 class="text-2xl font-bold mb-2 leading-tight">Modern Card Design</h2>\n    <p class="text-lg font-medium leading-relaxed italic">Subtitle with relaxed leading and italic style</p>\n  </div>\n  <div class="p-6">\n    <p>This card uses different line heights to create a clear hierarchy.</p>\n    <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">\n      Call to Action\n    </button>\n  </div>\n</div>', 
            description: "Line height used in a modern card design" 
          },
          { 
            code: '<!-- Responsive typography with varying line heights -->\n<h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">\n  Responsive Heading\n</h1>\n<p class="text-base md:text-lg lg:text-xl font-normal mb-4 leading-normal">\n  This paragraph uses normal line height, but you can adjust it based on screen size.\n</p>\n<p class="text-sm md:text-base lg:text-lg font-semibold leading-loose">\n  This text has loose line height and adjusts size responsively.\n</p>',
            description: "Responsive typography with varying line heights"
          },
          {
            code: '<!-- Line height in a modern interface -->\n<div class="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">\n  <div class="bg-gradient-to-r from-purple-500 to-blue-500 p-8 text-white">\n    <h2 class="text-2xl font-extrabold mb-4 leading-tight">Dashboard Overview</h2>\n    <p class="font-semibold leading-normal">Welcome back to your analytics dashboard</p>\n  </div>\n  <div class="p-6">\n    <div class="mb-6">\n      <h3 class="text-lg font-semibold mb-2 leading-tight">Statistics</h3>\n      <div class="grid grid-cols-3 gap-4 text-center">\n        <div>\n          <p class="font-bold text-xl leading-tight">1,234</p>\n          <p class="font-normal text-sm text-gray-600 leading-normal">Views</p>\n        </div>\n        <div>\n          <p class="font-bold text-xl leading-tight">$5,678</p>\n          <p class="font-normal text-sm text-gray-600 leading-normal">Revenue</p>\n        </div>\n        <div>\n          <p class="font-bold text-xl leading-tight">90%</p>\n          <p class="font-normal text-sm text-gray-600 leading-normal">Satisfaction</p>\n        </div>\n      </div>\n    </div>\n    <div>\n      <h3 class="text-lg font-semibold mb-2 leading-tight">Recent Activity</h3>\n      <div class="text-sm space-y-2">\n        <p class="font-normal leading-normal">New comment on your post</p>\n        <p class="font-normal leading-normal">Invoice #12345 paid</p>\n        <p class="font-normal leading-normal">New subscriber to your newsletter</p>\n      </div>\n    </div>\n  </div>\n</div>', 
            description: "Line height used in a modern interface" 
          }
        ],
        variants: [
          { 
            name: "Height", 
            values: ["none", "tight", "snug", "normal", "relaxed", "loose"], 
            description: "leading-none: 1, leading-tight: 1.25, leading-snug: 1.375, leading-normal: 1.5, leading-relaxed: 1.625, leading-loose: 2" 
          },
        ],
      },
      {
        id: "list-style-type",
        name: "List Style Type",
        description: "Controls the style of list items in ordered and unordered lists. Tailwind provides utilities for common list styles, including disc, decimal, square, and none. These utilities help you customize the appearance of lists to fit your design needs. In Tailwind v4, list style type utilities are optimized for better integration with custom fonts and variable fonts.",
        category: "typography",
        examples: [
          { 
            code: '<ul class="list-disc">\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ul>\n<ol class="list-decimal">\n  <li>First item</li>\n  <li>Second item</li>\n  <li>Third item</li>\n</ol>', 
            description: "Different list styles (disc and decimal)" 
          },
          { 
            code: '<!-- Customizing list styles -->\n<div class="max-w-md mx-auto p-4">\n  <h2 class="text-xl font-bold mb-4">Custom List Styles</h2>\n  <ul class="list-disc pl-5 mb-4">\n    <li class="mb-2">Unordered list item with disc style</li>\n    <li class="mb-2">Another unordered item</li>\n    <li>Last unordered item</li>\n  </ul>\n  <ol class="list-decimal pl-5">\n    <li class="mb-2">Ordered list item with decimal style</li>\n    <li class="mb-2">Another ordered item</li>\n    <li>Last ordered item</li>\n  </ol>\n</div>', 
            description: "Customizing list styles in a card" 
          },
          { 
            code: '<!-- List style type in a modern interface -->\n<div class="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">\n  <div class="bg-gradient-to-r from-purple-500 to-blue-500 p-8 text-white">\n    <h2 class="text-2xl font-extrabold mb-4">Dashboard Overview</h2>\n    <p class="font-semibold">Welcome back to your analytics dashboard</p>\n  </div>\n  <div class="p-6">\n    <h3 class="text-lg font-semibold mb-2">Recent Activity</h3>\n    <ul class="list-disc pl-5 space-y-2">\n      <li>New comment on your post</li>\n      <li>Invoice #12345 paid</li>\n      <li>New subscriber to your newsletter</li>\n    </ul>\n  </div>\n</div>',
            description: "List style type used in a modern interface"
          },
          { 
            code: '<!-- List style type in a modern card design -->\n<div class="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">\n  <div class="bg-blue-600 p-6 text-white">\n    <h2 class="text-2xl font-bold mb-2">Modern Card Design</h2>\n    <p class="text-lg font-medium italic">Subtitle with italic style</p>\n  </div>\n  <div class="p-6">\n    <h3 class="text-lg font-semibold mb-4">Features</h3>\n    <ul class="list-square pl-5 space-y-2">\n      <li>Feature one</li>\n      <li>Feature two</li>\n      <li>Feature three</li>\n    </ul>\n  </div>\n</div>', 
            description: "List style type used in a modern card design" 
          }
        ],
        variants: [
          { 
            name: "Style", 
            values: ["none", "disc", "decimal", "square"], 
            description: "list-none: no list style; list-disc: disc style for unordered lists; list-decimal: decimal style for ordered lists; list-square: square style for unordered lists" 
          },
        ],
      },
      {
        id: "text-align",
        name: "Text Align",
        description: "Controls the alignment of text within its container. Tailwind provides utilities for left, center, right, and justify text alignment. These utilities help you create a clear visual hierarchy and improve readability in your designs. In Tailwind v4, text alignment utilities are optimized for better integration with custom fonts and variable fonts.",
        category: "typography",
        examples: [
          { 
            code: '<p class="text-left">Left aligned text</p>\n<p class="text-center">Center aligned text</p>\n<p class="text-right">Right aligned text</p>\n<p class="text-justify">Justified text</p>', 
            description: "Different text alignments" 
          },
          { 
            code: '<!-- Text alignment in a modern card design -->\n<div class="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">\n  <div class="bg-blue-600 p-6 text-white">\n    <h2 class="text-2xl font-bold mb-2 text-center">Modern Card Design</h2>\n    <p class="text-lg font-medium italic text-center">Subtitle with italic style</p>\n  </div>\n  <div class="p-6">\n    <p>This card uses different text alignments to create a clear hierarchy.</p>\n    <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">\n      Call to Action\n    </button>\n  </div>\n</div>', 
            description: "Text alignment used in a modern card design" 
          },
          { 
            code: '<!-- Responsive typography with varying text alignments -->\n<h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">\n  Responsive Heading\n</h1>\n<p class="text-base md:text-lg lg:text-xl font-normal mb-4 text-left">\n  This paragraph uses left alignment, but you can adjust it based on screen size.\n</p>\n<p class="text-sm md:text-base lg:text-lg font-semibold text-right">\n  This text is right aligned and adjusts size responsively.\n</p>',
            description: "Responsive typography with varying text alignments"
          },
          {
            code: '<!-- Text alignment in a modern interface -->\n<div class="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">\n  <div class="bg-gradient-to-r from-purple-500 to-blue-500 p-8 text-white">\n    <h2 class="text-2xl font-extrabold mb-4 text-left">Dashboard Overview</h2>\n    <p class="font-semibold text-center">Welcome back to your analytics dashboard</p>\n  </div>\n  <div class="p-6">\n    <div class="mb-6">\n      <h3 class="text-lg font-semibold mb-2 text-right">Statistics</h3>\n      <div class="grid grid-cols-3 gap-4 text-center">\n        <div>\n          <p class="font-bold text-xl text-left">1,234</p>\n          <p class="font-normal text-sm text-gray-600 text-center">Views</p>\n        </div>\n        <div>\n          <p class="font-bold text-xl text-left">$5,678</p>\n          <p class="font-normal text-sm text-gray-600 text-center">Revenue</p>\n        </div>\n        <div>\n          <p class="font-bold text-xl text-left">90%</p>\n          <p class="font-normal text-sm text-gray-600 text-center">Satisfaction</p>\n        </div>\n      </div>\n    </div>\n    <div>\n      <h3 class="text-lg font-semibold mb-2 text-right">Recent Activity</h3>\n      <div class="text-sm space-y-2">\n        <p class="font-normal text-left">New comment on your post</p>\n        <p class="font-normal text-left">Invoice #12345 paid</p>\n        <p class="font-normal text-left">New subscriber to your newsletter</p>\n      </div>\n    </div>\n  </div>\n</div>', 
            description: "Text alignment used in a modern interface" 
          }
        ],
        variants: [
          { 
            name: "Alignment", 
            values: ["left", "center", "right", "justify"], 
            description: "text-left: left aligned text; text-center: center aligned text; text-right: right aligned text; text-justify: justified text" 
          },
        ],
      },
      {
        id: "text-decoration",
        name: "Text Decoration",
        description: "Controls the decoration applied to text, such as underlining or striking through. Text decoration utilities are useful for indicating links, emphasizing text, or showing deleted content. In Tailwind v4, text decoration utilities are optimized for better integration with custom fonts and variable fonts.",
        category: "typography",
        examples: [
          { 
            code: '<p class="underline">This text is underlined.</p>\n<p class="line-through">This text has a line through it.</p>\n<p class="no-underline">This text has no decoration.</p>', 
            description: "Different text decorations" 
          },
          { 
            code: '<!-- Text decoration in a modern card design -->\n<div class="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">\n  <div class="bg-blue-600 p-6 text-white">\n    <h2 class="text-2xl font-bold mb-2 underline">Modern Card Design</h2>\n    <p class="text-lg font-medium italic underline">Subtitle with italic style</p>\n  </div>\n  <div class="p-6">\n    <p>This card uses different text decorations to create a clear hierarchy.</p>\n    <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">\n      Call to Action\n    </button>\n  </div>\n</div>', 
            description: "Text decoration used in a modern card design" 
          },
          { 
            code: '<!-- Responsive typography with varying text decorations -->\n<h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 underline">\n  Responsive Heading\n</h1>\n<p class="text-base md:text-lg lg:text-xl font-normal mb-4 no-underline">\n  This paragraph has no underline, but you can adjust it based on screen size.\n</p>\n<p class="text-sm md:text-base lg:text-lg font-semibold line-through">\n  This text is struck through and adjusts size responsively.\n</p>',
            description: "Responsive typography with varying text decorations"
          },
          {
            code: '<!-- Text decoration in a modern interface -->\n<div class="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">\n  <div class="bg-gradient-to-r from-purple-500 to-blue-500 p-8 text-white">\n    <h2 class="text-2xl font-extrabold mb-4 underline">Dashboard Overview</h2>\n    <p class="font-semibold line-through">Welcome back to your analytics dashboard</p>\n  </div>\n  <div class="p-6">\n    <div class="mb-6">\n      <h3 class="text-lg font-semibold mb-2 underline">Statistics</h3>\n      <div class="grid grid-cols-3 gap-4 text-center">\n        <div>\n          <p class="font-bold text-xl underline">1,234</p>\n          <p class="font-normal text-sm text-gray-600 no-underline">Views</p>\n        </div>\n        <div>\n          <p class="font-bold text-xl underline">$5,678</p>\n          <p class="font-normal text-sm text-gray-600 no-underline">Revenue</p>\n        </div>\n        <div>\n          <p class="font-bold text-xl underline">90%</p>\n          <p class="font-normal text-sm text-gray-600 no-underline">Satisfaction</p>\n        </div>\n      </div>\n    </div>\n    <div>\n      <h3 class="text-lg font-semibold mb-2 underline">Recent Activity</h3>\n      <div class="text-sm space-y-2">\n        <p class="font-normal line-through">New comment on your post</p>\n        <p class="font-normal line-through">Invoice #12345 paid</p>\n        <p class="font-normal line-through">New subscriber to your newsletter</p>\n      </div>\n    </div>\n  </div>\n</div>',
            description: "Text decoration used in a modern interface"
          }
        ],
        variants: [
          { 
            name: "Decoration", 
            values: ["underline", "line-through", "no-underline"], 
            description: "underline: underlined text; line-through: struck-through text; no-underline: no decoration" 
          },
        ],
      },
    ],
  },
];

export function getAllCategories(): TailwindCategory[] {
  return categories;
}

export function getCategoryById(id: string): TailwindCategory | undefined {
  return categories.find(category => category.id === id);
}

export function getFunctionById(categoryId: string, functionId: string): TailwindFunction | undefined {
  const category = getCategoryById(categoryId);
  return category?.functions.find(func => func.id === functionId);
}


