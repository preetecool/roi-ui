import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowPointer, Button } from "@/registry/brook/ui/button/button";
import styles from "./footer-nav.module.css";

type NavItem = {
  url: string;
  title: string;
};

interface FooterNavProps {
  previous?: NavItem | null;
  next?: NavItem | null;
  className?: string;
}

export function FooterNav({ previous, next, className }: FooterNavProps) {
  return (
    <nav className={cn(styles.navigation, className)}>
      <div className={styles.navButton}>
        {previous ? (
          <Button
            className={styles.navLink}
            render={<Link href={previous.url} />}
            size="sm"
            variant="ghost"
          >
            <ArrowPointer pointLeft />
            {previous.title}
          </Button>
        ) : null}
      </div>
      <div className={styles.navButton}>
        {next ? (
          <Button
            className={styles.navLink}
            render={<Link href={next.url} />}
            size="sm"
            variant="ghost"
          >
            {next.title}
            <ArrowPointer />
          </Button>
        ) : null}
      </div>
    </nav>
  );
}
