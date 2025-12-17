import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/registry/brook/ui/toggle-group/toggle-group";
import styles from "./toggle-group-demo.module.css";

export default function ToggleGroupDemo() {
  return (
    <div className={styles.container}>
      <div>
        <ToggleGroup aria-label="Text formatting" defaultValue={["bold"]} multiple>
          <ToggleGroupItem aria-label="Bold" value="bold">
            <Bold size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Italic" value="italic">
            <Italic size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Underline" value="underline">
            <Underline size={16} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
