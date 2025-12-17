"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Badge } from "@/registry/brook/ui/badge/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/brook/ui/card/card";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/registry/brook/ui/chart/chart";
import styles from "./card-traffic.module.css";
import { trafficData } from "./data";

const CHART_START_YEAR = 2025;
const CHART_START_MONTH = 6; // July (0-indexed)
const CHART_START_DAY = 14;

const formatDate = (value: unknown) => {
  const dayNumber = Math.round(Number(value));

  const startDate = new Date(CHART_START_YEAR, CHART_START_MONTH, CHART_START_DAY);
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

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Mobile</span>
          </div>
          <span className={styles.statNumber}>25,010</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Desktop</span>
          </div>
          <span className={styles.statNumber}>12,840</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Bounce Rate</span>
            <Badge size="sm" variant="success">
              -3.4%
            </Badge>
          </div>
          <span className={styles.statNumber}>24.1%</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Conversion</span>
            <Badge size="sm" variant="destructive">
              -0.9%
            </Badge>
          </div>
          <span className={styles.statNumber}>2.8%</span>
        </div>
      </div>
    </Card>
  );
}
