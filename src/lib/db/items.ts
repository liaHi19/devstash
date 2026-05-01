import "server-only";

import { prisma } from "@/lib/db";

const TYPE_ORDER = [
  "snippet",
  "prompt",
  "command",
  "note",
  "file",
  "image",
  "link",
];

export type SidebarItemType = {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
};

export async function getSidebarItemTypes(): Promise<SidebarItemType[]> {
  const types = await prisma.itemType.findMany({
    where: { isSystem: true },
    include: { _count: { select: { items: true } } },
  });

  return types
    .sort(
      (a, b) => TYPE_ORDER.indexOf(a.name) - TYPE_ORDER.indexOf(b.name),
    )
    .map((t) => ({
      id: t.id,
      name: t.name,
      icon: t.icon,
      color: t.color,
      count: t._count.items,
    }));
}

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
