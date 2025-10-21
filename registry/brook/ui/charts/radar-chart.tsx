"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import ChartTooltip from "./chart-tooltip";
import styles from "./radar-chart.module.css";

export type RadarChartData = {
  category: string;
  value: number;
  type: string;
};

export type RadarChartProps = {
  data: RadarChartData[];
  levels?: number;
  maxValue?: number;
  showLabels?: boolean;
  showGrid?: boolean;
  showRadialAxis?: boolean;
  fillOpacity?: number;
  animated?: boolean;
};

const ANIMATION_STAGGER_DELAY_MS = 200;
const ANIMATION_DURATION_MS = 800;

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

  const uniqueTypes = Array.from(new Set(data.map((d) => d.type)));

  type GroupedDataItem = {
    category: string;
    [key: string]: string | number;
  };

  const groupedData = data.reduce((acc: GroupedDataItem[], curr) => {
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
      }}
    >
      <ResponsiveContainer height="100%" width="100%">
        <RechartsRadarChart
          data={groupedData}
          margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
        >
          {showGrid && <PolarGrid stroke="var(--border)" strokeOpacity={0.3} />}
          {showLabels && (
            <PolarAngleAxis
              dataKey="category"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            />
          )}
          {showRadialAxis && (
            <PolarRadiusAxis
              angle={90}
              axisLine={false}
              domain={[0, maxValue || "dataMax"]}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              tickCount={levels + 1}
            />
          )}
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ stroke: "var(--secondary)", strokeWidth: 1 }}
          />
          {uniqueTypes.map((type, index) => (
            <Radar
              animationBegin={
                animated ? index * ANIMATION_STAGGER_DELAY_MS : undefined
              }
              animationDuration={animated ? ANIMATION_DURATION_MS : 0}
              dataKey={type}
              fill={colors[index % colors.length]}
              fillOpacity={fillOpacity}
              key={type}
              name={type}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
            />
          ))}
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RadarChart;
