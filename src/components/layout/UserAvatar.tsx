import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function getInitials(name: string | null | undefined): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

type UserAvatarProps = {
  name: string | null | undefined;
  image?: string | null;
  size?: "sm" | "default" | "lg";
  className?: string;
};

export function UserAvatar({
  name,
  image,
  size = "default",
  className,
}: UserAvatarProps) {
  const initials = getInitials(name);
  const alt = name ?? "User";
  return (
    <Avatar size={size} className={cn(className)}>
      {image ? <AvatarImage src={image} alt={alt} /> : null}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
