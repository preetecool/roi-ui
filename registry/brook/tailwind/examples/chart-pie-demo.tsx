"use client";

import { Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/brook/tailwind/ui/chart";

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
    <div className="flex h-full w-full flex-col">
      <ChartContainer className="h-[400px] min-h-[400px] max-sm:h-[380px] max-sm:min-h-[380px]" config={chartConfig}>
        <PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => {
                  const numValue = typeof value === "number" ? value : Number.parseFloat(String(value));
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
            stroke="transparent"
            strokeWidth={0}
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
