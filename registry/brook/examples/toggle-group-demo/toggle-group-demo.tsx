import { ToggleGroup, ToggleGroupItem } from "@/registry/brook/ui/toggle-group/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";
import styles from "./toggle-group-demo.module.css";

export default function ToggleGroupDemo() {
  return (
    <div className={styles.container}>
      <div>
        <ToggleGroup multiple defaultValue={["bold"]} aria-label="Text formatting">
          <ToggleGroupItem value="bold" aria-label="Bold">
            <Bold size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <Italic size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <Underline size={16} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
