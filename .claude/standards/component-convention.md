# Component Conventions

## Location

```
src/components/
├── ui/         # shadcn primitives — don't hand-edit
├── layout/     # app shell (TopBar, DashboardShell, sidebar/)
├── dashboard/  # dashboard route
└── auth/       # auth forms
```

Group by feature. Multi-file feature → folder with `index.tsx` barrel (see `sidebar/`).

## Naming

- One component per file. File name = component name. `PascalCase.tsx`.
- Hooks: `useThing.ts`. Utils: `src/lib/`.
- **Named exports only.** No `export default`.

## Server vs. client

- Server component by default. Add `"use client"` only for state, effects, browser APIs, or event handlers.
- Async server components OK (see `ItemCard.tsx`).
- Data fetching: server components only, via `src/lib/db/*` (`server-only`).
- Section needs data? Make a `*SectionWrapper` server component that fetches and passes props down (see `ItemsSectionWrapper.tsx`).
- Wrap independent sections in their own `<Suspense>` on the page.

## Props

- `type`, not `interface`.
- Inline next to component when small. Extract to `ComponentNameProps.ts` when large or shared (see `SidebarProps.ts`).
- Must be serializable across server → client.
- Booleans: `is`/`has`/`should`. Handlers: `onX`.

## Styling

- Tailwind v4 utilities. Inline `style` only for dynamic values (e.g. DB-driven type colors).
- `cn()` from `@/lib/utils` for conditional classes.
- Use shadcn primitives. Add new ones with `npx shadcn add <name>`.
- Semantic tokens (`bg-muted`, `text-muted-foreground`) over raw colors. Dark-mode-first.

## Forms

- React Hook Form + Zod, `mode: "onBlur"`.
- Schemas in `src/lib/schemas/`, shared with action + API route.
- shadcn `Form` / `FormField` / `FormMessage` for field errors; `sonner` toast for backend errors.
- Submit → server action (`src/actions/*`), not `fetch`.

## Data flow

- Client mutations → server actions. API routes reserved for webhooks, OAuth callbacks, file uploads, third-party-callable endpoints.
- Actions return `{ success, data?, error?, code? }`.

## Icons

- `lucide-react` only. DB-driven icon names → resolve via `iconMap` in `src/lib/icon-map.ts`.
- Decorative: `aria-hidden`. Meaningful: `aria-label`.

## Don't

- `export default`
- `interface` for props
- `any` (use `unknown`)
- Mock data imports in production components
- `new PrismaClient()` — import `prisma` from `@/lib/db`
- Inline styles for static values
- `tailwind.config.{ts,js}` — v4 config lives in `globals.css` under `@theme`
- Commented-out code, unused imports, "just in case" props
