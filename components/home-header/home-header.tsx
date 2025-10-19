"use client";
import { Button } from "@/registry/brook/ui/button/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./home-header.module.css";

const COMPONENTS = [
  "/tabs-animated",
  "/accordion",
  "/like-button",
  "/chat",
  "/task",
  "/card-expdanble",
  "/card-login",
  "/card-image",
  "/card-traffic",
  "/card-history",
  "/dialog",
  "/dropdown-menu-motion",
  "/badge-error",
  "/badge-success",
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
      <Link href="/docs/examples/tabs" className={styles.badge}>
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
        <Button render={<Link href="/docs/start" />}>Get Started</Button>
        <Button variant="ghost" render={<Link href={`/docs/examples/${randomComponent}`} />}>
          I&apos;m Feeling Lucky
        </Button>
      </div>
    </div>
  );
};
