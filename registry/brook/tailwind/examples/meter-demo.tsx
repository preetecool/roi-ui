import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/brook/tailwind/ui/meter";

export default function MeterDemo() {
  return (
    <div className="flex w-full max-w-96 flex-col gap-6">
      <Meter max={100} value={24}>
        <div className="flex items-center justify-between">
          <MeterLabel>Storage Used</MeterLabel>
          <MeterValue />
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>

      <Meter max={100} value={67}>
        <div className="flex items-center justify-between">
          <MeterLabel>CPU Usage</MeterLabel>
          <MeterValue />
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>

      <Meter max={100} value={92}>
        <div className="flex items-center justify-between">
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
