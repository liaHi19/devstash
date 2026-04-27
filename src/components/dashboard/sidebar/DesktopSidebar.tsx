"use client";

import { cn } from "@/lib/utils";
import { SidebarWithNavProps } from "./SidebarProps";
import { PageTitle } from "../PageTitle";

export function DesktopSidebar({
  sidebarOpen,
  setSidebarOpen,
  children,
}: SidebarWithNavProps) {
  return (
    <aside
      data-state={sidebarOpen ? "open" : "closed"}
      className={cn(
        "hidden md:flex flex-col min-h-screen border-r border-sidebar-border bg-sidebar text-sidebar-foreground data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        sidebarOpen ? "w-72" : "w-14 overflow-hidden",
      )}
      aria-hidden={!sidebarOpen}
    >
      <div
        className={cn(
          "flex items-center border-b border-sidebar-border md:h-14",
          sidebarOpen ? "px-4 md:px-6" : "justify-center px-2",
        )}
      >
        <PageTitle
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          showTitle={sidebarOpen}
        />
      </div>
      {children}
    </aside>
  );
}
