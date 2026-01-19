import styles from "./spinner.module.css";

type SpinnerProps = {
  size?: number;
};

export function Spinner({ size = 16 }: SpinnerProps) {
  return (
    <div className={styles.spinner} style={{ width: size, height: size }}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
