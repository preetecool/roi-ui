import { ComponentShowcase } from "@/components/component-showcase/component-showcase";
import { Button } from "@/registry/brook/ui/button/button";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.backgroundLayer}>
        <div className={styles.gradientTransition}></div>
        <svg id="noice" className={styles.noise}>
          <filter id="noise-filter">
            <feTurbulence type="fractalNoise" baseFrequency="1.34" numOctaves="4" stitchTiles="stitch"></feTurbulence>
            <feColorMatrix type="saturate" values="0"></feColorMatrix>
            <feComponentTransfer>
              <feFuncR type="linear" slope="0.46"></feFuncR>
              <feFuncG type="linear" slope="0.46"></feFuncG>
              <feFuncB type="linear" slope="0.46"></feFuncB>
              <feFuncA type="linear" slope="0.56"></feFuncA>
            </feComponentTransfer>
            <feComponentTransfer>
              <feFuncR type="linear" slope="1.47" intercept="-0.23"/>
              <feFuncG type="linear" slope="1.47" intercept="-0.23"/>
              <feFuncB type="linear" slope="1.47" intercept="-0.23"/>
            </feComponentTransfer>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise-filter)"></rect>
        </svg>
      </div>

      <section className={styles.heroSection}>
        <div className={styles.headingContainer}>
          <h1>UI Components designed to delight</h1>
          <p>Roi UI is a component library with the goal of keeping devs in the flow and users engaged.</p>
          <div></div>
          <div>
            <Button size="sm">
              <Link href="/docs/start">Get Started</Link>
            </Button>
            <Button variant="link" showArrow size="sm">
              <Link href="/docs/">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <ComponentShowcase />
    </div>
  );
}
