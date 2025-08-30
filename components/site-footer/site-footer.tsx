import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            Built by{" "}
            <a href="https://x.com/preetecool" target="_blank" rel="noopener noreferrer" className={styles.link}>
              @preetecool
            </a>
            . Available on{" "}
            <a
              href="https://github.com/preetecool"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkUnderline}
            >
              GitHub.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
