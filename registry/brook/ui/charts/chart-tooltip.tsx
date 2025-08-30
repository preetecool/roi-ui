"use client";

import { TooltipWithBounds, defaultStyles } from "@visx/tooltip";

type NumberValue = number | { valueOf(): number };

export interface ChartDataItem {
  type: string;
  [key: string]: unknown;
}

export interface ChartTooltipProps<T extends ChartDataItem> {
  tooltipData: T[];
  tooltipLeft: number;
  tooltipTop: number;
  uniqueTypes: string[];
  colors: string[];
  getRD: (d: T) => number;
  getDate: (d: T) => NumberValue | string;
  dateFormatter?: (value: NumberValue | string) => string;
}

export default function ChartTooltip<T extends ChartDataItem>({
  tooltipData,
  tooltipLeft,
  tooltipTop,
  uniqueTypes,
  colors,
  getRD,
  getDate,
  dateFormatter,
}: ChartTooltipProps<T>) {
  const tooltipStyles = {
    ...defaultStyles,
    minWidth: 50,
    backgroundColor: "var(--background)",

    color: "var(--foreground)",
    borderRadius: "var(--radius)",
    padding: "8px",
    fontSize: "12px",
    transition: "all 200ms linear",
  };

  return (
    <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={tooltipStyles} offsetLeft={15} offsetTop={-10}>
      <p style={{ marginBottom: "6px", fontSize: "11px", fontWeight: "500" }}>
        {dateFormatter ? dateFormatter(getDate(tooltipData[0])) : String(getDate(tooltipData[0]))}
      </p>
      {tooltipData.map((d, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "4px",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: colors[uniqueTypes.indexOf(d.type)],
                borderRadius: "50%",
              }}
            />
            <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>
              {d.type.charAt(0) + d.type.slice(1).toLowerCase()}
            </span>
          </div>
          <span style={{ fontSize: "11px", fontFamily: "monospace" }}>{getRD(d)}M</span>
        </div>
      ))}
    </TooltipWithBounds>
  );
}
