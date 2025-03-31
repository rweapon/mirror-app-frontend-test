import { Post } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function splitIntoColumns(arr: Post[], columnsCount: number) {
  if (columnsCount < 2) return [arr]
  const result = [];
  for (let i = 0; i < columnsCount; i++) {
    result.push(arr.filter((_, index) => index % columnsCount === i));
  }
  return result;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 7) {
    return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
  }

  return date.toLocaleDateString("en-GB");
} 