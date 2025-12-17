import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/registry/brook/tailwind/ui/toggle-group";

export default function ToggleGroupDemo() {
  return (
    <div className="flex flex-col gap-8 rounded-[var(--radius)] border-[0.5px] border-border/60">
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
