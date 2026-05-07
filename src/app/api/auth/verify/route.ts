import { NextResponse } from "next/server";

import { consumeVerificationToken } from "@/lib/auth/verification-token";
import { APP_URL } from "@/lib/constants";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${APP_URL}/sign-in?error=invalid-token`);
  }

  const result = await consumeVerificationToken(token);
  if (!result.ok) {
    return NextResponse.redirect(
      `${APP_URL}/sign-in?error=${result.reason}-token`,
    );
  }

  await prisma.user.update({
    where: { email: result.email },
    data: { emailVerified: new Date() },
  });

  return NextResponse.redirect(`${APP_URL}/sign-in?verified=1`);
}
