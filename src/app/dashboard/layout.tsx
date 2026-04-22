import { TopBar } from "@/components/dashboard/top-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 border-r border-border bg-sidebar p-4 md:block">
          <h2 className="text-sm font-semibold text-sidebar-foreground">
            Sidebar
          </h2>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
