import { DashboardShell } from "@/components/layout/DashboardShell";
import { getSidebarCollections } from "@/lib/db/collections";
import { getSidebarItemTypes } from "@/lib/db/item-types";
import { getCurrentUserId } from "@/lib/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userId = await getCurrentUserId();
  const [itemTypes, { recent, favorites }] = await Promise.all([
    getSidebarItemTypes(),
    getSidebarCollections(userId),
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
