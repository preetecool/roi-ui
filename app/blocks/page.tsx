"use client";

import Link from "next/link";
import { useState } from "react";
import { Index } from "@/registry/__index__";
import { blockSkeletons } from "./block-skeletons";
import styles from "./page.module.css";

const EXCLUDED_BLOCKS = ["card-history", "tailwind", "kanban-board"];

const BLOCK_TITLES: Record<string, string> = {
  "ai-chat": "AI Chat",
  "card-image-section": "Card Image Section",
  "card-login": "Login Card",
  "card-task": "Task Card",
  "card-traffic": "Traffic Card",
  "expandable-card-carousel": "Expandable Card Carousel",
  "expandable-card-spread": "Expandable Card Spread",
  "kanban-board": "Kanban Board",
  "pricing-section": "Pricing Section",
  "card-progress": "Progress Card",
};

const MARKETING_BLOCKS = new Set([
  "expandable-card-carousel",
  "expandable-card-spread",
  "pricing-section",
  "card-image-section",
]);

const NEW_BLOCKS: string[] = [];

const CATEGORIES = [
  { id: "app", label: "App" },
  { id: "marketing", label: "Marketing" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

function getBlocks() {
  return Object.entries(Index)
    .filter(([key, entry]) => entry.type === "block" && !key.endsWith("-tailwind") && !EXCLUDED_BLOCKS.includes(key))
    .map(([key, entry]) => ({
      ...entry,
      name: key,
      title: BLOCK_TITLES[key] || key,
    }));
}

export default function BlocksPage() {
  const [category, setCategory] = useState<CategoryId>("app");
  const allBlocks = getBlocks();
  const blocks = category === "marketing" ? allBlocks.filter((block) => MARKETING_BLOCKS.has(block.name)) : allBlocks;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Blocks</h1>
        <p className={styles.description}>Pre-built components that you can copy and paste into your projects.</p>
      </div>
      <div className={styles.filters} role="tablist" aria-label="Filter blocks by category">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={category === c.id}
            data-active={category === c.id}
            className={styles.filter}
            onClick={() => setCategory(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {blocks.map((block) => {
          const SkeletonComponent = blockSkeletons[block.name];
          const isNew = NEW_BLOCKS.includes(block.name);
          return (
            <Link className={styles.card} href={`/blocks/${block.name}`} key={block.name}>
              {SkeletonComponent ? (
                <div className={styles.cardPreview}>
                  <SkeletonComponent className={styles.skeleton} />
                </div>
              ) : null}
              <div className={styles.cardInfo}>
                <div className={styles.cardTitle}>
                  {block.title}
                  {isNew ? <span className={styles.newBadge}>New</span> : null}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
