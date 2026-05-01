"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { APP_NAME } from "@/lib/constants";

import { SidebarWithNavProps } from "./SidebarProps";

export function MobileSidebar({
  sidebarOpen,
  setSidebarOpen,

  children,
}: SidebarWithNavProps) {
  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetContent
        side="left"
        className="w-72 bg-sidebar p-0 text-sidebar-foreground"
      >
        <SheetHeader className="border-b border-sidebar-border">
          <SheetTitle>{APP_NAME}</SheetTitle>
          <SheetDescription>Knowledge Hub</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
