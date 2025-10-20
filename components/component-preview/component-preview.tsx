import { ComponentSource } from "@/components/component-source/component-source";
import { Index } from "@/registry/__index__";
import { ComponentPreviewClient } from "./component-preview-client";
import styles from "./component-preview.module.css";
import { getComponentFiles } from "./get-component-files";
import { MultiFileComponentSource } from "./multi-file-component-source";

type ComponentPreviewProps = {
  name: string;
  align?: "center" | "start" | "end";
  description?: string;
  showCode?: boolean;
  replayButton?: boolean;
};

export async function ComponentPreview({
  name,
  align = "center",
  description,
  showCode = true,
  replayButton = false,
}: ComponentPreviewProps) {
  const item = Index[name];

  if (!item?.component) {
    const isChartComponent = name.includes("chart");
    return (
      <div className={styles.container}>
        <div
          className={`${styles.preview} ${styles[align]} ${isChartComponent ? styles.chartPreview : ""}`}
        >
          <p className={styles.errorMessage}>
            Component <code className={styles.errorCode}>{name}</code> not found
            in registry.
          </p>
        </div>
        {showCode && (
          <ComponentSource
            embedded
            src={`./registry/brook/examples/${name}.tsx`}
          />
        )}
      </div>
    );
  }

  const Component = item.component;
  const isChartComponent = name.includes("chart");

  // Check if component has multiple files (tsx + css)
  const files = showCode ? await getComponentFiles(name) : null;

  return (
    <div className={styles.container}>
      {replayButton ? (
        <ComponentPreviewClient
          align={align}
          Component={Component}
          className={`${styles.preview} ${styles[align]} ${isChartComponent ? styles.chartPreview : ""}`}
          isChartComponent={isChartComponent}
          replayButton={replayButton}
        />
      ) : (
        <div
          className={`${styles.preview} ${styles[align]} ${isChartComponent ? styles.chartPreview : ""}`}
        >
          <Component />
        </div>
      )}

      {description && (
        <div className={styles.description}>
          <p className={styles.descriptionText}>{description}</p>
        </div>
      )}

      {showCode &&
        (files ? (
          <MultiFileComponentSource files={files} />
        ) : (
          <ComponentSource embedded name={name} />
        ))}
    </div>
  );
}
