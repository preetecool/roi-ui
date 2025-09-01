"use client";

import PieChart from "@/registry/brook/ui/charts/pie-chart";
import styles from "./pie-chart-demo.module.css";

const data = [
  { category: "Mobile", value: 45.2, type: "PLATFORM" },
  { category: "Desktop", value: 32.8, type: "PLATFORM" },
  { category: "Tablet", value: 15.9, type: "PLATFORM" },
  { category: "Smart TV", value: 6.1, type: "PLATFORM" },
];

export default function PieChartDemo() {
  const blueShades = [
    "#1e40af", // blue-800
    "#3b82f6", // blue-500
    "#60a5fa", // blue-400
    "#93c5fd", // blue-300
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Traffic by Platform</h3>
      <div style={{ height: "360px", width: "100%" }}>
        <PieChart data={data} showLabels={true} colors={blueShades} />
      </div>
    </div>
  );
}
