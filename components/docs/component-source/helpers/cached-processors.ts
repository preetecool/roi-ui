import { cacheLife, cacheTag } from "next/cache";
import { loadAllVariants } from "./file-loaders";
import { type ProcessedVariant, processVariants } from "./process-files";

async function getVariantsUncached(name: string): Promise<ProcessedVariant[]> {
  const variants = await loadAllVariants(name);
  return await processVariants(variants);
}

async function getVariantsCached(name: string): Promise<ProcessedVariant[]> {
  "use cache";
  cacheTag(`component-source-${name}`);
  cacheLife("max");

  const variants = await loadAllVariants(name);
  return await processVariants(variants);
}

export const getCachedVariants = process.env.NODE_ENV === "development" ? getVariantsUncached : getVariantsCached;
