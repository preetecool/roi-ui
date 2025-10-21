import { DocsSidebar } from "@/components/docs-sidebar/docs-sidebar";
import { SiteHeader } from "@/components/site-header/site-header";
import { TOCProvider } from "@/components/toc-context";
import { TOCDisplay } from "@/components/toc-display";
import { source } from "@/lib/source";
import styles from "./layout.module.css";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TOCProvider>
      <div className={styles.mobileHeader}>
        <SiteHeader pageTree={source.pageTree} />
      </div>
      <div className={styles.docsWrapper}>
        <div className={styles.docsGrid}>
          <div className={styles.sidebar}>
            <DocsSidebar tree={source.pageTree} />
          </div>
          <div className={styles.main}>{children}</div>
          <div className={styles.toc}>
            <TOCDisplay />
          </div>
        </div>
      </div>
    </TOCProvider>
  );
}
