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

const ANIMATION_DURATION_MS = 1000;

type AreaTooltipPayload = {
  value: number;
  payload: AreaChartData;
};

type AreaTooltipProps = {
  active?: boolean;
  payload?: AreaTooltipPayload[];
  label?: NumberValue | string;
  tooltipLabelFormatter: (value: NumberValue | string) => string;
  tooltipValueFormatter: (value: number | string, name?: string) => string;
  color: string;
};

function CustomTooltip({
  active,
  payload,
  label,
  tooltipLabelFormatter,
  tooltipValueFormatter,
  color,
}: AreaTooltipProps) {
  if (!(active && payload && payload.length)) {
    return null;
  }

  const tooltipData = payload[0];

  function getActualLabel(
    data: AreaTooltipPayload,
    labelValue?: NumberValue | string
  ): number | string | undefined {
    if (data.payload) {
      return data.payload.year;
    }
    if (typeof labelValue === "object" && labelValue !== null) {
      return Number(labelValue);
    }
    return labelValue;
  }

  const actualLabel = getActualLabel(tooltipData, label);

  return (
    <ChartTooltip
      active={active}
      label={actualLabel}
      labelFormatter={tooltipLabelFormatter}
      payload={[
        {
          ...tooltipData,
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
  showPoints: boolean;
  pointSize: number;
  color: string;
  [key: string]: unknown;
};

function CustomDot({ cx, cy, showPoints, pointSize, color }: AreaDotProps) {
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
            content={
              <CustomTooltip
                color={color}
                tooltipLabelFormatter={tooltipLabelFormatter}
                tooltipValueFormatter={tooltipValueFormatter}
              />
            }
            cursor={{ stroke: "var(--secondary)", strokeWidth: 1 }}
          />
          <Area
            animationBegin={animated ? 0 : undefined}
            animationDuration={animated ? ANIMATION_DURATION_MS : 0}
            connectNulls={false}
            dataKey="amount"
            dot={
              showPoints ? (
                <CustomDot
                  color={color}
                  pointSize={pointSize}
                  showPoints={showPoints}
                />
              ) : (
                false
              )
            }
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
