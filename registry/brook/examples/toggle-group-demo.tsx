import { ToggleGroup, ToggleGroupItem } from "@/registry/brook/ui/toggle-group/toggle-group";

export default function ToggleGroupDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <ToggleGroup toggleMultiple defaultValue={["bold"]} aria-label="Text formatting">
          <ToggleGroupItem value="bold" aria-label="Bold">
            <b>B</b>
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <i>I</i>
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <u>U</u>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
