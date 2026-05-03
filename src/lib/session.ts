import "server-only";

import { cache } from "react";

import { prisma } from "@/lib/db";

const DEMO_EMAIL = "demo@devstash.io";

// Temporary: returns the seeded demo user's ID.
// Replace with real auth session lookup once NextAuth lands.
export const getCurrentUserId = cache(async (): Promise<string> => {
  const user = await prisma.user.findFirstOrThrow({
    where: { email: DEMO_EMAIL },
    select: { id: true },
  });
  return user.id;
});
