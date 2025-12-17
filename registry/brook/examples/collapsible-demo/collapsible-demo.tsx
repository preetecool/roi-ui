import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@/registry/brook/ui/collapsible/collapsible";
import styles from "./collapsible-demo.module.css";

export default function CollapsibleDemo() {
  return (
    <Collapsible className={styles.panel} defaultOpen={false}>
      <CollapsibleTrigger className={styles.trigger}>
        <div className={styles.mainStat}>
          <span className={styles.label}>Total Revenue</span>
          <span className={styles.value}>$45,231</span>
          <span className={styles.change}>+12.5% from last month</span>
        </div>
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <div className={styles.breakdown}>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Product Sales</span>
            <span className={styles.rowValue}>$28,450</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Subscriptions</span>
            <span className={styles.rowValue}>$12,340</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Services</span>
            <span className={styles.rowValue}>$3,220</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Other</span>
            <span className={styles.rowValue}>$1,221</span>
          </div>
        </div>
      </CollapsiblePanel>
    </Collapsible>
  );
}
