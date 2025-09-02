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
  curve?: CurveType;
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
  curve = "linear",
  showPoints = false,
  pointSize = 4,
  xAxisFormatter,
  fillOpacity = 0.3,
  animated = false,
}: AreaChartProps) {
  const color = "var(--chart1)";

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

  const tooltipValueFormatter = (value: any, name?: string) => {
    return value.toLocaleString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
    
    const data = payload[0];
    return (
      <ChartTooltip 
        active={active}
        payload={[{
          ...data,
          name: "Revenue",
          color: color
        }]}
        label={label}
        labelFormatter={tooltipLabelFormatter}
        valueFormatter={tooltipValueFormatter}
      />
    );
  };

  const CustomDot = (props: any) => {
    const { cx, cy } = props;
    if (showPoints) {
      return <Dot cx={cx} cy={cy} r={pointSize} fill={color} stroke="var(--background)" strokeWidth={2} />;
    }
    return null;
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
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: -5, bottom: 20 }}>
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
              interval="preserveStartEnd"
              ticks={[2020, 2022, 2024, 2026, 2028, 2030]}
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
          <Tooltip content={<CustomTooltip />} />
          <Area
            type={getCurveType(curve) as any}
            dataKey="amount"
            stroke={color}
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorArea)"
            dot={showPoints ? <CustomDot /> : false}
            animationDuration={animated ? 1000 : 0}
            animationBegin={animated ? 0 : undefined}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaChart;
