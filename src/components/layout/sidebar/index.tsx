import { DesktopSidebar } from "./DesktopSidebar";
import { MobileSidebar } from "./MobileSidebar";
import { SidebarNav } from "./SidebarNav";
import { SidebarProps } from "./SidebarProps";
import { SidebarRail } from "./SidebarRail";

export function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  isMobile,
}: SidebarProps) {
  return isMobile ? (
    <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <SidebarNav onNavigate={() => setSidebarOpen(false)} />
    </MobileSidebar>
  ) : (
    <DesktopSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      {sidebarOpen ? <SidebarNav /> : <SidebarRail />}
    </DesktopSidebar>
  );
}
