import { RadioGroup, Radio, RadioIndicator } from "@/registry/brook/ui/radio/radio";

export default function RadioDemo() {
  return (
    <div style={{ maxWidth: "24rem" }}>
      <RadioGroup defaultValue="comfortable" aria-label="Select a size">
        <div style={{ marginBottom: "1rem", fontSize: "0.875rem", fontWeight: "500" }}>Choose your preferred size</div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Radio value="comfortable" id="comfortable">
            <RadioIndicator />
          </Radio>
          <label htmlFor="comfortable" style={{ fontSize: "0.875rem", cursor: "pointer" }}>
            Comfortable
          </label>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Radio value="compact" id="compact">
            <RadioIndicator />
          </Radio>
          <label htmlFor="compact" style={{ fontSize: "0.875rem", cursor: "pointer" }}>
            Compact
          </label>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Radio value="spacious" id="spacious">
            <RadioIndicator />
          </Radio>
          <label htmlFor="spacious" style={{ fontSize: "0.875rem", cursor: "pointer" }}>
            Spacious
          </label>
        </div>
      </RadioGroup>
    </div>
  );
}
