import Link from "next/link";
import { ThemeSwitcher } from "../theme-switcher/theme-switcher";
import { Logo } from "../logo";
import { Github } from "lucide-react";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logoLink}>
            <Logo width={32} height={32} />
          </Link>

          <div className={`${styles.navLinks} lg:flex`}>
            <Link href="/docs" className={styles.navLink}>
              Docs
            </Link>
          </div>
        </nav>

        <div className={styles.actions}>
          <a 
            href="https://github.com/preetecool/roi-ui" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.githubLink}
            aria-label="View source on GitHub"
          >
            <Github size={20} />
          </a>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
