import { DocsSidebar } from "@/components/docs-sidebar/docs-sidebar";
import { SiteFooter } from "@/components/site-footer/site-footer";
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
      <div className={styles.mobileHeader}>
        <SiteHeader pageTree={source.pageTree} />
      </div>
      <div className={styles.docsWrapper}>
        <div className={styles.docsGrid}>
          <div className={styles.sidebar}>
            <DocsSidebar tree={source.pageTree} />
          </div>
          {children}
        </div>
        <SiteFooter />
      </div>
    </StyleProvider>
  );
}
