import { Button } from "@/registry/brook/ui/button/button";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          Built by{" "}
          <Button
            variant="link"
            id={styles.link}
            render={<a href="https://x.com/preetecool" target="_blank" rel="noopener noreferrer" />}
          >
            @preetecool.
          </Button>{" "}
          Available on{" "}
          <Button
            variant="link"
            id={styles.link}
            render={<a href="https://github.com/preetecool" target="_blank" rel="noopener noreferrer" />}
          >
            GitHub
          </Button>
          .
        </div>
      </div>
    </footer>
  );
}
