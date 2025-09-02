"use client";

import { useMemo } from "react";
import { PieChart as RechartsePieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import ChartTooltip from "./chart-tooltip";
import styles from "./pie-chart.module.css";

export interface PieChartData {
  category: string;
  value: number;
  type: string;
}

export interface PieChartProps {
  data: PieChartData[];
  innerRadius?: number;
  outerRadius?: number;
  animate?: boolean;
  interactive?: boolean;
  colors?: string[];
}

function PieChart({
  data,
  innerRadius = 0,
  outerRadius,
  animate = true,
  interactive = true,
  colors,
}: PieChartProps) {
  const defaultColors = ["var(--chart1)", "var(--chart2)", "var(--accent)", "var(--warning)", "var(--destructive)"];
  const pieColors = colors || defaultColors;

  const total = useMemo(() => data.reduce((sum, d) => sum + d.value, 0), [data]);

  const dataWithColors = useMemo(() => 
    data.map((item, index) => ({
      ...item,
      fill: pieColors[index % pieColors.length]
    })), 
    [data, pieColors]
  );

  const tooltipValueFormatter = (value: any, name?: string) => {
    const percentage = ((value / total) * 100).toFixed(1);
    return `${percentage}%`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    
    const data = payload[0];
    return (
      <ChartTooltip 
        active={active}
        payload={[{
          ...data,
          color: data.payload.fill,
          name: data.payload.category
        }]}
        valueFormatter={tooltipValueFormatter}
      />
    );
  };

  return (
    <div
      className={styles.pieChart}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsePieChart>
          <Pie
            data={dataWithColors}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={false}
            outerRadius={outerRadius || 120}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey="value"
            animationBegin={animate ? 0 : undefined}
            animationDuration={animate ? 800 : 0}
            stroke="none"
          >
            {dataWithColors.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </RechartsePieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChart;
