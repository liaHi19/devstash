import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import {
  buildVerifyUrl,
  createVerificationToken,
} from "@/lib/auth/verification-token";
import { SKIP_EMAIL_VERIFICATION } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email/verification";
import { registerSchema } from "@/lib/schemas/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ?? "Invalid registration data.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use." }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      emailVerified: SKIP_EMAIL_VERIFICATION ? new Date() : null,
    },
    select: { id: true, name: true, email: true },
  });

  if (SKIP_EMAIL_VERIFICATION) {
    return NextResponse.json(
      {
        success: true,
        user: { id: user.id, email: user.email },
        emailSent: false,
        verificationSkipped: true,
      },
      { status: 201 },
    );
  }

  try {
    const token = await createVerificationToken(email);
    await sendVerificationEmail({
      to: email,
      verifyUrl: buildVerifyUrl(token),
      name: user.name,
    });
  } catch (err) {
    console.error("Failed to send verification email", err);
    return NextResponse.json(
      {
        success: true,
        user: { id: user.id, email: user.email },
        emailSent: false,
      },
      { status: 201 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      user: { id: user.id, email: user.email },
      emailSent: true,
    },
    { status: 201 },
  );
}
