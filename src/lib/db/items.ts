import "server-only";

import { prisma } from "@/lib/db";

const itemInclude = {
  itemType: true,
  tags: {
    include: { tag: true },
  },
} as const;

export type ItemWithType = Awaited<ReturnType<typeof getRecentItems>>[number];

export async function getRecentItems(limit = 10) {
  return prisma.item.findMany({
    orderBy: { updatedAt: "desc" },
    take: limit,
    include: itemInclude,
  });
}

export async function getPinnedItems() {
  return prisma.item.findMany({
    where: { isPinned: true },
    orderBy: { updatedAt: "desc" },
    include: itemInclude,
  });
}

export async function getFavoriteItems() {
  return prisma.item.findMany({
    where: { isFavorite: true },
    orderBy: { updatedAt: "desc" },
    include: itemInclude,
  });
}

export async function getItemStats(): Promise<{
  total: number;
  favorites: number;
}> {
  const [total, favorites] = await Promise.all([
    prisma.item.count(),
    prisma.item.count({ where: { isFavorite: true } }),
  ]);
  return { total, favorites };
}
