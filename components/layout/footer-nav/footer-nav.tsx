import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import styles from "./footer-nav.module.css";

function Chevron({ direction }: { direction: "left" | "right" }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return <Icon absoluteStrokeWidth aria-hidden="true" className={styles.chevron} size={14} strokeWidth={1.5} />;
}

type NavItem = {
  url: string;
  title: string;
};

type FooterNavProps = {
  previous?: NavItem | null;
  next?: NavItem | null;
  className?: string;
  showLabels?: boolean;
};

export function FooterNav({ previous, next, className, showLabels = false }: FooterNavProps) {
  return (
    <nav className={cn(styles.navigation, showLabels && styles.withLabels, className)}>
      <div className={styles.slot}>
        {previous ? (
          <Link
            aria-label={`Previous: ${previous.title}`}
            className={cn(styles.navLink, styles.prev, showLabels && styles.navLinkLabeled)}
            href={previous.url}
          >
            <Chevron direction="left" />
            {showLabels ? <span className={styles.label}>{previous.title}</span> : null}
          </Link>
        ) : null}
      </div>
      <div className={cn(styles.slot, styles.slotEnd)}>
        {next ? (
          <Link
            aria-label={`Next: ${next.title}`}
            className={cn(styles.navLink, styles.next, showLabels && styles.navLinkLabeled)}
            href={next.url}
          >
            {showLabels ? <span className={styles.label}>{next.title}</span> : null}
            <Chevron direction="right" />
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
