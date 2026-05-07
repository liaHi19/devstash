import "server-only";
import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/db";
import { APP_URL, VERIFICATION_TOKEN_TTL_MS } from "@/lib/constants";

export async function createVerificationToken(email: string) {
  // Invalidate any prior tokens for this email
  await prisma.verificationToken.deleteMany({ where: { identifier: email } });

  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + VERIFICATION_TOKEN_TTL_MS);

  await prisma.verificationToken.create({
    data: { identifier: email, token, expires },
  });

  return token;
}

export function buildVerifyUrl(token: string) {
  return `${APP_URL}/api/auth/verify?token=${encodeURIComponent(token)}`;
}

type ConsumeResult =
  | { ok: true; email: string }
  | { ok: false; reason: "invalid" | "expired" };

export async function consumeVerificationToken(
  token: string
): Promise<ConsumeResult> {
  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record) return { ok: false, reason: "invalid" };

  if (record.expires < new Date()) {
    await prisma.verificationToken.delete({ where: { token } }).catch(() => {});
    return { ok: false, reason: "expired" };
  }

  await prisma.verificationToken.delete({ where: { token } });
  return { ok: true, email: record.identifier };
}
