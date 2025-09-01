"use client";

export interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
  labelFormatter?: (value: any) => string;
  valueFormatter?: (value: any, name?: string) => string;
}

export function ChartTooltip({
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter,
}: ChartTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const formatLabel = (value: any) => {
    if (labelFormatter) {
      return labelFormatter(value);
    }
    return String(value);
  };

  const formatValue = (value: any, name?: string) => {
    if (valueFormatter) {
      return valueFormatter(value, name);
    }
    if (typeof value === 'number') {
      return value.toLocaleString();
    }
    return String(value);
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
      {label && (
        <div style={{ fontSize: "11px", fontWeight: "500", marginBottom: "4px" }}>
          {formatLabel(label)}
        </div>
      )}
      {payload.map((entry: any, index: number) => (
        <div key={index} style={{ fontSize: "11px", marginBottom: "2px" }}>
          <span style={{ color: entry.color, marginRight: "4px" }}>●</span>
          {entry.name || entry.dataKey}: {formatValue(entry.value, entry.name || entry.dataKey)}
        </div>
      ))}
    </div>
  );
}

export default ChartTooltip;