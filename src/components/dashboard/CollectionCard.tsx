import {
  Code,
  File as FileIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Sparkles,
  Star,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { itemTypes, type Collection } from "@/lib/mock-data";

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
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const type = itemTypes.find((t) => t.slug === collection.dominantTypeSlug);
  const Icon = type ? (iconMap[type.icon] ?? Code) : Code;
  const color = type?.color ?? "#6b7280";

  return (
    <Link
      href={`/collections/${collection.id}`}
      className="group/collection rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card
        className="border-t-2 transition-shadow group-hover/collection:ring-2 group-hover/collection:ring-foreground/20"
        style={{ borderTopColor: color }}
      >
        <div className="flex items-start gap-2 px-4">
          <Icon
            aria-hidden
            className="size-4 shrink-0"
            style={{ color }}
          />
          <h3 className="flex-1 truncate text-sm font-semibold">
            {collection.name}
          </h3>
          {collection.isFavorite && (
            <Star
              aria-label="Favorite"
              className="size-3.5 fill-yellow-400 text-yellow-400"
            />
          )}
        </div>

        <p className="line-clamp-2 px-4 text-xs text-muted-foreground">
          {collection.description}
        </p>

        <div className="flex items-center justify-between px-4 pb-1 text-xs">
          <span
            className="rounded-md px-1.5 py-0.5 font-medium"
            style={{
              backgroundColor: `${color}1f`,
              color,
            }}
          >
            {type?.pluralName.toLowerCase() ?? collection.dominantTypeSlug}
          </span>
          <span className="text-muted-foreground tabular-nums">
            {collection.itemCount} items
          </span>
        </div>
      </Card>
    </Link>
  );
}
