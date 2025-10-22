"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/brook/ui/chart";
import styles from "./chart-line-demo.module.css";

const chartData = [
  { date: 1990, canada: 27.7, uk: 57.2 },
  { date: 1991, canada: 28.0, uk: 57.4 },
  { date: 1992, canada: 28.4, uk: 57.6 },
  { date: 1993, canada: 28.7, uk: 57.7 },
  { date: 1994, canada: 29.0, uk: 57.9 },
  { date: 1995, canada: 29.3, uk: 58.0 },
  { date: 1996, canada: 29.6, uk: 58.2 },
  { date: 1997, canada: 29.9, uk: 58.3 },
  { date: 1998, canada: 30.2, uk: 58.5 },
  { date: 1999, canada: 30.4, uk: 58.7 },
  { date: 2000, canada: 30.7, uk: 59.0 },
  { date: 2001, canada: 31.0, uk: 59.1 },
  { date: 2002, canada: 31.4, uk: 59.3 },
  { date: 2003, canada: 31.6, uk: 59.6 },
  { date: 2004, canada: 31.9, uk: 60.0 },
  { date: 2005, canada: 32.2, uk: 60.4 },
  { date: 2006, canada: 32.6, uk: 60.8 },
  { date: 2007, canada: 32.9, uk: 61.3 },
  { date: 2008, canada: 33.2, uk: 61.8 },
  { date: 2009, canada: 33.6, uk: 62.3 },
  { date: 2010, canada: 34.0, uk: 62.8 },
  { date: 2011, canada: 34.3, uk: 63.3 },
  { date: 2012, canada: 34.7, uk: 63.7 },
  { date: 2013, canada: 35.1, uk: 64.1 },
  { date: 2014, canada: 35.4, uk: 64.6 },
  { date: 2015, canada: 35.7, uk: 65.1 },
  { date: 2016, canada: 36.1, uk: 65.6 },
  { date: 2017, canada: 36.5, uk: 66.0 },
  { date: 2018, canada: 37.0, uk: 66.4 },
  { date: 2019, canada: 37.6, uk: 66.8 },
  { date: 2020, canada: 38.0, uk: 67.9 },
  { date: 2021, canada: 38.2, uk: 67.0 },
  { date: 2022, canada: 38.9, uk: 67.5 },
  { date: 2023, canada: 39.6, uk: 68.3 },
  { date: 2024, canada: 40.0, uk: 69.0 },
  { date: 2025, canada: 40.1, uk: 69.8 },
];

const chartConfig = {
  canada: {
    label: "Canada",
    color: "var(--chart-1)",
  },
  uk: {
    label: "United Kingdom",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

// biome-ignore lint/style/noMagicNumbers: X-axis tick values for 5-year intervals
const X_AXIS_TICKS = [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025];

export default function ChartLineDemo() {
  return (
    <div className={styles.container}>
      <ChartContainer className={styles.chartContainer} config={chartConfig}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="date"
            tickFormatter={(value) => value.toString()}
            tickLine={false}
            tickMargin={8}
            ticks={X_AXIS_TICKS}
          />
          <YAxis
            axisLine={false}
            domain={[0, "auto"]}
            tickLine={false}
            tickMargin={8}
            width={40}
          />
          <ChartTooltip content={<ChartTooltipContent labelKey="date" />} />
          <Line
            animationDuration={800}
            dataKey="canada"
            dot={false}
            stroke="var(--color-canada)"
            strokeWidth={2}
            type="monotone"
          />
          <Line
            animationBegin={200}
            animationDuration={800}
            dataKey="uk"
            dot={false}
            stroke="var(--color-uk)"
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
