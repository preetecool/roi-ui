"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/registry/brook/ui/card/card";
import RadialBarChart from "@/registry/brook/ui/charts/radial-bar-chart";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

import styles from "./showcase-radial-chart.module.css";
import { songChartData } from "./data";

export function ShowcaseRadialChart() {
  return (
    <Card className={styles.cardContainer}>
      <CardHeader>
        <CardTitle>Top Instrumental Songs</CardTitle>
      </CardHeader>
      <CardContent className={styles.chartContainer}>
        <div style={{ width: "100%", height: "100%" }}>
          <ParentSize>
            {({ width, height }) => (
              <RadialBarChart
                data={songChartData}
                width={width}
                height={height}
                showLabels={true}
                animated={true}
                cornerRadius={4}
                padAngle={0.02}
                paddingInner={0.08}
                innerRadius={30}
                outerRadius={180}
              />
            )}
          </ParentSize>
        </div>
      </CardContent>
    </Card>
  );
}
