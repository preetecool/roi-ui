import { cacheLife } from "next/cache";
import { highlightCode } from "@/lib/highlight-code";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import styles from "./component-source.module.css";
import { ComponentSourceClient } from "./component-source-client";
import { getCachedVariants } from "./helpers/cached-processors";
import {
  getDisplayTitle,
  loadCodeByName,
  loadCodeBySrc,
} from "./helpers/file-loaders";
import { transformCode } from "./helpers/process-files";

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
  "use cache";
  cacheLife("max");
  if (!(name || src)) {
    return null;
  }

  // Check for variants (only for name-based lookups)
  if (name) {
    const processedVariants = await getCachedVariants(name);

    if (processedVariants.length > 0) {
      return <ComponentSourceClient variants={processedVariants} />;
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
