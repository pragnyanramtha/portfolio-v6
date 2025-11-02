import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractDomain(url: string): string {
  try {
    if (!url || typeof url !== "string") return "";
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, "");
  } catch (_) {
    return "";
  }
}
