"use client";

import PieChart from "@/registry/brook/ui/charts/pie-chart";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import styles from "./pie-chart-demo.module.css";

const data = [
  { category: "Mobile", value: 45.2, type: "PLATFORM" },
  { category: "Desktop", value: 32.8, type: "PLATFORM" },
  { category: "Tablet", value: 15.9, type: "PLATFORM" },
  { category: "Smart TV", value: 6.1, type: "PLATFORM" },
];

export default function PieChartDemo() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Traffic by Platform</h3>
      <ParentSize>
        {({ width, height }) => (
          <PieChart data={data} width={width} height={height - 50} showLabels={true} padAngle={0.02} cornerRadius={3} />
        )}
      </ParentSize>
    </div>
  );
}
