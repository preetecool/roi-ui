"use client";

interface PayloadEntry {
  name?: string;
  dataKey?: string;
  value: number | string;
  color?: string;
}

export interface ChartTooltipProps {
  active?: boolean;
  payload?: PayloadEntry[];
  label?: string | number;
  labelFormatter?: (value: string | number) => string;
  valueFormatter?: (value: number | string, name?: string) => string;
  nameFormatter?: (name: string) => string;
}

export function ChartTooltip({
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter,
  nameFormatter,
}: ChartTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const formatLabel = (value: string | number) => {
    if (labelFormatter) {
      return labelFormatter(value);
    }
    return String(value);
  };

  const formatValue = (value: number | string, name?: string) => {
    if (valueFormatter) {
      return valueFormatter(value, name);
    }
    if (typeof value === "number") {
      return value.toLocaleString();
    }
    return String(value);
  };

  const formatName = (name: string) => {
    if (nameFormatter) {
      return nameFormatter(name);
    }

    return name.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div
      style={{
        backgroundColor: "var(--muted)",
        color: "var(--foreground)",
        borderRadius: "var(--radius)",
        padding: "8px",
        fontSize: "12px",
        border: "1px solid var(--border)",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      }}
    >
      {label && <div style={{ fontSize: "11px", fontWeight: "500", marginBottom: "4px" }}>{formatLabel(label)}</div>}
      {payload.map((entry, index) => (
        <div
          key={index}
          style={{
            fontSize: "11px",
            marginBottom: "2px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ color: entry.color, marginRight: "4px" }}>●</span>
            <span style={{ color: "var(--muted-foreground)" }}>{formatName(entry.name || entry.dataKey || "")}</span>
          </div>
          <span
            style={{
              fontFamily: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
              fontWeight: "500",
            }}
          >
            {formatValue(entry.value, entry.name || entry.dataKey)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ChartTooltip;
