import "server-only";

import { prisma } from "@/lib/db";

export type CollectionTypeInfo = {
  name: string;
  icon: string;
  color: string;
};

export type CollectionWithStats = {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  dominantType: CollectionTypeInfo | null;
  allTypes: CollectionTypeInfo[];
};

export async function getRecentCollections(
  limit = 6,
): Promise<CollectionWithStats[]> {
  const rows = await prisma.collection.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      items: {
        include: {
          item: {
            include: { itemType: true },
          },
        },
      },
    },
  });

  return rows.map((collection) => {
    const typeCounts = new Map<
      string,
      { count: number; info: CollectionTypeInfo }
    >();

    for (const ic of collection.items) {
      const t = ic.item.itemType;
      const entry = typeCounts.get(t.id);
      if (entry) {
        entry.count++;
      } else {
        typeCounts.set(t.id, {
          count: 1,
          info: { name: t.name, icon: t.icon, color: t.color },
        });
      }
    }

    let dominantType: CollectionTypeInfo | null = null;
    let maxCount = 0;
    for (const { count, info } of typeCounts.values()) {
      if (count > maxCount) {
        maxCount = count;
        dominantType = info;
      }
    }

    return {
      id: collection.id,
      name: collection.name,
      description: collection.description,
      isFavorite: collection.isFavorite,
      itemCount: collection.items.length,
      dominantType,
      allTypes: [...typeCounts.values()].map(({ info }) => info),
    };
  });
}

export async function getCollectionStats(): Promise<{
  total: number;
  favorites: number;
}> {
  const [total, favorites] = await Promise.all([
    prisma.collection.count(),
    prisma.collection.count({ where: { isFavorite: true } }),
  ]);
  return { total, favorites };
}
