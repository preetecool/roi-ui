"use client";

import {
  CartesianGrid,
  Dot,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartTooltip from "./chart-tooltip";
import styles from "./line-chart.module.css";

type NumberValue = number | { valueOf(): number };

export type LineChartData = {
  date: NumberValue;
  value: number;
  type: string;
};

export type CurveType = "linear" | "monotoneX" | "cardinal" | "basis" | "step";

export type LineChartProps = {
  data: LineChartData[];
  showXAxis?: boolean;
  showYAxis?: boolean;
  showXGrid?: boolean;
  showYGrid?: boolean;
  curve?: CurveType;
  showPoints?: boolean;
  pointSize?: number;
  xAxisFormatter?: (value: NumberValue | string) => string;
  animated?: boolean;
  ticks?: number[];
};

const DOMAIN_PADDING_PERCENTAGE = 0.05;
const ANIMATION_STAGGER_DELAY_MS = 200;
const ANIMATION_DURATION_MS = 800;

type DotProps = {
  cx?: number;
  cy?: number;
  payload?: LineChartData;
  showPoints: boolean;
  pointSize: number;
  colors: string[];
  uniqueTypes: string[];
  [key: string]: unknown;
};

function CustomDot({
  cx,
  cy,
  payload,
  showPoints,
  pointSize,
  colors,
  uniqueTypes,
}: DotProps) {
  if (showPoints && cx !== undefined && cy !== undefined && payload) {
    return (
      <Dot
        cx={cx}
        cy={cy}
        fill={colors[uniqueTypes.indexOf(payload.type)]}
        r={pointSize}
        stroke="var(--background)"
        strokeWidth={2}
      />
    );
  }
  return null;
}

function LineChart({
  data,
  showXAxis = true,
  showYAxis = true,
  showXGrid = true,
  showYGrid = true,
  showPoints = false,
  pointSize = 4,
  xAxisFormatter,
  animated = false,
  ticks,
}: LineChartProps) {
  const uniqueTypes = Array.from(new Set(data.map((d) => d.type)));
  const colors = ["var(--chart1)", "var(--chart2)"];

  const formatDate = (value: NumberValue | string) => {
    if (xAxisFormatter) {
      return xAxisFormatter(value);
    }
    return Math.round(Number(value)).toString();
  };

  const tooltipLabelFormatter = (value: NumberValue | string) =>
    formatDate(value);

  type GroupedDataItem = {
    date: NumberValue;
    [key: string]: NumberValue | number;
  };

  const groupedData = data.reduce((acc: GroupedDataItem[], curr) => {
    const existingDate = acc.find((item) => item.date === curr.date);
    if (existingDate) {
      existingDate[curr.type] = curr.value;
    } else {
      acc.push({
        date: curr.date,
        [curr.type]: curr.value,
      });
    }
    return acc;
  }, []);

  const dates = data.map((d) => Number(d.date));
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);

  const padding = (maxDate - minDate) * DOMAIN_PADDING_PERCENTAGE;
  const domainMin = Math.max(0, minDate - padding);
  const domainMax = maxDate + padding;

  return (
    <div
      className={styles.lineChart}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <ResponsiveContainer height="100%" width="100%">
        <RechartsLineChart
          data={groupedData}
          margin={{ top: 10, right: 12, left: 12, bottom: 20 }}
        >
          {showXGrid ||
            (showYGrid && (
              <CartesianGrid
                stroke="var(--border)"
                strokeDasharray="3 3"
                strokeOpacity={0.2}
              />
            ))}
          <XAxis
            axisLine={false}
            dataKey="date"
            domain={[domainMin, domainMax]}
            hide={!showXAxis}
            tick={
              showXAxis
                ? { fontSize: 11, fill: "var(--muted-foreground)" }
                : false
            }
            tickFormatter={formatDate}
            tickLine={false}
            ticks={ticks}
          />
          {showYAxis && (
            <YAxis
              axisLine={false}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickLine={false}
              width={30}
            />
          )}
          <Tooltip
            content={<ChartTooltip labelFormatter={tooltipLabelFormatter} />}
            cursor={{ stroke: "var(--secondary)", strokeWidth: 1 }}
          />
          {uniqueTypes.map((type, index) => (
            <Line
              animationBegin={
                animated ? index * ANIMATION_STAGGER_DELAY_MS : undefined
              }
              animationDuration={animated ? ANIMATION_DURATION_MS : 0}
              dataKey={type}
              dot={
                showPoints ? (
                  <CustomDot
                    colors={colors}
                    pointSize={pointSize}
                    showPoints={showPoints}
                    uniqueTypes={uniqueTypes}
                  />
                ) : (
                  false
                )
              }
              key={type}
              stroke={colors[index % colors.length]}
              strokeWidth={3}
              type="monotone"
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChart;
