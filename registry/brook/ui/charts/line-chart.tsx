"use client";

import { useCallback, Fragment } from "react";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Line, LinePath } from "@visx/shape";
import { extent, bisector } from "d3-array";

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

export interface LineChartData extends ChartDataItem {
  date: NumberValue;
  value: number;
  type: string;
}

export type CurveType = "linear" | "monotoneX" | "cardinal" | "basis" | "step";

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface LineChartProps {
  data: LineChartData[];
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
  animated?: boolean;
}

function LineChart({
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
  animated = false,
}: LineChartProps) {
  const { tooltipData, tooltipLeft = 0, tooltipTop = 0, showTooltip, hideTooltip } = useTooltip<LineChartData[]>();

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const uniqueTypes = Array.from(new Set(data.map((d) => d.type)));
  const series = uniqueTypes.map((type) => data.filter((d) => d.type === type));

  const colors = ["var(--chart1)", "var(--chart2)"];

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

  const getRD = (d: LineChartData) => d.value;
  const getDate = (d: LineChartData) => d.date;
  const bisectDate = bisector((d: LineChartData) => d.date).left;

  const getD = useCallback((date: NumberValue) => {
    const output = data.filter(function (el) {
      return el.date === date;
    });
    return output;
  }, [data]);

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

  const rdScale = scaleLinear({
    range: [innerHeight, 0],
    domain: extent(data, getRD) as [number, number],
    nice: true,
  });

  const handleTooltip = useCallback(
    (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
      const { x, y } = localPoint(event) || { x: 0, y: 0 };
      const x0 = timeScale.invert(x - margin.left);

      const index = bisectDate(data, x0, 1);
      const d0 = data[index - 1];
      const d1 = data[index];
      let d = d0;

      if (d1 && getDate(d1)) {
        d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
      }
      showTooltip({
        tooltipData: getD(d.date),
        tooltipLeft: x,
        tooltipTop: y,
      });
    },
    [showTooltip, timeScale, margin.left, bisectDate, data, getD],
  );

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill="var(--card)" rx={14} />
        <Group left={margin.left} top={margin.top}>
          {showYGrid && (
            <GridRows
              scale={rdScale}
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
          <LinearGradient id="area-gradient" from="var(--success)" to="var(--success)" toOpacity={0.1} />
          {showYAxis && (
            <>
              <AxisLeft
                stroke="var(--border)"
                tickStroke="var(--border)"
                scale={rdScale}
                numTicks={Math.min(10, innerHeight / 40)}
                tickLabelProps={() => ({
                  fill: "var(--muted-foreground)",
                  fontSize: 11,
                  textAnchor: "end",
                })}
              />
            </>
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
          {series.map((sData, i) => (
            <Fragment key={i}>
              {animated ? (
                <motion.g>
                  <motion.path
                    d={(() => {
                      const pathGenerator = line<LineChartData>()
                        .x((d) => timeScale(getDate(d)) ?? 0)
                        .y((d) => rdScale(getRD(d)) ?? 0)
                        .curve(getCurveFunction(curve));
                      return pathGenerator(sData) || "";
                    })()}
                    stroke={colors[i]}
                    strokeWidth={3}
                    fill="none"
                    initial={{ strokeDasharray: "1000 1000", strokeDashoffset: 1000 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.2,
                      ease: "easeOut",
                    }}
                  />
                </motion.g>
              ) : (
                <LinePath
                  stroke={colors[i]}
                  strokeWidth={3}
                  data={sData}
                  x={(d) => timeScale(getDate(d)) ?? 0}
                  y={(d) => rdScale(getRD(d)) ?? 0}
                  curve={getCurveFunction(curve)}
                />
              )}
            </Fragment>
          ))}
          {showPoints &&
            pointSize > 0 &&
            series.map((sData, seriesIndex) =>
              sData.map((d, pointIndex) => (
                <Fragment key={`${seriesIndex}-${pointIndex}`}>
                  {animated ? (
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.8 + (seriesIndex * sData.length + pointIndex) * 0.05,
                        ease: "easeOut",
                      }}
                    >
                      <GlyphCircle
                        left={timeScale(getDate(d)) ?? 0}
                        top={rdScale(getRD(d)) ?? 0}
                        size={pointSize * pointSize * Math.PI}
                        fill={colors[seriesIndex]}
                        stroke="var(--background)"
                        strokeWidth={2}
                      />
                    </motion.g>
                  ) : (
                    <GlyphCircle
                      left={timeScale(getDate(d)) ?? 0}
                      top={rdScale(getRD(d)) ?? 0}
                      size={pointSize * pointSize * Math.PI}
                      fill={colors[seriesIndex]}
                      stroke="var(--background)"
                      strokeWidth={2}
                    />
                  )}
                </Fragment>
              )),
            )}
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft - margin.left, y: 0 }}
                to={{ x: tooltipLeft - margin.left, y: innerHeight }}
                stroke="var(--border)"
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="4,2"
              />
            </g>
          )}
          {tooltipData &&
            tooltipData.map((d, i) => (
              <g key={i}>
                <GlyphCircle
                  left={tooltipLeft - margin.left}
                  top={rdScale(d.value) + 2}
                  size={110}
                  fill={colors[i]}
                  stroke="var(--background)"
                  strokeWidth={2}
                />
              </g>
            ))}
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
          tooltipData={tooltipData}
          tooltipLeft={tooltipLeft}
          tooltipTop={tooltipTop}
          uniqueTypes={uniqueTypes}
          colors={colors}
          getRD={getRD}
          getDate={getDate}
          dateFormatter={xAxisFormatter}
        />
      ) : null}
    </div>
  );
}

export default LineChart;
