"use client";

import {
  ChevronDown,
  Code,
  File as FileIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Settings,
  Sparkles,
  Star,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  collections,
  currentUser,
  itemTypes,
  items,
  type ItemTypeSlug,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File: FileIcon,
  Image: ImageIcon,
  Link: LinkIcon,
};

function countByType(slug: ItemTypeSlug) {
  return items.filter((i) => i.typeSlug === slug).length;
}

const favoriteCollections = collections.filter((c) => c.isFavorite);
const recentCollections = collections.slice(0, 3);

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const [collectionsOpen, setCollectionsOpen] = useState(true);
  const [favoritesOpen, setFavoritesOpen] = useState(true);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-y-auto">
        <section className="p-3">
          <h3 className="px-2 pb-2 text-sm font-medium tracking-wider text-muted-foreground uppercase">
            Item Types
          </h3>
          <ul className="flex flex-col gap-0.5">
            {itemTypes.map((t) => {
              const Icon = iconMap[t.icon] ?? Code;
              return (
                <li key={t.id}>
                  <Link
                    href={`/items/${t.slug}s`}
                    onClick={onNavigate}
                    className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <Icon
                      aria-hidden
                      className="size-4 shrink-0"
                      style={{ color: t.color }}
                    />
                    <span className="flex-1 truncate">{t.pluralName}</span>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {countByType(t.slug)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="border-t border-sidebar-border p-3">
          <button
            type="button"
            aria-expanded={collectionsOpen}
            onClick={() => setCollectionsOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-1 px-2 pb-2 text-sm font-medium tracking-wider text-muted-foreground uppercase hover:text-sidebar-foreground"
          >
            Collections
            <ChevronDown
              aria-hidden
              className={cn(
                "size-3.5 shrink-0 transition-transform",
                !collectionsOpen && "-rotate-90",
              )}
            />
          </button>
          <div className={cn(!collectionsOpen && "hidden")}>
            <h4 className="px-2 pt-1 pb-1 text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Recent
            </h4>
            <ul className="flex flex-col gap-0.5">
              {recentCollections.map((c) => {
                const type = itemTypes.find(
                  (t) => t.slug === c.dominantTypeSlug,
                );
                return (
                  <li key={c.id}>
                    <Link
                      href={`/collections/${c.id}`}
                      onClick={onNavigate}
                      className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <span
                        aria-hidden
                        className="size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: type?.color }}
                      />
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {c.itemCount}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              aria-expanded={favoritesOpen}
              onClick={() => setFavoritesOpen((v) => !v)}
              className="mt-2 flex w-full items-center justify-between gap-1 px-2 pt-1 pb-1 text-xs font-medium tracking-wider text-muted-foreground uppercase hover:text-sidebar-foreground"
            >
              <span className="text-left">Favorites</span>

              <ChevronDown
                aria-hidden
                className={cn(
                  "size-3.5 shrink-0 transition-transform",
                  !favoritesOpen && "-rotate-90",
                )}
              />
            </button>
            <ul
              className={cn(
                "flex flex-col gap-0.5",
                !favoritesOpen && "hidden",
              )}
            >
              {favoriteCollections.map((c) => {
                const type = itemTypes.find(
                  (t) => t.slug === c.dominantTypeSlug,
                );
                return (
                  <li key={c.id}>
                    <Link
                      href={`/collections/${c.id}`}
                      onClick={onNavigate}
                      className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <span
                        aria-hidden
                        className="size-2 shrink-0 rounded-full"
                        style={{ backgroundColor: type?.color }}
                      />
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {c.itemCount}
                      </span>
                      <Star
                        aria-hidden
                        className="size-3 fill-yellow-400 text-yellow-400"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>

      <footer className="flex items-center gap-3 border-t border-sidebar-border p-3">
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
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-sidebar-foreground">
            {currentUser.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {currentUser.plan}
          </p>
        </div>

        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="size-4" />
        </Button>
      </footer>
    </div>
  );
}
