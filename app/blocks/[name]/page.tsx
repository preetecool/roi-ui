import { notFound } from "next/navigation";
import { BlockViewer } from "@/components/blocks/block-viewer";
import { FooterNav } from "@/components/layout/footer-nav/footer-nav";
import { BlocksData } from "@/registry/__blocks__";
import { blockCatalog } from "@/registry/block-catalog";
import styles from "./page.module.css";
import { BlockPreview } from "./preview";

type PageProps = {
  params: Promise<{ name: string }>;
};

function getOrderedBlocks() {
  return Object.entries(blockCatalog).map(([name, metadata]) => ({ name, ...metadata }));
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

function getBlockData(name: string) {
  // Check if block exists in registry
  const entry = blockCatalog[name];
  if (!(Object.hasOwn(blockCatalog, name) && entry)) {
    return null;
  }

  const blockData = BlocksData[name];
  if (!blockData) {
    return null;
  }

  const metadata = ({ name: filename, path, kind }: { name: string; path: string; kind: "installed" | "usage" }) => ({
    name: filename,
    path,
    kind,
  });
  return {
    name,
    cssModulesFiles: blockData.cssModulesFiles.map(metadata),
    tailwindFiles: blockData.tailwindFiles.map(metadata),
  };
}

function BlockPageContent({ name }: { name: string }) {
  const blockData = getBlockData(name);

  if (!blockData) {
    notFound();
  }

  return (
    <BlockViewer
      cssModulesFiles={blockData.cssModulesFiles}
      full={blockCatalog[name].full}
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
  return Object.keys(blockCatalog).map((name) => ({ name }));
}
