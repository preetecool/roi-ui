"use client";
import { Button } from "@/registry/brook/ui/button/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./home-header.module.css";

const COMPONENTS = [
  "tabs/tabs",
  "accordions/accordion",
  "buttons/like-button",
  "chat/chat",
  "cards/task",
  "cards/expandable-card",
  "cards/login-card",
  "cards/image-card",
  "cards/traffic",
  "cards/history",
  "dialogs/dialog",
  "dropdown/dropdown-menu-motion",
  "badges/badge-error",
  "badges/badge-success",
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
  const HEADING = "Functional & delighful components";
  const SUBHEADING =
    "React components built with Base UI primitives and Motion for seamless, accessible interactions";

  const getRandomComponent = () => {
    const randomComponent = COMPONENTS[Math.floor(Math.random() * COMPONENTS.length)];

    return randomComponent;
  };

  const [randomComponent, setRandomComponent] = useState(COMPONENTS[0]);

  useEffect(() => {
    setRandomComponent(getRandomComponent());
  }, []);

  return (
    <div key={reset} className={styles.container}>
      <Link href="/docs/examples/tabs/tabs" className={styles.badge}>
        <span>New animated tabs component</span>
        <ArrowPointer />
      </Link>
      <h1 className={styles.h1}>
        {HEADING.split(" ").map((word, index) => (
          <span key={index} className={styles.wordContainer}>
            <span className={styles.wordWrapper} style={{ "--index": index } as React.CSSProperties}>
              {word}
              {index < HEADING.split(" ").length - 1 && " "}
            </span>
          </span>
        ))}
      </h1>
      <p className={styles.subheading}>{SUBHEADING}</p>
      <div className={styles.buttonWrapper}>
        <Button showArrow onClick={() => router.push("/docs/start")}>
          <Link href="/docs/start">Get Started</Link>
        </Button>
        <Button variant="outline">
          <Link href={`/docs/examples/${randomComponent}`}>I&apos;m Feeling Lucky</Link>
        </Button>
      </div>
    </div>
  );
};
