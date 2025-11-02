import type { IconConfig } from "./search";

/**
 * Icon configuration for search results
 * Determines which icon to show based on page name and URL patterns
 */
export const ICON_CONFIG: readonly IconConfig[] = [
  {
    type: "arrow",
    patterns: ["introduction", "quick start", "about roi ui", "components"],
  },
  {
    type: "component",
    patterns: [
      "expandable card",
      "login card",
      "task card",
      "transaction card",
      "website traffic",
      "chat",
      "task",
      "image card",
      "transaction history",
      "copy button",
      "like button",
      "profile menu",
    ],
  },
  {
    type: "puzzle",
    patterns: [
      "dialog",
      "tabs",
      "accordion",
      "badge error",
      "badge success",
      "dropdown menu motion",
    ],
    urlPatterns: ["/examples/"],
  },
  {
    type: "puzzle",
    patterns: [],
    urlPatterns: ["/components/", "/ui/"],
  },
] as const;

/**
 * Animation timing constants
 */
export const ANIMATION = {
  CLOSE_DELAY: 150,
  FOCUS_DELAY: 0,
} as const;
