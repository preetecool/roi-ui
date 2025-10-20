"use client";

import BarChart from "@/registry/brook/ui/charts/bar-chart";
import styles from "./bar-chart-demo.module.css";

const data = [
  { category: "Jan", amount: 45.2, type: "SALES" },
  { category: "Feb", amount: 52.8, type: "SALES" },
  { category: "Mar", amount: 48.9, type: "SALES" },
  { category: "Apr", amount: 67.3, type: "SALES" },
  { category: "May", amount: 72.1, type: "SALES" },
  { category: "Jun", amount: 89.4, type: "SALES" },
  { category: "Jul", amount: 95.7, type: "SALES" },
  { category: "Aug", amount: 103.2, type: "SALES" },
];

export default function BarChartDemo() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Monthly Sales Performance</h3>
      <div className={styles.chartContainer}>
        <BarChart
          animated
          data={data}
          showXAxis={true}
          showXGrid={false}
          showYAxis={true}
          showYGrid={true}
          useGradient={false}
        />
      </div>
    </div>
  );
}
