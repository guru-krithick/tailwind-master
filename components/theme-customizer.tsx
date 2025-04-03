// components/theme-customizer.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Paintbrush, Palette, Sliders, CheckCircle } from "lucide-react";

interface ThemeCustomizerProps {
  onApplyTheme: (themeChanges: any) => void;
}

export function ThemeCustomizer({ onApplyTheme }: ThemeCustomizerProps) {
  const [primaryColor, setPrimaryColor] = useState("#3b82f6"); // blue-500
  const [roundness, setRoundness] = useState(2); // 0-4, default medium
  const [spacing, setSpacing] = useState(2); // 0-4, default medium
  const [colorScheme, setColorScheme] = useState("light");
  const [customTheme, setCustomTheme] = useState({
    primaryColor,
    roundness,
    spacing,
    colorScheme
  });

  // Available color options
  const colorOptions = [
    { value: "#3b82f6", label: "Blue", class: "bg-blue-500" },
    { value: "#10b981", label: "Green", class: "bg-green-500" },
    { value: "#8b5cf6", label: "Purple", class: "bg-purple-500" },
    { value: "#ef4444", label: "Red", class: "bg-red-500" },
    { value: "#f59e0b", label: "Amber", class: "bg-amber-500" },
    { value: "#ec4899", label: "Pink", class: "bg-pink-500" },
  ];

  // Apply theme changes to preview
  const applyTheme = () => {
    const newTheme = {
      primaryColor,
      roundness,
      spacing,
      colorScheme
    };
    setCustomTheme(newTheme);
    onApplyTheme(newTheme);
  };

  // Generate theme CSS based on current settings
  const generateThemeCss = () => {
    // Convert roundness value to Tailwind class
    const roundnessClasses = [
      "rounded-none", // 0
      "rounded", // 1
      "rounded-md", // 2
      "rounded-lg", // 3
      "rounded-xl" // 4
    ];
    
    // Convert spacing value to Tailwind class
    const spacingClasses = [
      "p-2", // 0
      "p-3", // 1
      "p-4", // 2
      "p-6", // 3
      "p-8" // 4
    ];
    
    return `
/* Custom Theme */
:root {
  --primary-color: ${primaryColor};
  --roundness: ${roundnessClasses[roundness]};
  --spacing: ${spacingClasses[spacing]};
  --color-scheme: ${colorScheme};
}

/* Sample usage:
.element {
  background-color: var(--primary-color);
  border-radius: var(--roundness);
  padding: var(--spacing);
}
*/
    `;
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Theme Customizer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="colors" className="text-xs">
              <Paintbrush className="h-4 w-4 mr-1" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="layout" className="text-xs">
              <Sliders className="h-4 w-4 mr-1" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-xs">
              <CheckCircle className="h-4 w-4 mr-1" />
              Preview
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="colors" className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Primary Color</h3>
              <div className="grid grid-cols-3 gap-2">
                {colorOptions.map((color) => (
                  <Button
                    key={color.value}
                    variant={primaryColor === color.value ? "default" : "outline"}
                    className="h-10 flex items-center justify-start gap-2 p-2"
                    onClick={() => setPrimaryColor(color.value)}
                  >
                    <div className={`w-4 h-4 rounded-full ${color.class}`} />
                    <span className="text-xs">{color.label}</span>
                  </Button>
                ))}
              </div>
              
              <div className="mt-4">
                <Label htmlFor="custom-color" className="text-xs">Custom Color</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="custom-color"
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-grow"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Color Scheme</h3>
              <RadioGroup
                value={colorScheme}
                onValueChange={setColorScheme}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light">Light</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark">Dark</Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>
          
          <TabsContent value="layout" className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <Label htmlFor="roundness" className="text-sm font-medium">Roundness</Label>
                <span className="text-xs text-muted-foreground">
                  {roundness === 0 ? "None" : 
                   roundness === 1 ? "Small" : 
                   roundness === 2 ? "Medium" : 
                   roundness === 3 ? "Large" : "Extra Large"}
                </span>
              </div>
              <Slider
                id="roundness"
                min={0}
                max={4}
                step={1}
                value={[roundness]}
                onValueChange={(value) => setRoundness(value[0])}
                className="mb-6"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label htmlFor="spacing" className="text-sm font-medium">Spacing</Label>
                <span className="text-xs text-muted-foreground">
                  {spacing === 0 ? "Compact" : 
                   spacing === 1 ? "Tight" : 
                   spacing === 2 ? "Medium" : 
                   spacing === 3 ? "Loose" : "Spacious"}
                </span>
              </div>
              <Slider
                id="spacing"
                min={0}
                max={4}
                step={1}
                value={[spacing]}
                onValueChange={(value) => setSpacing(value[0])}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Theme Preview</h3>
              <div className={`p-4 border rounded-md ${colorScheme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div
                  className="w-full p-4 mb-4 flex justify-center items-center"
                  style={{
                    backgroundColor: primaryColor,
                    borderRadius: ['0', '0.25rem', '0.375rem', '0.5rem', '0.75rem'][roundness],
                    padding: ['0.5rem', '0.75rem', '1rem', '1.5rem', '2rem'][spacing]
                  }}
                >
                  <span className="text-white font-medium">Primary Button</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-center ${colorScheme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
                      style={{
                        borderRadius: ['0', '0.25rem', '0.375rem', '0.5rem', '0.75rem'][roundness],
                        padding: ['0.5rem', '0.75rem', '1rem', '1.5rem', '2rem'][spacing]
                      }}
                    >
                      <div
                        className="w-8 h-8 flex items-center justify-center"
                        style={{ backgroundColor: primaryColor, borderRadius: '50%' }}
                      >
                        <span className="text-white text-xs">{i + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">CSS Variables</h3>
                <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
                  {generateThemeCss()}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Button 
          className="w-full mt-4" 
          onClick={applyTheme}
        >
          Apply Theme
        </Button>
      </CardContent>
    </Card>
  );
}