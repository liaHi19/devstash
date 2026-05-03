---
name: DevStash Architecture Snapshot
description: Core architectural decisions and patterns found in DevStash during first audit (May 2026)
type: project
---

No API routes or Server Actions exist yet — all data access is via `server-only` helpers in `src/lib/db/` called directly from async server components.

All Prisma queries are scoped to the singleton in `src/lib/db.ts`. No direct `PrismaClient` instantiation in `src/` (only in `prisma/seed.ts`, correctly isolated).

Dashboard page renders three independent async server component trees (`StatsCards`, `ItemsSectionWrapper`, `CollectionsSection`) each fetching their own data in parallel internally via `Promise.all` — but these three trees themselves are sequential awaits inside the page render (Next.js streams them concurrently via RSC but they do not share data).

`dashboard/layout.tsx` fetches sidebar data (item types + collections) and passes them as props to `DashboardShell` (client component), which threads them down to `SidebarNav` and `SidebarRail`.

**Why:** Sidebar data is stable across the whole dashboard and is fetched once at layout level. Dashboard content data is fetched at the component level.

**How to apply:** When adding new sidebar sections, add fetches to `dashboard/layout.tsx`. When adding new page sections, add fetches inside the section component itself.
