import { readFile } from "node:fs/promises";
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

/**
 * Transforms registry file path to display path
 * e.g., "registry/brook/blocks/ai-chat/page.tsx" -> "app/ai-chat/page.tsx"
 * e.g., "registry/brook/blocks/ai-chat/components/ai-chat.tsx" -> "components/ai-chat.tsx"
 */
function getDisplayPath(registryPath: string, blockName: string): string {
  const fileName = basename(registryPath);
  if (fileName === "page.tsx") {
    return `app/${blockName}/page.tsx`;
  }
  // For components folder files
  if (registryPath.includes("/components/")) {
    return `components/${fileName}`;
  }
  return fileName;
}

async function loadBlockFiles(registryFiles: string[], blockName: string): Promise<FileData[]> {
  const files: FileData[] = [];

  for (const registryPath of registryFiles) {
    try {
      const fullPath = join(process.cwd(), registryPath);
      const rawContent = await readFile(fullPath, "utf-8");
      const fileName = basename(registryPath);
      const ext = extname(fileName).slice(1);
      const language = ext === "css" ? "css" : ext === "ts" ? "typescript" : "tsx";
      const content = transformCode(rawContent);
      const highlightedContent = await highlightCode(content, language);

      files.push({
        name: fileName,
        path: getDisplayPath(registryPath, blockName),
        content,
        highlightedContent,
      });
    } catch {
      // File doesn't exist
    }
  }

  return files;
}

async function getBlockData(name: string) {
  // Check if block exists in registry
  const cssModulesEntry = Index[name];
  if (!cssModulesEntry || cssModulesEntry.type !== "block" || !cssModulesEntry.files) {
    return null;
  }

  // Load CSS Modules version using registry file list
  const cssModulesFiles = await loadBlockFiles(cssModulesEntry.files, name);

  // Load Tailwind version if it exists
  const tailwindKey = `${name}-tailwind`;
  const tailwindEntry = Index[tailwindKey];
  let tailwindFiles: FileData[] = [];

  if (tailwindEntry?.files) {
    tailwindFiles = await loadBlockFiles(tailwindEntry.files, name);
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
