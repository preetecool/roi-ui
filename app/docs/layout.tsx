import { source } from "@/lib/source";
import { DocsSidebar } from "@/components/docs-sidebar/docs-sidebar";
import { TOCProvider } from "@/components/toc-context";
import { TOCDisplay } from "@/components/toc-display";
import styles from "./layout.module.css";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TOCProvider>
      <div className={styles.docsGrid}>
        <div className={styles.sidebar}>
          <DocsSidebar tree={source.pageTree} />
        </div>
        <div className={styles.main}>
          {children}
        </div>
        <div className={styles.toc}>
          <TOCDisplay />
        </div>
      </div>
    </TOCProvider>
  );
}
