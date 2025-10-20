import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/registry/brook/ui/collapsible/collapsible";
import styles from "./collapsible-demo.module.css";

export default function CollapsibleDemo() {
  return (
    <Collapsible defaultOpen={false}>
      <CollapsibleTrigger>Show recovery keys</CollapsibleTrigger>
      <CollapsiblePanel>
        <div className={styles.container}>
          <div className={styles.recoveryKey}>recovery-key-1: abc123def456</div>
          <div className={styles.recoveryKey}>recovery-key-2: ghi789jkl012</div>
          <div className={styles.recoveryKey}>recovery-key-3: mno345pqr678</div>
        </div>
      </CollapsiblePanel>
    </Collapsible>
  );
}
