"use client";

import { Card, CardHeader, CardContent } from "@/registry/brook/ui/card/card";
import AreaChart from "@/registry/brook/ui/charts/area-chart";
import styles from "./showcase-area-chart.module.css";
import { monthlyUsersData } from "./data";

const formatMonth = (value: unknown) => {
  const num = Number(value);

  if (isNaN(num)) return "";

  const monthNumber = Math.round(num);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Only return month names for exact integer values 1-12
  if (Number.isInteger(num) && monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1];
  }

  // For non-integer values (interpolated), find closest valid month
  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1];
  }

  return "";
};

export function ShowcaseAreaChart() {
  const currentUsers = monthlyUsersData[monthlyUsersData.length - 1].amount;
  const previousUsers = monthlyUsersData[monthlyUsersData.length - 2].amount;
  const growth = currentUsers - previousUsers;
  const growthPercent = ((growth / previousUsers) * 100).toFixed(1);

  return (
    <Card
      className={styles.cardContainer}
      style={{ backgroundColor: "color-mix(in oklch, var(--card) 33%, var(--background))" }}
    >
      <CardHeader>
        <div className={styles.headerContainer}>
          <div className={styles.title}>Monthly Active Users</div>
          <div className={styles.metricsContainer}>
            <div className={styles.primaryMetric}>{currentUsers.toFixed(1)}M</div>
            <div className={styles.secondaryMetric}>
              {growth > 0 ? "+" : ""}
              {growth.toFixed(1)}M ({growth > 0 ? "+" : ""}
              {growthPercent}%) from last month
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className={styles.chartContainer}>
        <div className={styles.chartWrapper}>
          <AreaChart
            data={monthlyUsersData}
            showXAxis={false}
            showYAxis={false}
            showXGrid={false}
            showYGrid={false}
            showPoints={false}
            fillOpacity={0.3}
            xAxisFormatter={formatMonth}
            animated
          />
        </div>
      </CardContent>
    </Card>
  );
}
