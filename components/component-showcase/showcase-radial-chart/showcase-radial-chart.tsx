"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/registry/brook/ui/card/card";
import RadialBarChart from "@/registry/brook/ui/charts/radial-bar-chart";

import styles from "./showcase-radial-chart.module.css";
import { songChartData } from "./data";

export function ShowcaseRadialChart() {
  return (
    <Card
      className={styles.cardContainer}
      style={{ backgroundColor: "color-mix(in oklch, var(--card) 33%, var(--background))" }}
    >
      <CardHeader>
        <CardTitle>Health Activity</CardTitle>
      </CardHeader>
      <CardContent className={styles.chartContainer}>
        <div style={{ width: "100%", height: "100%" }}>
          <RadialBarChart data={songChartData} showLabels={true} animated={true} innerRadius="30%" outerRadius="80%" />
        </div>
      </CardContent>
    </Card>
  );
}
