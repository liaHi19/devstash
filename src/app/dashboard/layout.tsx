"use client";

import { useState } from "react";

import { TopBar } from "@/components/layout/TopBar";
import { Sidebar } from "@/components/layout/sidebar/index";
import useMobile from "../hooks/useMobile";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isMobile } = useMobile();

  return (
    <div className="flex h-dvh">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isMobile={isMobile}
      />

      <div className="flex flex-1 flex-col overflow-y-auto">
        <TopBar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isMobile={isMobile}
        />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
