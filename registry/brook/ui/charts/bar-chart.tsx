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

const ANIMATION_DURATION_MS = 500;
// biome-ignore lint/style/noMagicNumbers: Border radius values for bar corners
const BAR_RADIUS = [4, 4, 0, 0] as const;

type TooltipPayload = {
  value: number;
  payload: BarChartData;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string | number;
  tooltipLabelFormatter: (value: string | number) => string;
  tooltipValueFormatter: (value: number | string, name?: string) => string;
  color: string;
};

function CustomTooltip({
  active,
  payload,
  label,
  tooltipLabelFormatter,
  tooltipValueFormatter,
  color,
}: CustomTooltipProps) {
  if (!(active && payload && payload.length)) {
    return null;
  }

  const tooltipData = payload[0];
  return (
    <ChartTooltip
      active={active}
      label={label}
      labelFormatter={tooltipLabelFormatter}
      payload={[
        {
          ...tooltipData,
          name: "Revenue",
          color,
        },
      ]}
      valueFormatter={tooltipValueFormatter}
    />
  );
}

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
            content={
              <CustomTooltip
                color={color}
                tooltipLabelFormatter={tooltipLabelFormatter}
                tooltipValueFormatter={tooltipValueFormatter}
              />
            }
            cursor={{ fill: "var(--secondary)", opacity: 0.15 }}
          />
          <Bar
            animationBegin={animated ? 0 : undefined}
            animationDuration={animated ? ANIMATION_DURATION_MS : 0}
            dataKey="amount"
            fill={color}
            onMouseEnter={() => {
              /* Placeholder for hover interaction */
            }}
            onMouseLeave={() => {
              /* Placeholder for hover interaction */
            }}
            radius={BAR_RADIUS}
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
