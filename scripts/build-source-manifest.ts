import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Build script for generating source-manifest.ts
 * This reads the actual meta.json files and MDX frontmatter
 * to create a consistent manifest and page tree
 */

interface Frontmatter {
  title?: string;
  description?: string;
  links?: {
    doc?: string;
    api?: string;
  };
  components?: string[];
  motion?: boolean;
}

interface MetaJson {
  title?: string;
  pages?: string[];
}

interface PageMetadata {
  slug: string[];
  url: string;
  title: string;
  description?: string;
  links?: {
    doc?: string;
    api?: string;
  };
  components?: string[];
  motion?: boolean;
}

interface PageTreeNode {
  type: "page" | "folder";
  name: string;
  url?: string;
  external?: boolean;
  index?: { url: string; title: string };
  children?: PageTreeNode[];
}

/**
 * Extract frontmatter from MDX file
 */
async function extractFrontmatter(filePath: string): Promise<Frontmatter> {
  const content = await fs.readFile(filePath, "utf-8");
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

  if (!frontmatterMatch) {
    return {};
  }

  const frontmatter: Frontmatter = {};
  const lines = frontmatterMatch[1].split("\n");
  let currentKey: string | null = null;
  let currentValue: string = "";
  let inNestedObject = false;
  let nestedObject: any = {};
  let nestedKey: string | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for top-level key
    const topLevelMatch = line.match(/^(\w+):\s*(.*)$/);

    if (topLevelMatch && !line.startsWith(" ") && !line.startsWith("\t")) {
      // Save previous key if exists
      if (currentKey && currentValue) {
        if (currentKey === "title" || currentKey === "description") {
          frontmatter[currentKey] = currentValue
            .trim()
            .replace(/^["']|["']$/g, "");
        }
      }
      if (inNestedObject && nestedKey) {
        (frontmatter as any)[nestedKey] = nestedObject;
        nestedObject = {};
        inNestedObject = false;
      }

      const [, key, value] = topLevelMatch;
      currentKey = key;
      currentValue = value;

      // Check if this starts a nested object (no value on same line)
      // but only for 'links', 'components', etc - not for description
      if (
        (!value || value.trim() === "") &&
        key !== "description" &&
        key !== "title"
      ) {
        inNestedObject = true;
        nestedKey = key;
        currentKey = null;
        currentValue = "";
      }
    } else if (line.match(/^\s+\w+:/) && inNestedObject) {
      // Nested object property
      const nestedMatch = line.match(/^\s+(\w+):\s*(.*)$/);
      if (nestedMatch) {
        const [, key, value] = nestedMatch;
        nestedObject[key] = value.trim().replace(/^["']|["']$/g, "");
      }
    } else if (line.match(/^\s+/) && currentKey && !inNestedObject) {
      // Continuation of multi-line value (for description, title, etc)
      currentValue += " " + line.trim();
    }
  }

  // Save last key
  if (currentKey && currentValue) {
    if (currentKey === "title" || currentKey === "description") {
      frontmatter[currentKey] = currentValue.trim().replace(/^["']|["']$/g, "");
    }
  }
  if (inNestedObject && nestedKey) {
    (frontmatter as any)[nestedKey] = nestedObject;
  }

  return frontmatter;
}

/**
 * Process a directory and its MDX files
 */
async function processDirectory(
  baseDir: string,
  relativePath: string = ""
): Promise<{ pages: PageMetadata[]; meta?: MetaJson }> {
  const fullPath = path.join(baseDir, relativePath);
  const pages: PageMetadata[] = [];
  let meta: MetaJson | undefined;

  // Read meta.json if it exists
  const metaPath = path.join(fullPath, "meta.json");
  try {
    const metaContent = await fs.readFile(metaPath, "utf-8");
    meta = JSON.parse(metaContent);
  } catch {
    // No meta.json
  }

  // Get all entries in directory
  const entries = await fs.readdir(fullPath, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === "meta.json") continue;

    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      const fileName = entry.name.replace(".mdx", "");
      const mdxPath = path.join(fullPath, entry.name);
      const frontmatter = await extractFrontmatter(mdxPath);

      // Determine slug
      const slug =
        relativePath === "" || relativePath === "(root)"
          ? fileName === "index"
            ? []
            : [fileName]
          : relativePath === "(root)"
            ? [fileName]
            : [...relativePath.replace("(root)/", "").split("/"), fileName];

      // Clean up slug (remove (root))
      const cleanSlug = slug.filter((s) => !s.startsWith("("));

      // Generate URL
      const url =
        cleanSlug.length === 0 ? "/docs" : `/docs/${cleanSlug.join("/")}`;

      pages.push({
        slug: cleanSlug,
        url,
        title: frontmatter.title || fileName,
        description: frontmatter.description,
        links: frontmatter.links,
        components: frontmatter.components,
        motion: frontmatter.motion,
      });
    } else if (entry.isDirectory() && !entry.name.startsWith(".")) {
      // Process subdirectory
      const subPath =
        relativePath === "" ? entry.name : `${relativePath}/${entry.name}`;
      const subResult = await processDirectory(baseDir, subPath);
      pages.push(...subResult.pages);
    }
  }

  return { pages, meta };
}

/**
 * Build page tree from manifest and meta.json files
 */
async function buildPageTree(
  manifest: PageMetadata[],
  contentDir: string
): Promise<PageTreeNode[]> {
  const tree: PageTreeNode[] = [];

  // Process (root) pages - these should be top-level items or grouped
  const rootGroupPath = path.join(contentDir, "(root)", "meta.json");
  let rootGroupMeta: MetaJson | undefined;
  try {
    const content = await fs.readFile(rootGroupPath, "utf-8");
    rootGroupMeta = JSON.parse(content);
  } catch {
    // No root group meta
  }

  // Add root pages as a folder if they have a title
  if (rootGroupMeta?.title && rootGroupMeta?.pages) {
    const rootPages: PageTreeNode[] = [];
    for (const pageName of rootGroupMeta.pages) {
      const page = manifest.find((p) => {
        const slug = p.slug.join("/") || "index";
        return slug === pageName || slug === `(root)/${pageName}`;
      });

      if (page) {
        rootPages.push({
          type: "page",
          name: page.title,
          url: page.url,
          external: false,
        });
      }
    }

    tree.push({
      type: "folder",
      name: rootGroupMeta.title,
      index: undefined,
      children: rootPages,
    });
  }

  // Process UI folder
  const uiMetaPath = path.join(contentDir, "ui", "meta.json");
  try {
    const content = await fs.readFile(uiMetaPath, "utf-8");
    const uiMeta: MetaJson = JSON.parse(content);

    if (uiMeta.title && uiMeta.pages) {
      const uiPages: PageTreeNode[] = [];
      for (const pageName of uiMeta.pages) {
        const page = manifest.find(
          (p) => p.slug.join("/") === `ui/${pageName}`
        );
        if (page) {
          uiPages.push({
            type: "page",
            name: page.title,
            url: page.url,
            external: false,
          });
        }
      }

      tree.push({
        type: "folder",
        name: uiMeta.title,
        index: undefined,
        children: uiPages,
      });
    }
  } catch {
    // No UI meta
  }

  // Process Blocks folder
  const blocksMetaPath = path.join(contentDir, "blocks", "meta.json");
  try {
    const content = await fs.readFile(blocksMetaPath, "utf-8");
    const blocksMeta: MetaJson = JSON.parse(content);

    if (blocksMeta.title && blocksMeta.pages) {
      const blocksPages: PageTreeNode[] = [];
      for (const pageName of blocksMeta.pages) {
        const page = manifest.find(
          (p) => p.slug.join("/") === `blocks/${pageName}`
        );
        if (page) {
          blocksPages.push({
            type: "page",
            name: page.title,
            url: page.url,
            external: false,
          });
        }
      }

      tree.push({
        type: "folder",
        name: blocksMeta.title,
        index: undefined,
        children: blocksPages,
      });
    }
  } catch {
    // No Blocks meta
  }

  return tree;
}

/**
 * Generate TypeScript source code for the manifest
 */
function generateManifestCode(
  manifest: PageMetadata[],
  tree: PageTreeNode[]
): string {
  const manifestJson = JSON.stringify(manifest, null, 2);
  const treeJson = JSON.stringify(
    { name: "Documentation", children: tree },
    null,
    2
  )
    .replace(/"type": "page"/g, 'type: "page" as const')
    .replace(/"type": "folder"/g, 'type: "folder" as const')
    .replace(/"external": false/g, "external: false");

  return `/**
 * Lightweight manifest of all pages
 * This file contains only metadata, no MDX content
 * Used for generating static params and listing pages without loading MDX bundles
 * 
 * @generated by scripts/build-source-manifest.ts
 * Do not edit this file directly - edit the meta.json files instead
 */

export type PageMetadata = {
  slug: string[];
  url: string;
  title: string;
  description?: string;
  links?: {
    doc?: string;
    api?: string;
  };
  components?: string[];
  motion?: boolean;
};

export const pagesManifest: PageMetadata[] = ${manifestJson};

/**
 * Page tree structure for navigation
 * This is generated from the meta.json files
 */
export const pageTree = ${treeJson};
`;
}

/**
 * Main build function
 */
async function buildSourceManifest() {
  const contentDir = path.join(process.cwd(), "content");
  const outputPath = path.join(process.cwd(), "lib", "source-manifest.ts");

  console.log("🔨 Building source manifest...");

  // Process all content directories
  const result = await processDirectory(contentDir);
  const manifest = result.pages.sort((a, b) => {
    // Sort by slug length, then alphabetically
    if (a.slug.length !== b.slug.length) {
      return a.slug.length - b.slug.length;
    }
    return a.slug.join("/").localeCompare(b.slug.join("/"));
  });

  console.log(`✅ Found ${manifest.length} pages`);

  // Build page tree
  const tree = await buildPageTree(manifest, contentDir);
  console.log(`✅ Built page tree with ${tree.length} top-level sections`);

  // Generate source code
  const code = generateManifestCode(manifest, tree);

  // Write to file
  await fs.writeFile(outputPath, code, "utf-8");
  console.log(`✅ Written to ${outputPath}`);

  // Format the generated file
  const { execSync } = await import("node:child_process");
  try {
    execSync(`pnpm lint:fix ${outputPath}`, { stdio: "inherit" });
    console.log("✅ Formatted source-manifest.ts");
  } catch (_error) {
    console.warn("⚠️  Could not format file, but continuing...");
  }

  console.log("✅ Source manifest build complete!");
}

buildSourceManifest().catch((error) => {
  console.error("❌ Error building source manifest:", error);
  process.exit(1);
});
