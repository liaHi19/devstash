"use client";

import {
  Code,
  File as FileIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Settings,
  Sparkles,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { SidebarItemType } from "@/lib/db/items";
import { currentUser } from "@/lib/mock-data";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File: FileIcon,
  Image: ImageIcon,
  Link: LinkIcon,
};

export function SidebarRail({ itemTypes }: { itemTypes: SidebarItemType[] }) {
  return (
    <div className="flex flex-1 flex-col">
      <ul className="flex flex-1 flex-col items-center gap-0.5 p-2">
        {itemTypes.map((t) => {
          const Icon = iconMap[t.icon] ?? Code;
          const label = t.name.charAt(0).toUpperCase() + t.name.slice(1) + "s";
          return (
            <li key={t.id}>
              <Link
                href={`/items/${t.name}s`}
                aria-label={label}
                title={label}
                className="flex size-9 items-center justify-center rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Icon
                  aria-hidden
                  className="size-4 shrink-0"
                  style={{ color: t.color }}
                />
              </Link>
            </li>
          );
        })}
      </ul>

      <footer className="flex flex-col items-center gap-2 border-t border-sidebar-border p-3">
        <Avatar>
          <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
          <AvatarFallback>
            {currentUser.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="size-4" />
        </Button>
      </footer>
    </div>
  );
}
