import "dotenv/config";

import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

import { PrismaClient } from "../src/generated/prisma/client";

const DEMO_EMAIL = "demo@devstash.io";
const DEMO_NAME = "Demo User";
const DEMO_PASSWORD = "12345678";
const BCRYPT_ROUNDS = 12;

type SystemTypeName =
  | "snippet"
  | "prompt"
  | "command"
  | "note"
  | "file"
  | "image"
  | "link";

const SYSTEM_TYPES: { name: SystemTypeName; icon: string; color: string }[] = [
  { name: "snippet", icon: "Code", color: "#3b82f6" },
  { name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
  { name: "command", icon: "Terminal", color: "#f97316" },
  { name: "note", icon: "StickyNote", color: "#fde047" },
  { name: "file", icon: "File", color: "#6b7280" },
  { name: "image", icon: "Image", color: "#ec4899" },
  { name: "link", icon: "Link", color: "#10b981" },
];

type SeedItem = {
  title: string;
  type: SystemTypeName;
  contentType: "TEXT" | "FILE";
  content?: string;
  url?: string;
  description?: string;
  language?: string;
  isFavorite?: boolean;
  isPinned?: boolean;
};

type SeedCollection = {
  name: string;
  description: string;
  defaultType: SystemTypeName;
  isFavorite?: boolean;
  items: SeedItem[];
};

// Tag names per item, keyed by item title. Items not listed here remain untagged.
const ITEM_TAGS: Record<string, string[]> = {
  "useDebounce Hook": ["react", "hooks", "typescript", "performance"],
  "ThemeContext Provider": ["react", "context", "typescript", "theme"],
  "Code Review Prompt": ["ai", "code-review", "prompt"],
  "Documentation Generation Prompt": ["ai", "documentation", "prompt"],
  "Multi-stage Node Dockerfile": ["docker", "nodejs", "deployment"],
  "Deploy to production (Vercel)": ["vercel", "deployment", "cli"],
  "GitHub Actions Docs": ["github", "ci-cd", "documentation"],
  "Undo last commit (keep changes staged)": ["git", "version-control"],
  "Stop and remove all Docker containers": ["docker", "cleanup"],
  "List globally installed npm packages": ["npm", "nodejs"],
  "Tailwind CSS Docs": ["tailwind", "css", "documentation"],
  "shadcn/ui": ["ui", "components", "shadcn"],
  "Lucide Icons": ["icons", "ui"],
};

const COLLECTIONS: SeedCollection[] = [
  {
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    defaultType: "snippet",
    isFavorite: true,
    items: [
      {
        title: "useDebounce Hook",
        type: "snippet",
        contentType: "TEXT",
        language: "typescript",
        description: "Debounce a value change over a delay.",
        isFavorite: true,
        isPinned: true,
        content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}
`,
      },
      {
        title: "ThemeContext Provider",
        type: "snippet",
        contentType: "TEXT",
        language: "typescript",
        description: "Compound provider exposing theme + setter via context.",
        content: `import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
type ThemeContextValue = { theme: Theme; setTheme: (t: Theme) => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children, initial = "dark" }: { children: ReactNode; initial?: Theme }) {
  const [theme, setTheme] = useState<Theme>(initial);
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
`,
      },
      {
        title: "cn() className utility",
        type: "snippet",
        contentType: "TEXT",
        language: "typescript",
        description: "Merge Tailwind classes with clsx + tailwind-merge.",
        content: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`,
      },
    ],
  },
  {
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    defaultType: "prompt",
    isFavorite: true,
    items: [
      {
        title: "Code Review Prompt",
        type: "prompt",
        contentType: "TEXT",
        description: "Senior-engineer code review with prioritized findings.",
        isPinned: true,
        content: `You are a senior software engineer doing a code review.

Review the diff below and report:
1. Bugs or correctness issues (with line refs)
2. Security or performance risks
3. Readability / naming improvements
4. Tests that should exist

Group findings by severity (blocker / major / minor / nit). Be concise.

---
{{diff}}
`,
      },
      {
        title: "Documentation Generation Prompt",
        type: "prompt",
        contentType: "TEXT",
        description: "Generate README + JSDoc from source.",
        content: `You generate documentation for the code below.

Output:
- A short module summary (1-2 sentences)
- JSDoc/TSDoc for each exported symbol (params, returns, throws)
- One usage example per public function

Match the style of the existing project docs. Do not invent behavior — if unclear, write "TODO: clarify".

---
{{source}}
`,
      },
      {
        title: "Refactoring Assistance Prompt",
        type: "prompt",
        contentType: "TEXT",
        description: "Refactor while preserving public API + behavior.",
        content: `Refactor the code below for readability and maintainability.

Constraints:
- Preserve public API and observable behavior
- Keep the same file layout unless splitting is clearly justified
- No new dependencies

Return the refactored code, then a short bullet list of the changes and the reasoning behind each.

---
{{code}}
`,
      },
    ],
  },
  {
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    defaultType: "snippet",
    items: [
      {
        title: "Multi-stage Node Dockerfile",
        type: "snippet",
        contentType: "TEXT",
        language: "dockerfile",
        description: "Slim production image for a Next.js app.",
        content: `# syntax=docker/dockerfile:1.6
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
`,
      },
      {
        title: "Deploy to production (Vercel)",
        type: "command",
        contentType: "TEXT",
        language: "bash",
        description: "Build locally and ship to Vercel production.",
        content: "vercel deploy --prebuilt --prod",
      },
      {
        title: "GitHub Actions Docs",
        type: "link",
        contentType: "TEXT",
        url: "https://docs.github.com/en/actions",
        content: "https://docs.github.com/en/actions",
        description: "Reference for workflow syntax, runners, and secrets.",
      },
      {
        title: "Docker Compose Reference",
        type: "link",
        contentType: "TEXT",
        url: "https://docs.docker.com/compose/compose-file/",
        content: "https://docs.docker.com/compose/compose-file/",
        description: "Full Compose file specification.",
      },
    ],
  },
  {
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    defaultType: "command",
    items: [
      {
        title: "Undo last commit (keep changes staged)",
        type: "command",
        contentType: "TEXT",
        language: "bash",
        description: "Roll back the last commit but preserve the work.",
        isFavorite: true,
        content: "git reset --soft HEAD~1",
      },
      {
        title: "Stop and remove all Docker containers",
        type: "command",
        contentType: "TEXT",
        language: "bash",
        description: "Nuke every running container — useful when cleaning up.",
        content: "docker ps -aq | xargs -r docker stop | xargs -r docker rm",
      },
      {
        title: "Kill process on port 3000",
        type: "command",
        contentType: "TEXT",
        language: "bash",
        description: "Free up port 3000 when the dev server is stuck.",
        isPinned: true,
        content: "lsof -ti:3000 | xargs kill -9",
      },
      {
        title: "List globally installed npm packages",
        type: "command",
        contentType: "TEXT",
        language: "bash",
        description: "Show top-level globals only (no transitive deps).",
        content: "npm list -g --depth=0",
      },
    ],
  },
  {
    name: "Design Resources",
    description: "UI/UX resources and references",
    defaultType: "link",
    items: [
      {
        title: "Tailwind CSS Docs",
        type: "link",
        contentType: "TEXT",
        url: "https://tailwindcss.com/docs",
        content: "https://tailwindcss.com/docs",
        description: "Utility-first CSS framework reference.",
      },
      {
        title: "shadcn/ui",
        type: "link",
        contentType: "TEXT",
        url: "https://ui.shadcn.com",
        content: "https://ui.shadcn.com",
        description: "Copy-paste accessible components built on Radix.",
        isFavorite: true,
      },
      {
        title: "Radix UI Primitives",
        type: "link",
        contentType: "TEXT",
        url: "https://www.radix-ui.com/primitives",
        content: "https://www.radix-ui.com/primitives",
        description: "Unstyled, accessible component primitives.",
      },
      {
        title: "Lucide Icons",
        type: "link",
        contentType: "TEXT",
        url: "https://lucide.dev/icons",
        content: "https://lucide.dev/icons",
        description: "Searchable catalog for the icon set we use.",
      },
    ],
  },
];

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error(
      "✗ DATABASE_URL is not set. Add a Neon connection string to .env (see .env.example).",
    );
    process.exit(1);
  }

  const adapter = new PrismaNeon({ connectionString });
  const prisma = new PrismaClient({ adapter });

  try {
    console.log("→ Hashing demo password");
    const passwordHash = await bcrypt.hash(DEMO_PASSWORD, BCRYPT_ROUNDS);

    console.log(`→ Upserting demo user (${DEMO_EMAIL})`);
    const user = await prisma.user.upsert({
      where: { email: DEMO_EMAIL },
      update: {
        name: DEMO_NAME,
        password: passwordHash,
        emailVerified: new Date(),
        isPro: false,
      },
      create: {
        email: DEMO_EMAIL,
        name: DEMO_NAME,
        password: passwordHash,
        emailVerified: new Date(),
        isPro: false,
      },
    });

    console.log("→ Upserting system item types");
    const typeByName = new Map<SystemTypeName, { id: string }>();
    for (const t of SYSTEM_TYPES) {
      const existing = await prisma.itemType.findFirst({
        where: { userId: null, name: t.name, isSystem: true },
      });
      const row = existing
        ? await prisma.itemType.update({
            where: { id: existing.id },
            data: { icon: t.icon, color: t.color, isSystem: true },
          })
        : await prisma.itemType.create({
            data: { name: t.name, icon: t.icon, color: t.color, isSystem: true },
          });
      typeByName.set(t.name, { id: row.id });
    }

    console.log("→ Resetting demo user's collections + items (for idempotency)");
    await prisma.item.deleteMany({ where: { userId: user.id } });
    await prisma.collection.deleteMany({ where: { userId: user.id } });

    console.log("→ Seeding collections + items");
    let itemCount = 0;
    for (const c of COLLECTIONS) {
      const defaultType = typeByName.get(c.defaultType);
      if (!defaultType) throw new Error(`Missing system type ${c.defaultType}`);

      const collection = await prisma.collection.create({
        data: {
          name: c.name,
          description: c.description,
          isFavorite: c.isFavorite ?? false,
          defaultTypeId: defaultType.id,
          userId: user.id,
        },
      });

      for (const item of c.items) {
        const itemType = typeByName.get(item.type);
        if (!itemType) throw new Error(`Missing system type ${item.type}`);

        await prisma.item.create({
          data: {
            title: item.title,
            contentType: item.contentType,
            content: item.content ?? null,
            url: item.url ?? null,
            description: item.description ?? null,
            language: item.language ?? null,
            isFavorite: item.isFavorite ?? false,
            isPinned: item.isPinned ?? false,
            userId: user.id,
            itemTypeId: itemType.id,
            collections: {
              create: { collectionId: collection.id },
            },
          },
        });
        itemCount++;
      }

      console.log(`  • ${c.name} (${c.items.length} items)`);
    }

    console.log("→ Upserting tags");
    const allTagNames = [...new Set(Object.values(ITEM_TAGS).flat())];
    const tagByName = new Map<string, string>();
    for (const name of allTagNames) {
      const tag = await prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name },
      });
      tagByName.set(name, tag.id);
    }

    console.log("→ Linking tags to items via TagOnItem");
    const userItems = await prisma.item.findMany({
      where: { userId: user.id },
      select: { id: true, title: true },
    });
    const itemIdByTitle = new Map(userItems.map((i) => [i.title, i.id]));

    let tagLinkCount = 0;
    for (const [title, tagNames] of Object.entries(ITEM_TAGS)) {
      const itemId = itemIdByTitle.get(title);
      if (!itemId) {
        console.warn(`  ⚠ ITEM_TAGS references unknown item "${title}"`);
        continue;
      }
      for (const tagName of tagNames) {
        const tagId = tagByName.get(tagName);
        if (!tagId) throw new Error(`Missing tag ${tagName}`);
        await prisma.tagOnItem.create({
          data: { itemId, tagId },
        });
        tagLinkCount++;
      }
    }

    console.log("");
    console.log(
      `✓ Seed complete — user ${user.email}, ${COLLECTIONS.length} collections, ${itemCount} items, ${SYSTEM_TYPES.length} system types, ${allTagNames.length} tags, ${tagLinkCount} tag links`,
    );
  } catch (error) {
    console.error("✗ Seed failed:");
    console.error(error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
