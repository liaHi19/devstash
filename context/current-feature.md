# Current Feature

Dashboard UI Phase 3 — main content area: 4 stats cards, recent collections, pinned items, 10 recent items. Spec: @context/features/dashboard-phase-3-spec.md.

## Status

In Progress

## Goals

- Main area to the right
- 4 stats cards at the top: total items, total collections, favorite items, favorite collections (not shown in screenshot)
- Recent collections section
- Pinned items section
- 10 most recent items section

## Notes

- Reference screenshot: @context/screenshots/dashboard-ui-main.png
- Use mock data directly from @src/lib/mock-data.ts (no DB yet)
- Stats cards aren't in the screenshot — derive design to match the existing dashboard look
- Builds on Phase 1 top bar and Phase 2 sidebar

## History

<!-- Keep this updated. Earliest to latest -->

- 2026-04-22 — Initial setup of Next.js 16 project (App Router, React 19, TypeScript, Tailwind v4).
- 2026-04-22 — Added mock data at `src/lib/mock-data.ts` and dashboard reference screenshots.
- 2026-04-22 — Completed Dashboard UI Phase 1: ShadCN (button, input, dropdown-menu, kbd) installed, dark mode default, `/dashboard` route with top bar (semantic `<search>`, ⌘K hint, New Item / New Collection dropdown) and sidebar/main placeholders.
- 2026-04-23 — Completed Dashboard UI Phase 1 fix: added filters / view-mode / theme icon buttons (toggles flip icons via `useState`, no behavior wired), made top bar wrap to 2 rows on `< md` with full-width search on row 2, responsive search padding, `min-w-44` on the + dropdown, and global `cursor: pointer` for buttons in `globals.css`.
- 2026-04-26 — Completed Dashboard UI Phase 2: dashboard layout owns one `sidebarOpen` state passed to `Sidebar` + `TopBar`; `Sidebar` splits into `DesktopSidebar` / `MobileSidebar` (chosen via `useMobile`) plus `SidebarNav` (full) and `SidebarRail` (icons-only when collapsed); `PageTitle` houses the toggle button + title; `SidebarNav` lists item types with counts and Collections (collapsible) with Recent (first 3, always visible) and Favorites (collapsible) submenus, color-coded dots and stars, and an avatar / plan / settings footer; mobile uses a Sheet drawer; desktop uses `data-state` driven `data-open:animate-in` / `data-closed:animate-out` fade animation; type listings link to `/items/:slug+s`.
