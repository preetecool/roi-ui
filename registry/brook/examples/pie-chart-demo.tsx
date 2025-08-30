"use client";

import PieChart from "@/registry/brook/ui/charts/pie-chart";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

const data = [
  { category: "Mobile", value: 45.2, type: "PLATFORM" },
  { category: "Desktop", value: 32.8, type: "PLATFORM" },
  { category: "Tablet", value: 15.9, type: "PLATFORM" },
  { category: "Smart TV", value: 6.1, type: "PLATFORM" },
];

export default function PieChartDemo() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h3 style={{ marginBottom: "16px", color: "var(--title)" }}>Traffic by Platform</h3>
      <ParentSize>
        {({ width, height }) => (
          <PieChart data={data} width={width} height={height - 50} showLabels={true} padAngle={0.02} cornerRadius={3} />
        )}
      </ParentSize>
    </div>
  );
}
