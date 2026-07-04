import { PropTable, PropTableRow } from "@/registry/brook/tailwind/ui/prop-table";

export default function PropTableDemo() {
  return (
    <PropTable className="w-full">
      <PropTableRow defaultValue='"primary"' name="variant" type='"primary" | "secondary" | "ghost"'>
        Visual style of the button.
      </PropTableRow>
      <PropTableRow defaultValue='"md"' name="size" type='"sm" | "md" | "lg"'>
        Size of the button.
      </PropTableRow>
      <PropTableRow defaultValue="false" name="disabled" type="boolean">
        Whether the button is disabled.
      </PropTableRow>
      <PropTableRow name="onClick" type="(event: MouseEvent) => void">
        Called when the button is clicked.
      </PropTableRow>
      <PropTableRow name="children" type="ReactNode">
        Content rendered inside the button.
      </PropTableRow>
    </PropTable>
  );
}
