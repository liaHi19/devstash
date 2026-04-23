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
