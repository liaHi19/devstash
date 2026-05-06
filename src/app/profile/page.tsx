import Link from "next/link";

import { UserAvatar } from "@/components/layout/UserAvatar";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <UserAvatar name={user.name} image={user.image} size="lg" />
        <div>
          <h1 className="text-2xl font-semibold">{user.name ?? "Unnamed user"}</h1>
          <p className="text-sm text-muted-foreground">
            {user.isPro ? "Pro Plan" : "Free Plan"}
          </p>
        </div>
      </div>
      <Button asChild variant="outline" className="w-fit">
        <Link href="/dashboard">Back to dashboard</Link>
      </Button>
    </main>
  );
}
