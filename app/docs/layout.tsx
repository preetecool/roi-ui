import { DocsSidebar } from "@/components/docs/sidebar/docs-sidebar";
import { SiteHeader } from "@/components/layout/site-header/site-header";
import { DocsProvider } from "@/components/providers/docs-provider";
import { source } from "@/lib/source";
import "./layout.css";
import styles from "./layout.module.css";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsProvider>
      <div className={styles.header}>
        <SiteHeader pageTree={source.pageTree} />
      </div>
      <div className={styles.docsContainer}>
        <div className={styles.sidebar}>
          <DocsSidebar tree={source.pageTree} />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </DocsProvider>
  );
}
