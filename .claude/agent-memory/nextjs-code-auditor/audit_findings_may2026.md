---
name: Audit Findings — May 2026
description: Key recurring patterns and real issues found in DevStash code audits (rounds 1 and 2)
type: project
---

## Round 1 — 2026-05-03 (now fixed)

The following issues were found in the first audit and resolved in the "Code Audit Quick Wins" commit (2026-05-03):

- Duplicate `iconMap` in four components → extracted to `src/lib/icon-map.ts`
- `getSidebarItemTypes()` misplaced in `items.ts` → moved to `src/lib/db/item-types.ts`
- No `userId` filter on item/collection queries → all queries now accept `userId` param
- `toPlural()` duplicated across components → extracted to `src/lib/utils.ts`
- `interface` keyword used in component prop types → replaced with `type`
- `ItemCard` passed full content to shiki → now passes 160-char preview slice only
- No `Suspense` boundaries on dashboard page → three independent `<Suspense>` added

## Round 2 — 2026-05-04 (new findings)

### Still present after Round 1

- **`currentUser` mock data still imported in `SidebarNav` and `SidebarRail`** — avatar URL, name, plan ("Free Plan") are all hardcoded from `src/lib/mock-data.ts`. These render server-side via client components and will show wrong data once real auth exists.

- **`Suspense` boundaries have no `fallback` prop** — all three `<Suspense>` in `dashboard/page.tsx` render nothing during streaming. No loading skeleton is shown.

- **No error boundaries (`error.tsx`)** — if any of the three async server components throw (e.g. DB connection failure), the page crashes with no user-facing recovery. Next.js App Router requires a colocated `error.tsx` to catch these.

- **`getSidebarItemTypes()` `_count` is not user-scoped** — `_count: { select: { items: true } }` counts items across ALL users. Once multiple users exist, every sidebar will show the global total, not the current user's count.

- **URL slug hardcoded as `${t.name}s`** in both `SidebarNav.tsx` (line 46) and `SidebarRail.tsx` (line 23) — bypasses the `toPlural()` utility already imported in scope. Will silently produce wrong URLs for any future type whose plural is not a simple `+s`.

- **`interface` keyword still used in `src/lib/mock-data.ts`** — coding standards require `type` over `interface`. Four interfaces remain: `ItemType`, `Collection`, `Item`, `User`.

- **`dangerouslySetInnerHTML` in `ItemCard`** — shiki output is inserted directly. This is safe because shiki's output is pre-escaped and the `language` field is validated against an allowlist in `highlight.ts`. Not a current XSS risk, but worth noting the dependency on the allowlist for future reviewers.

## Issues confirmed NOT present

- No SQL injection (no raw queries)
- No CORS misconfigurations (no API routes)
- No hardcoded secrets in `src/`
- No `any` types
- No direct `PrismaClient` instantiation in `src/`
- No N+1 queries in production code (only in seed script, acceptable)
