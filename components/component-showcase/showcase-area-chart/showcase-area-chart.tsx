"use client";

import { Card, CardHeader, CardContent } from "@/registry/brook/ui/card/card";
import AreaChart from "@/registry/brook/ui/charts/area-chart";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import styles from "./showcase-area-chart.module.css";
import { monthlyUsersData } from "./data";

const formatMonth = (value: unknown) => {
  const monthNumber = Math.round(Number(value));
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[monthNumber - 1] || monthNumber.toString();
};

export function ShowcaseAreaChart() {
  const currentUsers = monthlyUsersData[monthlyUsersData.length - 1].amount;
  const previousUsers = monthlyUsersData[monthlyUsersData.length - 2].amount;
  const growth = currentUsers - previousUsers;
  const growthPercent = ((growth / previousUsers) * 100).toFixed(1);

  return (
    <Card className={styles.cardContainer}>
      <CardHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <div style={{ fontSize: "14px", color: "var(--muted-foreground)" }}>Monthly Active Users</div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--foreground)", marginTop: "4px" }}>
              {currentUsers.toFixed(1)}M
            </div>
            <div style={{ fontSize: "14px", color: "var(--muted-foreground)", marginTop: "2px" }}>
              {growth > 0 ? "+" : ""}
              {growth.toFixed(1)}M ({growth > 0 ? "+" : ""}
              {growthPercent}%) from last month
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className={styles.chartContainer}>
        <div style={{ width: "100%", height: "100%" }}>
          <ParentSize>
            {({ width, height }) => (
              <AreaChart
                data={monthlyUsersData}
                width={width}
                height={height}
                showXAxis={false}
                showYAxis={false}
                showXGrid={false}
                showYGrid={false}
                curve="monotoneX"
                showPoints={false}
                fillOpacity={0.3}
                xAxisFormatter={formatMonth}
                margin={{ top: 0, right: 4, bottom: 0, left: 4 }}
                animated
              />
            )}
          </ParentSize>
        </div>
      </CardContent>
    </Card>
  );
}
