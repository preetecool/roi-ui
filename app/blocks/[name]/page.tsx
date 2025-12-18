import { extname } from "node:path";
import { notFound } from "next/navigation";
import { BlockViewer } from "@/components/blocks/block-viewer";
import { highlightCode } from "@/lib/highlight-code";
import { BlocksData } from "@/registry/__blocks__";
import { Index } from "@/registry/__index__";
import styles from "./page.module.css";
import { BlockPreview } from "./preview";

type PageProps = {
  params: Promise<{ name: string }>;
};

type FileData = {
  name: string;
  path: string;
  content: string;
  highlightedContent: string;
};

async function getBlockData(name: string) {
  // Check if block exists in registry
  const entry = Index[name];
  if (!entry || entry.type !== "block") {
    return null;
  }

  // Get pre-computed block data
  const blockData = BlocksData[name];
  if (!blockData) {
    return null;
  }

  // Add syntax highlighting to files
  const cssModulesFiles: FileData[] = await Promise.all(
    blockData.cssModulesFiles.map(async (file) => {
      const ext = extname(file.name).slice(1);
      const language = ext === "css" ? "css" : ext === "ts" ? "typescript" : "tsx";
      const highlightedContent = await highlightCode(file.content, language);
      return {
        ...file,
        highlightedContent,
      };
    })
  );

  const tailwindFiles: FileData[] = await Promise.all(
    blockData.tailwindFiles.map(async (file) => {
      const ext = extname(file.name).slice(1);
      const language = ext === "css" ? "css" : ext === "ts" ? "typescript" : "tsx";
      const highlightedContent = await highlightCode(file.content, language);
      return {
        ...file,
        highlightedContent,
      };
    })
  );

  return {
    name,
    cssModulesFiles,
    tailwindFiles,
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
      <BlockPreview name={name} />
    </BlockViewer>
  );
}

export default async function BlockPage({ params }: PageProps) {
  const { name } = await params;

  return (
    <div className={styles.page}>
      <BlockPageContent name={name} />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.entries(Index)
    .filter(([, entry]) => entry.type === "block")
    .map(([name]) => ({ name }));
}
