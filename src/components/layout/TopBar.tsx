import { FolderPlus, Plus, Search, SlidersHorizontal } from "lucide-react";

import { PageTitle } from "@/components/layout/PageTitle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ViewModeToggle } from "@/components/layout/ViewModeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";

interface TopBarProps {
  sidebarOpen: boolean;
  isMobile: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
}

export function TopBar({ sidebarOpen, isMobile, setSidebarOpen }: TopBarProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background px-4 py-2 md:h-14 md:flex-nowrap md:gap-4 md:py-0 md:px-6">
      {!sidebarOpen && (
        <PageTitle
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isTopBar={!isMobile}
        />
      )}

      <search className="relative order-3 block w-full md:order-2 md:mx-auto md:w-full md:max-w-xl">
        <Search
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          name="search"
          type="search"
          placeholder="Search items, collections, tags..."
          aria-label="Search items, collections, tags"
          className="h-9 pl-9 pr-3 sm:pr-16"
        />
        <span className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-1 sm:flex">
          <Kbd>⌘ K</Kbd>
        </span>
      </search>

      <div className="order-2 ml-auto flex items-center gap-1 md:order-3 md:ml-0">
        <Button variant="ghost" size="icon" aria-label="Filters">
          <SlidersHorizontal className="size-4" />
        </Button>
        <ViewModeToggle />
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Create new">
              <Plus className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-44">
            <DropdownMenuItem>
              <Plus className="size-4" />
              New Item
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FolderPlus className="size-4" />
              New Collection
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
