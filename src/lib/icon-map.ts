import {
  Code,
  File as FileIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  type LucideIcon,
  Sparkles,
  StickyNote,
  Terminal,
} from "lucide-react";

export { Code as DefaultIcon } from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File: FileIcon,
  Image: ImageIcon,
  Link: LinkIcon,
};
