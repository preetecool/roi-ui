"use client";

import AreaChart from "@/registry/brook/ui/charts/area-chart";
import styles from "./area-chart-demo.module.css";

const data = [
  { year: 2020, amount: 45.2, type: "REVENUE" },
  { year: 2021, amount: 52.8, type: "REVENUE" },
  { year: 2022, amount: 48.9, type: "REVENUE" },
  { year: 2023, amount: 67.3, type: "REVENUE" },
  { year: 2024, amount: 72.1, type: "REVENUE" },
  { year: 2025, amount: 89.4, type: "REVENUE" },
  { year: 2026, amount: 95.7, type: "REVENUE" },
  { year: 2027, amount: 103.2, type: "REVENUE" },
  { year: 2028, amount: 118.6, type: "REVENUE" },
  { year: 2029, amount: 127.9, type: "REVENUE" },
  { year: 2030, amount: 142.3, type: "REVENUE" },
];

export default function AreaChartDemo() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Revenue Growth (2020-2030)</h3>
      <div className={styles.chartContainer}>
        <AreaChart
          data={data}
          showXAxis={true}
          showYAxis={true}
          showXGrid={false}
          showYGrid={true}
          showPoints={false}
          fillOpacity={0.2}
          animated
        />
      </div>
    </div>
  );
}
