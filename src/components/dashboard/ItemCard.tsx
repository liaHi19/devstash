import {
  Code,
  File as FileIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Pin,
  Sparkles,
  Star,
  StickyNote,
  Terminal,
  type LucideIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import type { ItemWithType } from "@/lib/db/items";
import { highlight } from "@/lib/highlight";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File: FileIcon,
  Image: ImageIcon,
  Link: LinkIcon,
};

interface ItemCardProps {
  item: ItemWithType;
}

export async function ItemCard({ item }: ItemCardProps) {
  const { itemType } = item;
  const Icon = iconMap[itemType.icon] ?? Code;
  const color = itemType.color;

  const rawContent = item.content ?? item.url ?? "";
  const preview =
    rawContent.length > 160
      ? `${rawContent.slice(0, 160).trimEnd()}…`
      : rawContent;

  const isCode = itemType.name === "snippet" || itemType.name === "command";
  const html =
    isCode && item.content
      ? await highlight(item.content, item.language ?? undefined)
      : null;

  const tagNames = item.tags.map((t) => t.tag.name);

  return (
    <Card
      className="border-t-2 flex flex-col gap-3 p-4"
      style={{ borderTopColor: color }}
    >
      <div className="flex items-start gap-2">
        <Icon aria-hidden className="size-4 shrink-0" style={{ color }} />
        <h3 className="flex-1 truncate text-sm font-semibold">{item.title}</h3>
        <div className="flex items-center gap-1 text-muted-foreground">
          {item.isPinned && (
            <Pin aria-label="Pinned" className="size-3.5 fill-current" />
          )}
          {item.isFavorite && (
            <Star
              aria-label="Favorite"
              className="size-3.5 fill-yellow-400 text-yellow-400"
            />
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        {html ? (
          <div
            className="text-xs leading-relaxed [&_pre]:line-clamp-6 [&_pre]:overflow-hidden [&_pre]:rounded-md [&_pre]:bg-muted/40! [&_pre]:p-2"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre
            className={cn(
              "line-clamp-6 text-xs leading-relaxed text-muted-foreground",
              isCode
                ? "rounded-md bg-muted/40 p-2 font-mono whitespace-pre-wrap"
                : "whitespace-pre-wrap",
            )}
          >
            {preview}
          </pre>
        )}
      </div>

      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-1.5 text-xs">
          {tagNames.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted px-1.5 py-0.5 text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <span
          className="border-b border-accent font-medium"
          style={{
            color,
            borderColor: color,
          }}
        >
          {itemType.name.toLowerCase()}
        </span>
      </div>
    </Card>
  );
}
