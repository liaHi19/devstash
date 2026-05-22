# 📦 DevStash — Project Overview

> **One fast, searchable, AI-enhanced hub for all developer knowledge & resources.**

DevStash is a SaaS that gives developers a single home for the essentials they currently scatter across VS Code, Notion, ChatGPT, bookmarks, gists, and random `.txt` files. Store snippets, prompts, commands, notes, links, and files — then find them instantly.

---

## 🎯 The Problem

Developers keep their essentials scattered across many tools:

| 🧩 Asset          | 📍 Where it usually lives      |
| ----------------- | ------------------------------ |
| Code snippets     | VS Code, Notion                |
| AI prompts        | ChatGPT / Claude conversations |
| Context files     | Buried inside project folders  |
| Useful links      | Browser bookmarks              |
| Docs              | Random folders                 |
| Commands          | Loose `.txt` files             |
| Project templates | GitHub gists                   |
| Terminal commands | `~/.bash_history`              |

The result: **context switching, lost knowledge, and inconsistent workflows**.

**DevStash fixes this** by providing a fast, searchable, AI-enhanced hub for everything a developer needs to reach for repeatedly.

---

## 👥 Target Users

- **Everyday Developer** — needs a fast way to grab snippets, prompts, commands, links.
- **AI-first Developer** — saves prompts, contexts, workflows, system messages.
- **Content Creator / Educator** — stores code blocks, explanations, course notes.
- **Full-stack Builder** — collects patterns, boilerplates, API examples.

---

## ✨ Features

### A. Items & Item Types

Every stashed asset is an **Item**. Items have a **type**. Users can create custom types later, but DevStash ships with these system types (immutable):

| Type      | Content Kind | Tier    | Example                       |
| --------- | ------------ | ------- | ----------------------------- |
| `snippet` | text         | Free    | Reusable code blocks          |
| `prompt`  | text         | Free    | LLM prompts / system messages |
| `note`    | text         | Free    | Markdown notes                |
| `command` | text         | Free    | Shell / CLI commands          |
| `link`    | url          | Free    | Useful URLs                   |
| `file`    | file         | **Pro** | Context files, PDFs, etc.     |
| `image`   | file         | **Pro** | Screenshots, diagrams         |

- A type resolves to one of: `text`, `url`, or `file`.
- Type listing URLs follow the pattern `/items/snippets`, `/items/prompts`, etc.
- Items are **quick to access and create** via a slide-in drawer.

### B. Collections

Users group items into **Collections**. An item can belong to **multiple collections** (many-to-many), e.g. a React snippet in both _React Patterns_ and _Interview Prep_.

Example collections:

- **React Patterns** (snippets, notes)
- **Context Files** (files)
- **Python Snippets** (snippets)

### C. Search

Powerful search across:

- Content
- Tags
- Titles
- Types

### D. Authentication

- Email / password
- GitHub OAuth

### E. Quality-of-Life

- Collection & item favorites
- Pin items to the top
- Recently used
- Import code from a file
- Markdown editor for text types
- File upload for file / image types
- Export data in multiple formats
- Dark mode (default for devs)
- Add / remove items across multiple collections
- View which collections an item belongs to

### F. 🤖 AI Features (Pro only)

- AI auto-tag suggestions
- AI summaries
- AI "Explain This Code"
- Prompt optimizer

---

## 🧰 Tech Stack

| Layer            | Choice                                                                           | Notes                                                           |
| ---------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Framework**    | [Next.js 16](https://nextjs.org/docs) / [React 19](https://react.dev)            | SSR pages with dynamic components; API routes for backend needs |
| **Language**     | [TypeScript](https://www.typescriptlang.org/docs/)                               | Type safety across the stack                                    |
| **Database**     | [Neon Postgres](https://neon.tech/docs)                                          | Serverless Postgres in the cloud                                |
| **ORM**          | [Prisma 7](https://www.prisma.io/docs)                                           | Always pull latest docs before using                            |
| **Cache**        | [Redis](https://redis.io/docs/) _(maybe)_                                        | Optional, for hot reads                                         |
| **File Storage** | [Cloudflare R2](https://developers.cloudflare.com/r2/)                           | S3-compatible, no egress fees                                   |
| **Auth**         | [NextAuth v5](https://authjs.dev/)                                               | Email/password + GitHub OAuth                                   |
| **AI**           | [OpenAI `gpt-5-nano`](https://platform.openai.com/docs)                          | Tagging, summaries, explanations, prompt optimizer              |
| **Styling**      | [Tailwind v4](https://tailwindcss.com/docs) + [shadcn/ui](https://ui.shadcn.com) | Design system + primitives                                      |
| **Payments**     | [Stripe](https://docs.stripe.com)                                                | Subscriptions                                                   |
| **Icons**        | [Lucide](https://lucide.dev)                                                     | Consistent, clean iconography                                   |

**Mono-repo:** one codebase / one repo for less overhead.

---

## 💰 Monetization — Freemium

| Capability              | 🆓 Free                 | 💎 Pro ($8/mo or $72/yr) |
| ----------------------- | ----------------------- | ------------------------ |
| Items                   | 50 total                | Unlimited                |
| Collections             | 3                       | Unlimited                |
| System types            | All except file / image | All                      |
| File & image uploads    | ❌                      | ✅                       |
| Custom types _(future)_ | ❌                      | ✅                       |
| Search                  | Basic                   | Basic                    |
| AI auto-tagging         | ❌                      | ✅                       |
| AI code explanation     | ❌                      | ✅                       |
| AI prompt optimizer     | ❌                      | ✅                       |
| Export (JSON / ZIP)     | ❌                      | ✅                       |
| Support                 | Community               | Priority                 |

> 🛠️ **Dev note:** Build the Pro/Free gate into the data model and middleware from day one, but during development **all users get everything** so features are easy to test.

---

## 🎨 UI / UX

### Feel

- Modern, minimal, developer-focused
- **Dark mode default**, light mode optional
- Clean typography, generous whitespace
- Subtle borders and shadows
- References: [Notion](https://notion.so), [Linear](https://linear.app), [Raycast](https://raycast.com)
- Syntax highlighting on code blocks

### Layout

```
┌──────────────┬────────────────────────────────────────┐
│   SIDEBAR    │              MAIN CONTENT              │
│  (collapse)  │                                        │
│              │   ┌──────────┐  ┌──────────┐           │
│ Snippets     │   │ React    │  │ Python   │  …        │
│ Prompts      │   │ Patterns │  │ Snippets │           │
│ Commands     │   └──────────┘  └──────────┘           │
│ Notes        │                                        │
│ Files (Pro)  │   Items (color-coded border cards)     │
│ Images (Pro) │   ┌──────────┐ ┌──────────┐ ┌─────────┐│
│ Links        │   │ useDebou │ │ git rese │ │ claude  ││
│              │   │ nce.ts   │ │ --hard   │ │ prompt  ││
│ Collections  │   └──────────┘ └──────────┘ └─────────┘│
│  ★ React     │                                        │
│  ★ Prompts   │   [ + New Item ]  → opens drawer →     │
└──────────────┴────────────────────────────────────────┘
```

- **Sidebar:** item types with links to their listings, plus latest collections.
- **Main:** grid of collection cards. Card **background color** = the dominant item type; item **border color** = its type.
- **Item detail:** opens in a slide-in drawer for quick access and creation.

### Design tokens — Types

| Type    | Icon (lucide) | Color      | Hex       |
| ------- | ------------- | ---------- | --------- |
| Snippet | `Code`        | 🔵 Blue    | `#3b82f6` |
| Prompt  | `Sparkles`    | 🟣 Purple  | `#8b5cf6` |
| Command | `Terminal`    | 🟠 Orange  | `#f97316` |
| Note    | `StickyNote`  | 🟡 Yellow  | `#fde047` |
| File    | `File`        | ⚫ Gray    | `#6b7280` |
| Image   | `Image`       | 🩷 Pink    | `#ec4899` |
| Link    | `Link`        | 🟢 Emerald | `#10b981` |

### Screenshots

Refer to the screenshots below as a base the dashboard ui. It does not to be exact. Use it as a reference:

- @context/screenshots/dashboard-ui-main.png
- @context/screenshots/dashboard-ui-drawer.png

### Responsive

- **Desktop-first**, mobile usable.
- Sidebar collapses into a drawer on mobile.

### Micro-interactions

- Smooth transitions
- Card hover states
- Toast notifications on actions
- Loading skeletons

---
