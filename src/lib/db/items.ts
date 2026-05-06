import { prisma } from "@/lib/db";

import "server-only";

const itemInclude = {
  itemType: true,
  tags: {
    include: { tag: true },
  },
} as const;

export type ItemWithType = Awaited<ReturnType<typeof getRecentItems>>[number];

export async function getRecentItems(userId: string, limit = 10) {
  return prisma.item.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: limit,
    include: itemInclude,
  });
}

export async function getPinnedItems(userId: string) {
  return prisma.item.findMany({
    where: { userId, isPinned: true },
    orderBy: { updatedAt: "desc" },
    include: itemInclude,
  });
}

export async function getFavoriteItems(userId: string) {
  return prisma.item.findMany({
    where: { userId, isFavorite: true },
    orderBy: { updatedAt: "desc" },
    include: itemInclude,
  });
}

export async function getItemStats(
  userId: string,
): Promise<{ total: number; favorites: number }> {
  const [total, favorites] = await Promise.all([
    prisma.item.count({ where: { userId } }),
    prisma.item.count({ where: { userId, isFavorite: true } }),
  ]);
  return { total, favorites };
}
