"use client";

import { useCallback, useId, useRef, Fragment } from "react";

type NumberValue = number | { valueOf(): number };
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Bar } from "@visx/shape";
import { max } from "d3-array";
import { LinearGradient } from "@visx/gradient";
import { GridRows, GridColumns } from "@visx/grid";
import { useTooltip } from "@visx/tooltip";
import ChartTooltip, { ChartDataItem } from "./chart-tooltip";
import { localPoint } from "@visx/event";
import { easeOut, motion } from "motion/react";

export interface BarChartData extends ChartDataItem {
  category: string;
  amount: number;
  type: string;
}

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface BarChartProps {
  data: BarChartData[];
  width: number;
  height: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showXGrid?: boolean;
  showYGrid?: boolean;
  margin?: Margin;
  xAxisFormatter?: (value: NumberValue | string) => string;
  barPadding?: number;
  useGradient?: boolean;
  animated?: boolean;
}

function BarChart({
  data,
  width,
  height,
  showXAxis = true,
  showYAxis = true,
  showXGrid = false,
  showYGrid = true,
  margin = { top: 40, right: 40, bottom: 40, left: 40 },
  xAxisFormatter,
  barPadding = 0.3,
  useGradient = true,
  animated = false,
}: BarChartProps) {
  const { tooltipData, tooltipLeft = 0, tooltipTop = 0, showTooltip, hideTooltip } = useTooltip<BarChartData>();
  const gradientId = useId();
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  const debouncedHideTooltip = useCallback(() => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
    }
    hideTimeout.current = setTimeout(() => {
      hideTooltip();
    }, 400);
  }, [hideTooltip]);

  const handleShowTooltip = useCallback(
    (data: { tooltipData: BarChartData; tooltipLeft: number; tooltipTop: number }) => {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
      showTooltip(data);
    },
    [showTooltip],
  );

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const color = "var(--chart1)";

  const getCategory = (d: BarChartData) => d.category;
  const getAmount = (d: BarChartData) => d.amount;

  const formatCategory = (value: NumberValue | string) => {
    if (xAxisFormatter) {
      return xAxisFormatter(value);
    }
    return String(value);
  };

  const categoryScale = scaleBand<string>({
    range: [0, innerWidth],
    domain: data.map(getCategory),
    padding: barPadding,
  });

  const amountScale = scaleLinear<number>({
    range: [innerHeight, 0],
    domain: [0, max(data, getAmount)! + 20 || 0],
    nice: true,
  });

  const handleTooltip = useCallback(
    (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>, datum: BarChartData) => {
      const { x, y } = localPoint(event) || { x: 0, y: 0 };
      handleShowTooltip({
        tooltipData: datum,
        tooltipLeft: x,
        tooltipTop: y,
      });
    },
    [handleShowTooltip],
  );

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill="var(--card)" rx={14} />
        {useGradient && (
          <defs>
            <LinearGradient id={gradientId} from={color} to={color} fromOpacity={0.8} toOpacity={0.3} />
          </defs>
        )}
        <Group left={margin.left} top={margin.top}>
          {showYGrid && (
            <GridRows
              scale={amountScale}
              width={innerWidth}
              height={innerHeight}
              stroke="var(--border)"
              strokeOpacity={0.2}
              numTicks={Math.min(10, innerHeight / 40)}
            />
          )}
          {showXGrid && (
            <GridColumns
              scale={categoryScale}
              width={innerWidth}
              height={innerHeight}
              stroke="var(--border)"
              strokeOpacity={0.2}
            />
          )}

          {tooltipData && (
            <motion.rect
              x={categoryScale(getCategory(tooltipData)) ?? 0}
              y={0}
              width={Math.max(0, categoryScale.bandwidth())}
              height={innerHeight}
              fill="var(--accent)"
              fillOpacity={0.5}
              rx={4}
              style={{ pointerEvents: "all", cursor: "pointer" }}
              onMouseMove={(event) => handleTooltip(event, tooltipData)}
              onMouseLeave={() => debouncedHideTooltip()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          )}

          {data.map((d, idx) => {
            const barWidth = Math.max(0, categoryScale.bandwidth());
            const barHeight = Math.max(0, innerHeight - (amountScale(getAmount(d)) ?? 0));
            const barX = categoryScale(getCategory(d)) ?? 0;

            const barY = innerHeight - barHeight;

            return (
              <Fragment key={`${getCategory(d)}-${idx}`}>
                <rect
                  x={barX}
                  y={0}
                  width={barWidth}
                  height={innerHeight}
                  fill="transparent"
                  style={{ cursor: "pointer" }}
                  onMouseMove={(event) => handleTooltip(event, d)}
                  onMouseLeave={() => debouncedHideTooltip()}
                />

                {animated ? (
                  <motion.rect
                    x={barX}
                    width={barWidth}
                    fill={useGradient ? `url(#${gradientId})` : color}
                    stroke={color}
                    strokeWidth={1}
                    rx={4}
                    y={barY}
                    height={barHeight}
                    initial={{
                      scaleY: 0,
                      originY: 1,
                    }}
                    animate={{
                      scaleY: 1,
                      originY: 1,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: easeOut,
                    }}
                    style={{ pointerEvents: "none" }}
                  />
                ) : (
                  <Bar
                    x={barX}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    fill={useGradient ? `url(#${gradientId})` : color}
                    stroke={color}
                    strokeWidth={1}
                    rx={4}
                    style={{ pointerEvents: "none" }}
                  />
                )}
              </Fragment>
            );
          })}

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
              scale={categoryScale}
              stroke="var(--border)"
              tickStroke="var(--border)"
              top={innerHeight}
              tickFormat={formatCategory}
              tickLabelProps={() => ({
                fill: "var(--muted-foreground)",
                fontSize: 11,
                textAnchor: "middle",
              })}
            />
          )}
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
          getDate={(d) => d.category}
          dateFormatter={xAxisFormatter}
        />
      ) : null}
    </div>
  );
}

export default BarChart;
