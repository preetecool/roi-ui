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
}

function LineChart({
  data,
  showXAxis = true,
  showYAxis = true,
  showXGrid = true,
  showYGrid = true,
  curve = "linear",
  showPoints = false,
  pointSize = 4,
  xAxisFormatter,
  animated = false,
}: LineChartProps) {
  const uniqueTypes = Array.from(new Set(data.map((d) => d.type)));
  const colors = ["var(--chart1)", "var(--chart2)"];

  const getCurveType = (curveType: CurveType) => {
    switch (curveType) {
      case "monotoneX":
        return "monotone";
      case "cardinal":
        return "cardinal";
      case "basis":
        return "basis";
      case "step":
        return "step";
      case "linear":
      default:
        return "linear";
    }
  };

  const formatDate = (value: NumberValue | string) => {
    if (xAxisFormatter) {
      return xAxisFormatter(value);
    }
    return Math.round(Number(value)).toString();
  };

  const tooltipLabelFormatter = (value: any) => formatDate(value);

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (showPoints) {
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
  };

  // Group data by date for recharts format
  const groupedData = data.reduce((acc: any[], curr) => {
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
        <RechartsLineChart data={groupedData} margin={{ top: 10, right: 10, left: -5, bottom: 20 }}>
          {showXGrid ||
            (showYGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.2} />)}
          {showXAxis && (
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={formatDate}
              interval="preserveStartEnd"
              ticks={[1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025]}
            />
          )}
          {showYAxis && (
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              width={30}
            />
          )}
          <Tooltip content={<ChartTooltip labelFormatter={tooltipLabelFormatter} />} />
          {uniqueTypes.map((type, index) => (
            <Line
              key={type}
              type={getCurveType(curve) as any}
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
