import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/brook/ui/meter/meter";
import styles from "./meter-demo.module.css";

export default function MeterDemo() {
  return (
    <div className={styles.container}>
      <Meter max={100} value={24}>
        <div className={styles.meterHeader}>
          <MeterLabel>Storage Used</MeterLabel>
          <MeterValue />
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>

      <Meter max={100} value={67}>
        <div className={styles.meterHeader}>
          <MeterLabel>CPU Usage</MeterLabel>
          <MeterValue />
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>

      <Meter max={100} value={92}>
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
