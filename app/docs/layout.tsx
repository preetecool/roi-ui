import { DocsSidebar } from "@/components/docs-sidebar/docs-sidebar";
import { Search } from "@/components/search/search";
import { SiteHeader } from "@/components/site-header/site-header";
import { StyleProvider } from "@/components/style-provider";
import { source } from "@/lib/source";
import styles from "./layout.module.css";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyleProvider>
      <Search tree={source.pageTree} />
      <div className={styles.header}>
        <SiteHeader pageTree={source.pageTree} />
      </div>
      <div className={styles.docsContainer}>
        <div className={styles.sidebar}>
          <DocsSidebar tree={source.pageTree} />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </StyleProvider>
  );
}
