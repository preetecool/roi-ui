"use client";

import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import ChartTooltip from "./chart-tooltip";
import styles from "./radar-chart.module.css";

export interface RadarChartData {
  category: string;
  value: number;
  type: string;
}

export interface RadarChartProps {
  data: RadarChartData[];
  levels?: number;
  maxValue?: number;
  showLabels?: boolean;
  showGrid?: boolean;
  showRadialAxis?: boolean;
  fillOpacity?: number;
  animated?: boolean;
}

function RadarChart({
  data,
  levels = 5,
  maxValue,
  showLabels = true,
  showGrid = true,
  showRadialAxis = true,
  fillOpacity = 0.3,
  animated = false,
}: RadarChartProps) {
  const colors = ["var(--chart1)", "var(--chart2)"];

  // Group data by type for multiple series if needed
  const uniqueTypes = Array.from(new Set(data.map((d) => d.type)));

  // Create grouped data for recharts
  const groupedData = data.reduce((acc: any[], curr) => {
    const existing = acc.find((item) => item.category === curr.category);
    if (existing) {
      existing[curr.type] = curr.value;
    } else {
      acc.push({
        category: curr.category,
        [curr.type]: curr.value,
      });
    }
    return acc;
  }, []);

  return (
    <div
      className={styles.radarChart}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "var(--card)",
        borderRadius: "14px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={groupedData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
          {showGrid && <PolarGrid stroke="var(--border)" strokeOpacity={0.3} />}
          {showLabels && <PolarAngleAxis dataKey="category" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />}
          {showRadialAxis && (
            <PolarRadiusAxis
              angle={90}
              domain={[0, maxValue || "dataMax"]}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickCount={levels + 1}
            />
          )}
          <Tooltip content={<ChartTooltip />} />
          {uniqueTypes.map((type, index) => (
            <Radar
              key={type}
              name={type}
              dataKey={type}
              stroke={colors[index % colors.length]}
              fill={colors[index % colors.length]}
              fillOpacity={fillOpacity}
              strokeWidth={2}
              animationDuration={animated ? 800 : 0}
              animationBegin={animated ? index * 200 : undefined}
            />
          ))}
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RadarChart;
