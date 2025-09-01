import {
  Meter,
  MeterLabel,
  MeterTrack,
  MeterIndicator,
  MeterValue,
} from "@/registry/brook/ui/meter/meter";
import styles from "./meter-demo.module.css";

export default function MeterDemo() {
  return (
    <div className={styles.container}>
      <Meter value={24} max={100}>
        <div className={styles.meterHeader}>
          <MeterLabel>Storage Used</MeterLabel>
          <MeterValue />
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>

      <Meter value={67} max={100}>
        <div className={styles.meterHeader}>
          <MeterLabel>CPU Usage</MeterLabel>
          <MeterValue />
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>

      <Meter value={92} max={100}>
        <div className={styles.meterHeader}>
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