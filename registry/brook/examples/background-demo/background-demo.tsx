import Background from "@/registry/brook/ui/background/background";
import styles from "./background-demo.module.css";

export default function BackgroundDemo() {
  return (
    <div className={styles.container}>
      <Background backgroundColor={[0, 0, 0]} backgroundOpacity={0.5} intensity={0.1} />
    </div>
  );
}
