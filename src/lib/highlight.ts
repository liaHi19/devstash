import { type BundledLanguage, codeToHtml } from "shiki";

import "server-only";

const supported = new Set<BundledLanguage>([
  "typescript",
  "tsx",
  "javascript",
  "jsx",
  "bash",
  "shell",
  "json",
  "markdown",
]);

const aliases: Record<string, BundledLanguage> = {
  sh: "bash",
  shell: "bash",
  js: "javascript",
  ts: "typescript",
};

export async function highlight(
  code: string,
  lang: string | undefined,
): Promise<string | null> {
  if (!lang) return null;

  const finalLang = (aliases[lang] ?? lang) as BundledLanguage;
  if (!supported.has(finalLang)) return null;

  return codeToHtml(code, {
    lang: finalLang,
    theme: "github-dark-default",
  });
}
