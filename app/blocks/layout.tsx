import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header/site-header";
import { source } from "@/lib/source";
import { AnchoredToastProvider } from "@/registry/brook/ui/toast/toast";
import "./layout.css";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: {
    default: "Blocks",
    template: "%s - Roi UI",
  },
  description: "Copy-paste blocks built from Roi UI components.",
};

export default function BlocksLayout({ children }: { children: React.ReactNode }) {
  return (
    <AnchoredToastProvider>
      <div className={styles.header}>
        <SiteHeader pageTree={source.pageTree} />
      </div>
      <div className={styles.container}>{children}</div>
    </AnchoredToastProvider>
  );
}
