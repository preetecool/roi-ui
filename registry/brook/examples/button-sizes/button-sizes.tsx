import { Button } from "@/registry/brook/ui/button/button";
import styles from "./button-sizes.module.css";

export default function ButtonSizes() {
  return (
    <div className={styles.container}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}
