"use client";

import {
  Area,
  CartesianGrid,
  Dot,
  AreaChart as RechartsAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./area-chart.module.css";
import ChartTooltip from "./chart-tooltip";

type NumberValue = number | { valueOf(): number };

export type AreaChartData = {
  year: number;
  amount: number;
  type: string;
};

export type CurveType = "linear" | "monotoneX" | "cardinal" | "basis" | "step";

export type AreaChartProps = {
  data: AreaChartData[];
  showXAxis?: boolean;
  showYAxis?: boolean;
  showXGrid?: boolean;
  showYGrid?: boolean;
  showPoints?: boolean;
  pointSize?: number;
  xAxisFormatter?: (value: NumberValue | string) => string;
  fillOpacity?: number;
  animated?: boolean;
};

function AreaChart({
  data,
  showXAxis = true,
  showYAxis = true,
  showXGrid = true,
  showYGrid = true,
  showPoints = false,
  pointSize = 4,
  xAxisFormatter,
  fillOpacity = 0.3,
  animated = false,
}: AreaChartProps) {
  const color = "var(--chart1)";

  const formatDate = (value: NumberValue | string) => {
    if (xAxisFormatter) {
      return xAxisFormatter(value);
    }
    return Math.round(Number(value)).toString();
  };

  const tooltipLabelFormatter = (value: NumberValue | string) =>
    formatDate(value);

  const tooltipValueFormatter = (value: number | string, _name?: string) => {
    const numValue =
      typeof value === "number" ? value : Number.parseFloat(String(value));
    return Number.isNaN(numValue) ? String(value) : numValue.toLocaleString();
  };

  type AreaTooltipPayload = {
    value: number;
    payload: AreaChartData;
  };

  function CustomTooltip({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: AreaTooltipPayload[];
    label?: NumberValue | string;
  }) {
    if (!(active && payload && payload.length)) {
      return null;
    }

    const data = payload[0];

    const actualLabel = data.payload
      ? data.payload.year
      : typeof label === "object" && label !== null
        ? Number(label)
        : label;

    return (
      <ChartTooltip
        active={active}
        label={actualLabel}
        labelFormatter={tooltipLabelFormatter}
        payload={[
          {
            ...data,
            name: "Revenue",
            color,
          },
        ]}
        valueFormatter={tooltipValueFormatter}
      />
    );
  }

  type AreaDotProps = {
    cx?: number;
    cy?: number;
    [key: string]: unknown;
  };

  function CustomDot(props: AreaDotProps) {
    const { cx, cy } = props;
    if (showPoints && cx !== undefined && cy !== undefined) {
      return (
        <Dot
          cx={cx}
          cy={cy}
          fill={color}
          r={pointSize}
          stroke="var(--background)"
          strokeWidth={2}
        />
      );
    }
    return null;
  }

  return (
    <div
      className={styles.areaChart}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <ResponsiveContainer height="100%" width="100%">
        <RechartsAreaChart
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorArea" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="5%"
                stopColor={color}
                stopOpacity={fillOpacity * 2}
              />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          {showXGrid ||
            (showYGrid && (
              <CartesianGrid
                stroke="var(--border)"
                strokeDasharray="3 3"
                strokeOpacity={0.2}
              />
            ))}
          {showXAxis && (
            <XAxis
              axisLine={false}
              dataKey="year"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={formatDate}
              tickLine={false}
            />
          )}
          {showYAxis && (
            <YAxis
              axisLine={false}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickLine={false}
              width={30}
            />
          )}
          <Tooltip
            allowEscapeViewBox={{ x: false, y: false }}
            content={<CustomTooltip />}
            cursor={{ stroke: "var(--secondary)", strokeWidth: 1 }}
          />
          <Area
            animationBegin={animated ? 0 : undefined}
            animationDuration={animated ? 1000 : 0}
            connectNulls={false}
            dataKey="amount"
            dot={showPoints ? <CustomDot /> : false}
            fill="url(#colorArea)"
            fillOpacity={1}
            stroke={color}
            strokeWidth={3}
            type="monotone"
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaChart;
