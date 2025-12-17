import { Radio, RadioGroup, RadioIndicator } from "@/registry/brook/ui/radio/radio";
import styles from "./radio-demo.module.css";

export default function RadioDemo() {
  return (
    <div className={styles.container}>
      <RadioGroup aria-label="Select a size">
        <div className={styles.title}>How was your experience?</div>

        <div className={styles.radioItem}>
          <Radio id="pleasant" value="pleasant">
            <RadioIndicator />
          </Radio>
          <label className={styles.label} htmlFor="pleasant">
            Pleasant
          </label>
        </div>

        <div className={styles.radioItem}>
          <Radio id="neutral" value="neutral">
            <RadioIndicator />
          </Radio>
          <label className={styles.label} htmlFor="neutral">
            Neutral
          </label>
        </div>

        <div className={styles.radioItem}>
          <Radio id="unpleasant" value="unpleasant">
            <RadioIndicator />
          </Radio>
          <label className={styles.label} htmlFor="unpleasant">
            Unpleasant
          </label>
        </div>
      </RadioGroup>
    </div>
  );
}
