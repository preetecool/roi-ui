"use client";

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import styles from "./bar-chart.module.css";
import ChartTooltip from "./chart-tooltip";

type NumberValue = number | { valueOf(): number };

export interface BarChartData {
  category: string;
  amount: number;
  type: string;
}

export interface BarChartProps {
  data: BarChartData[];
  showXAxis?: boolean;
  showYAxis?: boolean;
  showXGrid?: boolean;
  showYGrid?: boolean;
  xAxisFormatter?: (value: NumberValue | string) => string;
  useGradient?: boolean;
  animated?: boolean;
}

function BarChart({
  data,
  showXAxis = true,
  showYAxis = true,
  showXGrid = false,
  showYGrid = true,
  xAxisFormatter,
  useGradient = true,
  animated = false,
}: BarChartProps) {
  const color = "var(--chart1)";

  const formatCategory = (value: NumberValue | string) => {
    if (xAxisFormatter) {
      return xAxisFormatter(value);
    }
    return String(value);
  };

  const tooltipLabelFormatter = (value: any) => formatCategory(value);

  return (
    <div className={styles.barChart}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
          {showXGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.2} />}
          {showYGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.2} />}
          {showXAxis && (
            <XAxis
              dataKey="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={formatCategory}
            />
          )}
          {showYAxis && (
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              width={30}
            />
          )}
          <Tooltip
            content={<ChartTooltip labelFormatter={tooltipLabelFormatter} />}
            cursor={{ fill: "var(--secondary)", opacity: 0.15 }}
          />
          <Bar
            dataKey="amount"
            fill={color}
            radius={[4, 4, 0, 0]}
            animationDuration={animated ? 500 : 0}
            animationBegin={animated ? 0 : undefined}
            style={{
              cursor: "pointer",
            }}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChart;
