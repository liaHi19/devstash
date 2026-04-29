# Current Feature

<!-- Feature name and short description -->

## Status

<!-- Not Started | In Progress | Completed -->

## Goals

<!-- Goals and requirements -->

## Notes

<!-- Any extra notes -->

## History

<!-- Keep this updated. Earliest to latest -->

- 2026-04-22 — Initial setup of Next.js 16 project (App Router, React 19, TypeScript, Tailwind v4).
- 2026-04-22 — Added mock data at `src/lib/mock-data.ts` and dashboard reference screenshots.
- 2026-04-22 — Completed Dashboard UI Phase 1: ShadCN (button, input, dropdown-menu, kbd) installed, dark mode default, `/dashboard` route with top bar (semantic `<search>`, ⌘K hint, New Item / New Collection dropdown) and sidebar/main placeholders.
- 2026-04-23 — Completed Dashboard UI Phase 1 fix: added filters / view-mode / theme icon buttons (toggles flip icons via `useState`, no behavior wired), made top bar wrap to 2 rows on `< md` with full-width search on row 2, responsive search padding, `min-w-44` on the + dropdown, and global `cursor: pointer` for buttons in `globals.css`.
- 2026-04-26 — Completed Dashboard UI Phase 2: dashboard layout owns one `sidebarOpen` state passed to `Sidebar` + `TopBar`; `Sidebar` splits into `DesktopSidebar` / `MobileSidebar` (chosen via `useMobile`) plus `SidebarNav` (full) and `SidebarRail` (icons-only when collapsed); `PageTitle` houses the toggle button + title; `SidebarNav` lists item types with counts and Collections (collapsible) with Recent (first 3, always visible) and Favorites (collapsible) submenus, color-coded dots and stars, and an avatar / plan / settings footer; mobile uses a Sheet drawer; desktop uses `data-state` driven `data-open:animate-in` / `data-closed:animate-out` fade animation; type listings link to `/items/:slug+s`.
- 2026-04-26 — Completed Dark / Light theme setup: `ThemeProvider` (@teispace/next-themes wrapper, `attribute="class"`, `defaultTheme="dark"`, `disableTransitionOnChange`) wired into `RootLayout`; `ThemeToggle` uses `useTheme().resolvedTheme`/`setTheme` plus a new `useMounted` hook (built on `useSyncExternalStore`) to defer theme-aware rendering until after hydration so SSR markup matches the client; `ThemeToggle` (useState placeholder) replaced by the real toggle living under `src/components/layout/`.
- 2026-04-28 — Completed Dashboard UI Phase 3: `dashboard/page.tsx` composes `StatsCards` (Items / Collections / Favorite Items / Favorite Collections, computed from mock data with tinted icon tiles), `ItemsSection` (shadcn `Tabs` for Recent / Pinned / Favorites with a "View All" link, `defaultValue="pinned"`) wrapping per-tab `<ItemList>` server helpers that render an `ItemCard` grid or empty state, and `CollectionsSection` (recent collections grid + "View All"); `ItemCard` is an async server component using a new `src/lib/highlight.ts` (shiki `codeToHtml`, `github-dark-default` theme, `server-only`) to syntax-highlight snippet/command previews via `dangerouslySetInnerHTML`, with type-color top border, type icon, pin/star indicators, tags, and type label; `CollectionCard` mirrors that look (top border, dominant-type icon, name + favorite star, description, type label badge, item count) and links to `/collections/:id`; restored the missing shadcn-nova custom data-state variants (`data-active`, `data-open`, `data-closed`, `data-checked`, `data-unchecked`, `data-selected`, `data-disabled`, `data-horizontal`, `data-vertical`) inline in `globals.css` so Tabs active highlight + Sheet animations resolve against Radix's `[data-state]` attributes; installed shadcn `tabs` + `card` and `shiki`.
