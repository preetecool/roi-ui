import { ComponentSource } from "@/components/docs/component-source/component-source";
import { Index } from "@/registry/__index__";
import styles from "./component-preview.module.css";
import { ComponentPreviewClient } from "./component-preview-client";

type ComponentPreviewProps = {
  name: string;
  align?: "center" | "start" | "end";
  description?: string;
  showCode?: boolean;
  replayButton?: boolean;
};

export function ComponentPreview({
  name,
  align = "center",
  description,
  showCode = true,
  replayButton = false,
}: ComponentPreviewProps) {
  const item = Index[name];
  const isChartComponent = name.includes("chart");

  // Check if component exists in registry (metadata only)
  if (!item || item.type === "ui") {
    return (
      <div className={styles.container}>
        <div
          className={`${styles.preview} ${styles[align]} ${isChartComponent ? styles.chartPreview : ""}`}
        >
          <p className={styles.errorMessage}>
            Component <code className={styles.errorCode}>{name}</code> not found
            in registry or is not previewable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ComponentPreviewClient
        align={align}
        isChartComponent={isChartComponent}
        name={name}
        replayButton={replayButton}
      />

      {description && (
        <div className={styles.description}>
          <p className={styles.descriptionText}>{description}</p>
        </div>
      )}

      {showCode && <ComponentSource embedded name={name} />}
    </div>
  );
}
