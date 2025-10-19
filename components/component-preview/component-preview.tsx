import { ComponentSource } from "@/components/component-source/component-source";
import { highlightCode } from "@/lib/highlight-code";
import { getComponent } from "@/lib/registry";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { ComponentPreviewClient } from "./component-preview-client";
import styles from "./component-preview.module.css";
import { MultiFileComponentSource } from "./multi-file-component-source";

interface ComponentPreviewProps {
  name: string;
  align?: "center" | "start" | "end";
  description?: string;
  showCode?: boolean;
  replayButton?: boolean;
  files?: Array<{ path: string; name: string; language?: string }>;
}

export async function ComponentPreview({
  name,
  align = "center",
  description,
  showCode = true,
  replayButton = false,
  files,
}: ComponentPreviewProps) {
  try {
    const Component = await getComponent(name);

    if (!Component) {
      console.warn(`Component not found: ${name}`);
      const isChartComponent = name.includes("chart");
      return (
        <div className={styles.container}>
          <div
            className={`${styles.preview} ${styles[align]} ${isChartComponent ? styles.chartPreview : ""}`}
          >
            <p className={styles.errorMessage}>
              Preview for <code className={styles.errorCode}>{name}</code> is temporarily unavailable.
            </p>
          </div>
          {showCode && <ComponentSource src={`./registry/brook/examples/${name}.tsx`} embedded />}
        </div>
      );
    }

    // Check if component has folder structure with multiple files
    const componentFolderPath = join(process.cwd(), "registry", "brook", "examples", name);
    const hasFolder = existsSync(componentFolderPath);

    let processedFiles:
      | Array<{
          name: string;
          content: string;
          rawContent: string;
          language?: string;
        }>
      | undefined;

    if (!files && hasFolder) {
      const filesToProcess: Array<{
        path: string;
        name: string;
        language?: string;
      }> = [
        {
          path: join(componentFolderPath, `${name}.tsx`),
          name: `${name}.tsx`,
          language: "tsx",
        },
      ];

      // Check for CSS module
      const cssPath = join(componentFolderPath, `${name}.module.css`);
      if (existsSync(cssPath)) {
        filesToProcess.push({
          path: cssPath,
          name: `${name}.module.css`,
          language: "css",
        });
      }

      // Read and highlight all files
      processedFiles = await Promise.all(
        filesToProcess.map(async (file) => {
          try {
            const rawCode = readFileSync(file.path, "utf-8");
            let transformedCode = rawCode;
            if (file.language === "tsx") {
              transformedCode = rawCode.replace(/@\/registry\/brook\/ui\/([^"']+)/g, "@/components/ui/$1");
            }
            const highlightedCode = await highlightCode(transformedCode, file.language || "tsx");
            return {
              name: file.name,
              content: highlightedCode,
              rawContent: transformedCode,
              language: file.language,
            };
          } catch (error) {
            console.error(`Error reading file ${file.path}:`, error);
            return {
              name: file.name,
              content: `File not found: ${file.name}`,
              rawContent: `File not found: ${file.name}`,
              language: file.language,
            };
          }
        }),
      );
    } else if (files) {
      processedFiles = await Promise.all(
        files.map(async (file) => {
          try {
            const filePath = join(process.cwd(), file.path);
            const rawCode = readFileSync(filePath, "utf-8");
            let transformedCode = rawCode;
            if (file.language === "tsx") {
              transformedCode = rawCode.replace(/@\/registry\/brook\/ui\/([^"']+)/g, "@/components/ui/$1");
            }
            const highlightedCode = await highlightCode(transformedCode, file.language || "tsx");
            return {
              name: file.name,
              content: highlightedCode,
              rawContent: transformedCode,
              language: file.language,
            };
          } catch (error) {
            console.error(`Error reading file ${file.path}:`, error);
            return {
              name: file.name,
              content: `File not found: ${file.name}`,
              rawContent: `File not found: ${file.name}`,
              language: file.language,
            };
          }
        }),
      );
    }

    const isChartComponent = name.includes("chart");

    return (
      <div className={styles.container}>
        {replayButton ? (
          <ComponentPreviewClient
            Component={Component}
            align={align}
            replayButton={replayButton}
            isChartComponent={isChartComponent}
            className={`${styles.preview} ${styles[align]} ${isChartComponent ? styles.chartPreview : ""}`}
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
          (processedFiles && processedFiles.length > 1 ? (
            <MultiFileComponentSource files={processedFiles} />
          ) : (
            <ComponentSource
              src={
                hasFolder
                  ? `./registry/brook/examples/${name}/${name}.tsx`
                  : `./registry/brook/examples/${name}.tsx`
              }
              embedded
            />
          ))}
      </div>
    );
  } catch (error) {
    console.error(`Fatal error in ComponentPreview for ${name}:`, error);
    const isChartComponent = name.includes("chart");
    return (
      <div className={styles.container}>
        <div className={`${styles.preview} ${styles[align]} ${isChartComponent ? styles.chartPreview : ""}`}>
          <p className={styles.errorMessage}>
            Preview for <code className={styles.errorCode}>{name}</code> is temporarily unavailable.
          </p>
        </div>
        {showCode && <ComponentSource src={`./registry/brook/examples/${name}.tsx`} embedded />}
      </div>
    );
  }
}
