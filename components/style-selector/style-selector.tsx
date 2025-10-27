"use client";

import { useStyle } from "@/components/style-provider";
import styles from "./style-selector.module.css";

export function StyleSelector() {
  const { style, setStyle } = useStyle();

  return (
    <div className={styles.container}>
      <button
        className={`${styles.option} ${style === "css-modules" ? styles.optionActive : ""}`}
        onClick={() => setStyle("css-modules")}
        type="button"
      >
        CSS Modules
      </button>
      <button
        className={`${styles.option} ${style === "tailwind" ? styles.optionActive : ""}`}
        onClick={() => setStyle("tailwind")}
        type="button"
      >
        Tailwind
      </button>
    </div>
  );
}
