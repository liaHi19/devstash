import { cache } from "react";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";

import "server-only";

export const getCurrentUserId = cache(async (): Promise<string> => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }
  return session.user.id;
});

export type SessionUser = {
  id: string;
  name: string | null;
  image: string | null;
  isPro: boolean;
};

export const getCurrentUser = cache(async (): Promise<SessionUser> => {
  const id = await getCurrentUserId();

  return prisma.user.findUniqueOrThrow({
    where: { id },
    select: { id: true, name: true, image: true, isPro: true },
  });
});
