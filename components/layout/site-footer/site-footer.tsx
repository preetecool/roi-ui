import Link from "next/link";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.content}>
          Built by{" "}
          <Link className={styles.link} href="https://x.com/preetecool" rel="noopener noreferrer" target="_blank">
            @preetecool
          </Link>
          . Available on{" "}
          <Link
            className={styles.link}
            href="https://github.com/preetecool/roi-ui"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
