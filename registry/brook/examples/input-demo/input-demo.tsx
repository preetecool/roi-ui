import { Input } from "@/registry/brook/ui/input/input";
import styles from "./input-demo.module.css";

export default function InputDemo() {
  return <Input placeholder="Enter your email..." className={styles.input} />;
}
