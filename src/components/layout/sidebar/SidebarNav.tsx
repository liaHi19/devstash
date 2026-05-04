"use client";

import { useState } from "react";

import { ChevronDown, Settings, Star } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SidebarUser } from "@/components/layout/sidebar/SidebarProps";
import type { SidebarCollection } from "@/lib/db/collections";
import type { SidebarItemType } from "@/lib/db/item-types";
import { DefaultIcon, iconMap } from "@/lib/icon-map";
import { cn, toPlural } from "@/lib/utils";

type SidebarNavProps = {
  itemTypes: SidebarItemType[];
  recentCollections: SidebarCollection[];
  favoriteCollections: SidebarCollection[];
  user: SidebarUser;
  onNavigate?: () => void;
};

export function SidebarNav({
  itemTypes,
  recentCollections,
  favoriteCollections,
  user,
  onNavigate,
}: SidebarNavProps) {
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
              const Icon = iconMap[t.icon] ?? DefaultIcon;
              return (
                <li key={t.id}>
                  <Link
                    href={`/items/${toPlural(t.name).toLowerCase()}`}
                    onClick={onNavigate}
                    className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <Icon
                      aria-hidden
                      className="size-4 shrink-0"
                      style={{ color: t.color }}
                    />
                    <span className="flex-1 truncate">{toPlural(t.name)}</span>
                    {(t.name === "file" || t.name === "image") && (
                      <Badge
                        variant="outline"
                        className="h-4 rounded px-1 py-0 text-[10px] font-semibold tracking-wide text-muted-foreground"
                      >
                        PRO
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {t.count}
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
              {recentCollections.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/collections/${c.id}`}
                    onClick={onNavigate}
                    className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <span
                      aria-hidden
                      className="size-2 shrink-0 rounded-full"
                      style={{
                        backgroundColor: c.dominantColor ?? "currentColor",
                      }}
                    />
                    <span className="flex-1 truncate">{c.name}</span>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {c.itemCount}
                    </span>
                  </Link>
                </li>
              ))}
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
              {favoriteCollections.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/collections/${c.id}`}
                    onClick={onNavigate}
                    className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <span
                      aria-hidden
                      className="size-2 shrink-0 rounded-full"
                      style={{
                        backgroundColor: c.dominantColor ?? "currentColor",
                      }}
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
              ))}
            </ul>

            <Link
              href="/collections"
              onClick={onNavigate}
              className="mt-2 flex items-center px-2 py-1.5 text-xs text-muted-foreground hover:text-sidebar-foreground"
            >
              View all collections →
            </Link>
          </div>
        </section>
      </div>

      <footer className="flex items-center gap-3 border-t border-sidebar-border p-3">
        <Avatar>
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-sidebar-foreground">
            {user.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {user.plan}
          </p>
        </div>

        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="size-4" />
        </Button>
      </footer>
    </div>
  );
}
