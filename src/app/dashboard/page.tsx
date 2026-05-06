import { Suspense } from "react";

import { CollectionsSection } from "@/components/dashboard/CollectionsSection";
import { ItemsSectionWrapper } from "@/components/dashboard/ItemsSectionWrapper";
import { StatsCards } from "@/components/dashboard/StatsCards";

function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-lg border bg-card p-4">
          <div className="mb-3 h-3 w-24 rounded bg-muted" />
          <div className="h-7 w-16 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

function ItemsSectionSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-8 w-20 rounded bg-muted" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-4">
            <div className="mb-2 h-4 w-3/4 rounded bg-muted" />
            <div className="h-16 w-full rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CollectionsSectionSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-5 w-32 rounded bg-muted" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-4">
            <div className="mb-2 h-4 w-1/2 rounded bg-muted" />
            <div className="h-3 w-full rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsCards />
      </Suspense>
      <Suspense fallback={<ItemsSectionSkeleton />}>
        <ItemsSectionWrapper />
      </Suspense>
      <Suspense fallback={<CollectionsSectionSkeleton />}>
        <CollectionsSection />
      </Suspense>
    </div>
  );
}
