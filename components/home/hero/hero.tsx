import Link from "next/link";
import { Button } from "@/registry/brook/ui/button/button";
import { Showcase } from "../showcase/showcase";
import styles from "./hero.module.css";

const HEADING_LEAD = "React components";
const HEADING_TAIL = "and blocks";
const SUBHEADING = "Components and blocks built with Base UI primitives and styled with CSS Modules or Tailwind.";

export const Hero = () => {
  return (
    <section aria-label="Hero section" className={styles.container}>
      <div className={styles.intro}>
        <h1 className={`${styles.h1} ${styles.animateEnter}`} style={{ "--stagger": 1 } as React.CSSProperties}>
          {HEADING_LEAD} <span className={styles.h1Muted}>{HEADING_TAIL}</span>
        </h1>
        <div className={styles.aside}>
          <p
            className={`${styles.subheading} ${styles.animateEnter}`}
            style={{ "--stagger": 2 } as React.CSSProperties}
          >
            {SUBHEADING}
          </p>
          <div
            className={`${styles.buttonWrapper} ${styles.animateEnter}`}
            style={{ "--stagger": 3 } as React.CSSProperties}
          >
            <Button nativeButton={false} render={<Link href="/docs/start" />}>
              Get Started
            </Button>
          </div>
        </div>
      </div>

      <Showcase
        className={`${styles.showcase} ${styles.animateEnter}`}
        style={{ "--stagger": 4 } as React.CSSProperties}
      />
    </section>
  );
};
