# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

# DevStash

A developer knowledge hub for snippets, commands, prompts, notes, files, images, links and custom types

## Context Files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

```bash
npm run dev      # start dev server (Turbopack, default in v16)
npm run build    # production build (Turbopack by default)
npm run start    # start production server
npm run lint     # run ESLint
```

## Stack

- **Next.js 16** with App Router (`src/app/`)
- **React 19**, **TypeScript 5**, **Tailwind CSS 4**
- Turbopack is the default bundler for both `dev` and `build` — no `--turbopack` flag needed
- Tailwind v4 uses `@import "tailwindcss"` in CSS (not `@tailwind` directives)

## Architecture

App Router only — no Pages Router. Routes live under `src/app/`:

- `layout.tsx` — root layout with Geist font variables and base body styles
- `page.tsx` — root route (`/`)
- `globals.css` — global styles imported in root layout

Add new routes by creating `page.tsx` inside a new folder under `src/app/`. Shared UI wrapping multiple routes goes in a `layout.tsx` at the appropriate level.

## Key v16 differences from prior versions

- `middleware.ts` is deprecated — use `proxy.ts` instead
- `experimental.turbopack` config moves to top-level `turbopack` in `next.config.ts`
- If you add a custom `webpack` config, `next build` will fail unless you pass `--webpack`; Turbopack config is separate
- ESLint is run via `eslint` CLI directly, not `next lint`
