import { Button } from "@/registry/brook/ui/button/button";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          Built by{" "}
          <Button
            id={styles.link}
            render={
              <a
                href="https://x.com/preetecool"
                rel="noopener noreferrer"
                target="_blank"
              />
            }
            variant="link"
          >
            @preetecool.
          </Button>{" "}
          Available on{" "}
          <Button
            id={styles.link}
            render={
              <a
                href="https://github.com/preetecool"
                rel="noopener noreferrer"
                target="_blank"
              />
            }
            variant="link"
          >
            GitHub
          </Button>
          .
        </div>
      </div>
    </footer>
  );
}
