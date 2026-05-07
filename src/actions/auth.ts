"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import type { ResendVerificationState } from "@/actions/auth-state";
import {
  buildVerifyUrl,
  createVerificationToken,
} from "@/lib/auth/verification-token";
import { SKIP_EMAIL_VERIFICATION } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email/verification";
import {
  type RegisterInput,
  registerSchema,
  type SignInInput,
  signInSchema,
} from "@/lib/schemas/auth";

export type ActionResult<T = undefined> =
  | { success: true; data?: T; code?: string }
  | { success: false; error: string; code?: string };

export async function registerUser(
  input: RegisterInput,
): Promise<ActionResult<{ id: string; email: string }>> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid registration data.",
    };
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { success: false, error: "Email already in use." };
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

  if (!SKIP_EMAIL_VERIFICATION) {
    try {
      const token = await createVerificationToken(email);
      await sendVerificationEmail({
        to: email,
        verifyUrl: buildVerifyUrl(token),
        name: user.name,
      });
    } catch (err) {
      console.error("Failed to send verification email", err);
      return {
        success: false,
        error:
          "Account created, but we couldn't send the verification email. Please try resending.",
        code: "email_send_failed",
      };
    }
  }

  return {
    success: true,
    data: { id: user.id, email: user.email },
    code: SKIP_EMAIL_VERIFICATION ? "verification_skipped" : undefined,
  };
}

export async function signInWithCredentials(
  input: SignInInput,
): Promise<ActionResult> {
  const parsed = signInSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid sign-in data.",
    };
  }

  if (!SKIP_EMAIL_VERIFICATION) {
    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
      select: { password: true, emailVerified: true },
    });

    if (user?.password && !user.emailVerified) {
      return {
        success: false,
        error: "Please verify your email before signing in.",
        code: "unverified",
      };
    }
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/dashboard",
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: "Invalid email or password." };
    }
    throw error;
  }
}

export async function signInWithGitHub() {
  await signIn("github", { redirectTo: "/dashboard" });
}

export async function resendVerificationAction(
  _prev: ResendVerificationState,
  formData: FormData,
): Promise<ResendVerificationState> {
  const raw = formData.get("email");
  const email = typeof raw === "string" ? raw.trim().toLowerCase() : "";
  if (!email) {
    return { status: "error", error: "Email is required." };
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { name: true, email: true, emailVerified: true, password: true },
  });

  // Don't leak whether the account exists; respond success either way.
  if (!user || !user.password || user.emailVerified) {
    return { status: "success" };
  }

  try {
    const token = await createVerificationToken(user.email);
    await sendVerificationEmail({
      to: user.email,
      verifyUrl: buildVerifyUrl(token),
      name: user.name,
    });
    return { status: "success" };
  } catch (err) {
    console.error("Failed to resend verification email", err);
    return { status: "error", error: "Failed to send verification email." };
  }
}
