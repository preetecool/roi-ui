"use client";

import { Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/brook/ui/chart";
import styles from "./chart-pie-demo.module.css";

const chartData = [
  { platform: "mobile", visitors: 45.2, fill: "var(--color-mobile)" },
  { platform: "desktop", visitors: 32.8, fill: "var(--color-desktop)" },
  { platform: "tablet", visitors: 15.9, fill: "var(--color-tablet)" },
  { platform: "smarttv", visitors: 6.1, fill: "var(--color-smarttv)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-1)",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  tablet: {
    label: "Tablet",
    color: "var(--chart-3)",
  },
  smarttv: {
    label: "Smart TV",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export default function ChartPieDemo() {
  return (
    <div className={styles.container}>
      <ChartContainer className={styles.chartContainer} config={chartConfig}>
        <PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => {
                  const numValue =
                    typeof value === "number"
                      ? value
                      : Number.parseFloat(String(value));
                  return `${numValue.toFixed(1)}%`;
                }}
                nameKey="platform"
              />
            }
          />
          <ChartLegend content={<ChartLegendContent nameKey="platform" />} />
          <Pie
            animationDuration={800}
            data={chartData}
            dataKey="visitors"
            innerRadius={60}
            nameKey="platform"
            outerRadius={100}
            strokeWidth={2}
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
