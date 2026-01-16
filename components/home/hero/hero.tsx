"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiChat } from "@/registry/brook/blocks/ai-chat/components/ai-chat";
import { Badge } from "@/registry/brook/ui/badge/badge";
import { ArrowPointer, Button } from "@/registry/brook/ui/button/button";
import { Card } from "@/registry/brook/ui/card/card";
import { Carousel } from "@/registry/brook/ui/carousel/carousel";
import { HomeAnimatedBadge } from "../home-animated-badge/home-animated-badge";
import { HomeAnimatedCard } from "../home-animated-card/home-animated-card";
import { HomeAnimatedDialog } from "../home-animated-dialog/home-animated-dialog";
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

function getRandomLink() {
  const link = LUCKY_LINKS[Math.floor(Math.random() * LUCKY_LINKS.length)];
  return link.path + (link.anchor ?? "");
}

export const Hero = () => {
  const [luckyLink, setLuckyLink] = useState(LUCKY_LINKS[0].path);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

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
                        <HomeAnimatedCard isExpanded={hoveredCardIndex === index} />
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
