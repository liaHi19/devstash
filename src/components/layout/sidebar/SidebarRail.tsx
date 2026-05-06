"use client";

import Link from "next/link";

import type { SidebarUser } from "@/components/layout/sidebar/SidebarProps";
import { UserMenu } from "@/components/layout/sidebar/UserMenu";
import type { SidebarItemType } from "@/lib/db/item-types";
import { DefaultIcon, iconMap } from "@/lib/icon-map";
import { toPlural } from "@/lib/utils";

export function SidebarRail({
  itemTypes,
  user,
}: {
  itemTypes: SidebarItemType[];
  user: SidebarUser;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <ul className="flex flex-1 flex-col items-center gap-0.5 p-2">
        {itemTypes.map((t) => {
          const Icon = iconMap[t.icon] ?? DefaultIcon;
          const label = toPlural(t.name);
          return (
            <li key={t.id}>
              <Link
                href={`/items/${toPlural(t.name).toLowerCase()}`}
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
        <UserMenu name={user.name} avatarUrl={user.avatarUrl} side="right" />
      </footer>
    </div>
  );
}
