import { extname } from "node:path";
import { notFound } from "next/navigation";
import { BlockViewer } from "@/components/blocks/block-viewer";
import { FooterNav } from "@/components/layout/footer-nav/footer-nav";
import { highlightCode } from "@/lib/highlight-code";
import { BlocksData } from "@/registry/__blocks__";
import { Index } from "@/registry/__index__";
import styles from "./page.module.css";
import { BlockPreview, CardProgressBlockViewer } from "./preview";

type PageProps = {
  params: Promise<{ name: string }>;
};

type FileData = {
  name: string;
  path: string;
  content: string;
  highlightedContent: string;
};

const FULL_WIDTH_BLOCKS = ["kanban-board", "card-image-section"];

const EXCLUDED_BLOCKS = ["card-history", "tailwind"];

const BLOCK_TITLES: Record<string, string> = {
  "ai-chat": "AI Chat",
  "card-image-section": "Card Image Section",
  "card-login": "Login Card",
  "card-task": "Task Card",
  "card-traffic": "Traffic Card",
  "expandable-card-carousel": "Expandable Card Carousel",
  "kanban-board": "Kanban Board",
  "pricing-section": "Pricing Section",
  "profile-menu": "Profile Menu",
};

function getOrderedBlocks() {
  return Object.entries(Index)
    .filter(([key, entry]) => entry.type === "block" && !key.endsWith("-tailwind") && !EXCLUDED_BLOCKS.includes(key))
    .map(([key]) => ({
      name: key,
      title: BLOCK_TITLES[key] || key,
    }));
}

function getBlockNavigation(currentName: string) {
  const blocks = getOrderedBlocks();
  const currentIndex = blocks.findIndex((block) => block.name === currentName);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? blocks[currentIndex - 1] : null;
  const next = currentIndex < blocks.length - 1 ? blocks[currentIndex + 1] : null;

  return { prev, next };
}

async function getBlockData(name: string) {
  // Check if block exists in registry
  const entry = Index[name];
  if (!entry || entry.type !== "block") {
    return null;
  }

  const blockData = BlocksData[name];
  if (!blockData) {
    return null;
  }

  const cssModulesFiles = await Promise.all(
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

  if (name === "card-progress") {
    return (
      <CardProgressBlockViewer
        blockViewerProps={{
          name: blockData.name,
          cssModulesFiles: blockData.cssModulesFiles,
          tailwindFiles: blockData.tailwindFiles,
          full: FULL_WIDTH_BLOCKS.includes(name),
        }}
        BlockViewerComponent={BlockViewer}
      />
    );
  }

  return (
    <BlockViewer
      cssModulesFiles={blockData.cssModulesFiles}
      full={FULL_WIDTH_BLOCKS.includes(name)}
      name={blockData.name}
      tailwindFiles={blockData.tailwindFiles}
    >
      <BlockPreview name={name} />
    </BlockViewer>
  );
}

function BlockNavigation({ currentName }: { currentName: string }) {
  const { prev, next } = getBlockNavigation(currentName);

  return (
    <FooterNav
      className={styles.footerNav}
      next={next ? { url: `/blocks/${next.name}`, title: next.title } : null}
      previous={prev ? { url: `/blocks/${prev.name}`, title: prev.title } : null}
    />
  );
}

export default async function BlockPage({ params }: PageProps) {
  const { name } = await params;

  return (
    <div className={styles.page}>
      <BlockPageContent name={name} />
      <BlockNavigation currentName={name} />
    </div>
  );
}

export function generateStaticParams() {
  return Object.entries(Index)
    .filter(([, entry]) => entry.type === "block")
    .map(([name]) => ({ name }));
}
