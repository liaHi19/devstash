import {
  Code,
  File as FileIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  type LucideIcon,
  Sparkles,
  Star,
  StickyNote,
  Terminal,
} from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import type { CollectionWithStats } from "@/lib/db/collections";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File: FileIcon,
  Image: ImageIcon,
  Link: LinkIcon,
};

interface CollectionCardProps {
  collection: CollectionWithStats;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const { dominantType, allTypes } = collection;
  const DominantIcon = dominantType
    ? (iconMap[dominantType.icon] ?? Code)
    : Code;
  const color = dominantType?.color ?? "#6b7280";

  return (
    <Link
      href={`/collections/${collection.id}`}
      className="group/collection rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card
        className="border-t-2 transition-shadow group-hover/collection:ring-2 group-hover/collection:ring-foreground/20 p-4 text-xs"
        style={{ borderTopColor: color }}
      >
        <div className="flex items-start gap-2">
          <DominantIcon
            aria-hidden
            className="size-5 shrink-0"
            style={{ color }}
          />
          <h3 className="flex-1 truncate text-sm font-semibold">
            {collection.name}
          </h3>
          {collection.isFavorite && (
            <Star
              aria-label="Favorite"
              className="size-4 fill-yellow-400 text-yellow-400"
            />
          )}
        </div>
        <div className="flex-1 flex flex-col gap-3 mb-1.5">
          <p className="line-clamp-4 text-muted-foreground">
            {collection.description}
          </p>

          {allTypes.length > 0 && (
            <div className="flex items-center gap-2">
              {allTypes.map((t) => {
                const TypeIcon = iconMap[t.icon] ?? Code;
                return (
                  <TypeIcon
                    key={t.icon}
                    aria-label={t.name}
                    className="size-3.5"
                    style={{ color: t.color }}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span
            className="rounded-md px-1.5 py-0.5 font-medium"
            style={{
              backgroundColor: `${color}1f`,
              color,
            }}
          >
            {dominantType?.name.toLowerCase() ?? "items"}
          </span>
          <span className="text-muted-foreground tabular-nums">
            {collection.itemCount} items
          </span>
        </div>
      </Card>
    </Link>
  );
}
