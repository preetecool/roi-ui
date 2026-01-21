import Link from "next/link";
import { Button } from "@/registry/brook/ui/button/button";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          Built by{" "}
          <Button
            className={styles.link}
            nativeButton={false}
            render={
              <Link href="https://x.com/preetecool" rel="noopener noreferrer" target="_blank">
                @preetecool.
              </Link>
            }
            variant="link"
          />{" "}
          Available on{" "}
          <Button
            className={styles.link}
            nativeButton={false}
            render={
              <Link href="https://github.com/preetecool/roi-ui" rel="noopener noreferrer" target="_blank">
                GitHub
              </Link>
            }
            variant="link"
          />
          .
        </div>
      </div>
    </footer>
  );
}
