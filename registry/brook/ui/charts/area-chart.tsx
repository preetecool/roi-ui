"use client";

import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";
import ChartTooltip from "./chart-tooltip";
import styles from "./area-chart.module.css";

type NumberValue = number | { valueOf(): number };

export interface AreaChartData {
  year: number;
  amount: number;
  type: string;
}

export type CurveType = "linear" | "monotoneX" | "cardinal" | "basis" | "step";

export interface AreaChartProps {
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

  const tooltipLabelFormatter = (value: NumberValue | string) => formatDate(value);

  const tooltipValueFormatter = (value: number | string, name?: string) => {
    const numValue = typeof value === "number" ? value : parseFloat(String(value));
    return isNaN(numValue) ? String(value) : numValue.toLocaleString();
  };

  interface AreaTooltipPayload {
    value: number;
    payload: AreaChartData;
  }

  function CustomTooltip({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: AreaTooltipPayload[];
    label?: NumberValue | string;
  }) {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0];

    const actualLabel = data.payload
      ? data.payload.year
      : typeof label === "object" && label !== null
        ? Number(label)
        : label;

    return (
      <ChartTooltip
        active={active}
        payload={[
          {
            ...data,
            name: "Revenue",
            color: color,
          },
        ]}
        label={actualLabel}
        labelFormatter={tooltipLabelFormatter}
        valueFormatter={tooltipValueFormatter}
      />
    );
  }

  interface AreaDotProps {
    cx?: number;
    cy?: number;
    [key: string]: unknown;
  }

  function CustomDot(props: AreaDotProps) {
    const { cx, cy } = props;
    if (showPoints && cx !== undefined && cy !== undefined) {
      return <Dot cx={cx} cy={cy} r={pointSize} fill={color} stroke="var(--background)" strokeWidth={2} />;
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
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <defs>
            <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={fillOpacity * 2} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          {showXGrid ||
            (showYGrid && <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.2} />)}
          {showXAxis && (
            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={formatDate}
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
          <Tooltip
            cursor={{ stroke: "var(--secondary)", strokeWidth: 1 }}
            content={<CustomTooltip />}
            allowEscapeViewBox={{ x: false, y: false }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke={color}
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorArea)"
            dot={showPoints ? <CustomDot /> : false}
            animationDuration={animated ? 1000 : 0}
            animationBegin={animated ? 0 : undefined}
            connectNulls={false}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaChart;
