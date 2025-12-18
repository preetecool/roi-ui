import { SiteHeader } from "@/components/layout/site-header/site-header";
import { source } from "@/lib/source";
import "./layout.css";
import styles from "./layout.module.css";

export default function BlocksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.header}>
        <SiteHeader pageTree={source.pageTree} />
      </div>
      <div className={styles.container}>{children}</div>
    </>
  );
}
