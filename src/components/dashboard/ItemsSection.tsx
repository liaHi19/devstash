"use client";

import { Clock, Pin, Star } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ItemsSectionProps = {
  recent: ReactNode;
  pinned: ReactNode;
  favorites: ReactNode;
};

export function ItemsSection({ recent, pinned, favorites }: ItemsSectionProps) {
  return (
    <Tabs defaultValue="pinned" className="flex flex-col">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="recent">
            <Clock aria-hidden className="size-3.5" />
            Recent
          </TabsTrigger>
          <TabsTrigger value="pinned">
            <Pin aria-hidden className="size-3.5" />
            Pinned
          </TabsTrigger>
          <TabsTrigger value="favorites">
            <Star aria-hidden className="size-3.5" />
            Favorites
          </TabsTrigger>
        </TabsList>
        <Link
          href="/items/snippets"
          className="text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          View All
        </Link>
      </div>

      <TabsContent value="recent">{recent}</TabsContent>
      <TabsContent value="pinned">{pinned}</TabsContent>
      <TabsContent value="favorites">{favorites}</TabsContent>
    </Tabs>
  );
}
