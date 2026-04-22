import { FolderPlus, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";

export function TopBar() {
  return (
    <header className="flex h-14 items-center gap-4 border-b border-border bg-background px-4 md:px-6">
      <h1 className="text-lg font-semibold tracking-tight">DevStash</h1>

      <search className="relative mx-auto block w-full max-w-xl">
        <Search
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="search"
          placeholder="Search items, collections, tags..."
          aria-label="Search items, collections, tags"
          className="h-9 pl-9 pr-16"
        />
        <span className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </span>
      </search>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" aria-label="Create new">
            <Plus className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
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
    </header>
  );
}
