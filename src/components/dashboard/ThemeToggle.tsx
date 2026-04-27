"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsDarkTheme((v) => !v)}
      aria-label={`Switch to ${isDarkTheme ? "light" : "dark"} theme`}
    >
      {isDarkTheme ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </Button>
  );
}
