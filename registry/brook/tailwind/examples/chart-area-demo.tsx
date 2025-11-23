"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/brook/tailwind/ui/chart";

const chartData = [
  { year: 2020, revenue: 45.2 },
  { year: 2021, revenue: 52.8 },
  { year: 2022, revenue: 48.9 },
  { year: 2023, revenue: 67.3 },
  { year: 2024, revenue: 72.1 },
  { year: 2025, revenue: 89.4 },
  { year: 2026, revenue: 95.7 },
  { year: 2027, revenue: 103.2 },
  { year: 2028, revenue: 118.6 },
  { year: 2029, revenue: 127.9 },
  { year: 2030, revenue: 142.3 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function ChartAreaDemo() {
  return (
    <div className="flex h-full w-full flex-col">
      <ChartContainer
        className="h-[400px] min-h-[400px] max-sm:h-[380px] max-sm:min-h-[380px]"
        config={chartConfig}
      >
        <AreaChart
          data={chartData}
          margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="fillRevenue" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-revenue)"
                stopOpacity={0.3}
              />
              <stop
                offset="100%"
                stopColor="var(--color-revenue)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="year"
            tickFormatter={(value) => value.toString()}
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
          <ChartTooltip content={<ChartTooltipContent labelKey="year" />} />
          <Area
            animationDuration={800}
            dataKey="revenue"
            dot={false}
            fill="url(#fillRevenue)"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            type="monotone"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
