"use client";

import { useState } from "react";

import useMobile from "@/app/hooks/useMobile";
import { Sidebar } from "@/components/layout/sidebar/index";
import type { SidebarData } from "@/components/layout/sidebar/SidebarProps";
import { TopBar } from "@/components/layout/TopBar";

type Props = SidebarData & { children: React.ReactNode };

export function DashboardShell({
  itemTypes,
  recentCollections,
  favoriteCollections,
  user,
  children,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isMobile } = useMobile();

  return (
    <div className="flex flex-col h-dvh">
      <TopBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isMobile={isMobile}
      />
      <div className="flex flex-1 h-[calc(100dvh-var(--topbar-height))]">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isMobile={isMobile}
          sidebarData={{ itemTypes, recentCollections, favoriteCollections, user }}
        />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
