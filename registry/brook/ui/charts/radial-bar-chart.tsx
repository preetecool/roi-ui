"use client";

import { RadialBarChart as RechartsRadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from "recharts";
import ChartTooltip from "./chart-tooltip";
import styles from "./radial-bar-chart.module.css";

export interface RadialBarChartData {
  category: string;
  value: number;
}

export interface RadialBarChartProps {
  data: RadialBarChartData[];
  innerRadius?: number | string;
  outerRadius?: number | string;
  showLabels?: boolean;
  animated?: boolean;
}

function RadialBarChart({ data, innerRadius, outerRadius, animated = false }: RadialBarChartProps) {
  const colors = ["var(--chart1)", "var(--chart2)", "var(--accent)", "var(--warning)", "var(--destructive)"];

  // Sort data from highest to lowest values (outside to inside)
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  const transformedData = sortedData.map((item, index) => ({
    ...item,
    fill: item.category.toLowerCase() === "sleep" ? "var(--success)" : colors[index % colors.length],
  }));

  const tooltipValueFormatter = (value: number) => {
    return value.toLocaleString();
  };

  interface TooltipPayload {
    value: number;
    payload: RadialBarChartData & { fill: string };
  }

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: TooltipPayload[];
    label?: string | number;
  }) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0];
    return (
      <ChartTooltip
        active={active}
        payload={[
          {
            ...data,
            name: data.payload.category,
            color: data.payload.fill,
          },
        ]}
        valueFormatter={tooltipValueFormatter}
      />
    );
  };

  return (
    <div className={styles.radialBarChart}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadialBarChart
          cx="50%"
          cy="50%"
          innerRadius={innerRadius || "20%"}
          outerRadius={outerRadius || "80%"}
          barCategoryGap="2%"
          data={transformedData}
        >
          <RadialBar
            dataKey="value"
            cornerRadius={4}
            background={{ fill: "var(--secondary)" }}
            animationDuration={animated ? 800 : 0}
            animationBegin={animated ? 0 : undefined}
          />
          <Tooltip content={<CustomTooltip />} />
        </RechartsRadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RadialBarChart;
