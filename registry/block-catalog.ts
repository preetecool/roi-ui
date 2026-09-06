/** Public block routes and gallery metadata. Registry names remain stable.
 * Client-only previews avoid verified dynamic SSR/useId mismatches in the docs shell.
 * Keep server rendering for previews without those mismatches.
 */
export const blockCatalog: Record<
  string,
  { title: string; category: "app" | "marketing"; full?: boolean; clientOnlyPreview?: boolean }
> = {
  "ai-chat": { title: "AI Composer", category: "app", clientOnlyPreview: true },
  "card-image-section": { title: "Card Image Section", category: "marketing", full: true },
  "card-login": { title: "Login Card", category: "app", clientOnlyPreview: true },
  "card-progress": { title: "Progress Card", category: "app" },
  "card-task": { title: "Task Card", category: "app", clientOnlyPreview: true },
  "card-traffic": { title: "Traffic Card", category: "app", clientOnlyPreview: true },
  "expandable-card-carousel": { title: "Expandable Card Carousel", category: "marketing", clientOnlyPreview: true },
  "expandable-card-spread": { title: "Expandable Card Spread", category: "marketing", clientOnlyPreview: true },
  "pricing-section": { title: "Pricing Section", category: "marketing" },
};
