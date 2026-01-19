"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiChat } from "@/registry/brook/blocks/ai-chat/components/ai-chat";
import { Badge } from "@/registry/brook/ui/badge/badge";
import { ArrowPointer, Button } from "@/registry/brook/ui/button/button";
import { HomeAnimatedBadge } from "../home-animated-badge/home-animated-badge";
import { HomeAnimatedCard } from "../home-animated-card/home-animated-card";
import { HomeAnimatedPopover } from "../home-animated-popover/home-animated-popover";
import { HomeContextMenu } from "../home-context-menu/home-context-menu";
import styles from "./hero.module.css";

const LUCKY_LINKS = [
  { path: "/blocks/ai-chat" },
  { path: "/blocks/card-image-section" },
  { path: "/blocks/card-login" },
  { path: "/blocks/card-task" },
  { path: "/blocks/card-traffic" },
  { path: "/blocks/expandable-card-carousel" },
  { path: "/blocks/kanban-board" },
  { path: "/blocks/profile-menu" },
  { path: "/docs/ui/tabs", anchor: "#animated" },
  { path: "/docs/ui/copy-button" },
  { path: "/docs/ui/accordion" },
  { path: "/docs/ui/badge", anchor: "#success" },
  { path: "/docs/ui/badge", anchor: "#error" },
];

const HEADING = "React components and blocks";
const SUBHEADING = "Components and blocks built with Base UI primitives and styled with CSS Modules or Tailwind.";

function getRandomLink() {
  const link = LUCKY_LINKS[Math.floor(Math.random() * LUCKY_LINKS.length)];
  return link.path + (link.anchor ?? "");
}

export const Hero = () => {
  const [luckyLink, setLuckyLink] = useState(LUCKY_LINKS[0].path);
  const [expandedCard, setExpandedCard] = useState(false);

  useEffect(() => {
    setLuckyLink(getRandomLink());
  }, []);

  return (
    <section aria-label="Hero section" className={styles.container}>
      <Badge className={styles.badge} variant="outline">
        <Link aria-label="View new blocks page" href="/blocks">
          <span aria-hidden="true">New blocks view</span>
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
        <Button render={<Link href="/docs/start" />}>Get Started</Button>
        <Button render={<Link href={luckyLink} />} variant="outline">
          I&apos;m Feeling Lucky
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
          <div className={styles.bentoLabel}>Popover</div>
          <div className={styles.bentoContent}>
            <HomeAnimatedPopover />
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
