export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "DevStash";

// Routes that require an authenticated session.
// Matched as path prefixes in `auth.config.ts` `authorized` callback.
export const PROTECTED_ROUTES: readonly string[] = [
  "/dashboard",
  "/profile",
  "/settings",
];
