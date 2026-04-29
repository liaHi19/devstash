import { Bookmark, Files, FolderOpen, Star } from "lucide-react";

import { StatsCard } from "@/components/dashboard/StatsCard";
import { collections, items } from "@/lib/mock-data";

export function StatsCards() {
  const totalItems = items.length;
  const totalCollections = collections.length;
  const favoriteItems = items.filter((i) => i.isFavorite).length;
  const favoriteCollections = collections.filter((c) => c.isFavorite).length;

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
