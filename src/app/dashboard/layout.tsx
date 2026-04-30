import { DashboardShell } from "@/components/layout/DashboardShell";
import { getSidebarCollections } from "@/lib/db/collections";
import { getSidebarItemTypes } from "@/lib/db/items";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [itemTypes, { recent, favorites }] = await Promise.all([
    getSidebarItemTypes(),
    getSidebarCollections(),
  ]);

  return (
    <DashboardShell
      itemTypes={itemTypes}
      recentCollections={recent}
      favoriteCollections={favorites}
    >
      {children}
    </DashboardShell>
  );
}
