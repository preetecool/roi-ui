"use client";

import RadialBarChart from "@/registry/brook/ui/charts/radial-bar-chart";
import styles from "./radial-bar-chart-demo.module.css";

const data = [
  { category: "Marketing", value: 2800 },
  { category: "Sales", value: 3200 },
  { category: "Engineering", value: 4100 },
  { category: "Support", value: 1900 },
  { category: "Operations", value: 2400 },
  { category: "Finance", value: 1600 },
  { category: "HR", value: 1200 },
];

export default function RadialBarChartDemo() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Department Budget Allocation</h3>
      <div className={styles.chartWrapper}>
        <RadialBarChart animated data={data} showLabels={true} />
      </div>
    </div>
  );
}
