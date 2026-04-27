import { ReactNode } from "react";

export type SidebarProps = {
  sidebarOpen: boolean;
  isMobile: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
};

export type SidebarWithNavProps = Omit<SidebarProps, "isMobile"> & {
  children: ReactNode;
};
