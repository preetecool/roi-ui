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

const ArrowPointer = () => {
  return (
    <svg viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.badgeArrow}>
      <g fillRule="nonzero">
        <path
          d="M1 1l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          className={styles.badgeArrowPoint}
        />
        <path
          d="M1.5 5h4.8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          className={styles.badgeArrowShaft}
        />
      </g>
    </svg>
  );
};

export const HomeHeader = () => {
  const [reset, setReset] = useState(0);
  const router = useRouter();
  const HEADING = "Functional & delighful UI components";
  const SUBHEADING =
    "React components built with Base UI primitives and Motion for seamless, accessible interactions";

  const handleLuckyClick = () => {
    const randomComponent = COMPONENTS[Math.floor(Math.random() * COMPONENTS.length)];
    router.push(`/docs/examples/${randomComponent}`);
  };

  return (
    <div key={reset} className={styles.container}>
      <div className={styles.badge} onClick={() => router.push("/docs/examples/tabs/tabs")}>
        <span>New animated tabs component</span>
        <ArrowPointer />
      </div>
      <h1 className={styles.h1}>
        {HEADING.split(" ").map((word, index) => (
          <span key={index} className={styles.wordWrapper} style={{ "--index": index } as React.CSSProperties}>
            {word}
            {index < HEADING.split(" ").length - 1 && " "}
          </span>
        ))}
      </h1>
      <p className={styles.subheading}>{SUBHEADING}</p>
      <div className={styles.buttonWrapper}>
        <Button showArrow onClick={() => router.push("/docs/start")}>
          Get Started
        </Button>
        <Button variant="outline" onClick={handleLuckyClick}>
          I&apos;m feeling lucky
        </Button>
      </div>
    </div>
  );
};
