import type { ReactNode } from "react";
import { PropTable as PropTableRoot, PropTableRow } from "@/registry/brook/ui/prop-table/prop-table";

type PropRow = {
  prop: string;
  type: string;
  default?: string;
  description: string | ReactNode;
};

type PropTableProps = {
  data: PropRow[];
};

export function PropTable({ data }: PropTableProps) {
  return (
    <PropTableRoot>
      {data.map((row, index) => (
        <PropTableRow defaultValue={row.default} key={`prop-${row.prop}-${index}`} name={row.prop} type={row.type}>
          {row.description}
        </PropTableRow>
      ))}
    </PropTableRoot>
  );
}
