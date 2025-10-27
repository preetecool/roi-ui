"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/tw-utils";
import { Badge } from "@/registry/brook/tailwind/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/brook/tailwind/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/brook/tailwind/ui/chart";
import { trafficData } from "./data";

const CHART_START_YEAR = 2025;
const CHART_START_MONTH = 6; // July (0-indexed)
const CHART_START_DAY = 14;

const formatDate = (value: unknown) => {
  const dayNumber = Math.round(Number(value));

  const startDate = new Date(
    CHART_START_YEAR,
    CHART_START_MONTH,
    CHART_START_DAY
  );
  const currentDate = new Date(startDate);
  currentDate.setDate(startDate.getDate() + (dayNumber - 1));

  return currentDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const chartConfig = {
  mobile: {
    label: "Mobile",
    color: "var(--chart-1)",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function CardTraffic() {
  return (
    <Card
      className="w-full max-w-[600px]"
      style={{
        maxWidth: "600px",
        width: "100%",
      }}
    >
      <CardHeader>
        <CardTitle>Website Traffic</CardTitle>
      </CardHeader>
      <CardContent className="h-[200px] p-0 sm:h-[180px]">
        <div style={{ width: "100%", height: "100%" }}>
          <ChartContainer config={chartConfig}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" hide={true} tickFormatter={formatDate} />
              <YAxis hide={true} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                animationDuration={800}
                dataKey="mobile"
                dot={false}
                stroke="var(--color-mobile)"
                strokeWidth={2}
                type="monotone"
              />
              <Line
                animationBegin={200}
                animationDuration={800}
                dataKey="desktop"
                dot={false}
                stroke="var(--color-desktop)"
                strokeWidth={2}
                type="monotone"
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>

      <div
        className={cn(
          "-mx-6 -mb-6 grid grid-cols-2 grid-rows-2 border-t-[0.5px] border-t-[oklch(from_var(--border)_l_c_h_/_0.7)]",
          "sm:-mx-5 sm:-mb-5",
          "max-[400px]:-mx-5 max-[400px]:-mb-5 max-[400px]:grid-cols-1 max-[400px]:grid-rows-auto"
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-2 border-r-[0.5px] border-r-[oklch(from_var(--border)_l_c_h_/_0.7)] border-b-[0.5px] border-b-[oklch(from_var(--border)_l_c_h_/_0.7)] p-5",
            "sm:gap-2 sm:p-4",
            "max-[400px]:border-r-0 max-[400px]:border-b max-[400px]:border-b-[var(--border)] max-[400px]:p-4"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-[var(--muted-foreground)] text-sm sm:text-sm">
              Mobile
            </span>
          </div>
          <span className="font-bold text-[32px] text-[var(--foreground)] leading-none max-[400px]:text-2xl sm:text-[1.75rem]">
            25,010
          </span>
        </div>

        <div
          className={cn(
            "flex flex-col gap-2 border-b-[0.5px] border-b-[oklch(from_var(--border)_l_c_h_/_0.7)] p-5",
            "sm:gap-2 sm:p-4",
            "max-[400px]:border-r-0 max-[400px]:border-b max-[400px]:border-b-[var(--border)] max-[400px]:p-4"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-[var(--muted-foreground)] text-sm sm:text-sm">
              Desktop
            </span>
          </div>
          <span className="font-bold text-[32px] text-[var(--foreground)] leading-none max-[400px]:text-2xl sm:text-[1.75rem]">
            12,840
          </span>
        </div>

        <div
          className={cn(
            "flex flex-col gap-2 border-r-[0.5px] border-r-[oklch(from_var(--border)_l_c_h_/_0.7)] p-5",
            "sm:gap-2 sm:p-4",
            "max-[400px]:border-r-0 max-[400px]:border-b max-[400px]:border-b-[var(--border)] max-[400px]:p-4"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-[var(--muted-foreground)] text-sm sm:text-sm">
              Bounce Rate
            </span>
            <Badge size="sm" variant="success">
              -3.4%
            </Badge>
          </div>
          <span className="font-bold text-[32px] text-[var(--foreground)] leading-none max-[400px]:text-2xl sm:text-[1.75rem]">
            24.1%
          </span>
        </div>

        <div
          className={cn(
            "flex flex-col gap-2 p-5",
            "sm:gap-2 sm:p-4",
            "max-[400px]:border-r-0 max-[400px]:border-b-0 max-[400px]:p-4"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-[var(--muted-foreground)] text-sm sm:text-sm">
              Conversion
            </span>
            <Badge size="sm" variant="destructive">
              -0.9%
            </Badge>
          </div>
          <span className="font-bold text-[32px] text-[var(--foreground)] leading-none max-[400px]:text-2xl sm:text-[1.75rem]">
            2.8%
          </span>
        </div>
      </div>
    </Card>
  );
}
