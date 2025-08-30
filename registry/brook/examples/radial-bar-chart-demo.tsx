"use client";

import RadialBarChart from "@/registry/brook/ui/charts/radial-bar-chart";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

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
    <div style={{ width: "100%", height: "100%" }}>
      <h3 style={{ marginBottom: "16px", color: "var(--title)" }}>Department Budget Allocation</h3>
      <ParentSize>
        {({ width, height }) => (
          <RadialBarChart
            data={data}
            width={width}
            height={height - 50}
            showLabels={true}
            cornerRadius={4}
            padAngle={0.02}
            paddingInner={0.1}
            animated
          />
        )}
      </ParentSize>
    </div>
  );
}
