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
import { highlight } from "@/lib/highlight";
import { itemTypes, type Item } from "@/lib/mock-data";
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
  item: Item;
}

export async function ItemCard({ item }: ItemCardProps) {
  const type = itemTypes.find((t) => t.slug === item.typeSlug);
  const Icon = type ? (iconMap[type.icon] ?? Code) : Code;
  const color = type?.color ?? "#6b7280";
  const preview =
    item.content.length > 160
      ? `${item.content.slice(0, 160).trimEnd()}…`
      : item.content;
  const isCode = item.typeSlug === "snippet" || item.typeSlug === "command";
  const html = isCode ? await highlight(item.content, item.language) : null;

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
          {item.tags.slice(0, 3).map((tag) => (
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
          {type?.name.toLowerCase() ?? item.typeSlug}
        </span>
      </div>
    </Card>
  );
}
