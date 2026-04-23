"use client";

import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function ViewModeToggle() {
  const [isGridView, setIsGridView] = useState(true);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsGridView((v) => !v)}
      aria-label={`Switch to ${isGridView ? "list" : "grid"} view`}
    >
      {isGridView ? <LayoutGrid className="size-4" /> : <List className="size-4" />}
    </Button>
  );
}
