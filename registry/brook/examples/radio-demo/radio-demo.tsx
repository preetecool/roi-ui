import {
  Radio,
  RadioGroup,
  RadioIndicator,
} from "@/registry/brook/ui/radio/radio";
import styles from "./radio-demo.module.css";

export default function RadioDemo() {
  return (
    <div className={styles.container}>
      <RadioGroup aria-label="Select a size" defaultValue="comfortable">
        <div className={styles.title}>Choose your preferred size</div>

        <div className={styles.radioItem}>
          <Radio id="comfortable" value="comfortable">
            <RadioIndicator />
          </Radio>
          <label className={styles.label} htmlFor="comfortable">
            Comfortable
          </label>
        </div>

        <div className={styles.radioItem}>
          <Radio id="compact" value="compact">
            <RadioIndicator />
          </Radio>
          <label className={styles.label} htmlFor="compact">
            Compact
          </label>
        </div>

        <div className={styles.radioItem}>
          <Radio id="spacious" value="spacious">
            <RadioIndicator />
          </Radio>
          <label className={styles.label} htmlFor="spacious">
            Spacious
          </label>
        </div>
      </RadioGroup>
    </div>
  );
}
