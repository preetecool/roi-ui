"use client";

import { useMemo } from "react";
import {
  Cell,
  Pie,
  PieChart as RechartsePieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import ChartTooltip from "./chart-tooltip";
import styles from "./pie-chart.module.css";

export type PieChartData = {
  category: string;
  value: number;
  type: string;
};

export type PieChartProps = {
  data: PieChartData[];
  innerRadius?: number;
  outerRadius?: number;
  animate?: boolean;
  interactive?: boolean;
  colors?: string[];
};

const ANIMATION_DURATION_MS = 800;
const DEFAULT_OUTER_RADIUS = 120;
const PERCENTAGE_MULTIPLIER = 100;

type PieTooltipPayload = {
  value: number;
  payload: PieChartData & { fill: string };
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: PieTooltipPayload[];
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
      label={tooltipData.payload.category}
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

function PieChart({
  data,
  innerRadius = 0,
  outerRadius,
  animate = true,

  colors,
}: PieChartProps) {
  const defaultColors = [
    "var(--chart1)",
    "var(--chart2)",
    "var(--accent)",
    "var(--warning)",
    "var(--destructive)",
  ];
  const pieColors = colors || defaultColors;

  const total = useMemo(
    () => data.reduce((sum, d) => sum + d.value, 0),
    [data]
  );

  const dataWithColors = useMemo(
    () =>
      data.map((item, index) => ({
        ...item,
        fill: pieColors[index % pieColors.length],
      })),
    [data, pieColors]
  );

  const tooltipValueFormatter = (value: number | string, _name?: string) => {
    const numValue =
      typeof value === "number" ? value : Number.parseFloat(String(value));
    if (Number.isNaN(numValue)) {
      return String(value);
    }
    const percentage = ((numValue / total) * PERCENTAGE_MULTIPLIER).toFixed(1);
    return `${percentage}%`;
  };

  return (
    <div className={styles.pieChart}>
      <ResponsiveContainer height="100%" width="100%">
        <RechartsePieChart>
          <Pie
            animationBegin={animate ? 0 : undefined}
            animationDuration={animate ? ANIMATION_DURATION_MS : 0}
            cx="50%"
            cy="50%"
            data={dataWithColors}
            dataKey="value"
            fill="#8884d8"
            innerRadius={innerRadius}
            label={false}
            labelLine={false}
            outerRadius={outerRadius || DEFAULT_OUTER_RADIUS}
            stroke="none"
          >
            {dataWithColors.map((entry) => (
              <Cell fill={entry.fill} key={`cell-${entry.category}`} />
            ))}
          </Pie>
          <Tooltip
            content={
              <CustomTooltip tooltipValueFormatter={tooltipValueFormatter} />
            }
          />
        </RechartsePieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChart;
