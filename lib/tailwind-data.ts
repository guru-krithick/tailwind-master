// lib/tailwind-data.ts

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
      description: "Utilities for controlling the layout of elements.",
      icon: "layout",
      color: "bg-blue-500",
      functions: [
        {
          id: "container",
          name: "Container",
          description: "Centers content with responsive max-widths.",
          category: "layout",
          examples: [
            { code: '<div class="container mx-auto">Content</div>', description: "Centered container with padding." },
          ],
          variants: [
            { name: "Breakpoints", values: ["sm", "md", "lg", "xl", "2xl"], description: "Responsive max-widths." },
          ],
        },
        {
          id: "box-decoration-break",
          name: "Box Decoration Break",
          description: "Controls how box decorations are rendered across fragmented areas.",
          category: "layout",
          examples: [
            { code: '<span class="box-decoration-clone">Text</span>', description: "Clones decorations across breaks." },
          ],
          variants: [
            { name: "Type", values: ["clone", "slice"], description: "Decoration behavior." },
          ],
        },
        {
          id: "box-sizing",
          name: "Box Sizing",
          description: "Defines how the box model calculates width and height.",
          category: "layout",
          examples: [
            { code: '<div class="box-border">Border box</div>', description: "Includes padding and border in size." },
          ],
          variants: [
            { name: "Type", values: ["border", "content"], description: "Box sizing model." },
          ],
        },
        {
          id: "display",
          name: "Display",
          description: "Sets the display type of an element.",
          category: "layout",
          examples: [
            { code: '<div class="block">Block</div>', description: "Block-level element." },
            { code: '<span class="inline">Inline</span>', description: "Inline element." },
          ],
          variants: [
            {
              name: "Type",
              values: [
                "block", "inline-block", "inline", "flex", "inline-flex", "grid", "inline-grid",
                "table", "inline-table", "table-row", "table-cell", "table-header-group",
                "table-footer-group", "table-column", "table-column-group", "table-caption",
                "flow-root", "contents", "hidden",
              ],
              description: "Display type options.",
            },
          ],
        },
        {
          id: "aspect-ratio",
          name: "Aspect Ratio",
          description: "Sets the aspect ratio of an element.",
          category: "layout",
          examples: [
            { code: '<div class="aspect-video">Video</div>', description: "16:9 aspect ratio." },
          ],
          variants: [
            { name: "Ratio", values: ["auto", "square", "video"], description: "Predefined aspect ratios." },
          ],
        },
        {
          id: "columns",
          name: "Columns",
          description: "Creates multi-column layouts.",
          category: "layout",
          examples: [
            { code: '<div class="columns-2">Two columns</div>', description: "Two-column layout." },
          ],
          variants: [
            { name: "Count", values: ["1", "2", "3", "4", "auto"], description: "Number of columns." },
          ],
        },
        {
          id: "break-after",
          name: "Break After",
          description: "Controls how content breaks after an element.",
          category: "layout",
          examples: [
            { code: '<div class="break-after-page">Page break</div>', description: "Forces a page break after." },
          ],
          variants: [
            { name: "Type", values: ["auto", "avoid", "all", "page", "column"], description: "Break behavior." },
          ],
        },
        {
          id: "break-before",
          name: "Break Before",
          description: "Controls how content breaks before an element.",
          category: "layout",
          examples: [
            { code: '<div class="break-before-page">Page break</div>', description: "Forces a page break before." },
          ],
          variants: [
            { name: "Type", values: ["auto", "avoid", "all", "page", "column"], description: "Break behavior." },
          ],
        },
        {
          id: "break-inside",
          name: "Break Inside",
          description: "Controls how content breaks within an element.",
          category: "layout",
          examples: [
            { code: '<div class="break-inside-avoid">Avoid break</div>', description: "Prevents breaking inside." },
          ],
          variants: [
            { name: "Type", values: ["auto", "avoid", "avoid-page", "avoid-column"], description: "Break behavior." },
          ],
        },
        {
          id: "object-fit",
          name: "Object Fit",
          description: "Controls how replaced elements (e.g., images) fit their container.",
          category: "layout",
          examples: [
            { code: '<img class="object-cover" src="...">', description: "Covers container, cropping as needed." },
          ],
          variants: [
            { name: "Fit", values: ["contain", "cover", "fill", "none", "scale-down"], description: "Fit behavior." },
          ],
        },
        {
          id: "object-position",
          name: "Object Position",
          description: "Sets the alignment of replaced elements within their container.",
          category: "layout",
          examples: [
            { code: '<img class="object-top" src="...">', description: "Aligns to the top." },
          ],
          variants: [
            { name: "Position", values: ["top", "bottom", "left", "right", "center"], description: "Alignment options." },
          ],
        },
        {
          id: "overflow",
          name: "Overflow",
          description: "Controls how content overflows its container.",
          category: "layout",
          examples: [
            { code: '<div class="overflow-auto">Scrollable</div>', description: "Adds scrollbars as needed." },
          ],
          variants: [
            { name: "Behavior", values: ["auto", "hidden", "scroll", "visible"], description: "Overflow handling." },
          ],
        },
        {
          id: "overscroll-behavior",
          name: "Overscroll Behavior",
          description: "Controls the behavior of scrollable areas when reaching boundaries.",
          category: "layout",
          examples: [
            { code: '<div class="overscroll-contain">Contained</div>', description: "Prevents scroll chaining." },
          ],
          variants: [
            { name: "Behavior", values: ["auto", "contain", "none"], description: "Overscroll handling." },
          ],
        },
        {
          id: "position",
          name: "Position",
          description: "Sets the positioning method of an element.",
          category: "layout",
          examples: [
            { code: '<div class="absolute">Absolute</div>', description: "Positioned relative to nearest ancestor." },
          ],
          variants: [
            { name: "Type", values: ["static", "relative", "absolute", "fixed", "sticky"], description: "Positioning type." },
          ],
        },
        {
          id: "inset",
          name: "Top / Right / Bottom / Left",
          description: "Sets the position of an element from its edges.",
          category: "layout",
          examples: [
            { code: '<div class="top-4">4 units from top</div>', description: "Positions 1rem from the top." },
          ],
          variants: [
            { name: "Edges", values: ["top", "right", "bottom", "left", "inset"], description: "Edge to position." },
            { name: "Size", values: ["0", "1", "2", "4", "8", "auto"], description: "Distance from edge." },
          ],
        },
        {
          id: "visibility",
          name: "Visibility",
          description: "Controls the visibility of an element.",
          category: "layout",
          examples: [
            { code: '<div class="invisible">Invisible</div>', description: "Hides element but preserves space." },
          ],
          variants: [
            { name: "State", values: ["visible", "invisible"], description: "Visibility state." },
          ],
        },
        {
          id: "z-index",
          name: "Z-Index",
          description: "Sets the stacking order of positioned elements.",
          category: "layout",
          examples: [
            { code: '<div class="z-10">Above others</div>', description: "Stacks above elements with lower z-index." },
          ],
          variants: [
            { name: "Level", values: ["0", "10", "20", "30", "40", "50", "auto"], description: "Stacking level." },
          ],
        },
      ],
    },
  
    // --- Flexbox & Grid Category ---
    {
      id: "flexbox-grid",
      name: "Flexbox & Grid",
      description: "Utilities for building flexible and grid-based layouts.",
      icon: "grid",
      color: "bg-green-500",
      functions: [
        {
          id: "flex-direction",
          name: "Flex Direction",
          description: "Controls the direction of flex items.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="flex flex-row">Row</div>', description: "Items in a row." },
          ],
          variants: [
            { name: "Direction", values: ["row", "row-reverse", "col", "col-reverse"], description: "Flex direction." },
          ],
        },
        {
          id: "flex-wrap",
          name: "Flex Wrap",
          description: "Controls whether flex items wrap to new lines.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="flex flex-wrap">Wrap</div>', description: "Items wrap as needed." },
          ],
          variants: [
            { name: "Wrap", values: ["wrap", "nowrap", "wrap-reverse"], description: "Wrapping behavior." },
          ],
        },
        {
          id: "flex",
          name: "Flex",
          description: "Sets how a flex item grows or shrinks.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="flex-1">Flex item</div>', description: "Grows to fill space." },
          ],
          variants: [
            { name: "Value", values: ["1", "auto", "initial", "none"], description: "Flex behavior." },
          ],
        },
        {
          id: "flex-grow",
          name: "Flex Grow",
          description: "Controls how much a flex item grows.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="grow">Grows</div>', description: "Grows to fill available space." },
          ],
          variants: [
            { name: "Value", values: ["0", "1"], description: "Growth factor." },
          ],
        },
        {
          id: "flex-shrink",
          name: "Flex Shrink",
          description: "Controls how much a flex item shrinks.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="shrink">Shrinks</div>', description: "Shrinks as needed." },
          ],
          variants: [
            { name: "Value", values: ["0", "1"], description: "Shrink factor." },
          ],
        },
        {
          id: "order",
          name: "Order",
          description: "Controls the order of flex or grid items.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="order-2">Second</div>', description: "Appears second in layout." },
          ],
          variants: [
            { name: "Value", values: ["0", "1", "2", "3", "first", "last"], description: "Order position." },
          ],
        },
        {
          id: "grid-template-columns",
          name: "Grid Template Columns",
          description: "Defines the columns in a grid layout.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="grid grid-cols-3">Three columns</div>', description: "Three equal columns." },
          ],
          variants: [
            { name: "Columns", values: ["1", "2", "3", "4", "6", "12", "none"], description: "Column count." },
          ],
        },
        {
          id: "grid-column",
          name: "Grid Column Start / End",
          description: "Controls the column span of a grid item.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="col-span-2">Spans 2</div>', description: "Spans two columns." },
          ],
          variants: [
            { name: "Span", values: ["1", "2", "3", "full", "auto"], description: "Column span." },
          ],
        },
        {
          id: "grid-template-rows",
          name: "Grid Template Rows",
          description: "Defines the rows in a grid layout.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="grid grid-rows-2">Two rows</div>', description: "Two equal rows." },
          ],
          variants: [
            { name: "Rows", values: ["1", "2", "3", "4", "none"], description: "Row count." },
          ],
        },
        {
          id: "grid-row",
          name: "Grid Row Start / End",
          description: "Controls the row span of a grid item.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="row-span-2">Spans 2</div>', description: "Spans two rows." },
          ],
          variants: [
            { name: "Span", values: ["1", "2", "3", "full", "auto"], description: "Row span." },
          ],
        },
        {
          id: "grid-auto-flow",
          name: "Grid Auto Flow",
          description: "Controls how auto-placed items are flowed into the grid.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="grid grid-flow-row">Row flow</div>', description: "Fills rows first." },
          ],
          variants: [
            { name: "Flow", values: ["row", "column", "dense"], description: "Auto-flow direction." },
          ],
        },
        {
          id: "grid-auto-columns",
          name: "Grid Auto Columns",
          description: "Sets the size of implicitly created columns.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="auto-cols-min">Min width</div>', description: "Columns sized to min content." },
          ],
          variants: [
            { name: "Size", values: ["auto", "min", "max", "fr"], description: "Column size." },
          ],
        },
        {
          id: "grid-auto-rows",
          name: "Grid Auto Rows",
          description: "Sets the size of implicitly created rows.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="auto-rows-min">Min height</div>', description: "Rows sized to min content." },
          ],
          variants: [
            { name: "Size", values: ["auto", "min", "max", "fr"], description: "Row size." },
          ],
        },
        {
          id: "gap",
          name: "Gap",
          description: "Sets the spacing between flex or grid items.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="grid gap-4">4 units gap</div>', description: "1rem gap between items." },
          ],
          variants: [
            { name: "Size", values: ["0", "1", "2", "4", "6", "8"], description: "Gap size." },
          ],
        },
        {
          id: "justify-content",
          name: "Justify Content",
          description: "Aligns flex or grid items along the main axis.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="flex justify-center">Centered</div>', description: "Centers items horizontally." },
          ],
          variants: [
            { name: "Alignment", values: ["start", "end", "center", "between", "around", "evenly"], description: "Justify options." },
          ],
        },
        {
          id: "justify-items",
          name: "Justify Items",
          description: "Aligns grid items along the inline axis.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="grid justify-items-center">Centered</div>', description: "Centers grid items." },
          ],
          variants: [
            { name: "Alignment", values: ["start", "end", "center", "stretch"], description: "Item alignment." },
          ],
        },
        {
          id: "justify-self",
          name: "Justify Self",
          description: "Aligns an individual grid item along the inline axis.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="justify-self-center">Centered</div>', description: "Centers this item." },
          ],
          variants: [
            { name: "Alignment", values: ["auto", "start", "end", "center", "stretch"], description: "Self alignment." },
          ],
        },
        {
          id: "align-content",
          name: "Align Content",
          description: "Aligns flex or grid content along the cross axis.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="flex align-content-center">Centered</div>', description: "Centers content vertically." },
          ],
          variants: [
            { name: "Alignment", values: ["start", "end", "center", "between", "around", "evenly"], description: "Content alignment." },
          ],
        },
        {
          id: "align-items",
          name: "Align Items",
          description: "Aligns flex or grid items along the cross axis.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="flex items-center">Centered</div>', description: "Centers items vertically." },
          ],
          variants: [
            { name: "Alignment", values: ["start", "end", "center", "baseline", "stretch"], description: "Item alignment." },
          ],
        },
        {
          id: "align-self",
          name: "Align Self",
          description: "Aligns an individual flex or grid item along the cross axis.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="align-self-center">Centered</div>', description: "Centers this item." },
          ],
          variants: [
            { name: "Alignment", values: ["auto", "start", "end", "center", "stretch"], description: "Self alignment." },
          ],
        },
        {
          id: "place-content",
          name: "Place Content",
          description: "Shorthand for aligning content in both axes.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="place-content-center">Centered</div>', description: "Centers content both ways." },
          ],
          variants: [
            { name: "Alignment", values: ["start", "end", "center", "between", "around", "evenly"], description: "Content placement." },
          ],
        },
        {
          id: "place-items",
          name: "Place Items",
          description: "Shorthand for aligning items in both axes.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="place-items-center">Centered</div>', description: "Centers items both ways." },
          ],
          variants: [
            { name: "Alignment", values: ["start", "end", "center", "stretch"], description: "Item placement." },
          ],
        },
        {
          id: "place-self",
          name: "Place Self",
          description: "Shorthand for aligning an item in both axes.",
          category: "flexbox-grid",
          examples: [
            { code: '<div class="place-self-center">Centered</div>', description: "Centers this item both ways." },
          ],
          variants: [
            { name: "Alignment", values: ["auto", "start", "end", "center", "stretch"], description: "Self placement." },
          ],
        },
      ],
    },
  
    // --- Spacing Category ---
    {
      id: "spacing",
      name: "Spacing",
      description: "Utilities for controlling padding and margin.",
      icon: "move-horizontal",
      color: "bg-yellow-500",
      functions: [
        {
          id: "padding",
          name: "Padding",
          description: "Adds space inside an element’s borders.",
          category: "spacing",
          examples: [
            { code: '<div class="p-4">Padded</div>', description: "1rem padding on all sides." },
          ],
          variants: [
            { name: "Sides", values: ["p", "px", "py", "pt", "pr", "pb", "pl"], description: "Padding direction." },
            { name: "Size", values: ["0", "1", "2", "4", "6", "8", "10"], description: "Padding size." },
          ],
        },
        {
          id: "margin",
          name: "Margin",
          description: "Adds space outside an element’s borders.",
          category: "spacing",
          examples: [
            { code: '<div class="m-4">Margined</div>', description: "1rem margin on all sides." },
          ],
          variants: [
            { name: "Sides", values: ["m", "mx", "my", "mt", "mr", "mb", "ml"], description: "Margin direction." },
            { name: "Size", values: ["0", "1", "2", "4", "6", "8", "10", "auto"], description: "Margin size." },
          ],
        },
        {
          id: "space-between",
          name: "Space Between",
          description: "Sets spacing between child elements.",
          category: "spacing",
          examples: [
            { code: '<div class="space-x-4"><div>1</div><div>2</div></div>', description: "1rem horizontal space." },
          ],
          variants: [
            { name: "Axis", values: ["space-x", "space-y"], description: "Spacing direction." },
            { name: "Size", values: ["0", "1", "2", "4", "6", "8"], description: "Space size." },
          ],
        },
      ],
    },
  
    // --- Sizing Category ---
    {
      id: "sizing",
      name: "Sizing",
      description: "Utilities for controlling element dimensions.",
      icon: "maximize-2",
      color: "bg-orange-500",
      functions: [
        {
          id: "width",
          name: "Width",
          description: "Sets the width of an element.",
          category: "sizing",
          examples: [
            { code: '<div class="w-1/2">Half width</div>', description: "50% width." },
          ],
          variants: [
            { name: "Size", values: ["0", "1", "2", "4", "8", "full", "1/2", "1/3", "auto"], description: "Width value." },
          ],
        },
        {
          id: "min-width",
          name: "Min-Width",
          description: "Sets the minimum width of an element.",
          category: "sizing",
          examples: [
            { code: '<div class="min-w-full">Full min-width</div>', description: "At least 100% width." },
          ],
          variants: [
            { name: "Size", values: ["0", "full", "min", "max"], description: "Minimum width value." },
          ],
        },
        {
          id: "max-width",
          name: "Max-Width",
          description: "Sets the maximum width of an element.",
          category: "sizing",
          examples: [
            { code: '<div class="max-w-md">Medium max-width</div>', description: "Caps width at medium breakpoint." },
          ],
          variants: [
            { name: "Size", values: ["none", "xs", "sm", "md", "lg", "xl", "full"], description: "Maximum width value." },
          ],
        },
        {
          id: "height",
          name: "Height",
          description: "Sets the height of an element.",
          category: "sizing",
          examples: [
            { code: '<div class="h-10">10 units</div>', description: "2.5rem height." },
          ],
          variants: [
            { name: "Size", values: ["0", "1", "2", "4", "8", "full", "screen"], description: "Height value." },
          ],
        },
        {
          id: "min-height",
          name: "Min-Height",
          description: "Sets the minimum height of an element.",
          category: "sizing",
          examples: [
            { code: '<div class="min-h-screen">Screen height</div>', description: "At least full viewport height." },
          ],
          variants: [
            { name: "Size", values: ["0", "full", "screen", "min"], description: "Minimum height value." },
          ],
        },
        {
          id: "max-height",
          name: "Max-Height",
          description: "Sets the maximum height of an element.",
          category: "sizing",
          examples: [
            { code: '<div class="max-h-64">64 units</div>', description: "Caps height at 16rem." },
          ],
          variants: [
            { name: "Size", values: ["none", "full", "screen", "64"], description: "Maximum height value." },
          ],
        },
      ],
    },
  
    // --- Typography Category ---
    {
      id: "typography",
      name: "Typography",
      description: "Utilities for styling text.",
      icon: "type",
      color: "bg-purple-500",
      functions: [
        {
          id: "font-family",
          name: "Font Family",
          description: "Sets the font family of text.",
          category: "typography",
          examples: [
            { code: '<p class="font-sans">Sans-serif</p>', description: "Uses sans-serif font." },
          ],
          variants: [
            { name: "Family", values: ["sans", "serif", "mono"], description: "Font family type." },
          ],
        },
        {
          id: "font-size",
          name: "Font Size",
          description: "Sets the size of text.",
          category: "typography",
          examples: [
            { code: '<p class="text-lg">Large text</p>', description: "Large font size." },
          ],
          variants: [
            { name: "Size", values: ["xs", "sm", "base", "lg", "xl", "2xl"], description: "Font size scale." },
          ],
        },
        {
          id: "font-smoothing",
          name: "Font Smoothing",
          description: "Controls text rendering quality.",
          category: "typography",
          examples: [
            { code: '<p class="antialiased">Smooth text</p>', description: "Smooths font edges." },
          ],
          variants: [
            { name: "Style", values: ["antialiased", "subpixel-antialiased"], description: "Smoothing type." },
          ],
        },
        {
          id: "font-style",
          name: "Font Style",
          description: "Sets the style of text (e.g., italic).",
          category: "typography",
          examples: [
            { code: '<p class="italic">Italic text</p>', description: "Italicizes text." },
          ],
          variants: [
            { name: "Style", values: ["italic", "not-italic"], description: "Font style." },
          ],
        },
        {
          id: "font-weight",
          name: "Font Weight",
          description: "Sets the weight (boldness) of text.",
          category: "typography",
          examples: [
            { code: '<p class="font-bold">Bold text</p>', description: "Bold text." },
          ],
          variants: [
            { name: "Weight", values: ["normal", "bold", "light", "medium"], description: "Font weight." },
          ],
        },
        {
          id: "font-variant-numeric",
          name: "Font Variant Numeric",
          description: "Controls numeric font variants.",
          category: "typography",
          examples: [
            { code: '<p class="tabular-nums">123</p>', description: "Tabular numbers." },
          ],
          variants: [
            { name: "Variant", values: ["normal-nums", "ordinal", "tabular-nums"], description: "Numeric variant." },
          ],
        },
        {
          id: "letter-spacing",
          name: "Letter Spacing",
          description: "Adjusts spacing between characters.",
          category: "typography",
          examples: [
            { code: '<p class="tracking-tight">Tight text</p>', description: "Tighter letter spacing." },
          ],
          variants: [
            { name: "Spacing", values: ["tighter", "tight", "normal", "wide"], description: "Letter spacing scale." },
          ],
        },
        {
          id: "line-height",
          name: "Line Height",
          description: "Sets the height of text lines.",
          category: "typography",
          examples: [
            { code: '<p class="leading-relaxed">Relaxed</p>', description: "More line spacing." },
          ],
          variants: [
            { name: "Height", values: ["none", "tight", "normal", "relaxed"], description: "Line height scale." },
          ],
        },
        {
          id: "list-style-type",
          name: "List Style Type",
          description: "Sets the bullet or numbering style for lists.",
          category: "typography",
          examples: [
            { code: '<ul class="list-disc"><li>Item</li></ul>', description: "Disc bullets." },
          ],
          variants: [
            { name: "Type", values: ["none", "disc", "decimal"], description: "List style." },
          ],
        },
        {
          id: "list-style-position",
          name: "List Style Position",
          description: "Controls the position of list markers.",
          category: "typography",
          examples: [
            { code: '<ul class="list-inside"><li>Item</li></ul>', description: "Markers inside." },
          ],
          variants: [
            { name: "Position", values: ["inside", "outside"], description: "Marker position." },
          ],
        },
        {
          id: "placeholder-color",
          name: "Placeholder Color",
          description: "Sets the color of input placeholders.",
          category: "typography",
          examples: [
            { code: '<input class="placeholder-gray-500" placeholder="Text">', description: "Gray placeholder." },
          ],
          variants: [
            { name: "Color", values: ["gray", "red", "blue"], description: "Placeholder color." },
          ],
        },
        {
          id: "placeholder-opacity",
          name: "Placeholder Opacity",
          description: "Sets the opacity of input placeholders.",
          category: "typography",
          examples: [
            { code: '<input class="placeholder-opacity-50" placeholder="Text">', description: "50% opacity." },
          ],
          variants: [
            { name: "Level", values: ["0", "25", "50", "75", "100"], description: "Opacity percentage." },
          ],
        },
        {
          id: "text-align",
          name: "Text Align",
          description: "Sets the horizontal alignment of text.",
          category: "typography",
          examples: [
            { code: '<p class="text-center">Centered</p>', description: "Centers text." },
          ],
          variants: [
            { name: "Alignment", values: ["left", "center", "right", "justify"], description: "Text alignment." },
          ],
        },
        {
          id: "text-color",
          name: "Text Color",
          description: "Sets the color of text.",
          category: "typography",
          examples: [
            { code: '<p class="text-blue-500">Blue text</p>', description: "Blue text." },
          ],
          variants: [
            { name: "Color", values: ["gray", "red", "blue"], description: "Color palette." },
            { name: "Shade", values: ["100", "500", "900"], description: "Color intensity." },
          ],
        },
        {
          id: "text-opacity",
          name: "Text Opacity",
          description: "Sets the opacity of text color.",
          category: "typography",
          examples: [
            { code: '<p class="text-opacity-50">50% opacity</p>', description: "Half-opaque text." },
          ],
          variants: [
            { name: "Level", values: ["0", "25", "50", "75", "100"], description: "Opacity percentage." },
          ],
        },
        {
          id: "text-decoration",
          name: "Text Decoration",
          description: "Adds or removes text decorations (e.g., underline).",
          category: "typography",
          examples: [
            { code: '<p class="underline">Underlined</p>', description: "Underlines text." },
          ],
          variants: [
            { name: "Style", values: ["underline", "line-through", "no-underline"], description: "Decoration type." },
          ],
        },
        {
          id: "text-decoration-color",
          name: "Text Decoration Color",
          description: "Sets the color of text decorations.",
          category: "typography",
          examples: [
            { code: '<p class="underline decoration-red-500">Red underline</p>', description: "Red underline." },
          ],
          variants: [
            { name: "Color", values: ["gray", "red", "blue"], description: "Decoration color." },
          ],
        },
        {
          id: "text-decoration-style",
          name: "Text Decoration Style",
          description: "Sets the style of text decorations.",
          category: "typography",
          examples: [
            { code: '<p class="underline decoration-dashed">Dashed</p>', description: "Dashed underline." },
          ],
          variants: [
            { name: "Style", values: ["solid", "double", "dotted", "dashed"], description: "Decoration style." },
          ],
        },
        {
          id: "text-decoration-thickness",
          name: "Text Decoration Thickness",
          description: "Sets the thickness of text decorations.",
          category: "typography",
          examples: [
            { code: '<p class="underline decoration-2">2px</p>', description: "2px thick underline." },
          ],
          variants: [
            { name: "Thickness", values: ["0", "1", "2", "4"], description: "Decoration thickness." },
          ],
        },
        {
          id: "text-underline-offset",
          name: "Text Underline Offset",
          description: "Sets the distance of underlines from text.",
          category: "typography",
          examples: [
            { code: '<p class="underline underline-offset-4">Offset</p>', description: "4px offset." },
          ],
          variants: [
            { name: "Offset", values: ["0", "1", "2", "4"], description: "Underline offset." },
          ],
        },
        {
          id: "text-transform",
          name: "Text Transform",
          description: "Controls text capitalization.",
          category: "typography",
          examples: [
            { code: '<p class="uppercase">Uppercase</p>', description: "All uppercase." },
          ],
          variants: [
            { name: "Transform", values: ["uppercase", "lowercase", "capitalize", "normal-case"], description: "Text transformation." },
          ],
        },
        {
          id: "text-overflow",
          name: "Text Overflow",
          description: "Controls how text overflows its container.",
          category: "typography",
          examples: [
            { code: '<p class="truncate">Truncated</p>', description: "Truncates with ellipsis." },
          ],
          variants: [
            { name: "Behavior", values: ["truncate", "text-ellipsis", "text-clip"], description: "Overflow handling." },
          ],
        },
        {
          id: "text-indent",
          name: "Text Indent",
          description: "Sets the indentation of the first line of text.",
          category: "typography",
          examples: [
            { code: '<p class="indent-4">Indented</p>', description: "1rem indent." },
          ],
          variants: [
            { name: "Size", values: ["0", "1", "2", "4"], description: "Indent size." },
          ],
        },
        {
          id: "vertical-align",
          name: "Vertical Align",
          description: "Sets the vertical alignment of inline elements.",
          category: "typography",
          examples: [
            { code: '<span class="align-middle">Middle</span>', description: "Vertically centered." },
          ],
          variants: [
            { name: "Alignment", values: ["baseline", "top", "middle", "bottom"], description: "Vertical alignment." },
          ],
        },
        {
          id: "whitespace",
          name: "Whitespace",
          description: "Controls how whitespace is handled in text.",
          category: "typography",
          examples: [
            { code: '<p class="whitespace-nowrap">No wrap</p>', description: "Prevents wrapping." },
          ],
          variants: [
            { name: "Behavior", values: ["normal", "nowrap", "pre", "pre-wrap"], description: "Whitespace handling." },
          ],
        },
        {
          id: "word-break",
          name: "Word Break",
          description: "Controls word breaking behavior.",
          category: "typography",
          examples: [
            { code: '<p class="break-words">Break words</p>', description: "Breaks words as needed." },
          ],
          variants: [
            { name: "Behavior", values: ["normal", "break-words", "break-all"], description: "Word breaking." },
          ],
        },
        {
          id: "hyphens",
          name: "Hyphens",
          description: "Controls hyphenation of text.",
          category: "typography",
          examples: [
            { code: '<p class="hyphens-auto">Auto hyphen</p>', description: "Automatic hyphenation." },
          ],
          variants: [
            { name: "Behavior", values: ["none", "manual", "auto"], description: "Hyphenation behavior." },
          ],
        },
        {
          id: "content",
          name: "Content",
          description: "Sets the content for pseudo-elements.",
          category: "typography",
          examples: [
            { code: '<div class="content-none"></div>', description: "Removes pseudo-element content." },
          ],
          variants: [
            { name: "Value", values: ["none"], description: "Content value." },
          ],
        },
      ],
    },
  
    // --- Backgrounds Category ---
    {
      id: "backgrounds",
      name: "Backgrounds",
      description: "Utilities for styling element backgrounds.",
      icon: "palette",
      color: "bg-pink-500",
      functions: [
        {
          id: "background-attachment",
          name: "Background Attachment",
          description: "Controls whether the background scrolls with the content.",
          category: "backgrounds",
          examples: [
            { code: '<div class="bg-fixed">Fixed</div>', description: "Background stays fixed." },
          ],
          variants: [
            { name: "Attachment", values: ["fixed", "local", "scroll"], description: "Attachment behavior." },
          ],
        },
        {
          id: "background-clip",
          name: "Background Clip",
          description: "Defines how far the background extends within an element.",
          category: "backgrounds",
          examples: [
            { code: '<div class="bg-clip-text">Text clip</div>', description: "Clips to text." },
          ],
          variants: [
            { name: "Clip", values: ["border", "padding", "content", "text"], description: "Clipping area." },
          ],
        },
        {
          id: "background-color",
          name: "Background Color",
          description: "Sets the background color of an element.",
          category: "backgrounds",
          examples: [
            { code: '<div class="bg-blue-500">Blue</div>', description: "Blue background." },
          ],
          variants: [
            { name: "Color", values: ["gray", "red", "blue"], description: "Color palette." },
            { name: "Shade", values: ["100", "500", "900"], description: "Color intensity." },
          ],
        },
        {
          id: "background-opacity",
          name: "Background Opacity",
          description: "Sets the opacity of the background color.",
          category: "backgrounds",
          examples: [
            { code: '<div class="bg-opacity-50">50% opacity</div>', description: "Half-opaque background." },
          ],
          variants: [
            { name: "Level", values: ["0", "25", "50", "75", "100"], description: "Opacity percentage." },
          ],
        },
        {
          id: "background-origin",
          name: "Background Origin",
          description: "Sets the origin point of the background.",
          category: "backgrounds",
          examples: [
            { code: '<div class="bg-origin-border">Border origin</div>', description: "Starts at border." },
          ],
          variants: [
            { name: "Origin", values: ["border", "padding", "content"], description: "Origin point." },
          ],
        },
        {
          id: "background-position",
          name: "Background Position",
          description: "Sets the position of the background image.",
          category: "backgrounds",
          examples: [
            { code: '<div class="bg-center">Centered</div>', description: "Centers background." },
          ],
          variants: [
            { name: "Position", values: ["top", "bottom", "left", "right", "center"], description: "Position options." },
          ],
        },
        {
          id: "background-repeat",
          name: "Background Repeat",
          description: "Controls how the background image repeats.",
          category: "backgrounds",
          examples: [
            { code: '<div class="bg-no-repeat">No repeat</div>', description: "No repetition." },
          ],
          variants: [
            { name: "Repeat", values: ["repeat", "no-repeat", "repeat-x", "repeat-y"], description: "Repeat behavior." },
          ],
        },
        {
          id: "background-size",
          name: "Background Size",
          description: "Sets the size of the background image.",
          category: "backgrounds",
          examples: [
            { code: '<div class="bg-cover">Cover</div>', description: "Covers the element." },
          ],
          variants: [
            { name: "Size", values: ["auto", "cover", "contain"], description: "Size options." },
          ],
        },
        {
          id: "background-image",
          name: "Background Image",
          description: "Applies a background image or gradient.",
          category: "backgrounds",
          examples: [
            { code: '<div class="bg-gradient-to-r">Gradient</div>', description: "Right gradient." },
          ],
          variants: [
            { name: "Type", values: ["none", "gradient-to-t", "gradient-to-r"], description: "Image or gradient." },
          ],
        },
        {
          id: "gradient-color-stops",
          name: "Gradient Color Stops",
          description: "Defines colors in a gradient.",
          category: "backgrounds",
          examples: [
            { code: '<div class="from-blue-500 to-red-500">Gradient</div>', description: "Blue to red gradient." },
          ],
          variants: [
            { name: "Position", values: ["from", "via", "to"], description: "Gradient stop position." },
            { name: "Color", values: ["blue", "red"], description: "Gradient colors." },
          ],
        },
      ],
    },
  
    // --- Borders Category ---
    {
      id: "borders",
      name: "Borders",
      description: "Utilities for styling borders and outlines.",
      icon: "square",
      color: "bg-indigo-500",
      functions: [
        {
          id: "border-radius",
          name: "Border Radius",
          description: "Sets the corner radius of an element.",
          category: "borders",
          examples: [
            { code: '<div class="rounded-md">Medium</div>', description: "Medium rounded corners." },
          ],
          variants: [
            { name: "Size", values: ["none", "sm", "md", "lg", "full"], description: "Radius size." },
          ],
        },
        {
          id: "border-width",
          name: "Border Width",
          description: "Sets the width of an element’s borders.",
          category: "borders",
          examples: [
            { code: '<div class="border-2">2px</div>', description: "2px border." },
          ],
          variants: [
            { name: "Width", values: ["0", "1", "2", "4"], description: "Border thickness." },
          ],
        },
        {
          id: "border-color",
          name: "Border Color",
          description: "Sets the color of an element’s borders.",
          category: "borders",
          examples: [
            { code: '<div class="border-blue-500">Blue</div>', description: "Blue border." },
          ],
          variants: [
            { name: "Color", values: ["gray", "red", "blue"], description: "Border color." },
          ],
        },
        {
          id: "border-opacity",
          name: "Border Opacity",
          description: "Sets the opacity of border color.",
          category: "borders",
          examples: [
            { code: '<div class="border-opacity-50">50%</div>', description: "Half-opaque border." },
          ],
          variants: [
            { name: "Level", values: ["0", "25", "50", "75", "100"], description: "Opacity percentage." },
          ],
        },
        {
          id: "border-style",
          name: "Border Style",
          description: "Sets the style of an element’s borders.",
          category: "borders",
          examples: [
            { code: '<div class="border-dashed">Dashed</div>', description: "Dashed border." },
          ],
          variants: [
            { name: "Style", values: ["solid", "dashed", "dotted"], description: "Border style." },
          ],
        },
        {
          id: "divide-width",
          name: "Divide Width",
          description: "Sets the width of borders between adjacent elements.",
          category: "borders",
          examples: [
            { code: '<div class="divide-y-2"><div>1</div><div>2</div></div>', description: "2px divider." },
          ],
          variants: [
            { name: "Width", values: ["0", "1", "2", "4"], description: "Divider thickness." },
          ],
        },
        {
          id: "divide-color",
          name: "Divide Color",
          description: "Sets the color of borders between adjacent elements.",
          category: "borders",
          examples: [
            { code: '<div class="divide-blue-500"><div>1</div><div>2</div></div>', description: "Blue divider." },
          ],
          variants: [
            { name: "Color", values: ["gray", "red", "blue"], description: "Divider color." },
          ],
        },
        {
          id: "divide-opacity",
          name: "Divide Opacity",
          description: "Sets the opacity of divider borders.",
          category: "borders",
          examples: [
            { code: '<div class="divide-opacity-50"><div>1</div><div>2</div></div>', description: "50% opacity." },
          ],
          variants: [
            { name: "Level", values: ["0", "25", "50", "75", "100"], description: "Opacity percentage." },
          ],
        },
        {
          id: "divide-style",
          name: "Divide Style",
          description: "Sets the style of borders between adjacent elements.",
          category: "borders",
          examples: [
            { code: '<div class="divide-dashed"><div>1</div><div>2</div></div>', description: "Dashed divider." },
          ],
          variants: [
            { name: "Style", values: ["solid", "dashed", "dotted"], description: "Divider style." },
          ],
        },
        {
          id: "outline-width",
          name: "Outline Width",
          description: "Sets the width of an element’s outline.",
          category: "borders",
          examples: [
            { code: '<div class="outline-2">2px</div>', description: "2px outline." },
          ],
          variants: [
            { name: "Width", values: ["0", "1", "2", "4"], description: "Outline thickness." },
          ],
        },
        {
          id: "outline-color",
          name: "Outline Color",
          description: "Sets the color of an element’s outline.",
          category: "borders",
          examples: [
            { code: '<div class="outline-blue-500">Blue</div>', description: "Blue outline." },
          ],
          variants: [
            { name: "Color", values: ["gray", "red", "blue"], description: "Outline color." },
          ],
        },
        {
          id: "outline-style",
          name: "Outline Style",
          description: "Sets the style of an element’s outline.",
          category: "borders",
          examples: [
            { code: '<div class="outline-dashed">Dashed</div>', description: "Dashed outline." },
          ],
          variants: [
            { name: "Style", values: ["none", "solid", "dashed", "dotted"], description: "Outline style." },
          ],
        },
        {
          id: "outline-offset",
          name: "Outline Offset",
          description: "Sets the distance of the outline from the element.",
          category: "borders",
          examples: [
            { code: '<div class="outline-offset-2">Offset</div>', description: "2px offset." },
          ],
          variants: [
            { name: "Offset", values: ["0", "1", "2", "4"], description: "Offset distance." },
          ],
        },
        {
          id: "ring-width",
          name: "Ring Width",
          description: "Adds an inset ring (shadow) around an element.",
          category: "borders",
          examples: [
            { code: '<div class="ring-2">2px ring</div>', description: "2px inset ring." },
          ],
          variants: [
            { name: "Width", values: ["0", "1", "2", "4"], description: "Ring thickness." },
          ],
        },
        {
          id: "ring-color",
          name: "Ring Color",
          description: "Sets the color of the ring.",
          category: "borders",
          examples: [
            { code: '<div class="ring-blue-500">Blue ring</div>', description: "Blue ring." },
          ],
          variants: [
            { name: "Color", values: ["gray", "red", "blue"], description: "Ring color." },
          ],
        },
        {
          id: "ring-opacity",
          name: "Ring Opacity",
          description: "Sets the opacity of the ring.",
          category: "borders",
          examples: [
            { code: '<div class="ring-opacity-50">50%</div>', description: "Half-opaque ring." },
          ],
          variants: [
            { name: "Level", values: ["0", "25", "50", "75", "100"], description: "Opacity percentage." },
          ],
        },
        {
          id: "ring-offset-width",
          name: "Ring Offset Width",
          description: "Sets the width of the ring offset.",
          category: "borders",
          examples: [
            { code: '<div class="ring-offset-2">2px offset</div>', description: "2px ring offset." },
          ],
          variants: [
            { name: "Width", values: ["0", "1", "2", "4"], description: "Offset thickness." },
          ],
        },
        {
          id: "ring-offset-color",
          name: "Ring Offset Color",
          description: "Sets the color of the ring offset.",
          category: "borders",
          examples: [
            { code: '<div class="ring-offset-blue-500">Blue</div>', description: "Blue offset." },
          ],
          variants: [
            { name: "Color", values: ["gray", "red", "blue"], description: "Offset color." },
          ],
        },
      ],
    },
  
    // --- Effects Category ---
    {
      id: "effects",
      name: "Effects",
      description: "Utilities for applying visual effects.",
      icon: "sparkles",
      color: "bg-teal-500",
      functions: [
        {
          id: "box-shadow",
          name: "Box Shadow",
          description: "Adds shadow effects around an element.",
          category: "effects",
          examples: [
            { code: '<div class="shadow-md">Medium shadow</div>', description: "Medium shadow." },
          ],
          variants: [
            { name: "Size", values: ["sm", "md", "lg", "none"], description: "Shadow size." },
          ],
        },
        {
          id: "box-shadow-color",
          name: "Box Shadow Color",
          description: "Sets the color of the box shadow.",
          category: "effects",
          examples: [
            { code: '<div class="shadow-blue-500">Blue shadow</div>', description: "Blue shadow." },
          ],
          variants: [
            { name: "Color", values: ["gray", "red", "blue"], description: "Shadow color." },
          ],
        },
        {
          id: "opacity",
          name: "Opacity",
          description: "Sets the opacity of an element.",
          category: "effects",
          examples: [
            { code: '<div class="opacity-50">50%</div>', description: "Half opacity." },
          ],
          variants: [
            { name: "Level", values: ["0", "25", "50", "75", "100"], description: "Opacity percentage." },
          ],
        },
        {
          id: "mix-blend-mode",
          name: "Mix Blend Mode",
          description: "Sets how an element blends with its background.",
          category: "effects",
          examples: [
            { code: '<div class="mix-blend-multiply">Multiply</div>', description: "Multiply blend mode." },
          ],
          variants: [
            { name: "Mode", values: ["normal", "multiply", "screen"], description: "Blend mode." },
          ],
        },
        {
          id: "background-blend-mode",
          name: "Background Blend Mode",
          description: "Sets how background layers blend with each other.",
          category: "effects",
          examples: [
            { code: '<div class="bg-blend-overlay">Overlay</div>', description: "Overlay blend mode." },
          ],
          variants: [
            { name: "Mode", values: ["normal", "overlay", "multiply"], description: "Blend mode." },
          ],
        },
      ],
    },
  
    // --- Filters Category ---
    {
      id: "filters",
      name: "Filters",
      description: "Utilities for applying graphical filters.",
      icon: "filter",
      color: "bg-gray-500",
      functions: [
        {
          id: "blur",
          name: "Blur",
          description: "Applies a blur effect to an element.",
          category: "filters",
          examples: [
            { code: '<div class="blur-md">Medium blur</div>', description: "Medium blur." },
          ],
          variants: [
            { name: "Intensity", values: ["none", "sm", "md", "lg"], description: "Blur strength." },
          ],
        },
        {
          id: "brightness",
          name: "Brightness",
          description: "Adjusts the brightness of an element.",
          category: "filters",
          examples: [
            { code: '<div class="brightness-150">150%</div>', description: "Increases brightness." },
          ],
          variants: [
            { name: "Level", values: ["0", "50", "100", "150"], description: "Brightness percentage." },
          ],
        },
        {
          id: "contrast",
          name: "Contrast",
          description: "Adjusts the contrast of an element.",
          category: "filters",
          examples: [
            { code: '<div class="contrast-125">125%</div>', description: "Increases contrast." },
          ],
          variants: [
            { name: "Level", values: ["0", "75", "100", "125"], description: "Contrast percentage." },
          ],
        },
        {
          id: "drop-shadow",
          name: "Drop Shadow",
          description: "Applies a drop shadow effect.",
          category: "filters",
          examples: [
            { code: '<div class="drop-shadow-md">Medium</div>', description: "Medium drop shadow." },
          ],
          variants: [
            { name: "Size", values: ["sm", "md", "lg"], description: "Shadow size." },
          ],
        },
        {
          id: "grayscale",
          name: "Grayscale",
          description: "Converts an element to grayscale.",
          category: "filters",
          examples: [
            { code: '<div class="grayscale">Grayscale</div>', description: "Full grayscale." },
          ],
          variants: [
            { name: "Level", values: ["0", "100"], description: "Grayscale percentage." },
          ],
        },
        {
          id: "hue-rotate",
          name: "Hue Rotate",
          description: "Rotates the hue of an element.",
          category: "filters",
          examples: [
            { code: '<div class="hue-rotate-90">90°</div>', description: "Rotates hue by 90 degrees." },
          ],
          variants: [
            { name: "Degrees", values: ["0", "90", "180"], description: "Rotation angle." },
          ],
        },
        {
          id: "invert",
          name: "Invert",
          description: "Inverts the colors of an element.",
          category: "filters",
          examples: [
            { code: '<div class="invert">Inverted</div>', description: "Full inversion." },
          ],
          variants: [
            { name: "Level", values: ["0", "100"], description: "Inversion percentage." },
          ],
        },
        {
          id: "saturate",
          name: "Saturate",
          description: "Adjusts the saturation of an element.",
          category: "filters",
          examples: [
            { code: '<div class="saturate-200">200%</div>', description: "Increases saturation." },
          ],
          variants: [
            { name: "Level", values: ["0", "100", "200"], description: "Saturation percentage." },
          ],
        },
        {
          id: "sepia",
          name: "Sepia",
          description: "Applies a sepia tone to an element.",
          category: "filters",
          examples: [
            { code: '<div class="sepia">Sepia</div>', description: "Full sepia." },
          ],
          variants: [
            { name: "Level", values: ["0", "100"], description: "Sepia percentage." },
          ],
        },
        {
          id: "backdrop-blur",
          name: "Backdrop Blur",
          description: "Blurs the background behind an element.",
          category: "filters",
          examples: [
            { code: '<div class="backdrop-blur-md">Medium</div>', description: "Medium backdrop blur." },
          ],
          variants: [
            { name: "Intensity", values: ["none", "sm", "md", "lg"], description: "Blur strength." },
          ],
        },
        {
          id: "backdrop-brightness",
          name: "Backdrop Brightness",
          description: "Adjusts the brightness of the background.",
          category: "filters",
          examples: [
            { code: '<div class="backdrop-brightness-150">150%</div>', description: "Brighter backdrop." },
          ],
          variants: [
            { name: "Level", values: ["0", "50", "100", "150"], description: "Brightness percentage." },
          ],
        },
        {
          id: "backdrop-contrast",
          name: "Backdrop Contrast",
          description: "Adjusts the contrast of the background.",
          category: "filters",
          examples: [
            { code: '<div class="backdrop-contrast-125">125%</div>', description: "Higher contrast backdrop." },
          ],
          variants: [
            { name: "Level", values: ["0", "75", "100", "125"], description: "Contrast percentage." },
          ],
        },
        {
          id: "backdrop-grayscale",
          name: "Backdrop Grayscale",
          description: "Converts the background to grayscale.",
          category: "filters",
          examples: [
            { code: '<div class="backdrop-grayscale">Grayscale</div>', description: "Full grayscale backdrop." },
          ],
          variants: [
            { name: "Level", values: ["0", "100"], description: "Grayscale percentage." },
          ],
        },
        {
          id: "backdrop-hue-rotate",
          name: "Backdrop Hue Rotate",
          description: "Rotates the hue of the background.",
          category: "filters",
          examples: [
            { code: '<div class="backdrop-hue-rotate-90">90°</div>', description: "Rotates hue by 90 degrees." },
          ],
          variants: [
            { name: "Degrees", values: ["0", "90", "180"], description: "Rotation angle." },
          ],
        },
        {
          id: "backdrop-invert",
          name: "Backdrop Invert",
          description: "Inverts the colors of the background.",
          category: "filters",
          examples: [
            { code: '<div class="backdrop-invert">Inverted</div>', description: "Full inversion." },
          ],
          variants: [
            { name: "Level", values: ["0", "100"], description: "Inversion percentage." },
          ],
        },
        {
          id: "backdrop-opacity",
          name: "Backdrop Opacity",
          description: "Sets the opacity of the background.",
          category: "filters",
          examples: [
            { code: '<div class="backdrop-opacity-50">50%</div>', description: "Half-opaque backdrop." },
          ],
          variants: [
            { name: "Level", values: ["0", "25", "50", "75", "100"], description: "Opacity percentage." },
          ],
        },
        {
          id: "backdrop-saturate",
          name: "Backdrop Saturate",
          description: "Adjusts the saturation of the background.",
          category: "filters",
          examples: [
            { code: '<div class="backdrop-saturate-200">200%</div>', description: "Higher saturation." },
          ],
          variants: [
            { name: "Level", values: ["0", "100", "200"], description: "Saturation percentage." },
          ],
        },
        {
          id: "backdrop-sepia",
          name: "Backdrop Sepia",
          description: "Applies a sepia tone to the background.",
          category: "filters",
          examples: [
            { code: '<div class="backdrop-sepia">Sepia</div>', description: "Full sepia backdrop." },
          ],
          variants: [
            { name: "Level", values: ["0", "100"], description: "Sepia percentage." },
          ],
        },
      ],
    },
  
    // --- Tables Category ---
    {
      id: "tables",
      name: "Tables",
      description: "Utilities for styling tables.",
      icon: "table",
      color: "bg-blue-600",
      functions: [
        {
          id: "border-collapse",
          name: "Border Collapse",
          description: "Controls whether table borders collapse into a single border.",
          category: "tables",
          examples: [
            { code: '<table class="border-collapse"><tr><td>Cell</td></tr></table>', description: "Collapsed borders." },
          ],
          variants: [
            { name: "Behavior", values: ["collapse", "separate"], description: "Border behavior." },
          ],
        },
        {
          id: "border-spacing",
          name: "Border Spacing",
          description: "Sets the spacing between table cells.",
          category: "tables",
          examples: [
            { code: '<table class="border-spacing-2"><tr><td>Cell</td></tr></table>', description: "2px spacing." },
          ],
          variants: [
            { name: "Size", values: ["0", "1", "2", "4"], description: "Spacing size." },
          ],
        },
        {
          id: "table-layout",
          name: "Table Layout",
          description: "Controls the layout algorithm for tables.",
          category: "tables",
          examples: [
            { code: '<table class="table-fixed"><tr><td>Cell</td></tr></table>', description: "Fixed layout." },
          ],
          variants: [
            { name: "Layout", values: ["auto", "fixed"], description: "Table layout type." },
          ],
        },
        {
          id: "caption-side",
          name: "Caption Side",
          description: "Sets the position of the table caption.",
          category: "tables",
          examples: [
            { code: '<table class="caption-bottom"><caption>Caption</caption><tr><td>Cell</td></tr></table>', description: "Bottom caption." },
          ],
          variants: [
            { name: "Side", values: ["top", "bottom"], description: "Caption position." },
          ],
        },
      ],
    },
  
    // --- Transitions & Animation Category ---
    {
      id: "transitions-animation",
      name: "Transitions & Animation",
      description: "Utilities for adding transitions and animations.",
      icon: "zap",
      color: "bg-pink-500",
      functions: [
        {
          id: "transition-property",
          name: "Transition Property",
          description: "Specifies which properties to transition.",
          category: "transitions-animation",
          examples: [
            { code: '<div class="transition-colors">Color transition</div>', description: "Transitions colors." },
          ],
          variants: [
            { name: "Property", values: ["none", "all", "colors", "opacity"], description: "Transition properties." },
          ],
        },
        {
          id: "transition-duration",
          name: "Transition Duration",
          description: "Sets the duration of transitions.",
          category: "transitions-animation",
          examples: [
            { code: '<div class="duration-300">300ms</div>', description: "300ms transition." },
          ],
          variants: [
            { name: "Time", values: ["75", "150", "300", "500"], description: "Duration in milliseconds." },
          ],
        },
        {
          id: "transition-timing-function",
          name: "Transition Timing Function",
          description: "Sets the easing function for transitions.",
          category: "transitions-animation",
          examples: [
            { code: '<div class="ease-in-out">Ease in-out</div>', description: "Smooth easing." },
          ],
          variants: [
            { name: "Easing", values: ["linear", "ease-in", "ease-out", "ease-in-out"], description: "Timing function." },
          ],
        },
        {
          id: "transition-delay",
          name: "Transition Delay",
          description: "Sets a delay before the transition starts.",
          category: "transitions-animation",
          examples: [
            { code: '<div class="delay-150">150ms</div>', description: "150ms delay." },
          ],
          variants: [
            { name: "Time", values: ["75", "150", "300"], description: "Delay in milliseconds." },
          ],
        },
        {
          id: "animation",
          name: "Animation",
          description: "Applies predefined animations.",
          category: "transitions-animation",
          examples: [
            { code: '<div class="animate-spin">Spinning</div>', description: "Spinning animation." },
          ],
          variants: [
            { name: "Type", values: ["none", "spin", "ping", "pulse"], description: "Animation type." },
          ],
        },
      ],
    },
  
    // --- Transforms Category ---
    {
      id: "transforms",
      name: "Transforms",
      description: "Utilities for applying transformations.",
      icon: "rotate-3d",
      color: "bg-purple-500",
      functions: [
        {
          id: "scale",
          name: "Scale",
          description: "Scales an element’s size.",
          category: "transforms",
          examples: [
            { code: '<div class="scale-50">50%</div>', description: "Scales to 50%." },
          ],
          variants: [
            { name: "Factor", values: ["0", "50", "100", "150"], description: "Scale percentage." },
          ],
        },
        {
          id: "rotate",
          name: "Rotate",
          description: "Rotates an element.",
          category: "transforms",
          examples: [
            { code: '<div class="rotate-45">45°</div>', description: "Rotates 45 degrees." },
          ],
          variants: [
            { name: "Degrees", values: ["0", "45", "90", "180"], description: "Rotation angle." },
          ],
        },
        {
          id: "translate",
          name: "Translate",
          description: "Moves an element along the X or Y axis.",
          category: "transforms",
          examples: [
            { code: '<div class="translate-x-4">4 units</div>', description: "Moves 1rem right." },
          ],
          variants: [
            { name: "Axis", values: ["translate-x", "translate-y"], description: "Translation direction." },
            { name: "Distance", values: ["0", "1", "2", "4"], description: "Translation distance." },
          ],
        },
        {
          id: "skew",
          name: "Skew",
          description: "Skews an element along the X or Y axis.",
          category: "transforms",
          examples: [
            { code: '<div class="skew-x-12">12°</div>', description: "Skews 12 degrees on X." },
          ],
          variants: [
            { name: "Axis", values: ["skew-x", "skew-y"], description: "Skew direction." },
            { name: "Degrees", values: ["0", "6", "12"], description: "Skew angle." },
          ],
        },
        {
          id: "transform-origin",
          name: "Transform Origin",
          description: "Sets the origin point for transformations.",
          category: "transforms",
          examples: [
            { code: '<div class="origin-center">Center</div>', description: "Transforms from center." },
          ],
          variants: [
            { name: "Origin", values: ["center", "top", "bottom", "left", "right"], description: "Origin point." },
          ],
        },
      ],
    },
  
    // --- Interactivity Category ---
    {
      id: "interactivity",
      name: "Interactivity",
      description: "Utilities for controlling user interaction.",
      icon: "mouse-pointer",
      color: "bg-red-500",
      functions: [
        {
          id: "accent-color",
          name: "Accent Color",
          description: "Sets the accent color for form controls.",
          category: "interactivity",
          examples: [
            { code: '<input type="checkbox" class="accent-blue-500">', description: "Blue accent." },
          ],
          variants: [
            { name: "Color", values: ["gray", "red", "blue"], description: "Accent color." },
          ],
        },
        {
          id: "appearance",
          name: "Appearance",
          description: "Controls the default appearance of elements.",
          category: "interactivity",
          examples: [
            { code: '<button class="appearance-none">No style</button>', description: "Removes default styling." },
          ],
          variants: [
            { name: "Style", values: ["none"], description: "Appearance value." },
          ],
        },
        {
          id: "cursor",
          name: "Cursor",
          description: "Sets the mouse cursor style.",
          category: "interactivity",
          examples: [
            { code: '<div class="cursor-pointer">Pointer</div>', description: "Pointer cursor." },
          ],
          variants: [
            { name: "Type", values: ["auto", "pointer", "not-allowed"], description: "Cursor style." },
          ],
        },
        {
          id: "caret-color",
          name: "Caret Color",
          description: "Sets the color of the text cursor.",
          category: "interactivity",
          examples: [
            { code: '<input class="caret-blue-500">', description: "Blue caret." },
          ],
          variants: [
            { name: "Color", values: ["gray", "red", "blue"], description: "Caret color." },
          ],
        },
        {
          id: "pointer-events",
          name: "Pointer Events",
          description: "Controls how an element responds to pointer events.",
          category: "interactivity",
          examples: [
            { code: '<div class="pointer-events-none">Disabled</div>', description: "Disables pointer events." },
          ],
          variants: [
            { name: "Behavior", values: ["none", "auto"], description: "Event handling." },
          ],
        },
        {
          id: "resize",
          name: "Resize",
          description: "Controls whether an element can be resized.",
          category: "interactivity",
          examples: [
            { code: '<textarea class="resize">Resizable</textarea>', description: "Allows resizing." },
          ],
          variants: [
            { name: "Direction", values: ["none", "both", "horizontal", "vertical"], description: "Resize direction." },
          ],
        },
        {
          id: "scroll-behavior",
          name: "Scroll Behavior",
          description: "Controls the scrolling behavior.",
          category: "interactivity",
          examples: [
            { code: '<div class="scroll-smooth">Smooth</div>', description: "Smooth scrolling." },
          ],
          variants: [
            { name: "Behavior", values: ["auto", "smooth"], description: "Scroll behavior." },
          ],
        },
        {
          id: "scroll-margin",
          name: "Scroll Margin",
          description: "Sets the margin around an element when scrolled into view.",
          category: "interactivity",
          examples: [
            { code: '<div class="scroll-m-4">4 units</div>', description: "1rem scroll margin." },
          ],
          variants: [
            { name: "Size", values: ["0", "1", "2", "4"], description: "Margin size." },
          ],
        },
        {
          id: "scroll-padding",
          name: "Scroll Padding",
          description: "Sets padding within a scroll container.",
          category: "interactivity",
          examples: [
            { code: '<div class="scroll-p-4">4 units</div>', description: "1rem scroll padding." },
          ],
          variants: [
            { name: "Size", values: ["0", "1", "2", "4"], description: "Padding size." },
          ],
        },
        {
          id: "scroll-snap-align",
          name: "Scroll Snap Align",
          description: "Controls alignment of scroll snap points.",
          category: "interactivity",
          examples: [
            { code: '<div class="snap-center">Center</div>', description: "Snaps to center." },
          ],
          variants: [
            { name: "Alignment", values: ["start", "center", "end"], description: "Snap alignment." },
          ],
        },
        {
          id: "scroll-snap-stop",
          name: "Scroll Snap Stop",
          description: "Controls whether scrolling must stop at snap points.",
          category: "interactivity",
          examples: [
            { code: '<div class="snap-always">Always</div>', description: "Always stops at snap points." },
          ],
          variants: [
            { name: "Behavior", values: ["normal", "always"], description: "Snap stop behavior." },
          ],
        },
        {
          id: "scroll-snap-type",
          name: "Scroll Snap Type",
          description: "Defines the scroll snapping behavior.",
          category: "interactivity",
          examples: [
            { code: '<div class="snap-x">X-axis</div>', description: "Snaps on X-axis." },
          ],
          variants: [
            { name: "Type", values: ["none", "x", "y", "both"], description: "Snap type." },
          ],
        },
        {
          id: "touch-action",
          name: "Touch Action",
          description: "Controls touch behavior on an element.",
          category: "interactivity",
          examples: [
            { code: '<div class="touch-pan-x">Pan X</div>', description: "Allows panning on X-axis." },
          ],
          variants: [
            { name: "Action", values: ["auto", "none", "pan-x", "pan-y"], description: "Touch behavior." },
          ],
        },
        {
          id: "user-select",
          name: "User Select",
          description: "Controls whether text can be selected.",
          category: "interactivity",
          examples: [
            { code: '<div class="select-none">Not selectable</div>', description: "Prevents selection." },
          ],
          variants: [
            { name: "Behavior", values: ["none", "text", "all", "auto"], description: "Selection behavior." },
          ],
        },
        {
          id: "will-change",
          name: "Will Change",
          description: "Hints to the browser about properties that will change.",
          category: "interactivity",
          examples: [
            { code: '<div class="will-change-transform">Transform</div>', description: "Optimizes transform changes." },
          ],
          variants: [
            { name: "Property", values: ["auto", "scroll", "contents", "transform"], description: "Properties to optimize." },
          ],
        },
      ],
    },
  
    // --- SVG Category ---
    {
      id: "svg",
      name: "SVG",
      description: "Utilities for styling SVG elements.",
      icon: "pen-tool",
      color: "bg-cyan-500",
      functions: [
        {
          id: "fill",
          name: "Fill",
          description: "Sets the fill color of an SVG.",
          category: "svg",
          examples: [
            { code: '<svg class="fill-blue-500"><path d="..."/></svg>', description: "Blue fill." },
          ],
          variants: [
            { name: "Color", values: ["gray", "red", "blue"], description: "Fill color." },
          ],
        },
        {
          id: "stroke",
          name: "Stroke",
          description: "Sets the stroke color of an SVG.",
          category: "svg",
          examples: [
            { code: '<svg class="stroke-red-500"><path d="..."/></svg>', description: "Red stroke." },
          ],
          variants: [
            { name: "Color", values: ["gray", "red", "blue"], description: "Stroke color." },
          ],
        },
        {
          id: "stroke-width",
          name: "Stroke Width",
          description: "Sets the width of an SVG stroke.",
          category: "svg",
          examples: [
            { code: '<svg class="stroke-2"><path d="..."/></svg>', description: "2px stroke." },
          ],
          variants: [
            { name: "Width", values: ["0", "1", "2"], description: "Stroke thickness." },
          ],
        },
      ],
    },
  
    // --- Accessibility Category ---
    {
      id: "accessibility",
      name: "Accessibility",
      description: "Utilities for improving accessibility.",
      icon: "accessibility",
      color: "bg-lime-500",
      functions: [
        {
          id: "screen-readers",
          name: "Screen Readers",
          description: "Controls visibility for screen readers.",
          category: "accessibility",
          examples: [
            { code: '<span class="sr-only">Screen reader only</span>', description: "Visible to screen readers only." },
          ],
          variants: [
            { name: "State", values: ["sr-only", "not-sr-only"], description: "Screen reader visibility." },
          ],
        },
        {
          id: "forced-colors",
          name: "Forced Colors",
          description: "Adjusts styles for forced color modes.",
          category: "accessibility",
          examples: [
            { code: '<div class="forced-color-adjust-auto">Auto adjust</div>', description: "Auto adjusts in forced color mode." },
          ],
          variants: [
            { name: "Behavior", values: ["auto", "none"], description: "Color adjustment behavior." },
          ],
        },
      ],
    },
  ];
  
  // Utility functions to access the data
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