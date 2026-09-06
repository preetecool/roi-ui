"use client";

import Link from "next/link";
import { useState } from "react";
import { blockCatalog } from "@/registry/block-catalog";
import { blockSkeletons } from "./block-skeletons";
import styles from "./page.module.css";

const NEW_BLOCKS: string[] = [];

const CATEGORIES = [
  { id: "app", label: "App" },
  { id: "marketing", label: "Marketing" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

function getBlocks() {
  return Object.entries(blockCatalog).map(([name, metadata]) => ({ name, ...metadata }));
}

export default function BlocksPage() {
  const [active, setActive] = useState<Set<CategoryId>>(() => new Set(CATEGORIES.map((c) => c.id)));
  const allBlocks = getBlocks();
  const blocks = allBlocks.filter((block) => {
    const isMarketing = block.category === "marketing";
    if (isMarketing) {
      return active.has("marketing");
    }
    return active.has("app");
  });

  const toggle = (id: CategoryId) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Blocks</h1>
        <p className={styles.description}>Pre-built components that you can copy and paste into your projects.</p>
      </div>
      <div aria-label="Filter blocks by category" className={styles.filters} role="group">
        {CATEGORIES.map((c) => {
          const isActive = active.has(c.id);
          return (
            <button
              aria-pressed={isActive}
              className={styles.filter}
              data-active={isActive}
              key={c.id}
              onClick={() => toggle(c.id)}
              type="button"
            >
              {c.label}
            </button>
          );
        })}
      </div>
      <div className={styles.grid}>
        {blocks.map((block) => {
          const SkeletonComponent = blockSkeletons[block.name];
          const isNew = NEW_BLOCKS.includes(block.name);
          return (
            <Link aria-label={block.title} className={styles.card} href={`/blocks/${block.name}`} key={block.name}>
              <div className={styles.cardInner}>
                {SkeletonComponent ? (
                  <div className={styles.cardPreview}>
                    <SkeletonComponent className={styles.skeleton} />
                  </div>
                ) : null}
                <div className={styles.cardFooter}>
                  <span className={styles.cardTitle}>
                    {block.title}
                    {isNew ? <span className={styles.newBadge}>New</span> : null}
                  </span>
                  <span aria-hidden="true" className={styles.viewButton}>
                    View
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
