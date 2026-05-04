import { DashboardShell } from "@/components/layout/DashboardShell";
import { getSidebarCollections } from "@/lib/db/collections";
import { getSidebarItemTypes } from "@/lib/db/item-types";
import { getCurrentUser } from "@/lib/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionUser = await getCurrentUser();
  const [itemTypes, { recent, favorites }] = await Promise.all([
    getSidebarItemTypes(sessionUser.id),
    getSidebarCollections(sessionUser.id),
  ]);

  return (
    <DashboardShell
      itemTypes={itemTypes}
      recentCollections={recent}
      favoriteCollections={favorites}
      user={{
        name: sessionUser.name ?? "User",
        avatarUrl: sessionUser.image ?? undefined,
        plan: sessionUser.isPro ? "Pro Plan" : "Free Plan",
      }}
    >
      {children}
    </DashboardShell>
  );
}
