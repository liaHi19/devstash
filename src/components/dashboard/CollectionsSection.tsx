import Link from "next/link";

import { CollectionCard } from "@/components/dashboard/CollectionCard";
import { getRecentCollections } from "@/lib/db/collections";

export async function CollectionsSection() {
  const collections = await getRecentCollections(6);

  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Collections</h2>
        <Link
          href="/collections"
          className="text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          View All
        </Link>
      </header>

      {collections.length === 0 ? (
        <p className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No collections yet.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c) => (
            <CollectionCard key={c.id} collection={c} />
          ))}
        </div>
      )}
    </section>
  );
}
