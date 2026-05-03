---
name: Audit Findings — May 2026
description: Key recurring patterns and real issues found in the first DevStash code audit
type: project
---

**First full audit date:** 2026-05-03

## Recurring patterns to watch

- `dangerouslySetInnerHTML` used in `ItemCard` with shiki output from DB content. Shiki sanitizes its own output but the user-supplied `language` field is passed unvalidated into shiki. Currently safe because language is validated against an allowlist in `src/lib/highlight.ts`, but the allowlist is only in highlight.ts — not enforced at the DB layer.
- Mock data (`currentUser` from `src/lib/mock-data.ts`) still used in production-rendered components (`SidebarNav`, `SidebarRail`) — avatar and plan info are hardcoded.
- Duplicate `iconMap` defined independently in `ItemCard`, `CollectionCard`, `SidebarNav`, `SidebarRail` — four copies of the same mapping.
- `getSidebarItemTypes()` queries `ItemType` (not `Item`) but lives in `src/lib/db/items.ts` — semantic misplacement.
- No `userId` filter on any of the item/collection queries — all queries return data for ALL users. This will become a critical security bug the moment auth is added.
- `toPlural()` utility duplicated: defined as a function in `SidebarNav.tsx` and inlined inline as a string template in `SidebarRail.tsx`.
- `interface` keyword used instead of `type` in several components, against coding standards.
- `ItemCard` passes the full `item.content` (potentially very long) to shiki, not just the `preview` slice — shiki highlights the whole string then CSS clips it.
- Dashboard page has no `Suspense` boundaries — the entire page waterfall-blocks on the slowest async component.
- Seed script has N+1 pattern: creates tags and tag links one-by-one in loops (acceptable in seed, not in production queries).

## Issues NOT found
- No SQL injection (only Prisma ORM, no raw queries)
- No CORS misconfigurations (no API routes exist)
- No hardcoded secrets in `src/` (`.env.production` is gitignored)
- No `any` types in `src/`
- No direct `PrismaClient` instantiation in `src/`
