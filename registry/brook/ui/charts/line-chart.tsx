"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";
import ChartTooltip from "./chart-tooltip";
import styles from "./line-chart.module.css";

type NumberValue = number | { valueOf(): number };

export interface LineChartData {
  date: NumberValue;
  value: number;
  type: string;
}

export type CurveType = "linear" | "monotoneX" | "cardinal" | "basis" | "step";

export interface LineChartProps {
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

  const tooltipLabelFormatter = (value: NumberValue | string) => formatDate(value);

  interface DotProps {
    cx?: number;
    cy?: number;
    payload?: LineChartData;
    [key: string]: unknown;
  }

  function CustomDot(props: DotProps) {
    const { cx, cy, payload } = props;
    if (showPoints && cx !== undefined && cy !== undefined && payload) {
      return (
        <Dot
          cx={cx}
          cy={cy}
          r={pointSize}
          fill={colors[uniqueTypes.indexOf(payload.type)]}
          stroke="var(--background)"
          strokeWidth={2}
        />
      );
    }
    return null;
  }

  interface GroupedDataItem {
    date: NumberValue;
    [key: string]: NumberValue | number;
  }

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

  const padding = (maxDate - minDate) * 0.05;
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
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={groupedData} margin={{ top: 10, right: 12, left: 12, bottom: 20 }}>
          {showXGrid ||
            (showYGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.2} />)}
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={showXAxis ? { fontSize: 11, fill: "var(--muted-foreground)" } : false}
            tickFormatter={formatDate}
            ticks={ticks}
            domain={[domainMin, domainMax]}
            hide={!showXAxis}
          />
          {showYAxis && (
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              width={30}
            />
          )}
          <Tooltip
            cursor={{ stroke: "var(--secondary)", strokeWidth: 1 }}
            content={<ChartTooltip labelFormatter={tooltipLabelFormatter} />}
          />
          {uniqueTypes.map((type, index) => (
            <Line
              key={type}
              type="monotone"
              dataKey={type}
              stroke={colors[index % colors.length]}
              strokeWidth={3}
              dot={showPoints ? <CustomDot /> : false}
              animationDuration={animated ? 800 : 0}
              animationBegin={animated ? index * 200 : undefined}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChart;
