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
              >
                @preetecool.
              </a>
            }
            variant="link"
          />{" "}
          Available on{" "}
          <Button
            id={styles.link}
            render={
              <a
                href="https://github.com/preetecool/roi-ui"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            }
            variant="link"
          />
          .
        </div>
      </div>
    </footer>
  );
}
