export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "DevStash";

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// Verification token TTL (24 hours)
export const VERIFICATION_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

// Dev escape hatch: skip the email verification gate entirely.
// When true: new users are auto-verified at registration and the sign-in
// gate is bypassed. Use only until a sender domain is configured.
export const SKIP_EMAIL_VERIFICATION =
  process.env.SKIP_EMAIL_VERIFICATION === "true";

// Routes that require an authenticated session.
// Matched as path prefixes in `auth.config.ts` `authorized` callback.
export const PROTECTED_ROUTES: readonly string[] = [
  "/dashboard",
  "/profile",
  "/settings",
];
