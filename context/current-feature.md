# Current Feature

Seed Data — populate the database with a demo user, system item types, and sample collections/items for development and demos. Spec: [seed-spec.md](features/seed-spec.md).

## Status

Completed

## Goals

- Create `prisma/seed.ts` runnable via `prisma db seed` (Prisma 7 requires explicit invocation).
- Seed a demo user: `demo@devstash.io` / "Demo User", password `12345678` hashed with `bcryptjs` (12 rounds), `isPro: false`, `emailVerified: now()`.
- Seed all 7 system `ItemType` rows (snippet, prompt, command, note, file, image, link) with their Lucide icon names and hex colors from the spec, all `isSystem: true`.
- Seed the 5 collections from the spec with their items:
  - **React Patterns** — 3 TypeScript snippets (custom hooks, component patterns, utilities).
  - **AI Workflows** — 3 prompts (code review, docs generation, refactoring).
  - **DevOps** — 1 snippet, 1 command, 2 links (real URLs).
  - **Terminal Commands** — 4 commands (git, docker, process management, package managers).
  - **Design Resources** — 4 links (real URLs: CSS/Tailwind, component libs, design systems, icon libs).
- Make the script idempotent (safe to re-run): upsert the user and item types, and reset their items/collections so re-runs don't duplicate.
- Wire `prisma.seed` config in `package.json` so `prisma db seed` discovers the script.

## Notes

- `package.json` has `"type": "module"` — write `prisma/seed.ts` as ESM and run via `tsx`.
- Use the singleton `prisma` from [src/lib/db.ts](../src/lib/db.ts); do not instantiate a new client.
- Add `bcryptjs` (+ `@types/bcryptjs`) and `tsx` if not already installed.
- After seeding, verify in Prisma Studio (`npm run db:studio`) that all rows exist and item-type relations are correct.

## History

<!-- Keep this updated. Earliest to latest -->

- 2026-04-22 — Initial setup of Next.js 16 project (App Router, React 19, TypeScript, Tailwind v4).
- 2026-04-22 — Added mock data at `src/lib/mock-data.ts` and dashboard reference screenshots.
- 2026-04-22 — Completed Dashboard UI Phase 1: ShadCN (button, input, dropdown-menu, kbd) installed, dark mode default, `/dashboard` route with top bar (semantic `<search>`, ⌘K hint, New Item / New Collection dropdown) and sidebar/main placeholders.
- 2026-04-23 — Completed Dashboard UI Phase 1 fix: added filters / view-mode / theme icon buttons (toggles flip icons via `useState`, no behavior wired), made top bar wrap to 2 rows on `< md` with full-width search on row 2, responsive search padding, `min-w-44` on the + dropdown, and global `cursor: pointer` for buttons in `globals.css`.
- 2026-04-26 — Completed Dashboard UI Phase 2: dashboard layout owns one `sidebarOpen` state passed to `Sidebar` + `TopBar`; `Sidebar` splits into `DesktopSidebar` / `MobileSidebar` (chosen via `useMobile`) plus `SidebarNav` (full) and `SidebarRail` (icons-only when collapsed); `PageTitle` houses the toggle button + title; `SidebarNav` lists item types with counts and Collections (collapsible) with Recent (first 3, always visible) and Favorites (collapsible) submenus, color-coded dots and stars, and an avatar / plan / settings footer; mobile uses a Sheet drawer; desktop uses `data-state` driven `data-open:animate-in` / `data-closed:animate-out` fade animation; type listings link to `/items/:slug+s`.
- 2026-04-26 — Completed Dark / Light theme setup: `ThemeProvider` (@teispace/next-themes wrapper, `attribute="class"`, `defaultTheme="dark"`, `disableTransitionOnChange`) wired into `RootLayout`; `ThemeToggle` uses `useTheme().resolvedTheme`/`setTheme` plus a new `useMounted` hook (built on `useSyncExternalStore`) to defer theme-aware rendering until after hydration so SSR markup matches the client; `ThemeToggle` (useState placeholder) replaced by the real toggle living under `src/components/layout/`.
- 2026-04-28 — Completed Dashboard UI Phase 3: `dashboard/page.tsx` composes `StatsCards` (Items / Collections / Favorite Items / Favorite Collections, computed from mock data with tinted icon tiles), `ItemsSection` (shadcn `Tabs` for Recent / Pinned / Favorites with a "View All" link, `defaultValue="pinned"`) wrapping per-tab `<ItemList>` server helpers that render an `ItemCard` grid or empty state, and `CollectionsSection` (recent collections grid + "View All"); `ItemCard` is an async server component using a new `src/lib/highlight.ts` (shiki `codeToHtml`, `github-dark-default` theme, `server-only`) to syntax-highlight snippet/command previews via `dangerouslySetInnerHTML`, with type-color top border, type icon, pin/star indicators, tags, and type label; `CollectionCard` mirrors that look (top border, dominant-type icon, name + favorite star, description, type label badge, item count) and links to `/collections/:id`; restored the missing shadcn-nova custom data-state variants (`data-active`, `data-open`, `data-closed`, `data-checked`, `data-unchecked`, `data-selected`, `data-disabled`, `data-horizontal`, `data-vertical`) inline in `globals.css` so Tabs active highlight + Sheet animations resolve against Radix's `[data-state]` attributes; installed shadcn `tabs` + `card` and `shiki`.
- 2026-04-29 — Completed Seed Data: added `password String?` to `User` (migration `20260429173405_add_user_password`) since the spec requires a hashed credentials password and there was no column for it; new `prisma/seed.ts` (own `PrismaClient` + `PrismaNeon` adapter — `src/lib/db.ts` is `server-only` and won't load outside Next.js) hashes `12345678` with `bcryptjs` (12 rounds) and upserts the demo user, upserts all 7 system `ItemType` rows (system types use `findFirst` since the `[userId, name]` compound unique has a nullable `userId` that Prisma's `where` can't target with `null`), then resets the user's items + collections and recreates the 5 collections (React Patterns / AI Workflows / DevOps / Terminal Commands / Design Resources, 18 items total) with `defaultTypeId` and `ItemCollection` joins; wired `migrations.seed: "tsx prisma/seed.ts"` in `prisma.config.ts` (Prisma 7 reads seed config from there, not `package.json`), added `db:seed` script and `tsx` dev dep (Prisma 7's generated client uses extensionless ESM imports that `node --experimental-strip-types` can't resolve), enabled `allowImportingTsExtensions` in `tsconfig.json` so `scripts/test-db.ts` no longer fails type-check.
