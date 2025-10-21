"use client";

import { Info } from "lucide-react";
import { Button } from "@/registry/brook/ui/button/button";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/brook/ui/popover/popover";
import styles from "./prop-table.module.css";

type PropRow = {
  prop: string;
  type: string;
  default?: string;
  description: string;
};

type PropTableProps = {
  data: PropRow[];
};

export function PropTable({ data }: PropTableProps) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.headerCell}>Prop</th>
            <th className={styles.headerCell}>Type</th>
            <th className={styles.headerCell}>Default</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr className={styles.row} key={`row-${row.prop}-${index}`}>
              <td className={styles.cell}>
                <div className={styles.propCell}>
                  <code className={styles.code}>{row.prop}</code>
                  {row.description && (
                    <Popover>
                      <PopoverTrigger
                        render={
                          <Button
                            size="icon"
                            style={{ backgroundColor: "transparent" }}
                          />
                        }
                      >
                        <Info className={styles.infoIcon} size={14} />
                      </PopoverTrigger>
                      <PopoverContent>
                        <div>{row.description}</div>
                        <PopoverArrow />
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              </td>
              <td className={styles.cell}>
                <code className={styles.code}>{row.type}</code>
              </td>
              <td className={styles.cell}>
                {row.default ? (
                  <code className={styles.code}>{row.default}</code>
                ) : (
                  <span className={styles.defaultEmpty}>-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
