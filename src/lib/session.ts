import { cache } from "react";

import { prisma } from "@/lib/db";

import "server-only";

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

export type SessionUser = {
  id: string;
  name: string | null;
  image: string | null;
  isPro: boolean;
};

export const getCurrentUser = cache(async (): Promise<SessionUser> => {
  return prisma.user.findFirstOrThrow({
    where: { email: DEMO_EMAIL },
    select: { id: true, name: true, image: true, isPro: true },
  });
});
