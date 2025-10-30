import { highlightCode } from "@/lib/highlight-code";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import styles from "./component-source.module.css";
import { ComponentSourceClient } from "./component-source-client";
import {
  getDisplayTitle,
  loadAllVariants,
  loadCodeByName,
  loadCodeBySrc,
  loadMultipleFiles,
  transformCode,
} from "./component-source-helpers";
import { ComponentSourceTabs } from "./component-source-tabs";

type ComponentSourceProps = {
  name?: string;
  src?: string;
  title?: string;
  language?: string;
  embedded?: boolean;
  collapsible?: boolean;
};

export async function ComponentSource({
  name,
  src,
  title,
  language = "tsx",
  embedded = false,
}: ComponentSourceProps) {
  if (!(name || src)) {
    return null;
  }

  // Check for variants first (only for name-based lookups)
  if (name) {
    const variants = await loadAllVariants(name);

    if (variants.length > 0) {
      // Process and highlight all variants and their files
      const processedVariants = await Promise.all(
        variants.map(async (variant) => {
          const processedFiles = await Promise.all(
            variant.files.map(async (file) => {
              const transformedContent = transformCode(file.content);
              const highlightedContent = await highlightCode(
                transformedContent,
                file.language
              );
              return {
                name: file.name,
                content: transformedContent,
                highlightedContent,
              };
            })
          );

          return {
            variant: variant.variant,
            files: processedFiles,
          };
        })
      );

      return <ComponentSourceClient variants={processedVariants} />;
    }

    // Fallback to old multi-file loading for backwards compatibility
    const multipleFiles = await loadMultipleFiles(name);

    if (multipleFiles) {
      // Process and highlight all files
      const processedFiles = await Promise.all(
        multipleFiles.map(async (file) => {
          const transformedContent = transformCode(file.content);
          const highlightedContent = await highlightCode(
            transformedContent,
            file.language
          );
          return {
            name: file.name,
            content: transformedContent,
            highlightedContent,
          };
        })
      );

      return <ComponentSourceTabs files={processedFiles} />;
    }
  }

  // Single file component
  let code: string | undefined;

  if (name) {
    code = await loadCodeByName(name);
  } else if (src) {
    code = await loadCodeBySrc(src);
  }

  if (!code) {
    return <div className={styles.noSourceText}>No source code available</div>;
  }

  const transformedCode = transformCode(code);
  const displayTitle = getDisplayTitle(title, name, src);
  const highlightedCode = await highlightCode(transformedCode, language);

  return (
    <div className={`${styles.container} ${embedded ? styles.embedded : ""}`}>
      <div className={styles.header}>
        <span className={styles.title}>{displayTitle}</span>
        <CopyButton code={transformedCode} />
      </div>

      <div className={styles.codeContent}>
        <div
          className={`code-container ${styles.codeContainer}`}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Shiki syntax highlighting
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
}
