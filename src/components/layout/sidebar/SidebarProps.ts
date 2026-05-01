import { ReactNode } from "react";

import type { SidebarCollection } from "@/lib/db/collections";
import type { SidebarItemType } from "@/lib/db/items";

export type SidebarData = {
  itemTypes: SidebarItemType[];
  recentCollections: SidebarCollection[];
  favoriteCollections: SidebarCollection[];
};

export type SidebarProps = {
  sidebarOpen: boolean;
  isMobile: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
  sidebarData: SidebarData;
};

export type SidebarWithNavProps = Omit<SidebarProps, "isMobile" | "sidebarData"> & {
  children: ReactNode;
};
