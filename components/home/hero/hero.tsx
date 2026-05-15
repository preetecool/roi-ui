"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiChat } from "@/registry/brook/blocks/ai-chat/components/ai-chat";
import { Badge } from "@/registry/brook/ui/badge/badge";
import { ArrowPointer, Button } from "@/registry/brook/ui/button/button";
import { HomeAnimatedBadge } from "../home-animated-badge/home-animated-badge";
import { HomeAnimatedButton } from "../home-animated-button/home-animated-button";
import { HomeAnimatedCard } from "../home-animated-card/home-animated-card";
import { HomeContextMenu } from "../home-context-menu/home-context-menu";
import styles from "./hero.module.css";

const HEADING = "React components and blocks";
const SUBHEADING = "Components and blocks built with Base UI primitives and styled with CSS Modules or Tailwind.";

export const Hero = () => {
  const [expandedCard, setExpandedCard] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: none)");
    const update = () => setIsTouch(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isTouch) return;
    const interval = setInterval(() => setExpandedCard((prev) => !prev), 3500);
    return () => clearInterval(interval);
  }, [isTouch]);

  return (
    <section aria-label="Hero section" className={styles.container}>
      <Badge
        className={`${styles.badge} ${styles.animateEnter}`}
        render={<Link aria-label="View new OTP field component" href="/docs/ui/otp-field" />}
        style={{ "--stagger": 1 } as React.CSSProperties}
        variant="outline"
      >
        <span aria-hidden="true">New OTP field component</span>
        <ArrowPointer />
      </Badge>
      <h1 className={`${styles.h1} ${styles.animateEnter}`} style={{ "--stagger": 2 } as React.CSSProperties}>
        {HEADING}
      </h1>
      <p className={`${styles.subheading} ${styles.animateEnter}`} style={{ "--stagger": 3 } as React.CSSProperties}>
        {SUBHEADING}
      </p>
      <div className={`${styles.buttonWrapper} ${styles.animateEnter}`} style={{ "--stagger": 4 } as React.CSSProperties}>
        <Button nativeButton={false} render={<Link href="/docs/start" />}>
          Get Started
        </Button>
      </div>

      <div className={`${styles.bentoGrid} ${styles.animateEnter}`} style={{ "--stagger": 5 } as React.CSSProperties}>
        <div
          className={styles.bentoCard}
          data-size="large"
          onMouseEnter={isTouch ? undefined : () => setExpandedCard(true)}
          onMouseLeave={isTouch ? undefined : () => setExpandedCard(false)}
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
