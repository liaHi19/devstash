"use client";

import { useState } from "react";

import { TopBar } from "@/components/dashboard/TopBar";
import { Sidebar } from "@/components/dashboard/sidebar/index";
import useMobile from "../hooks/useMobile";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isMobile } = useMobile();

  return (
    <div className="flex min-h-screen">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isMobile={isMobile}
      />

      <div className="flex flex-1 flex-col">
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
