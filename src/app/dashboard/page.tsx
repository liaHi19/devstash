import { CollectionsSection } from "@/components/dashboard/CollectionsSection";
import { ItemsSectionWrapper } from "@/components/dashboard/ItemsSectionWrapper";
import { StatsCards } from "@/components/dashboard/StatsCards";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <StatsCards />
      <ItemsSectionWrapper />
      <CollectionsSection />
    </div>
  );
}
