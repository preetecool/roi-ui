import { RadioGroup, Radio, RadioIndicator } from "@/registry/brook/ui/radio/radio";
import styles from "./radio-demo.module.css";

export default function RadioDemo() {
  return (
    <div className={styles.container}>
      <RadioGroup defaultValue="comfortable" aria-label="Select a size">
        <div className={styles.title}>Choose your preferred size</div>

        <div className={styles.radioItem}>
          <Radio value="comfortable" id="comfortable">
            <RadioIndicator />
          </Radio>
          <label htmlFor="comfortable" className={styles.label}>
            Comfortable
          </label>
        </div>

        <div className={styles.radioItem}>
          <Radio value="compact" id="compact">
            <RadioIndicator />
          </Radio>
          <label htmlFor="compact" className={styles.label}>
            Compact
          </label>
        </div>

        <div className={styles.radioItem}>
          <Radio value="spacious" id="spacious">
            <RadioIndicator />
          </Radio>
          <label htmlFor="spacious" className={styles.label}>
            Spacious
          </label>
        </div>
      </RadioGroup>
    </div>
  );
}
