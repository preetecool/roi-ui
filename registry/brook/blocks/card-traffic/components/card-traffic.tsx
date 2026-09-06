"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/brook/ui/card/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/registry/brook/ui/chart/chart";
import styles from "./card-traffic.module.css";

export type TrafficDataPoint = {
  /** ISO date (YYYY-MM-DD), or a numeric day label. */
  date: string | number;
  desktop: number;
  mobile: number;
};

export type CardTrafficProps = {
  data: TrafficDataPoint[];
  bounceRate?: number;
  conversionRate?: number;
};

const formatDate = (value: unknown) => {
  if (typeof value === "number") {
    return `Day ${value}`;
  }
  const date = new Date(String(value));
  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
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

export function CardTraffic({ data, bounceRate, conversionRate }: CardTrafficProps) {
  const mobile = data.reduce((sum, point) => sum + point.mobile, 0);
  const desktop = data.reduce((sum, point) => sum + point.desktop, 0);
  return (
    <Card
      className={styles.cardContainer}
      style={{
        maxWidth: "600px",
        width: "100%",
      }}
    >
      <CardHeader>
        <CardTitle>Website Traffic</CardTitle>
      </CardHeader>
      <CardContent className={styles.chartContainer}>
        <div style={{ width: "100%", height: "100%" }}>
          <ChartContainer config={chartConfig}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" hide={true} tickFormatter={formatDate} />
              <YAxis hide={true} />
              <ChartTooltip content={<ChartTooltipContent labelFormatter={formatDate} />} />
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

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Mobile</span>
          </div>
          <span className={styles.statNumber}>{mobile.toLocaleString("en-US")}</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Desktop</span>
          </div>
          <span className={styles.statNumber}>{desktop.toLocaleString("en-US")}</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Bounce Rate</span>
          </div>
          <span className={styles.statNumber}>{bounceRate === undefined ? "Not provided" : `${bounceRate}%`}</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Conversion</span>
          </div>
          <span className={styles.statNumber}>
            {conversionRate === undefined ? "Not provided" : `${conversionRate}%`}
          </span>
        </div>
      </div>
    </Card>
  );
}
