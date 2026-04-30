import { ItemList } from "@/components/dashboard/ItemList";
import { ItemsSection } from "@/components/dashboard/ItemsSection";
import { getFavoriteItems, getPinnedItems, getRecentItems } from "@/lib/db/items";

export async function ItemsSectionWrapper() {
  const [recentItems, pinnedItems, favoriteItems] = await Promise.all([
    getRecentItems(10),
    getPinnedItems(),
    getFavoriteItems(),
  ]);

  return (
    <ItemsSection
      recent={<ItemList items={recentItems} />}
      pinned={pinnedItems.length > 0 ? <ItemList items={pinnedItems} /> : null}
      favorites={<ItemList items={favoriteItems} />}
    />
  );
}
