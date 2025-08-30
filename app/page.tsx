import styles from "./page.module.css";
import { ComponentShowcase } from "@/components/component-showcase/component-showcase";
import { Button } from "@/registry/brook/ui/button/button";
import Link from "next/link";
export default function Home() {
  return (
    <div>
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
