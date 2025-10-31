"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/registry/brook/ui/badge/badge";
import { ArrowPointer, Button } from "@/registry/brook/ui/button/button";
import styles from "./hero.module.css";

const COMPONENTS = [
  { path: "tabs", anchor: "#animated" },
  { path: "accordion", anchor: "#with-animations" },
  { path: "like-button", anchor: "" },
  { path: "ai-chat", anchor: "" },
  { path: "card-task", anchor: "" },
  { path: "card-expandable", anchor: "" },
  { path: "card-login", anchor: "" },
  { path: "card-image", anchor: "" },
  { path: "card-traffic", anchor: "" },
  { path: "card-history", anchor: "" },
  { path: "dialog", anchor: "#with-animations" },
  { path: "dropdown-menu-motion", anchor: "" },
  { path: "badge", anchor: "#error" },
  { path: "badge", anchor: "#success" },
];

const HEADING = "Functional & delighful components";
const SUBHEADING =
  "React components built with Base UI primitives and Motion for seamless, accessible interactions";
const UI_COMPONENTS = [
  "accordion",
  "badge",
  "tabs",
  "dialog",
  "dropdown-menu-motion",
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
  const [reset, _setReset] = useState(0);

  const [randomComponent, setRandomComponent] = useState(COMPONENTS[0]);

  useEffect(() => {
    setRandomComponent(getRandomComponent());
  }, []);

  return (
    <section aria-label="Hero section" className={styles.container} key={reset}>
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
          <span className={styles.wordContainer} key={word}>
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
    </section>
  );
};
