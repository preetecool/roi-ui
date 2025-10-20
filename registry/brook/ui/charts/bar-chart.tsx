"use client";

import {
  Bar,
  CartesianGrid,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import styles from "./bar-chart.module.css";
import ChartTooltip from "./chart-tooltip";

type NumberValue = number | { valueOf(): number };

export type BarChartData = {
  category: string;
  amount: number;
  type: string;
};

export type BarChartProps = {
  data: BarChartData[];
  showXAxis?: boolean;
  showYAxis?: boolean;
  showXGrid?: boolean;
  showYGrid?: boolean;
  xAxisFormatter?: (value: NumberValue | string) => string;
  useGradient?: boolean;
  animated?: boolean;
};

function BarChart({
  data,
  showXAxis = true,
  showYAxis = true,
  showXGrid = false,
  showYGrid = true,
  xAxisFormatter,
  animated = false,
}: BarChartProps) {
  const color = "var(--chart1)";

  const formatCategory = (value: NumberValue | string) => {
    if (xAxisFormatter) {
      return xAxisFormatter(value);
    }
    return String(value);
  };

  const tooltipLabelFormatter = (value: string | number) =>
    formatCategory(value);

  const tooltipValueFormatter = (value: number | string, _name?: string) => {
    const numValue =
      typeof value === "number" ? value : Number.parseFloat(String(value));
    return Number.isNaN(numValue)
      ? String(value)
      : `$${numValue.toLocaleString()}k`;
  };

  type TooltipPayload = {
    value: number;
    payload: BarChartData;
  };

  function CustomTooltip({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: TooltipPayload[];
    label?: string | number;
  }) {
    if (!(active && payload && payload.length)) {
      return null;
    }

    const data = payload[0];
    return (
      <ChartTooltip
        active={active}
        label={label}
        labelFormatter={tooltipLabelFormatter}
        payload={[
          {
            ...data,
            name: "Sales",
            color,
          },
        ]}
        valueFormatter={tooltipValueFormatter}
      />
    );
  }

  return (
    <div className={styles.barChart}>
      <ResponsiveContainer height="100%" width="100%">
        <RechartsBarChart
          data={data}
          margin={{ top: 10, right: 10, left: -5, bottom: 40 }}
        >
          {showXGrid && (
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 3"
              strokeOpacity={0.2}
            />
          )}
          {showYGrid && (
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 3"
              strokeOpacity={0.2}
            />
          )}
          {showXAxis && (
            <XAxis
              axisLine={false}
              dataKey="category"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={formatCategory}
              tickLine={false}
            />
          )}
          {showYAxis && (
            <YAxis
              axisLine={false}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickLine={false}
              width={30}
            />
          )}
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "var(--secondary)", opacity: 0.15 }}
          />
          <Bar
            animationBegin={animated ? 0 : undefined}
            animationDuration={animated ? 500 : 0}
            dataKey="amount"
            fill={color}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
            radius={[4, 4, 0, 0]}
            style={{
              cursor: "pointer",
            }}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChart;
