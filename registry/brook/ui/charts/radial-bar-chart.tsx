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

function RadialBarChart({ data, innerRadius, outerRadius, showLabels = true, animated = false }: RadialBarChartProps) {
  const colors = ["var(--chart1)", "var(--chart2)", "var(--accent)", "var(--warning)", "var(--destructive)"];

  const transformedData = data.map((item, index) => ({
    ...item,
    fill: colors[index % colors.length],
  }));

  const tooltipValueFormatter = (value: any, name?: string) => {
    return `$${value.toLocaleString()}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
    
    const data = payload[0];
    return (
      <ChartTooltip 
        active={active}
        payload={[{
          ...data,
          name: data.payload.category,
          color: data.payload.fill
        }]}
        valueFormatter={tooltipValueFormatter}
      />
    );
  };

  return (
    <div
      className={styles.radialBarChart}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "var(--card)",
        borderRadius: "14px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadialBarChart
          cx="50%"
          cy="50%"
          innerRadius={innerRadius || "20%"}
          outerRadius={outerRadius || "80%"}
          barCategoryGap="10%"
          data={transformedData}
        >
          <RadialBar
            dataKey="value"
            cornerRadius={4}
            fill="var(--chart1)"
            animationDuration={animated ? 800 : 0}
            animationBegin={animated ? 0 : undefined}
          />
          <Tooltip content={<CustomTooltip />} />
        </RechartsRadialBarChart>
      </ResponsiveContainer>
      {showLabels && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "var(--foreground)",
            fontSize: "12px",
          }}
        >
          {data.length} items
        </div>
      )}
    </div>
  );
}

export default RadialBarChart;
