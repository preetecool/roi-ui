import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind-optimized utility for merging class names.
 * Uses clsx for conditional classes and tailwind-merge for proper Tailwind class conflict resolution.
 *
 * @example
 * ```tsx
 * cn("px-2 py-1", condition && "bg-blue-500", "px-4")
 * // Returns: "py-1 bg-blue-500 px-4" (px-2 is overridden by px-4)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
