export type ContentType = "text" | "url" | "file";

export type ItemTypeSlug =
  | "snippet"
  | "prompt"
  | "command"
  | "note"
  | "file"
  | "image"
  | "link";

export type ItemType = {
  id: string;
  slug: ItemTypeSlug;
  name: string;
  pluralName: string;
  icon: string;
  color: string;
  contentKind: ContentType;
  isPro: boolean;
}

export type Collection = {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
  dominantTypeSlug: ItemTypeSlug;
  itemCount: number;
}

export type Item = {
  id: string;
  title: string;
  typeSlug: ItemTypeSlug;
  content: string;
  description?: string;
  language?: string;
  url?: string;
  tags: string[];
  isFavorite: boolean;
  isPinned: boolean;
  collectionIds: string[];
  createdAt: string;
  updatedAt: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isPro: boolean;
  plan: "Free Plan" | "Pro Plan";
}

export const currentUser: User = {
  id: "user_1",
  name: "John Doe",
  email: "john.doe@example.com",
  isPro: false,
  plan: "Free Plan",
};

export const itemTypes: ItemType[] = [
  {
    id: "type_snippet",
    slug: "snippet",
    name: "Snippet",
    pluralName: "Snippets",
    icon: "Code",
    color: "#3b82f6",
    contentKind: "text",
    isPro: false,
  },
  {
    id: "type_prompt",
    slug: "prompt",
    name: "Prompt",
    pluralName: "Prompts",
    icon: "Sparkles",
    color: "#8b5cf6",
    contentKind: "text",
    isPro: false,
  },
  {
    id: "type_command",
    slug: "command",
    name: "Command",
    pluralName: "Commands",
    icon: "Terminal",
    color: "#f97316",
    contentKind: "text",
    isPro: false,
  },
  {
    id: "type_note",
    slug: "note",
    name: "Note",
    pluralName: "Notes",
    icon: "StickyNote",
    color: "#fde047",
    contentKind: "text",
    isPro: false,
  },
  {
    id: "type_file",
    slug: "file",
    name: "File",
    pluralName: "Files",
    icon: "File",
    color: "#6b7280",
    contentKind: "file",
    isPro: true,
  },
  {
    id: "type_image",
    slug: "image",
    name: "Image",
    pluralName: "Images",
    icon: "Image",
    color: "#ec4899",
    contentKind: "file",
    isPro: true,
  },
  {
    id: "type_link",
    slug: "link",
    name: "Link",
    pluralName: "Links",
    icon: "Link",
    color: "#10b981",
    contentKind: "url",
    isPro: false,
  },
];

export const collections: Collection[] = [
  {
    id: "col_react_patterns",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    isFavorite: true,
    dominantTypeSlug: "snippet",
    itemCount: 8,
  },
  {
    id: "col_ai_prompts",
    name: "AI Prompts",
    description: "LLM prompts and system messages",
    isFavorite: true,
    dominantTypeSlug: "prompt",
    itemCount: 12,
  },
  {
    id: "col_terminal_commands",
    name: "Terminal Commands",
    description: "Useful shell commands",
    isFavorite: false,
    dominantTypeSlug: "command",
    itemCount: 15,
  },
  {
    id: "col_dev_resources",
    name: "Dev Resources",
    description: "Documentation and learning resources",
    isFavorite: false,
    dominantTypeSlug: "link",
    itemCount: 6,
  },
  {
    id: "col_project_notes",
    name: "Project Notes",
    description: "Architecture and planning notes",
    isFavorite: false,
    dominantTypeSlug: "note",
    itemCount: 4,
  },
  {
    id: "col_interview_prep",
    name: "Interview Prep",
    description: "Code snippets for interviews",
    isFavorite: true,
    dominantTypeSlug: "snippet",
    itemCount: 9,
  },
];

export const items: Item[] = [
  {
    id: "item_use_debounce",
    title: "useDebounce Hook",
    typeSlug: "snippet",
    language: "typescript",
    content: `export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}`,
    description: "Debounce a value change over a delay.",
    tags: ["react", "hooks", "performance"],
    isFavorite: true,
    isPinned: true,
    collectionIds: ["col_react_patterns", "col_interview_prep"],
    createdAt: "2026-04-10T10:00:00.000Z",
    updatedAt: "2026-04-18T14:32:00.000Z",
  },
  {
    id: "item_senior_dev_prompt",
    title: "System Prompt - Senior Dev",
    typeSlug: "prompt",
    content:
      "You are a senior software engineer with 15 years of experience. You write clean, maintainable, and well-documented code. Explain your reasoning step by step and call out trade-offs clearly.",
    description: "LLM system prompt for code review / pair programming.",
    tags: ["ai", "system-prompt"],
    isFavorite: false,
    isPinned: true,
    collectionIds: ["col_ai_prompts"],
    createdAt: "2026-04-05T09:15:00.000Z",
    updatedAt: "2026-04-17T11:02:00.000Z",
  },
  {
    id: "item_kill_port_3000",
    title: "Kill Port 3000",
    typeSlug: "command",
    language: "bash",
    content: "lsof -ti:3000 | xargs kill -9",
    description: "Kill whatever process is hogging port 3000.",
    tags: ["terminal", "development"],
    isFavorite: true,
    isPinned: true,
    collectionIds: ["col_terminal_commands"],
    createdAt: "2026-03-28T17:44:00.000Z",
    updatedAt: "2026-04-16T08:20:00.000Z",
  },
  {
    id: "item_git_undo_last_commit",
    title: "Undo Last Commit (Keep Changes)",
    typeSlug: "command",
    language: "bash",
    content: "git reset --soft HEAD~1",
    description: "Undo the last commit but keep the changes staged.",
    tags: ["git", "terminal"],
    isFavorite: false,
    isPinned: false,
    collectionIds: ["col_terminal_commands"],
    createdAt: "2026-03-20T12:00:00.000Z",
    updatedAt: "2026-04-12T09:30:00.000Z",
  },
  {
    id: "item_nextjs_docs",
    title: "Next.js Docs",
    typeSlug: "link",
    url: "https://nextjs.org/docs",
    content: "https://nextjs.org/docs",
    description: "Official Next.js documentation.",
    tags: ["nextjs", "docs"],
    isFavorite: false,
    isPinned: false,
    collectionIds: ["col_dev_resources"],
    createdAt: "2026-03-15T08:00:00.000Z",
    updatedAt: "2026-04-01T10:10:00.000Z",
  },
  {
    id: "item_architecture_note",
    title: "DevStash Architecture Overview",
    typeSlug: "note",
    content:
      "# Architecture\n\nNext.js 16 App Router, Prisma 7 on Neon Postgres, NextAuth v5, Cloudflare R2 for file storage, Stripe for billing.",
    description: "High-level architecture notes for DevStash.",
    tags: ["architecture", "planning"],
    isFavorite: false,
    isPinned: false,
    collectionIds: ["col_project_notes"],
    createdAt: "2026-04-02T13:20:00.000Z",
    updatedAt: "2026-04-19T16:45:00.000Z",
  },
  {
    id: "item_refactor_prompt",
    title: "Refactor Prompt",
    typeSlug: "prompt",
    content:
      "Refactor the following code for readability and performance. Preserve public APIs. Explain what you changed and why.",
    description: "Quick refactor prompt for LLMs.",
    tags: ["ai", "refactor"],
    isFavorite: false,
    isPinned: false,
    collectionIds: ["col_ai_prompts"],
    createdAt: "2026-03-30T15:00:00.000Z",
    updatedAt: "2026-04-10T10:05:00.000Z",
  },
  {
    id: "item_use_local_storage",
    title: "useLocalStorage Hook",
    typeSlug: "snippet",
    language: "typescript",
    content: `export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    return raw ? (JSON.parse(raw) as T) : initial;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}`,
    description: "Persist state in localStorage.",
    tags: ["react", "hooks"],
    isFavorite: false,
    isPinned: false,
    collectionIds: ["col_react_patterns"],
    createdAt: "2026-03-22T09:45:00.000Z",
    updatedAt: "2026-04-08T12:00:00.000Z",
  },
];
