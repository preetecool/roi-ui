import { cacheLife, cacheTag } from "next/cache";
import { loadAllVariants } from "./file-loaders";
import { type ProcessedVariant, processVariants } from "./process-files";

/**
 * Uncached version - used in development for instant updates
 */
async function getVariantsUncached(name: string): Promise<ProcessedVariant[]> {
  const variants = await loadAllVariants(name);
  return await processVariants(variants);
}

/**
 * Cached version - used in production for performance
 * Cache is tagged per-component for targeted invalidation
 */
async function getVariantsCached(name: string): Promise<ProcessedVariant[]> {
  "use cache";
  cacheTag(`component-source-${name}`);
  cacheLife("max"); // Long-lived cache, only changes on deploy

  const variants = await loadAllVariants(name);
  return await processVariants(variants);
}

/**
 * Returns processed variants for a component.
 * In development: no caching for instant updates
 * In production: cached with component-specific tags
 */
export const getCachedVariants = process.env.NODE_ENV === "development" ? getVariantsUncached : getVariantsCached;
