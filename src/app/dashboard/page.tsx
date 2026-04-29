import { CollectionsSection } from "@/components/dashboard/CollectionsSection";
import { ItemList } from "@/components/dashboard/ItemList";
import { ItemsSection } from "@/components/dashboard/ItemsSection";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { items } from "@/lib/mock-data";

const recentItems = [...items]
  .sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  )
  .slice(0, 10);

const pinnedItems = items.filter((i) => i.isPinned);
const favoriteItems = items.filter((i) => i.isFavorite);

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <StatsCards />
      <ItemsSection
        recent={<ItemList items={recentItems} />}
        pinned={<ItemList items={pinnedItems} />}
        favorites={<ItemList items={favoriteItems} />}
      />
      <CollectionsSection />
    </div>
  );
}
