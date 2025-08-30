import Background from "@/registry/brook/ui/background/background";

export default function BackgroundDemo() {
  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      <Background backgroundColor={[0, 0, 0]} backgroundOpacity={0.5} intensity={0.1} />
    </div>
  );
}
