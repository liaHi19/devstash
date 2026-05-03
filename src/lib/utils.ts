import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toPlural(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1) + "s";
}
