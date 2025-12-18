import { readdir, readFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BlockViewer } from "@/components/blocks/block-viewer";
import { highlightCode } from "@/lib/highlight-code";
import { Index } from "@/registry/__index__";
import { BlockPreview } from "./preview";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ name: string }>;
};

type FileData = {
  name: string;
  path: string;
  content: string;
  highlightedContent: string;
};

/**
 * Transforms import paths in code for display
 * Converts registry paths to component paths for cleaner display
 */
function transformCode(code: string): string {
  return code
    .replaceAll("@/registry/brook/ui/", "@/components/ui/")
    .replaceAll("@/registry/brook/tailwind/ui/", "@/components/ui/")
    .replaceAll("@/lib/utils-tailwind", "@/lib/utils");
}

async function loadBlockFiles(blockPath: string, name: string): Promise<FileData[]> {
  const files: FileData[] = [];

  // Load page.tsx
  const pagePath = join(blockPath, "page.tsx");
  try {
    const rawContent = await readFile(pagePath, "utf-8");
    const content = transformCode(rawContent);
    const highlightedContent = await highlightCode(content, "tsx");
    files.push({
      name: "page.tsx",
      path: `app/${name}/page.tsx`,
      content,
      highlightedContent,
    });
  } catch {
    // page.tsx doesn't exist
  }

  // Load components folder
  const componentsPath = join(blockPath, "components");
  try {
    const componentFiles = await readdir(componentsPath);

    for (const fileName of componentFiles) {
      const filePath = join(componentsPath, fileName);
      const rawContent = await readFile(filePath, "utf-8");
      const ext = extname(fileName).slice(1);
      const language = ext === "css" ? "css" : ext === "ts" ? "typescript" : "tsx";
      const content = transformCode(rawContent);
      const highlightedContent = await highlightCode(content, language);

      files.push({
        name: fileName,
        path: `components/${fileName}`,
        content,
        highlightedContent,
      });
    }
  } catch {
    // components folder doesn't exist
  }

  return files;
}

async function getBlockData(name: string) {
  // Check if block exists in registry
  const cssModulesEntry = Index[name];
  if (!cssModulesEntry || cssModulesEntry.type !== "block") {
    return null;
  }

  // Load CSS Modules version
  const cssModulesPath = join(process.cwd(), "registry/brook/blocks", name);
  const cssModulesFiles = await loadBlockFiles(cssModulesPath, name);

  // Load Tailwind version if it exists
  const tailwindKey = `${name}-tailwind`;
  const tailwindEntry = Index[tailwindKey];
  let tailwindFiles: FileData[] = [];

  if (tailwindEntry) {
    const tailwindPath = join(process.cwd(), "registry/brook/blocks/tailwind", name);
    try {
      tailwindFiles = await loadBlockFiles(tailwindPath, name);
    } catch {
      // Tailwind version doesn't exist
    }
  }

  return {
    name,
    cssModulesFiles,
    tailwindFiles: tailwindFiles.length > 0 ? tailwindFiles : cssModulesFiles,
  };
}

async function BlockPageContent({ name }: { name: string }) {
  const blockData = await getBlockData(name);

  if (!blockData) {
    notFound();
  }

  return (
    <BlockViewer
      cssModulesFiles={blockData.cssModulesFiles}
      name={blockData.name}
      tailwindFiles={blockData.tailwindFiles}
    >
      <Suspense fallback={<div className={styles.loading}>Loading preview...</div>}>
        <BlockPreview name={name} />
      </Suspense>
    </BlockViewer>
  );
}

export default async function BlockPage({ params }: PageProps) {
  const { name } = await params;

  return (
    <div className={styles.page}>
      <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
        <BlockPageContent name={name} />
      </Suspense>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.entries(Index)
    .filter(([, entry]) => entry.type === "block")
    .map(([name]) => ({ name }));
}
