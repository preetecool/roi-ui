"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/brook/tailwind/ui/chart";

const chartData = [
  { month: "Jan", sales: 45.2 },
  { month: "Feb", sales: 52.8 },
  { month: "Mar", sales: 48.9 },
  { month: "Apr", sales: 67.3 },
  { month: "May", sales: 72.1 },
  { month: "Jun", sales: 89.4 },
  { month: "Jul", sales: 95.7 },
  { month: "Aug", sales: 103.2 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

// biome-ignore lint/style/noMagicNumbers: Animation duration in milliseconds
const ANIMATION_DURATION = 500;
// biome-ignore lint/style/noMagicNumbers: Border radius for top corners of bars
const BAR_RADIUS: [number, number, number, number] = [4, 4, 0, 0];

export default function ChartBarDemo() {
  return (
    <div className="w-full h-full flex flex-col">
      <ChartContainer className="h-[400px] min-h-[400px] max-sm:h-[380px] max-sm:min-h-[380px]" config={chartConfig}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="month"
            tickLine={false}
            tickMargin={8}
          />
          <YAxis
            axisLine={false}
            domain={[0, "auto"]}
            tickLine={false}
            tickMargin={8}
            width={40}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => {
                  const numValue =
                    typeof value === "number"
                      ? value
                      : Number.parseFloat(String(value));
                  return `$${numValue.toLocaleString()}k`;
                }}
              />
            }
          />
          <Bar
            animationDuration={ANIMATION_DURATION}
            dataKey="sales"
            fill="var(--color-sales)"
            radius={BAR_RADIUS}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
