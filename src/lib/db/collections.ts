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

export type SidebarCollection = {
  id: string;
  name: string;
  itemCount: number;
  isFavorite: boolean;
  dominantColor: string | null;
};

export async function getSidebarCollections(): Promise<{
  recent: SidebarCollection[];
  favorites: SidebarCollection[];
}> {
  const collectionInclude = {
    items: { include: { item: { include: { itemType: true } } } },
  } as const;

  const [recentRaw, favoritesRaw] = await Promise.all([
    prisma.collection.findMany({
      take: 3,
      orderBy: { createdAt: "desc" },
      include: collectionInclude,
    }),
    prisma.collection.findMany({
      where: { isFavorite: true },
      orderBy: { createdAt: "desc" },
      include: collectionInclude,
    }),
  ]);

  const mapCollection = (
    c: (typeof recentRaw)[number],
  ): SidebarCollection => {
    const typeCounts = new Map<string, { count: number; color: string }>();
    for (const ic of c.items) {
      const t = ic.item.itemType;
      const entry = typeCounts.get(t.id);
      if (entry) entry.count++;
      else typeCounts.set(t.id, { count: 1, color: t.color });
    }
    let dominantColor: string | null = null;
    let max = 0;
    for (const { count, color } of typeCounts.values()) {
      if (count > max) {
        max = count;
        dominantColor = color;
      }
    }
    return {
      id: c.id,
      name: c.name,
      itemCount: c.items.length,
      isFavorite: c.isFavorite,
      dominantColor,
    };
  };

  return {
    recent: recentRaw.map(mapCollection),
    favorites: favoritesRaw.map(mapCollection),
  };
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
