import { ItemList } from "@/components/dashboard/ItemList";
import { ItemsSection } from "@/components/dashboard/ItemsSection";
import { getFavoriteItems, getPinnedItems, getRecentItems } from "@/lib/db/items";
import { getCurrentUserId } from "@/lib/session";

export async function ItemsSectionWrapper() {
  const userId = await getCurrentUserId();
  const [recentItems, pinnedItems, favoriteItems] = await Promise.all([
    getRecentItems(userId, 10),
    getPinnedItems(userId),
    getFavoriteItems(userId),
  ]);

  return (
    <ItemsSection
      recent={<ItemList items={recentItems} />}
      pinned={pinnedItems.length > 0 ? <ItemList items={pinnedItems} /> : null}
      favorites={<ItemList items={favoriteItems} />}
    />
  );
}
