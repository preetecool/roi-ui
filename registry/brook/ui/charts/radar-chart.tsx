"use client";

import { useMemo, useCallback, useId } from "react";
import { Group } from "@visx/group";
import { scaleLinear } from "@visx/scale";
import { useTooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { LinearGradient } from "@visx/gradient";
import { motion } from "motion/react";

export interface RadarChartData {
  category: string;
  value: number;
  type: string;
}

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface RadarChartProps {
  data: RadarChartData[];
  width: number;
  height: number;
  margin?: Margin;
  levels?: number;
  maxValue?: number;
  showLabels?: boolean;
  showGrid?: boolean;
  fillOpacity?: number;
  animated?: boolean;
}

const genAngles = (length: number) =>
  [...new Array(length + 1)].map((_, i) => ({
    angle: Math.round(i * (360 / length) * 10000) / 10000,
  }));

const genPolygonPoints = (dataArray: RadarChartData[], scale: (n: number) => number) => {
  const step = (Math.PI * 2) / dataArray.length;
  const points: string = dataArray
    .map((v, i) => {
      const x = Math.round(scale(v.value) * Math.cos(i * step) * 10000) / 10000;
      const y = Math.round(scale(v.value) * Math.sin(i * step) * 10000) / 10000;
      return `${x},${y}`;
    })
    .join(" ");
  return points;
};

const genRadialGridPath = (angles: { angle: number }[], radius: number) => {
  const points = angles.map((angle) => {
    const radians = (angle.angle * Math.PI) / 180;
    const x = Math.round(radius * Math.cos(radians) * 10000) / 10000;
    const y = Math.round(radius * Math.sin(radians) * 10000) / 10000;
    return `${x},${y}`;
  });

  if (points.length === 0) return "";

  const firstPoint = points[0];
  return `M${firstPoint}L${points.slice(1).join("L")}Z`;
};

function RadarChart({
  data,
  width,
  height,
  margin = { top: 40, right: 40, bottom: 40, left: 40 },
  levels = 5,
  maxValue,
  showLabels = true,
  showGrid = true,
  fillOpacity = 0.3,
  animated = false,
}: RadarChartProps) {
  const { tooltipData, tooltipLeft = 0, tooltipTop = 0, showTooltip, hideTooltip } = useTooltip<RadarChartData>();
  const gradientId = useId();

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX - margin.left, centerY - margin.top);

  const maxVal = maxValue || Math.max(...data.map((d) => d.value));

  const radiusScale = scaleLinear({
    domain: [0, maxVal],
    range: [0, radius],
  });

  const angles = genAngles(data.length);
  const polygonPoints = genPolygonPoints(data, radiusScale);

  const points = useMemo(() => {
    const step = (Math.PI * 2) / data.length;
    return data.map((d, i) => {
      const angle = i * step;
      const r = radiusScale(d.value);
      return {
        ...d,
        x: Math.round((centerX + r * Math.cos(angle)) * 10000) / 10000,
        y: Math.round((centerY + r * Math.sin(angle)) * 10000) / 10000,
        angle,
        radius: r,
      };
    });
  }, [data, radiusScale, centerX, centerY]);

  const handleTooltip = useCallback(
    (event: React.MouseEvent, datum: RadarChartData) => {
      const { x, y } = localPoint(event) || { x: 0, y: 0 };
      showTooltip({
        tooltipData: datum,
        tooltipLeft: x,
        tooltipTop: y,
      });
    },
    [showTooltip],
  );

  const tooltipStyles = {
    ...defaultStyles,
    minWidth: 50,
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
    borderRadius: "var(--radius)",
    padding: "8px",
    fontSize: "12px",
  };

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill="var(--card)" rx={14} />
        <defs>
          <LinearGradient
            id={gradientId}
            from="var(--chart1)"
            to="var(--chart2)"
            fromOpacity={fillOpacity}
            toOpacity={0.1}
          />
        </defs>

        <Group left={centerX} top={centerY}>
          {showGrid && (
            <>
              {[...new Array(levels)].map((_, i) => {
                const r = Math.round((radius / levels) * (i + 1) * 10000) / 10000;
                const pathData = genRadialGridPath(angles, r);
                return (
                  <path
                    key={`grid-${i}`}
                    d={pathData}
                    fill="transparent"
                    stroke="var(--border)"
                    strokeWidth={1}
                    strokeOpacity={0.3}
                  />
                );
              })}

              {angles
                .slice(0, -1)
                .map((angle, i) =>
                  animated ? (
                    <motion.line
                      key={`axis-${i}`}
                      x1={0}
                      y1={0}
                      x2={Math.round(radius * Math.cos((angle.angle * Math.PI) / 180) * 10000) / 10000}
                      y2={Math.round(radius * Math.sin((angle.angle * Math.PI) / 180) * 10000) / 10000}
                      stroke="var(--border)"
                      strokeWidth={1}
                      strokeOpacity={0.3}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                    />
                  ) : (
                    <line
                      key={`axis-${i}`}
                      x1={0}
                      y1={0}
                      x2={Math.round(radius * Math.cos((angle.angle * Math.PI) / 180) * 10000) / 10000}
                      y2={Math.round(radius * Math.sin((angle.angle * Math.PI) / 180) * 10000) / 10000}
                      stroke="var(--border)"
                      strokeWidth={1}
                      strokeOpacity={0.3}
                    />
                  ),
                )}
            </>
          )}

          {animated ? (
            <motion.polygon
              points={polygonPoints}
              fill={`url(#${gradientId})`}
              stroke="var(--chart1)"
              strokeWidth={2}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
          ) : (
            <polygon points={polygonPoints} fill={`url(#${gradientId})`} stroke="var(--chart1)" strokeWidth={2} />
          )}

          {points.map((point, i) =>
            animated ? (
              <motion.circle
                key={`point-${i}`}
                cx={point.x - centerX}
                cy={point.y - centerY}
                r={4}
                fill="var(--chart1)"
                stroke="var(--background)"
                strokeWidth={2}
                style={{ cursor: "pointer" }}
                onMouseMove={(event) => handleTooltip(event, point)}
                onMouseLeave={() => hideTooltip()}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.2 }}
              />
            ) : (
              <circle
                key={`point-${i}`}
                cx={point.x - centerX}
                cy={point.y - centerY}
                r={4}
                fill="var(--chart1)"
                stroke="var(--background)"
                strokeWidth={2}
                style={{ cursor: "pointer" }}
                onMouseMove={(event) => handleTooltip(event, point)}
                onMouseLeave={() => hideTooltip()}
              />
            ),
          )}
        </Group>

        {showLabels &&
          data.map((item, i) => {
            const step = (Math.PI * 2) / data.length;
            const angle = i * step;
            const labelRadius = radius * 0.95;

            let labelX = centerX + labelRadius * Math.cos(angle);
            let labelY = centerY + labelRadius * Math.sin(angle);

            const cos = Math.cos(angle);
            const sin = Math.sin(angle);

            let textAnchor: "start" | "middle" | "end" = "middle";
            if (cos > 0.1) textAnchor = "start";
            else if (cos < -0.1) textAnchor = "end";

            let dominantBaseline: "middle" | "hanging" | "text-before-edge" = "middle";
            if (sin < -0.1) dominantBaseline = "text-before-edge";
            else if (sin > 0.1) dominantBaseline = "hanging";

            const margin = 15;
            labelX = Math.max(margin, Math.min(width - margin, labelX));
            labelY = Math.max(margin, Math.min(height - margin, labelY));

            return animated ? (
              <motion.text
                key={`label-${i}`}
                x={labelX}
                y={labelY}
                textAnchor={textAnchor}
                dominantBaseline={dominantBaseline}
                fontSize={11}
                fill="var(--muted-foreground)"
                fontWeight="500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.05, ease: "easeOut" }}
              >
                {item.category}
              </motion.text>
            ) : (
              <text
                key={`label-${i}`}
                x={labelX}
                y={labelY}
                textAnchor={textAnchor}
                dominantBaseline={dominantBaseline}
                fontSize={11}
                fill="var(--muted-foreground)"
                fontWeight="500"
              >
                {item.category}
              </text>
            );
          })}
      </svg>

      {tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={tooltipStyles} offsetLeft={15} offsetTop={-10}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "11px", fontWeight: "500", marginBottom: "2px" }}>{tooltipData.category}</div>
            <div style={{ fontSize: "11px", fontFamily: "monospace" }}>{tooltipData.value.toLocaleString()}</div>
          </div>
        </TooltipWithBounds>
      ) : null}
    </div>
  );
}

export default RadarChart;
