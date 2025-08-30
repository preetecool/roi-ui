import React from "react";
import { getComponent } from "@/lib/registry";
import { ComponentSource } from "@/components/component-source/component-source";
import { ReplayButton } from "./replay-button";
import styles from "./component-preview.module.css";

interface ComponentPreviewProps {
  name: string;
  align?: "center" | "start" | "end";
  description?: string;
  showCode?: boolean;
  replayButton?: boolean;
}

export async function ComponentPreview({
  name,
  align = "center",
  description,
  showCode = true,
  replayButton = false,
}: ComponentPreviewProps) {
  try {
    const Component = await getComponent(name);

    if (!Component) {
      console.warn(`Component not found: ${name}`);
      return (
        <div className={styles.container}>
          <div className={`${styles.preview} ${styles[align]}`}>
            <p className={styles.errorMessage}>
              Preview for <code className={styles.errorCode}>{name}</code> is temporarily unavailable.
            </p>
          </div>
          {showCode && <ComponentSource src={`./registry/brook/examples/${name}.tsx`} embedded />}
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <div className={`${styles.preview} ${styles[align]}`}>
          <Component />
          {replayButton && <ReplayButton />}
        </div>

        {description && (
          <div className={styles.description}>
            <p className={styles.descriptionText}>{description}</p>
          </div>
        )}

        {showCode && <ComponentSource src={`./registry/brook/examples/${name}.tsx`} embedded />}
      </div>
    );
  } catch (error) {
    console.error(`Fatal error in ComponentPreview for ${name}:`, error);
    return (
      <div className={styles.container}>
        <div className={`${styles.preview} ${styles[align]}`}>
          <p className={styles.errorMessage}>
            Preview for <code className={styles.errorCode}>{name}</code> is temporarily unavailable.
          </p>
        </div>
        {showCode && <ComponentSource src={`./registry/brook/examples/${name}.tsx`} embedded />}
      </div>
    );
  }
}
