"use client";

import { PanelLeft, PanelLeftClose } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { SidebarWithNavProps } from "./SidebarProps";

export function DesktopSidebar({
  sidebarOpen,
  setSidebarOpen,
  children,
}: SidebarWithNavProps) {
  return (
    <aside
      data-state={sidebarOpen ? "open" : "closed"}
      className={cn(
        "hidden self-auto md:flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        sidebarOpen ? "w-72" : "w-14 overflow-hidden",
      )}
    >
      <div className="border-b border-sidebar-border w-full pl-3 py-2">
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
      </div>
      {children}
    </aside>
  );
}
