import { Bookmark, Files, FolderOpen, Star } from "lucide-react";

import { StatsCard } from "@/components/dashboard/StatsCard";
import { getCollectionStats } from "@/lib/db/collections";
import { getItemStats } from "@/lib/db/items";
import { getCurrentUserId } from "@/lib/session";

export async function StatsCards() {
  const userId = await getCurrentUserId();
  const [
    { total: totalItems, favorites: favoriteItems },
    { total: totalCollections, favorites: favoriteCollections },
  ] = await Promise.all([getItemStats(userId), getCollectionStats(userId)]);

  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <StatsCard
        icon={Files}
        count={totalItems}
        label="Items"
        color="#3b82f6"
      />
      <StatsCard
        icon={FolderOpen}
        count={totalCollections}
        label="Collections"
        color="#10b981"
      />
      <StatsCard
        icon={Star}
        count={favoriteItems}
        label="Favorite Items"
        color="#fde047"
      />
      <StatsCard
        icon={Bookmark}
        count={favoriteCollections}
        label="Favorite Collections"
        color="#ec4899"
      />
    </section>
  );
}
