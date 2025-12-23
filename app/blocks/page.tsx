import Link from "next/link";
import { Index } from "@/registry/__index__";
import { blockSkeletons } from "./block-skeletons";
import styles from "./page.module.css";

const EXCLUDED_BLOCKS = ["card-history", "tailwind"];

function getBlocks() {
  return Object.entries(Index)
    .filter(([key, entry]) => entry.type === "block" && !key.endsWith("-tailwind") && !EXCLUDED_BLOCKS.includes(key))
    .map(([key, entry]) => ({
      ...entry,
      name: key,
    }));
}

export default function BlocksPage() {
  const blocks = getBlocks();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Blocks</h1>
        <p className={styles.description}>Pre-built components that you can copy and paste into your projects.</p>
      </div>
      <div className={styles.grid}>
        {blocks.map((block) => {
          const SkeletonComponent = blockSkeletons[block.name];
          return (
            <Link className={styles.card} href={`/blocks/${block.name}`} key={block.name}>
              {SkeletonComponent && (
                <div className={styles.cardPreview}>
                  <SkeletonComponent className={styles.skeleton} />
                </div>
              )}
              <div className={styles.cardInfo}>
                <div className={styles.cardTitle}>{block.name}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
