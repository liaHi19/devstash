import { ItemCard } from "@/components/dashboard/ItemCard";
import type { ItemWithType } from "@/lib/db/items";

export function ItemList({ items }: { items: ItemWithType[] }) {
  if (items.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
        Nothing here yet.
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
