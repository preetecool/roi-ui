import { Radio, RadioGroup, RadioIndicator } from "@/registry/brook/ui/radio/radio";
import styles from "./radio-demo.module.css";

export default function RadioDemo() {
  return (
    <div className={styles.container}>
      <RadioGroup aria-label="Select a size">
        <div className={styles.title}>How was your experience?</div>

        <label className={styles.item}>
          <Radio value="pleasant">
            <RadioIndicator />
          </Radio>
          Pleasant
        </label>

        <label className={styles.item}>
          <Radio value="neutral">
            <RadioIndicator />
          </Radio>
          Neutral
        </label>

        <label className={styles.item}>
          <Radio value="unpleasant">
            <RadioIndicator />
          </Radio>
          Unpleasant
        </label>
      </RadioGroup>
    </div>
  );
}
