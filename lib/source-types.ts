import type { loader } from "fumadocs-core/source";

/**
 * Types-only file for client components
 * This prevents bundling the entire source in client bundles
 */

// Re-export only the types from the source
export type Source = ReturnType<typeof loader>;
export type PageTree = Source["pageTree"];
export type Page = ReturnType<Source["getPage"]>;
