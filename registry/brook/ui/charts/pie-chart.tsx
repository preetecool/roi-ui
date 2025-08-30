"use client";

import { useMemo, useCallback, useId, useState, useEffect } from "react";
import { Group } from "@visx/group";
import Pie, { ProvidedProps, PieArcDatum } from "@visx/shape/lib/shapes/Pie";
import { arc as d3Arc, DefaultArcObject, Arc } from "d3-shape";
import { scaleOrdinal } from "@visx/scale";
import { useTooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { LinearGradient } from "@visx/gradient";
import { motion, AnimatePresence, useMotionValue, useTransform, animate as frameAnimate } from "motion/react";

export interface PieChartData {
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

export interface PieChartProps {
  data: PieChartData[];
  width: number;
  height: number;
  margin?: Margin;
  innerRadius?: number;
  outerRadius?: number;
  padAngle?: number;
  cornerRadius?: number;
  showLabels?: boolean;
  animate?: boolean;
  interactive?: boolean;
}

type AnimatedPieProps<Datum> = ProvidedProps<Datum> & {
  animate?: boolean;
  getKey: (d: PieArcDatum<Datum>) => string;
  getColor: (d: PieArcDatum<Datum>) => string;
  onClickDatum: (d: PieArcDatum<Datum>) => void;
  onHoverDatum?: (d: PieArcDatum<Datum>, event: React.MouseEvent) => void;
  onLeaveDatum?: () => void;
  showLabels?: boolean;
  total?: number;
  delay?: number;
  innerRadius: number;
  outerRadius: number;
  cornerRadius?: number;
};

function AnimatedPieSlice<Datum>({
  arc,
  path,
  getKey,
  getColor,
  onClickDatum,
  onHoverDatum,
  onLeaveDatum,
  showLabels,
  total,
  innerRadius,
  outerRadius,
  animate,
}: {
  arc: PieArcDatum<Datum>;
  path: Arc<unknown, PieArcDatum<Datum>>;
  getKey: (d: PieArcDatum<Datum>) => string;
  getColor: (d: PieArcDatum<Datum>) => string;
  onClickDatum: (d: PieArcDatum<Datum>) => void;
  onHoverDatum?: (d: PieArcDatum<Datum>, event: React.MouseEvent) => void;
  onLeaveDatum?: () => void;
  showLabels?: boolean;
  total?: number;
  innerRadius: number;
  outerRadius: number;
  animate?: boolean;
}) {
  const progress = useMotionValue(0);
  const [centroidX, centroidY] = path.centroid(arc);
  const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
  const key = getKey(arc);

  const arcGenerator = d3Arc().innerRadius(innerRadius).outerRadius(outerRadius).cornerRadius(0).padAngle(0);

  const animatedPath = useTransform(progress, (latest) => {
    if (!animate) return arcGenerator(arc as unknown as DefaultArcObject) || "";

    const sweepAngle = latest * (arc.endAngle - arc.startAngle);
    const animatedArc = {
      ...arc,
      endAngle: arc.startAngle + sweepAngle,
    };
    return arcGenerator(animatedArc as unknown as DefaultArcObject) || "";
  });

  useEffect(() => {
    if (animate) {
      const controls = frameAnimate(progress, 1, {
        duration: 1.2,
        delay: 0.2,
        ease: "easeInOut",
      });
      return controls.stop;
    }
  }, [progress, animate]);

  return (
    <motion.g key={key}>
      <motion.path
        fill={getColor(arc)}
        stroke="none"
        onClick={() => onClickDatum(arc)}
        onTouchStart={() => onClickDatum(arc)}
        onMouseMove={(event) => onHoverDatum?.(arc, event)}
        onMouseLeave={() => onLeaveDatum?.()}
        style={{ cursor: "pointer" }}
        d={animatedPath}
      />
      {showLabels && hasSpaceForLabel && (
        <motion.text
          fill="white"
          x={centroidX}
          y={centroidY}
          dy=".33em"
          fontSize={9}
          fontWeight="500"
          textAnchor="middle"
          style={{ pointerEvents: "none" }}
          initial={animate ? { opacity: 0 } : undefined}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: animate ? 1.0 : 0,
            ease: "easeOut",
          }}
        >
          {total ? `${(((arc.data as PieChartData).value / total) * 100).toFixed(1)}%` : key}
        </motion.text>
      )}
    </motion.g>
  );
}

function AnimatedPie<Datum>({
  animate,
  arcs,
  path,
  getKey,
  getColor,
  onClickDatum,
  onHoverDatum,
  onLeaveDatum,
  showLabels = true,
  total,
  innerRadius,
  outerRadius,
}: AnimatedPieProps<Datum>) {
  return (
    <AnimatePresence mode="wait">
      {arcs.map((arc) => (
        <AnimatedPieSlice
          key={getKey(arc)}
          arc={arc}
          path={path}
          getKey={getKey}
          getColor={getColor}
          onClickDatum={onClickDatum}
          onHoverDatum={onHoverDatum}
          onLeaveDatum={onLeaveDatum}
          showLabels={showLabels}
          total={total}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          animate={animate}
        />
      ))}
    </AnimatePresence>
  );
}

function PieChart({
  data,
  width,
  height,
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
  innerRadius = 0,
  outerRadius,
  padAngle = 0,
  cornerRadius = 0,
  showLabels = true,
  animate = true,
  interactive = true,
}: PieChartProps) {
  const { tooltipData, tooltipLeft = 0, tooltipTop = 0, showTooltip, hideTooltip } = useTooltip<PieChartData>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const gradientId = useId();

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = outerRadius || Math.min(centerX, centerY) - Math.max(margin.left, margin.right);

  const colors = ["var(--chart1)", "var(--chart2)", "var(--accent)", "var(--warning)", "var(--destructive)"];

  const colorScale = scaleOrdinal({
    domain: data.map((d) => d.category),
    range: colors,
  });

  const getValue = (d: PieChartData) => d.value;

  const filteredData = selectedCategory ? data.filter((d) => d.category === selectedCategory) : data;

  const total = useMemo(() => data.reduce((sum, d) => sum + getValue(d), 0), [data]);

  const handleTooltip = useCallback(
    (event: React.MouseEvent, datum: PieChartData) => {
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

  if (width < 10) return null;

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height} shapeRendering="crispEdges">
        <rect x={0} y={0} width={width} height={height} fill="var(--card)" rx={14} />
        <defs>
          <LinearGradient id={gradientId} from="var(--chart1)" to="var(--chart2)" fromOpacity={0.8} toOpacity={0.6} />
        </defs>
        <Group left={centerX} top={centerY}>
          <Pie
            data={filteredData}
            pieValue={getValue}
            outerRadius={radius}
            innerRadius={innerRadius}
            cornerRadius={cornerRadius}
            padAngle={padAngle}
          >
            {(pie) => (
              <AnimatedPie<PieChartData>
                {...pie}
                animate={animate}
                getKey={(arc) => arc.data.category}
                onClickDatum={({ data: { category } }) =>
                  animate &&
                  interactive &&
                  setSelectedCategory(selectedCategory && selectedCategory === category ? null : category)
                }
                onHoverDatum={(arc, event) => handleTooltip(event, arc.data)}
                onLeaveDatum={() => hideTooltip()}
                getColor={(arc) => colorScale(arc.data.category)}
                showLabels={showLabels}
                total={total}
                innerRadius={innerRadius}
                outerRadius={radius}
                cornerRadius={cornerRadius}
              />
            )}
          </Pie>
        </Group>
        {animate && interactive && (
          <motion.text
            textAnchor="end"
            x={width - 16}
            y={height - 16}
            fill="var(--muted-foreground)"
            fontSize={11}
            fontWeight={300}
            style={{ pointerEvents: "none" }}
            initial={{ opacity: 0, y: height - 6 }}
            animate={{ opacity: 1, y: height - 16 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            Click segments to update
          </motion.text>
        )}
      </svg>
      {tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={tooltipStyles} offsetLeft={15} offsetTop={-10}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "11px", fontWeight: "500", marginBottom: "2px" }}>{tooltipData.category}</div>
            <div style={{ fontSize: "11px", fontFamily: "monospace" }}>{tooltipData.value.toLocaleString()}</div>
            <div style={{ fontSize: "10px", color: "var(--muted-foreground)", marginTop: "2px" }}>
              {((tooltipData.value / total) * 100).toFixed(1)}%
            </div>
          </div>
        </TooltipWithBounds>
      ) : null}
    </div>
  );
}

export default PieChart;
