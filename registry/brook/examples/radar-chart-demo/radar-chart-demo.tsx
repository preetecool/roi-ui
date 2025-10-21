"use client";

import RadarChart from "@/registry/brook/ui/charts/radar-chart";
import styles from "./radar-chart-demo.module.css";

const data = [
  { category: "Performance", value: 85, type: "METRIC" },
  { category: "Security", value: 92, type: "METRIC" },
  { category: "Usability", value: 78, type: "METRIC" },
  { category: "Reliability", value: 88, type: "METRIC" },
  { category: "Scalability", value: 75, type: "METRIC" },
  { category: "Maintainability", value: 82, type: "METRIC" },
];

export default function RadarChartDemo() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>System Quality Metrics</h3>
      <div className={styles.chartWrapper}>
        <RadarChart
          animated
          data={data}
          fillOpacity={0.3}
          levels={5}
          maxValue={100}
          showGrid={true}
          showLabels={true}
          showRadialAxis={false}
        />
      </div>
    </div>
  );
}
