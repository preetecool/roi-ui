import Link from "next/link";
import { cn } from "@/lib/utils";
import styles from "./footer-nav.module.css";

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      className={styles.chevron}
      fill="none"
      height="14"
      viewBox="0 0 14 14"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={direction === "left" ? "M9 3L5 7l4 4" : "M5 3l4 4-4 4"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

type NavItem = {
  url: string;
  title: string;
};

type FooterNavProps = {
  previous?: NavItem | null;
  next?: NavItem | null;
  className?: string;
};

export function FooterNav({ previous, next, className }: FooterNavProps) {
  return (
    <nav className={cn(styles.navigation, className)}>
      <div className={styles.slot}>
        {previous ? (
          <Link aria-label={`Previous: ${previous.title}`} className={cn(styles.navLink, styles.prev)} href={previous.url}>
            <Chevron direction="left" />
          </Link>
        ) : null}
      </div>
      <div className={cn(styles.slot, styles.slotEnd)}>
        {next ? (
          <Link aria-label={`Next: ${next.title}`} className={cn(styles.navLink, styles.next)} href={next.url}>
            <Chevron direction="right" />
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
