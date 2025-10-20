"use client";

import { Badge } from "@/registry/brook/ui/badge/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/brook/ui/card/card";
import LineChart from "@/registry/brook/ui/charts/line-chart";
import styles from "./card-traffic.module.css";
import { trafficData } from "./data";

const formatDate = (value: unknown) => {
  const dayNumber = Math.round(Number(value));

  const startDate = new Date(2025, 6, 14);
  const currentDate = new Date(startDate);
  currentDate.setDate(startDate.getDate() + (dayNumber - 1));

  return currentDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

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
          <LineChart
            animated
            data={trafficData}
            showPoints={false}
            showXAxis={false}
            showXGrid={false}
            showYAxis={false}
            showYGrid={true}
            xAxisFormatter={formatDate}
          />
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
