import { Button } from "@/registry/brook/ui/button/button";

export default function ButtonSizes() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}
