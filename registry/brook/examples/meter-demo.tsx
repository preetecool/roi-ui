import {
  Meter,
  MeterLabel,
  MeterTrack,
  MeterIndicator,
  MeterValue,
} from "@/registry/brook/ui/meter/meter";

export default function MeterDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%", maxWidth: "24rem" }}>
      <Meter value={24} max={100}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <MeterLabel>Storage Used</MeterLabel>
          <MeterValue />
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>

      <Meter value={67} max={100}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <MeterLabel>CPU Usage</MeterLabel>
          <MeterValue />
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>

      <Meter value={92} max={100}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <MeterLabel>Memory Usage</MeterLabel>
          <MeterValue />
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
    </div>
  );
}