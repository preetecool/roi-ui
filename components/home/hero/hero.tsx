"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiChat } from "@/registry/brook/blocks/ai-chat/ai-chat";
import { Badge } from "@/registry/brook/ui/badge/badge";
import { ArrowPointer, Button } from "@/registry/brook/ui/button/button";
import { Card } from "@/registry/brook/ui/card/card";
import { Carousel } from "@/registry/brook/ui/carousel/carousel";
import { HomeAnimatedBadge } from "../home-animated-badge/home-animated-badge";
import { HomeAnimatedCard } from "../home-animated-card/home-animated-card";
import { HomeAnimatedDialog } from "../home-animated-dialog/home-animated-dialog";
import { HomeContextMenu } from "../home-context-menu/home-context-menu";
import styles from "./hero.module.css";

const COMPONENTS = [
  { path: "tabs", anchor: "#animated" },
  { path: "accordion", anchor: "" },
  { path: "like-button", anchor: "" },
  { path: "ai-chat", anchor: "" },
  { path: "card-task", anchor: "" },
  { path: "card-expandable", anchor: "" },
  { path: "card-login", anchor: "" },
  { path: "card-image", anchor: "" },
  { path: "card-traffic", anchor: "" },
  { path: "card-history", anchor: "" },
  { path: "dialog", anchor: "#with-animations" },
  { path: "badge", anchor: "#error" },
  { path: "badge", anchor: "#success" },
];

const HEADING = "React components and blocks";
const SUBHEADING =
  "Components and blocks made with Base UI primitives and motion. CSS modules and Tailwind available.";
const UI_COMPONENTS = [
  "accordion",
  "badge",
  "copy-button",
  "dialog",
  "like-button",
  "separator",
  "tabs",
];

const CAROUSEL_COMPONENTS = [
  {
    id: "expandable-card",
    name: "Expandable Card",
    Component: HomeAnimatedCard,
  },
  { id: "context-menu", name: "Context Menu", Component: HomeContextMenu },
  { id: "dialog", name: "Dialog", Component: HomeAnimatedDialog },
  { id: "badge", name: "Badge", Component: HomeAnimatedBadge },
  { id: "ai-chat", name: "AI Chat", Component: AiChat },
];

function getRandomComponent() {
  const randomComponent =
    COMPONENTS[Math.floor(Math.random() * COMPONENTS.length)];

  return randomComponent;
}

function getComponentUrl(component: { path: string; anchor: string }) {
  // UI components are in /docs/ui/, others are in /docs/blocks/
  const basePath = UI_COMPONENTS.includes(component.path)
    ? "/docs/ui"
    : "/docs/blocks";

  return `${basePath}/${component.path}${component.anchor}`;
}

export const Hero = () => {
  const [randomComponent, setRandomComponent] = useState(COMPONENTS[0]);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  useEffect(() => {
    setRandomComponent(getRandomComponent());
  }, []);

  return (
    <section aria-label="Hero section" className={styles.container}>
      <Badge className={styles.badge} variant="outline">
        <Link
          aria-label="View new animated tabs component"
          href="/docs/ui/tabs#animated"
        >
          <span aria-hidden="true">New animated tabs component</span>
        </Link>
        <ArrowPointer />
      </Badge>
      <h1 className={styles.h1}>
        {HEADING.split(" ").map((word, index) => (
          <span className={styles.wordContainer} key={`word-${word}`}>
            <span
              className={styles.wordWrapper}
              style={{ "--index": index } as React.CSSProperties}
            >
              {word}
              {index < HEADING.split(" ").length - 1 && " "}
            </span>
          </span>
        ))}
      </h1>
      <p className={styles.subheading}>{SUBHEADING}</p>
      <div className={styles.buttonWrapper}>
        <Button render={<Link href="/docs/start" />}>Get Started</Button>
        <Button
          render={<Link href={getComponentUrl(randomComponent)} />}
          variant="ghost"
        >
          I&apos;m Feeling Lucky
        </Button>
      </div>
      <Carousel.Bleed>
        <Carousel.Root
          align="start"
          className={styles.carouselRoot}
          gap={8}
          totalItems={CAROUSEL_COMPONENTS.length}
          variant="inset"
        >
          <Carousel.Viewport>
            <Carousel.Content>
              {CAROUSEL_COMPONENTS.map((item, index) => (
                <Carousel.Item index={index} key={item.id}>
                  <Card
                    className={styles.card}
                    onMouseEnter={() => setHoveredCardIndex(index)}
                    onMouseLeave={() => setHoveredCardIndex(null)}
                  >
                    <div className={styles.cardHeader}>
                      <span className={styles.componentName}>
                        {String(index + 1).padStart(2, "0")} / {item.name}
                      </span>
                    </div>
                    <div className={styles.cardComponentContent}>
                      {item.id === "expandable-card" ? (
                        <HomeAnimatedCard
                          isExpanded={hoveredCardIndex === index}
                        />
                      ) : (
                        <item.Component />
                      )}
                    </div>
                  </Card>
                </Carousel.Item>
              ))}
            </Carousel.Content>
          </Carousel.Viewport>
          <Carousel.Navigation>
            <Carousel.Previous />
            <Carousel.Next />
          </Carousel.Navigation>
        </Carousel.Root>
      </Carousel.Bleed>
    </section>
  );
};
