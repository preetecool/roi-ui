"use client";

import BarChart from "@/registry/brook/ui/charts/bar-chart";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import styles from "./bar-chart-demo.module.css";

const data = [
  { category: "Q1", amount: 45.2, type: "SALES" },
  { category: "Q2", amount: 52.8, type: "SALES" },
  { category: "Q3", amount: 48.9, type: "SALES" },
  { category: "Q4", amount: 67.3, type: "SALES" },
  { category: "Q1", amount: 72.1, type: "SALES" },
  { category: "Q2", amount: 89.4, type: "SALES" },
  { category: "Q3", amount: 95.7, type: "SALES" },
  { category: "Q4", amount: 103.2, type: "SALES" },
];

export default function BarChartDemo() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Quarterly Sales Performance</h3>
      <ParentSize>
        {({ width, height }) => (
          <BarChart
            data={data}
            width={width}
            height={height - 50}
            showXAxis={true}
            showYAxis={true}
            showXGrid={false}
            showYGrid={true}
            useGradient={false}
            barPadding={0.2}
            animated
          />
        )}
      </ParentSize>
    </div>
  );
}
