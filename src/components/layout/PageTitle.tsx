"use client";

import { PanelLeft, PanelLeftClose } from "lucide-react";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

interface PageTitleProps {
  sidebarOpen: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
  isTopBar?: boolean;
}

export function PageTitle({
  sidebarOpen,
  setSidebarOpen,
  title = APP_NAME,
  showTitle = true,
  isTopBar = false,
}: PageTitleProps) {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      {!isTopBar && (
        <Button
          variant="ghost"
          size="icon"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <PanelLeftClose className="size-4" />
          ) : (
            <PanelLeft className="size-4" />
          )}
        </Button>
      )}

      {showTitle && (
        <h1 className="truncate text-lg font-semibold tracking-tight">
          {title}
        </h1>
      )}
    </div>
  );
}
