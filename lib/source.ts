import type { ComponentType } from "react";
import { pagesManifest, pageTree } from "./source-manifest";

/**
 * Dynamic page loader with bundle splitting
 * Each page's MDX content is loaded on-demand via dynamic imports
 * This prevents bundling all MDX files into a single large bundle
 */

interface PageData {
  title: string;
  description?: string;
  links?: {
    doc?: string;
    api?: string;
  };
  components?: string[];
  motion?: boolean;
  body: ComponentType<any>;
  toc: Array<{
    title: string;
    url: string;
    depth: number;
  }>;
}

interface Page {
  data: PageData;
  url: string;
  slugs: string[];
  file: {
    path: string;
    name: string;
    ext: string;
    dirname: string;
    flattenedPath: string;
  };
  path: string;
  absolutePath: string;
}

/**
 * Map slugs to their corresponding MDX file import function
 * Each function returns a dynamic import, creating a separate bundle chunk
 */
function getImportFunction(slugs: string[] | undefined) {
  const key = slugs?.join("/") || "";

  // Map of slug paths to dynamic imports
  const importMap: Record<string, () => Promise<any>> = {
    "": () => import("@/content/(root)/index.mdx"),
    start: () => import("@/content/(root)/start.mdx"),
    components: () => import("@/content/(root)/components.mdx"),

    // UI Components
    "ui/accordion": () => import("@/content/ui/accordion.mdx"),
    "ui/alert-dialog": () => import("@/content/ui/alert-dialog.mdx"),
    "ui/alert": () => import("@/content/ui/alert.mdx"),
    "ui/autocomplete": () => import("@/content/ui/autocomplete.mdx"),
    "ui/avatar": () => import("@/content/ui/avatar.mdx"),
    "ui/badge": () => import("@/content/ui/badge.mdx"),
    "ui/button": () => import("@/content/ui/button.mdx"),
    "ui/card": () => import("@/content/ui/card.mdx"),
    "ui/carousel": () => import("@/content/ui/carousel.mdx"),
    "ui/charts": () => import("@/content/ui/charts.mdx"),
    "ui/checkbox-group": () => import("@/content/ui/checkbox-group.mdx"),
    "ui/checkbox": () => import("@/content/ui/checkbox.mdx"),
    "ui/collapsible": () => import("@/content/ui/collapsible.mdx"),
    "ui/combobox": () => import("@/content/ui/combobox.mdx"),
    "ui/command": () => import("@/content/ui/command.mdx"),
    "ui/context-menu": () => import("@/content/ui/context-menu.mdx"),
    "ui/copy-button": () => import("@/content/ui/copy-button.mdx"),
    "ui/dialog": () => import("@/content/ui/dialog.mdx"),
    "ui/dropdown-menu": () => import("@/content/ui/dropdown-menu.mdx"),
    "ui/field": () => import("@/content/ui/field.mdx"),
    "ui/fieldset": () => import("@/content/ui/fieldset.mdx"),
    "ui/form": () => import("@/content/ui/form.mdx"),
    "ui/input": () => import("@/content/ui/input.mdx"),
    "ui/like-button": () => import("@/content/ui/like-button.mdx"),
    "ui/menubar": () => import("@/content/ui/menubar.mdx"),
    "ui/meter": () => import("@/content/ui/meter.mdx"),
    "ui/navigation-menu": () => import("@/content/ui/navigation-menu.mdx"),
    "ui/number-field": () => import("@/content/ui/number-field.mdx"),
    "ui/popover": () => import("@/content/ui/popover.mdx"),
    "ui/preview-card": () => import("@/content/ui/preview-card.mdx"),
    "ui/progress": () => import("@/content/ui/progress.mdx"),
    "ui/radio": () => import("@/content/ui/radio.mdx"),
    "ui/scroll-area": () => import("@/content/ui/scroll-area.mdx"),
    "ui/select": () => import("@/content/ui/select.mdx"),
    "ui/separator": () => import("@/content/ui/separator.mdx"),
    "ui/slider": () => import("@/content/ui/slider.mdx"),
    "ui/switch": () => import("@/content/ui/switch.mdx"),
    "ui/table": () => import("@/content/ui/table.mdx"),
    "ui/tabs": () => import("@/content/ui/tabs.mdx"),
    "ui/toast": () => import("@/content/ui/toast.mdx"),
    "ui/toggle-group": () => import("@/content/ui/toggle-group.mdx"),
    "ui/toggle": () => import("@/content/ui/toggle.mdx"),
    "ui/toolbar": () => import("@/content/ui/toolbar.mdx"),
    "ui/tooltip": () => import("@/content/ui/tooltip.mdx"),

    // Blocks
    "blocks/ai-chat": () => import("@/content/blocks/ai-chat.mdx"),
    "blocks/card-expandable": () =>
      import("@/content/blocks/card-expandable.mdx"),
    "blocks/card-history": () => import("@/content/blocks/card-history.mdx"),
    "blocks/card-image": () => import("@/content/blocks/card-image.mdx"),
    "blocks/card-login": () => import("@/content/blocks/card-login.mdx"),
    "blocks/card-task": () => import("@/content/blocks/card-task.mdx"),
    "blocks/card-traffic": () => import("@/content/blocks/card-traffic.mdx"),
    "blocks/profile-menu": () => import("@/content/blocks/profile-menu.mdx"),
  };

  return importMap[key];
}

/**
 * Get a single page by its slugs (sync version for compatibility)
 * Returns page metadata immediately, MDX content loaded on demand
 */
function getPage(slugs: string[] | undefined): Page | undefined {
  const metadata = pagesManifest.find((p) => {
    if (!slugs || slugs.length === 0) return p.slug.length === 0;
    return p.slug.join("/") === slugs.join("/");
  });

  if (!metadata) return;

  const pathStr = metadata.slug.join("/") || "index";
  const name =
    metadata.slug.length > 0
      ? metadata.slug[metadata.slug.length - 1]
      : "index";
  const dirname =
    metadata.slug.length > 1 ? metadata.slug.slice(0, -1).join("/") : "";

  return {
    data: {
      title: metadata.title,
      description: metadata.description,
      links: metadata.links,
      components: metadata.components,
      motion: metadata.motion,
      // Body and toc will be loaded async when needed
      body: (() => null) as any,
      toc: [],
    },
    url: metadata.url,
    slugs: metadata.slug,
    file: {
      path: `${pathStr}.mdx`,
      name,
      ext: ".mdx",
      dirname,
      flattenedPath: pathStr,
    },
    path: `${pathStr}.mdx`,
    absolutePath: `/content/${pathStr}.mdx`,
  };
}

/**
 * Get a page with full content loaded (async version for rendering)
 * This is what should be used in page components
 */
async function getPageWithContent(
  slugs: string[] | undefined
): Promise<Page | undefined> {
  const metadata = pagesManifest.find((p) => {
    if (!slugs || slugs.length === 0) return p.slug.length === 0;
    return p.slug.join("/") === slugs.join("/");
  });

  if (!metadata) return;

  const importFn = getImportFunction(slugs);
  if (!importFn) return;

  try {
    const module = await importFn();
    const pathStr = metadata.slug.join("/") || "index";
    const name =
      metadata.slug.length > 0
        ? metadata.slug[metadata.slug.length - 1]
        : "index";
    const dirname =
      metadata.slug.length > 1 ? metadata.slug.slice(0, -1).join("/") : "";

    return {
      data: {
        title: metadata.title,
        description: metadata.description,
        links: metadata.links,
        components: metadata.components,
        motion: metadata.motion,
        body: module.default,
        toc: module.toc || [],
      },
      url: metadata.url,
      slugs: metadata.slug,
      file: {
        path: `${pathStr}.mdx`,
        name,
        ext: ".mdx",
        dirname,
        flattenedPath: pathStr,
      },
      path: `${pathStr}.mdx`,
      absolutePath: `/content/${pathStr}.mdx`,
    };
  } catch (error) {
    console.error(`Error loading page: ${metadata.url}`, error);
    return;
  }
}

/**
 * Get all pages (metadata only, no MDX content loaded)
 * Used for navigation and static param generation
 */
function getPages(): Page[] {
  return pagesManifest.map((meta) => {
    const pathStr = meta.slug.join("/") || "index";
    const name =
      meta.slug.length > 0 ? meta.slug[meta.slug.length - 1] : "index";
    const dirname =
      meta.slug.length > 1 ? meta.slug.slice(0, -1).join("/") : "";

    return {
      data: {
        title: meta.title,
        description: meta.description,
        links: meta.links,
        components: meta.components,
        motion: meta.motion,
        // Body and toc are not loaded here - they're loaded on-demand in getPage
        body: (() => null) as any,
        toc: [],
      },
      url: meta.url,
      slugs: meta.slug,
      file: {
        path: `${pathStr}.mdx`,
        name,
        ext: ".mdx",
        dirname,
        flattenedPath: pathStr,
      },
      path: `${pathStr}.mdx`,
      absolutePath: `/content/${pathStr}.mdx`,
    };
  });
}

/**
 * Generate static params for Next.js
 * Only reads from lightweight manifest, no MDX bundles loaded
 */
function generateParams<TSlug extends string = "slug">(slug?: TSlug) {
  const slugKey = (slug || "slug") as TSlug;
  return pagesManifest.map((page) => ({
    [slugKey]: page.slug.length === 0 ? [] : page.slug,
  })) as any;
}

/**
 * Get page tree (always returns the root tree for non-i18n setups)
 */
function getPageTree(_locale?: string) {
  return pageTree;
}

/**
 * Get page by href
 */
function getPageByHref(href: string) {
  const cleanHref = href.split("#")[0]; // Remove hash
  const metadata = pagesManifest.find((p) => p.url === cleanHref);

  if (!metadata) return;

  const pathStr = metadata.slug.join("/") || "index";
  const name =
    metadata.slug.length > 0
      ? metadata.slug[metadata.slug.length - 1]
      : "index";
  const dirname =
    metadata.slug.length > 1 ? metadata.slug.slice(0, -1).join("/") : "";

  return {
    page: {
      data: {
        title: metadata.title,
        description: metadata.description,
        links: metadata.links,
        components: metadata.components,
        motion: metadata.motion,
        body: (() => null) as any,
        toc: [],
      },
      url: metadata.url,
      slugs: metadata.slug,
      file: {
        path: `${pathStr}.mdx`,
        name,
        ext: ".mdx",
        dirname,
        flattenedPath: pathStr,
      },
      path: `${pathStr}.mdx`,
      absolutePath: `/content/${pathStr}.mdx`,
    },
  };
}

/**
 * Get languages (for i18n support - returns empty array for non-i18n)
 */
function getLanguages() {
  return [];
}

/**
 * Get node page (not implemented for custom source)
 */
function getNodePage(_node: any, _language?: string) {
  return;
}

/**
 * Get node meta (not implemented for custom source)
 */
function getNodeMeta(_node: any, _language?: string) {
  return;
}

/**
 * Export a proxy that mimics the original loader API
 * Maintains backward compatibility while enabling bundle splitting
 */
export const source = {
  pageTree,
  getPage,
  getPages,
  generateParams,
  getPageTree,
  getPageByHref,
  getLanguages,
  getNodePage,
  getNodeMeta,
};

/**
 * Export the async version for use in page components
 */
export { getPageWithContent };
