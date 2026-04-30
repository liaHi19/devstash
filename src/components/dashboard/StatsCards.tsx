import { Bookmark, Files, FolderOpen, Star } from "lucide-react";

import { StatsCard } from "@/components/dashboard/StatsCard";
import { getCollectionStats } from "@/lib/db/collections";
import { items } from "@/lib/mock-data";

export async function StatsCards() {
  const totalItems = items.length;
  const favoriteItems = items.filter((i) => i.isFavorite).length;
  const { total: totalCollections, favorites: favoriteCollections } =
    await getCollectionStats();

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
