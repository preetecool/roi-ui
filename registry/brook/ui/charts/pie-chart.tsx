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
    const percentage = ((numValue / total) * 100).toFixed(1);
    return `${percentage}%`;
  };

  type PieTooltipPayload = {
    value: number;
    payload: PieChartData & { fill: string };
  };

  function CustomTooltip({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: PieTooltipPayload[];
  }) {
    if (!(active && payload && payload.length)) {
      return null;
    }

    const data = payload[0];
    return (
      <ChartTooltip
        active={active}
        payload={[
          {
            ...data,
            color: data.payload.fill,
            name: data.payload.category,
          },
        ]}
        valueFormatter={tooltipValueFormatter}
      />
    );
  }

  return (
    <div className={styles.pieChart}>
      <ResponsiveContainer height="100%" width="100%">
        <RechartsePieChart>
          <Pie
            animationBegin={animate ? 0 : undefined}
            animationDuration={animate ? 800 : 0}
            cx="50%"
            cy="50%"
            data={dataWithColors}
            dataKey="value"
            fill="#8884d8"
            innerRadius={innerRadius}
            label={false}
            labelLine={false}
            outerRadius={outerRadius || 120}
            stroke="none"
          >
            {dataWithColors.map((entry, index) => (
              <Cell fill={entry.fill} key={`cell-${index}`} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </RechartsePieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChart;
