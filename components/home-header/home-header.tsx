"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/registry/brook/ui/button/button";
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

const ArrowPointer = () => (
  <svg
    aria-hidden="true"
    className={styles.badgeArrow}
    fill="none"
    viewBox="0 0 14 10"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fillRule="nonzero">
      <path
        className={styles.badgeArrowPoint}
        d="M1 1l4 4-4 4"
        stroke="currentColor"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeWidth="1.5"
      />
      <path
        className={styles.badgeArrowShaft}
        d="M1.5 5h4.8"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="1.5"
      />
    </g>
  </svg>
);

const getRandomComponent = () => {
  const randomComponent =
    COMPONENTS[Math.floor(Math.random() * COMPONENTS.length)];

  return randomComponent;
};

export const HomeHeader = () => {
  const [reset, _setReset] = useState(0);
  const HEADING = "Functional & delighful components";
  const SUBHEADING =
    "React components built with Base UI primitives and Motion for seamless, accessible interactions";

  const [randomComponent, setRandomComponent] = useState(getRandomComponent);

  useEffect(() => {
    setRandomComponent(getRandomComponent());
  }, []);

  return (
    <div className={styles.container} key={reset}>
      <Link className={styles.badge} href="/docs/examples/tabs">
        <span>New animated tabs component</span>
        <ArrowPointer />
      </Link>
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
          render={<Link href={`/docs/examples/${randomComponent}`} />}
          variant="ghost"
        >
          I&apos;m Feeling Lucky
        </Button>
      </div>
    </div>
  );
};
