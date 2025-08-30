"use client";

import { useMemo, useCallback, Fragment, useId, useState, useEffect } from "react";
import { Group } from "@visx/group";
import { Arc } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";
import { Text } from "@visx/text";
import { useTooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { motion } from "motion/react";
import { LinearGradient } from "@visx/gradient";

export interface RadialBarChartData {
  category: string;
  value: number;
}

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface RadialBarChartProps {
  data: RadialBarChartData[];
  width: number;
  height: number;
  margin?: Margin;
  innerRadius?: number;
  outerRadius?: number;
  cornerRadius?: number;
  padAngle?: number;
  paddingInner?: number;
  showLabels?: boolean;
  animated?: boolean;
}

function RadialBarChart({
  data,
  width,
  height,
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
  innerRadius,
  outerRadius,
  cornerRadius = 4,
  padAngle = 0.02,
  paddingInner = 0.1,
  showLabels = true,
  animated = false,
}: RadialBarChartProps) {
  const { tooltipData, tooltipLeft = 0, tooltipTop = 0, showTooltip, hideTooltip } = useTooltip<RadialBarChartData>();
  const gradientId = useId();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(centerX, centerY) - Math.max(margin.left, margin.right);

  const finalInnerRadius = innerRadius ?? maxRadius * 0.3;
  const finalOuterRadius = outerRadius ?? maxRadius * 0.8;

  const toDegrees = (x: number) => (x * 180) / Math.PI;

  const angleScale = useMemo(() => {
    return scaleBand<string>({
      range: [0, 2 * Math.PI],
      domain: data.map((d) => d.category),
      paddingInner,
    });
  }, [data, paddingInner]);

  const radiusScale = useMemo(() => {
    return scaleLinear<number>({
      range: [finalInnerRadius, finalOuterRadius],
      domain: [0, Math.max(...data.map((d) => d.value))],
    });
  }, [data, finalInnerRadius, finalOuterRadius]);

  const handleBarHover = useCallback(
    (event: React.MouseEvent, datum: RadialBarChartData, index: number) => {
      const { x, y } = localPoint(event) || { x: 0, y: 0 };
      showTooltip({
        tooltipData: datum,
        tooltipLeft: x,
        tooltipTop: y,
      });
      setHoveredIndex(index);
    },
    [showTooltip],
  );

  const handleBarLeave = useCallback(() => {
    hideTooltip();
    setHoveredIndex(null);
  }, [hideTooltip]);

  const tooltipStyles = {
    ...defaultStyles,
    minWidth: 50,
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
    borderRadius: "var(--radius)",
    padding: "8px",
    fontSize: "12px",
  };

  if (!isClient) {
    return (
      <div style={{ position: "relative" }}>
        <svg width={width} height={height}>
          <defs>
            <LinearGradient id={gradientId} from="var(--chart1)" to="var(--chart2)" fromOpacity={0.8} toOpacity={0.1} />
          </defs>
          <Group left={centerX} top={centerY}>
          </Group>
        </svg>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height}>
        <defs>
          <LinearGradient id={gradientId} from="var(--chart1)" to="var(--chart2)" fromOpacity={0.8} toOpacity={0.1} />
        </defs>
        <Group left={centerX} top={centerY}>
          {data.map((d, i) => {
            const startAngle = angleScale(d.category) ?? 0;
            const midAngle = startAngle + angleScale.bandwidth() / 2;
            const endAngle = startAngle + angleScale.bandwidth();

            const targetOuterRadius = radiusScale(d.value) ?? 0;

            const textOffset = 10;

            const shouldFlip = (midAngle + Math.PI) % (2 * Math.PI) < Math.PI;
            const textAnchor: "start" | "end" = shouldFlip ? "end" : "start";

            const baseRotation = toDegrees(midAngle) - 90;
            const additionalRotation = shouldFlip ? 180 : 0;
            const totalRotation = baseRotation + additionalRotation;

            const labelRadius = targetOuterRadius + textOffset;
            const textX = labelRadius * Math.cos(midAngle - Math.PI / 2);
            const textY = labelRadius * Math.sin(midAngle - Math.PI / 2);

            const isHovered = hoveredIndex === i;

            return (
              <Fragment key={`radial-bar-${i}`}>
                {animated ? (
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                      opacity: isHovered ? 1 : 0.8,
                    }}
                    whileHover={{
                      scale: 1.05,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.02,
                      ease: "easeOut",
                    }}
                    style={{ transformOrigin: "center" }}
                  >
                    <Arc
                      innerRadius={finalInnerRadius}
                      outerRadius={targetOuterRadius}
                      startAngle={startAngle}
                      endAngle={endAngle}
                      padAngle={padAngle}
                      cornerRadius={cornerRadius}
                      fill={`url(#${gradientId})`}
                      onMouseMove={(event) => handleBarHover(event, d, i)}
                      onMouseLeave={handleBarLeave}
                      style={{ cursor: "pointer" }}
                    />
                  </motion.g>
                ) : (
                  <motion.g
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                      opacity: isHovered ? 1 : 0.8,
                    }}
                    whileHover={{
                      scale: 1.05,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.1,
                      ease: "easeOut",
                    }}
                    style={{ transformOrigin: "center" }}
                  >
                    <Arc
                      innerRadius={finalInnerRadius}
                      outerRadius={targetOuterRadius}
                      startAngle={startAngle}
                      endAngle={endAngle}
                      padAngle={padAngle}
                      cornerRadius={cornerRadius}
                      fill={`url(#${gradientId})`}
                      onMouseMove={(event) => handleBarHover(event, d, i)}
                      onMouseLeave={handleBarLeave}
                      style={{ cursor: "pointer" }}
                    />
                  </motion.g>
                )}
                {showLabels &&
                  (animated ? (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.2,
                        delay: 0.2 + i * 0.03,
                      }}
                    >
                      <Text
                        x={textX}
                        y={textY}
                        dominantBaseline="middle"
                        textAnchor={textAnchor}
                        fontSize={11}
                        fontWeight="400"
                        fill="var(--foreground)"
                        angle={totalRotation}
                      >
                        {d.category}
                      </Text>
                    </motion.g>
                  ) : (
                    <Text
                      x={textX}
                      y={textY}
                      dominantBaseline="middle"
                      textAnchor={textAnchor}
                      fontSize={11}
                      fontWeight="400"
                      fill="var(--foreground)"
                      angle={totalRotation}
                    >
                      {d.category}
                    </Text>
                  ))}
              </Fragment>
            );
          })}
        </Group>
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

export default RadialBarChart;
