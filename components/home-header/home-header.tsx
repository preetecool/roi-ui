"use client";
import { Button } from "@/registry/brook/ui/button/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./home-header.module.css";

const COMPONENTS = [
  "tabs/tabs",
  "accordions/accordion",
  "buttons/like-button",
  "chat/chat",
  "cards/task",
  "cards/expandable-card",
  "cards/shipping",
  "cards/pricing",
  "cards/login-card",
  "cards/settings",
  "cards/image-card",
  "cards/traffic",
  "cards/history",
  "backgrounds/background",
  "dialogs/dialog",
  "avatars/avatar",
  "badges/badge-error",
  "badges/badge-success",
  "dropdown-menus/dropdown-menu",
];

export const HomeHeader = () => {
  const [reset, setReset] = useState(0);
  const router = useRouter();
  const HEADING = "Functional, delighful UI components";
  const SUBHEADING =
    "React components built with Base UI primitives and Motion for seamless, accessible interactions";

  const handleLuckyClick = () => {
    const randomComponent = COMPONENTS[Math.floor(Math.random() * COMPONENTS.length)];
    router.push(`/docs/components/${randomComponent}`);
  };

  return (
    <div key={reset} className={styles.container}>
      <h1 className={styles.h1}>
        {HEADING.split(" ").map((word, index) => (
          <span key={index} className={styles.wordWrapper}>
            <span style={{ "--index": index } as React.CSSProperties}>{word}</span>
            {index < HEADING.split(" ").length - 1 && <span className={styles.space}> </span>}
          </span>
        ))}
      </h1>
      <p className={styles.subheading}>{SUBHEADING}</p>
      <div className={styles.buttonWrapper}>
        <Button showArrow>Get Started</Button>
        <Button variant="outline" onClick={handleLuckyClick}>
          I'm feeling lucky
        </Button>
      </div>
    </div>
  );
};
