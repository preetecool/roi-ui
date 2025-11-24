import { Index } from "@/registry/__index__";

/**
 * Get component file paths from __index__ (build-time file metadata)
 */
export function getRegistryFiles(name: string): string[] | null {
  const item = Index[name];
  return item?.files || null;
}

/**
 * Get both CSS Modules and Tailwind variants for a component
 */
export function getComponentVariants(name: string): {
  cssModules: string[] | null;
  tailwind: string[] | null;
} {
  // Handle both camelCase (popoverTailwind) and kebab-case ("navigation-menu-tailwind") registry keys
  const tailwindKey = name.includes("-")
    ? `${name}-tailwind` // kebab-case: "navigation-menu-tailwind"
    : `${name}Tailwind`; // camelCase: popoverTailwind

  return {
    cssModules: getRegistryFiles(name),
    tailwind: getRegistryFiles(tailwindKey),
  };
}
