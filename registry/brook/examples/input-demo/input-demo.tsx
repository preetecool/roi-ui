import { Input } from "@/registry/brook/ui/input/input";
import styles from "./input-demo.module.css";

export default function InputDemo() {
  return <Input className={styles.input} placeholder="Enter your email..." />;
}
