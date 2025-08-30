"use client";

import { useCallback, useId, Fragment } from "react";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { AreaClosed, LinePath } from "@visx/shape";
import { extent } from "d3-array";

type NumberValue = number | { valueOf(): number };
import { line } from "d3-shape";
import { LinearGradient } from "@visx/gradient";
import { GridRows, GridColumns } from "@visx/grid";
import { useTooltip } from "@visx/tooltip";
import ChartTooltip, { ChartDataItem } from "./chart-tooltip";
import { localPoint } from "@visx/event";
import { GlyphCircle } from "@visx/glyph";
import { curveLinear, curveMonotoneX, curveCardinal, curveBasis, curveStep } from "@visx/curve";
import { motion } from "motion/react";

export interface AreaChartData extends ChartDataItem {
  year: number;
  amount: number;
  type: string;
}

export type CurveType = "linear" | "monotoneX" | "cardinal" | "basis" | "step";

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface AreaChartProps {
  data: AreaChartData[];
  width: number;
  height: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showXGrid?: boolean;
  showYGrid?: boolean;
  curve?: CurveType;
  showPoints?: boolean;
  pointSize?: number;
  margin?: Margin;
  xAxisFormatter?: (value: NumberValue | string) => string;
  fillOpacity?: number;
  animated?: boolean;
}

function AreaChart({
  data,
  width,
  height,
  showXAxis = true,
  showYAxis = true,
  showXGrid = true,
  showYGrid = true,
  curve = "linear",
  showPoints = false,
  pointSize = 4,
  margin = { top: 40, right: 40, bottom: 40, left: 40 },
  xAxisFormatter,
  fillOpacity = 0.3,
  animated = false,
}: AreaChartProps) {
  const { tooltipData, tooltipLeft = 0, tooltipTop = 0, showTooltip, hideTooltip } = useTooltip<AreaChartData>();
  const gradientId = useId();

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const color = "var(--chart1)";

  const getCurveFunction = (curveType: CurveType) => {
    switch (curveType) {
      case "monotoneX":
        return curveMonotoneX;
      case "cardinal":
        return curveCardinal;
      case "basis":
        return curveBasis;
      case "step":
        return curveStep;
      case "linear":
      default:
        return curveLinear;
    }
  };

  const getAmount = (d: AreaChartData) => d.amount;
  const getDate = (d: AreaChartData) => d.year;

  const formatDate = (value: NumberValue | string) => {
    if (xAxisFormatter) {
      return xAxisFormatter(value);
    }
    return Math.round(Number(value)).toString();
  };

  const timeScale = scaleLinear({
    range: [0, innerWidth],
    domain: extent(data, getDate) as [number, number],
    nice: true,
  });

  const amountScale = scaleLinear({
    range: [innerHeight, 0],
    domain: [0, Math.max(...data.map(getAmount)) * 1.1],
    nice: true,
  });

  const handleTooltip = useCallback(
    (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
      const { x, y } = localPoint(event) || { x: 0, y: 0 };
      const x0 = timeScale.invert(x - margin.left);

      const distances = data.map((d, i) => ({
        distance: Math.abs(getDate(d) - x0),
        index: i,
        data: d,
      }));
      
      const closest = distances.reduce((min, curr) => 
        curr.distance < min.distance ? curr : min
      );

      showTooltip({
        tooltipData: closest.data,
        tooltipLeft: x,
        tooltipTop: y,
      });
    },
    [showTooltip, timeScale, margin.left, data],
  );

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill="var(--card)" rx={14} />
        <defs>
          <LinearGradient id={gradientId} from={color} to={color} fromOpacity={fillOpacity} toOpacity={0} />
        </defs>
        <Group left={margin.left} top={margin.top}>
          {showYGrid && (
            <GridRows
              scale={amountScale}
              width={innerWidth}
              height={innerHeight - margin.top}
              stroke="var(--border)"
              strokeOpacity={0.2}
            />
          )}
          {showXGrid && (
            <GridColumns
              scale={timeScale}
              width={innerWidth}
              height={innerHeight}
              stroke="var(--border)"
              strokeOpacity={0.2}
            />
          )}
          
          {animated ? (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: "easeOut",
              }}
            >
              <AreaClosed
                data={data}
                x={(d) => timeScale(getDate(d)) ?? 0}
                y={(d) => amountScale(getAmount(d)) ?? 0}
                yScale={amountScale}
                fill={`url(#${gradientId})`}
                curve={getCurveFunction(curve)}
              />
            </motion.g>
          ) : (
            <AreaClosed
              data={data}
              x={(d) => timeScale(getDate(d)) ?? 0}
              y={(d) => amountScale(getAmount(d)) ?? 0}
              yScale={amountScale}
              fill={`url(#${gradientId})`}
              curve={getCurveFunction(curve)}
            />
          )}
          
          {animated ? (
            <motion.g>
              <motion.path
                d={(() => {
                  const pathGenerator = line<AreaChartData>()
                    .x((d) => timeScale(getDate(d)) ?? 0)
                    .y((d) => amountScale(getAmount(d)) ?? 0)
                    .curve(getCurveFunction(curve));
                  return pathGenerator(data) || "";
                })()}
                stroke={color}
                strokeWidth={3}
                fill="none"
                initial={{ strokeDasharray: "1000 1000", strokeDashoffset: 1000 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                  duration: 1.5,
                  delay: 0,
                  ease: "easeOut",
                }}
              />
            </motion.g>
          ) : (
            <LinePath
              data={data}
              x={(d) => timeScale(getDate(d)) ?? 0}
              y={(d) => amountScale(getAmount(d)) ?? 0}
              stroke={color}
              strokeWidth={3}
              curve={getCurveFunction(curve)}
            />
          )}

          {showYAxis && (
            <AxisLeft
              stroke="var(--border)"
              tickStroke="var(--border)"
              scale={amountScale}
              numTicks={Math.min(10, innerHeight / 40)}
              tickLabelProps={() => ({
                fill: "var(--muted-foreground)",
                fontSize: 11,
                textAnchor: "end",
              })}
            />
          )}
          
          {showXAxis && (
            <AxisBottom
              scale={timeScale}
              stroke="var(--border)"
              tickStroke="var(--border)"
              top={innerHeight}
              numTicks={Math.min(10, innerWidth / 80)}
              tickFormat={formatDate}
              tickLabelProps={() => ({
                fill: "var(--muted-foreground)",
                fontSize: 11,
                textAnchor: "middle",
              })}
            />
          )}

          {showPoints &&
            pointSize > 0 &&
            data.map((d, i) => (
              <Fragment key={i}>
                {animated ? (
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 1.2 + i * 0.05,
                      ease: "easeOut",
                    }}
                  >
                    <GlyphCircle
                      left={timeScale(getDate(d)) ?? 0}
                      top={amountScale(getAmount(d)) ?? 0}
                      size={pointSize * pointSize * Math.PI}
                      fill={color}
                      stroke="var(--background)"
                      strokeWidth={2}
                    />
                  </motion.g>
                ) : (
                  <GlyphCircle
                    left={timeScale(getDate(d)) ?? 0}
                    top={amountScale(getAmount(d)) ?? 0}
                    size={pointSize * pointSize * Math.PI}
                    fill={color}
                    stroke="var(--background)"
                    strokeWidth={2}
                  />
                )}
              </Fragment>
            ))}

          {tooltipData && (
            <GlyphCircle
              left={timeScale(getDate(tooltipData)) ?? 0}
              top={amountScale(getAmount(tooltipData)) ?? 0}
              size={80}
              fill={color}
              stroke="var(--background)"
              strokeWidth={2}
            />
          )}

          <rect
            x={0}
            y={0}
            width={innerWidth}
            height={innerHeight}
            onTouchStart={handleTooltip}
            fill="transparent"
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
        </Group>
      </svg>
      {tooltipData ? (
        <ChartTooltip
          tooltipData={[tooltipData]}
          tooltipLeft={tooltipLeft}
          tooltipTop={tooltipTop}
          uniqueTypes={[tooltipData.type]}
          colors={[color]}
          getRD={getAmount}
          getDate={getDate}
          dateFormatter={xAxisFormatter}
        />
      ) : null}
    </div>
  );
}

export default AreaChart;