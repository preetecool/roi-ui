"use client";
import Link from "next/link";
import { useState } from "react";
import { AiChat } from "@/registry/brook/blocks/ai-chat/components/ai-chat";
import { Badge } from "@/registry/brook/ui/badge/badge";
import { ArrowPointer, Button } from "@/registry/brook/ui/button/button";
import { HomeAnimatedBadge } from "../home-animated-badge/home-animated-badge";
import { HomeAnimatedCard } from "../home-animated-card/home-animated-card";
import { HomeAnimatedButton } from "../home-animated-button/home-animated-button";
import { HomeContextMenu } from "../home-context-menu/home-context-menu";
import styles from "./hero.module.css";

const HEADING = "React components and blocks";
const SUBHEADING = "Components and blocks built with Base UI primitives and styled with CSS Modules or Tailwind.";

export const Hero = () => {
  const [expandedCard, setExpandedCard] = useState(false);

  return (
    <section aria-label="Hero section" className={styles.container}>
      <Badge className={styles.badge} variant="outline">
        <Link aria-label="View new blocks page" href="/blocks/expandable-card-spread">
          <span aria-hidden="true">New expandable card spread block</span>
        </Link>
        <ArrowPointer />
      </Badge>
      <h1 className={styles.h1}>
        {HEADING.split(" ").map((word, index) => (
          <span className={styles.wordContainer} key={`word-${word}`}>
            <span className={styles.wordWrapper} style={{ "--index": index } as React.CSSProperties}>
              {word}
              {index < HEADING.split(" ").length - 1 && " "}
            </span>
          </span>
        ))}
      </h1>
      <p className={styles.subheading}>{SUBHEADING}</p>
      <div className={styles.buttonWrapper}>
        <Button nativeButton={false} render={<Link href="/docs/start" />}>
          Get Started
        </Button>
      </div>

      <div className={styles.bentoGrid}>
        <div
          className={styles.bentoCard}
          data-size="large"
          onMouseEnter={() => setExpandedCard(true)}
          onMouseLeave={() => setExpandedCard(false)}
        >
          <div className={styles.bentoLabel}>Expandable Card</div>
          <div className={styles.bentoContent}>
            <HomeAnimatedCard isExpanded={expandedCard} />
          </div>
        </div>

        <div className={styles.bentoCard} data-size="medium">
          <div className={styles.bentoLabel}>Context Menu</div>
          <div className={styles.bentoContent}>
            <HomeContextMenu />
          </div>
        </div>

        <div className={styles.bentoCard} data-size="medium">
          <div className={styles.bentoLabel}>Expandable Button</div>
          <div className={styles.bentoContent}>
            <HomeAnimatedButton />
          </div>
        </div>

        <div className={styles.bentoCard} data-size="small">
          <div className={styles.bentoLabel}>Badge</div>
          <div className={styles.bentoContent}>
            <HomeAnimatedBadge />
          </div>
        </div>

        <div className={styles.bentoCard} data-size="wide">
          <div className={styles.bentoLabel}>AI Chat</div>
          <div className={styles.bentoContent}>
            <AiChat />
          </div>
        </div>
      </div>
    </section>
  );
};
