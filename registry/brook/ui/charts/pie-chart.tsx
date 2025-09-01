"use client";

import { useState, useMemo } from "react";
import { PieChart as RechartsePieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "motion/react";
import ChartTooltip from "./chart-tooltip";

export interface PieChartData {
  category: string;
  value: number;
  type: string;
}

export interface PieChartProps {
  data: PieChartData[];
  innerRadius?: number;
  outerRadius?: number;
  showLabels?: boolean;
  animate?: boolean;
  interactive?: boolean;
  colors?: string[];
}

function PieChart({
  data,
  innerRadius = 0,
  outerRadius,
  showLabels = true,
  animate = true,
  interactive = true,
  colors,
}: PieChartProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const defaultColors = ["var(--chart1)", "var(--chart2)", "var(--accent)", "var(--warning)", "var(--destructive)"];
  const pieColors = colors || defaultColors;

  const filteredData = selectedCategory ? data.filter((d) => d.category === selectedCategory) : data;

  const total = useMemo(() => data.reduce((sum, d) => sum + d.value, 0), [data]);

  const tooltipValueFormatter = (value: any, name?: string) => {
    const percentage = ((value / total) * 100).toFixed(1);
    return `${value.toLocaleString()} (${percentage}%)`;
  };

  const renderLabel = (entry: any) => {
    if (!showLabels) return "";
    const percent = ((entry.value / total) * 100).toFixed(1);
    return `${percent}%`;
  };

  const handleClick = (data: any) => {
    if (interactive && animate) {
      setSelectedCategory(selectedCategory === data.category ? null : data.category);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "var(--card)",
        borderRadius: "14px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsePieChart>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={showLabels ? renderLabel : false}
            outerRadius={outerRadius || 120}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey="value"
            animationBegin={animate ? 0 : undefined}
            animationDuration={animate ? 800 : 0}
            onClick={handleClick}
          >
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip valueFormatter={tooltipValueFormatter} />} />
        </RechartsePieChart>
      </ResponsiveContainer>
      {animate && interactive && (
        <motion.div
          style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
            color: "var(--muted-foreground)",
            fontSize: "11px",
            fontWeight: 300,
            pointerEvents: "none",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          Click segments to update
        </motion.div>
      )}
    </div>
  );
}

export default PieChart;
