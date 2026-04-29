import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";

interface StatsCardProps {
  icon: LucideIcon;
  count: number;
  label: string;
  color: string;
}

export function StatsCard({ icon: Icon, count, label, color }: StatsCardProps) {
  return (
    <Card className="flex-row items-center gap-4 px-4 py-3">
      <div
        className="flex size-10 shrink-0 items-center justify-center rounded-lg"
        style={{
          backgroundColor: `${color}1f`,
          color,
        }}
      >
        <Icon aria-hidden className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl leading-tight font-semibold tabular-nums">
          {count}
        </p>
        <p className="truncate text-xs text-muted-foreground">{label}</p>
      </div>
    </Card>
  );
}
