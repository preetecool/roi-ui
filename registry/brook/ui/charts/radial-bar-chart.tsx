"use client";

import {
  RadialBar,
  RadialBarChart as RechartsRadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import ChartTooltip from "./chart-tooltip";
import styles from "./radial-bar-chart.module.css";

export type RadialBarChartData = {
  category: string;
  value: number;
};

export type RadialBarChartProps = {
  data: RadialBarChartData[];
  innerRadius?: number | string;
  outerRadius?: number | string;
  showLabels?: boolean;
  animated?: boolean;
};

const ANIMATION_DURATION_MS = 800;

type TooltipPayload = {
  value: number;
  payload: RadialBarChartData & { fill: string };
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string | number;
  tooltipValueFormatter: (value: number | string, name?: string) => string;
};

function CustomTooltip({
  active,
  payload,
  tooltipValueFormatter,
}: CustomTooltipProps) {
  if (!(active && payload && payload.length)) {
    return null;
  }

  const tooltipData = payload[0];
  return (
    <ChartTooltip
      active={active}
      payload={[
        {
          ...tooltipData,
          name: tooltipData.payload.category,
          color: tooltipData.payload.fill,
        },
      ]}
      valueFormatter={tooltipValueFormatter}
    />
  );
}

function RadialBarChart({
  data,
  innerRadius,
  outerRadius,
  animated = false,
}: RadialBarChartProps) {
  const colors = [
    "var(--chart1)",
    "var(--chart2)",
    "var(--accent)",
    "var(--warning)",
    "var(--destructive)",
  ];

  // Sort data from highest to lowest values (outside to inside)
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  const transformedData = sortedData.map((item, index) => ({
    ...item,
    fill:
      item.category.toLowerCase() === "sleep"
        ? "var(--success)"
        : colors[index % colors.length],
  }));

  const tooltipValueFormatter = (value: number | string, _name?: string) => {
    const numValue =
      typeof value === "number" ? value : Number.parseFloat(String(value));
    return Number.isNaN(numValue) ? String(value) : numValue.toLocaleString();
  };

  return (
    <div className={styles.radialBarChart}>
      <ResponsiveContainer height="100%" width="100%">
        <RechartsRadialBarChart
          barCategoryGap="2%"
          cx="50%"
          cy="50%"
          data={transformedData}
          innerRadius={innerRadius || "20%"}
          outerRadius={outerRadius || "80%"}
        >
          <RadialBar
            animationBegin={animated ? 0 : undefined}
            animationDuration={animated ? ANIMATION_DURATION_MS : 0}
            background={{ fill: "var(--mix-card-50-bg)" }}
            cornerRadius={4}
            dataKey="value"
          />
          <Tooltip
            content={
              <CustomTooltip tooltipValueFormatter={tooltipValueFormatter} />
            }
          />
        </RechartsRadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RadialBarChart;
