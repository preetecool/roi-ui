"use client";

import { useState } from "react";
import { AiChat } from "@/registry/brook/blocks/ai-chat/ai-chat";
import { LikeButton } from "@/registry/brook/ui/like-button/like-button";
import { HomeAnimatedCard } from "../home-animated-card/home-animated-card";
import { BentoBadgeSuccess } from "./bento-badge-success";
import { BentoDialog } from "./bento-dialog";
import styles from "./bento-grid.module.css";

export function BentoGrid() {
  const [isCell0Hovered, setIsCell0Hovered] = useState(false);

  return (
    <section className={styles.bentoSection}>
      <h2 className={styles.heading}>Build apps or marketing pages</h2>
      <div className={styles.bentoGrid}>
        <div
          className={styles.cell0}
          onMouseEnter={() => setIsCell0Hovered(true)}
          onMouseLeave={() => setIsCell0Hovered(false)}
        >
          <div className={styles.cellContent}>
            <HomeAnimatedCard isExpanded={isCell0Hovered} />
          </div>
        </div>
        <div className={styles.cell1}>
          <div className={styles.cellContent}>
            <LikeButton />
          </div>
        </div>
        <div className={styles.cell2}>
          <div className={styles.cellContent}>
            <BentoDialog />
          </div>
        </div>
        <div className={styles.cell3}>
          <div className={styles.cellContent}>
            <BentoBadgeSuccess />
          </div>
        </div>
        <div className={styles.cell4}>
          <div className={styles.cellContent}>
            <AiChat />
          </div>
        </div>
      </div>
    </section>
  );
}
