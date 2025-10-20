import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { highlightCode } from "@/lib/highlight-code";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import styles from "./component-source.module.css";

type ComponentSourceProps = {
  name?: string;
  src?: string;
  title?: string;
  language?: string;
  embedded?: boolean;
  collapsible?: boolean;
  buttonText?: string;
  previewLines?: number;
  variant?: "default" | "manual";
};

export async function ComponentSource({
  name,
  src,
  title,
  language = "tsx",
  embedded = false,
  collapsible = false,
  buttonText = "Show code",
  previewLines = 10,
  variant = "default",
}: ComponentSourceProps) {
  let code: string | undefined;

  if (name) {
    try {
      // Try folder structure first (name/name.tsx)
      let filePath = join(
        process.cwd(),
        "registry",
        "brook",
        "examples",
        name,
        `${name}.tsx`
      );
      try {
        code = await readFile(filePath, "utf-8");
      } catch {
        // Fallback to direct file (name.tsx)
        filePath = join(
          process.cwd(),
          "registry",
          "brook",
          "examples",
          `${name}.tsx`
        );
        code = await readFile(filePath, "utf-8");
      }
    } catch (_error) {
      code = `Component source not found: ${name}.tsx`;
    }
  }

  if (src) {
    try {
      const filePath = join(process.cwd(), src);
      code = await readFile(filePath, "utf-8");
    } catch (_error) {
      code = `File not found: ${src}`;
    }
  }

  if (!code) {
    return <div className={styles.noSourceText}>No source code available</div>;
  }

  const transformedCode = code.replace(
    /@\/registry\/brook\/ui\/([^"']+)/g,
    "@/components/ui/$1"
  );

  let displayTitle = title;
  if (!displayTitle) {
    if (name) {
      displayTitle = `${name}.tsx`;
    } else if (src) {
      const filename = src.split("/").pop();
      displayTitle = filename || "Code";
    } else {
      displayTitle = "Code";
    }
  }

  if (collapsible) {
    const highlightedCode = await highlightCode(transformedCode, language);

    const codeLines = transformedCode.split("\n");
    const hasMoreLines = codeLines.length > previewLines;

    const toggleId = `code-toggle-${Math.random().toString(36).substring(2, 11)}`;

    return (
      <div
        className={`${styles.collapsibleWrapper} ${variant === "manual" ? styles.manual : ""}`}
      >
        <input className={styles.toggleInput} id={toggleId} type="checkbox" />

        <div
          className={styles.container}
          data-tsx={
            language === "tsx" || displayTitle.includes(".tsx")
              ? "true"
              : undefined
          }
        >
          <div className={styles.header}>
            <span className={styles.title}>{displayTitle}</span>
            <CopyButton className="header-copy-button" code={transformedCode} />
          </div>

          <div className={styles.codeContent}>
            <div
              className={`code-container ${styles.codeContainer} ${hasMoreLines ? styles.collapsibleCode : ""}`}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />

            {hasMoreLines && <div className={styles.fadeOut} />}
          </div>

          {hasMoreLines && (
            <>
              <label className={styles.showButton} htmlFor={toggleId}>
                {buttonText}
              </label>
              <label className={styles.hideButton} htmlFor={toggleId}>
                Hide code
              </label>
            </>
          )}
        </div>
      </div>
    );
  }

  const highlightedCode = await highlightCode(transformedCode, language);

  if (embedded) {
    return (
      <>
        <div className={styles.header}>
          <span className={styles.title}>{displayTitle}</span>
          <CopyButton className={"header-copy-button"} code={transformedCode} />
        </div>

        <div className={styles.codeContent}>
          <div
            className={`code-container ${styles.codeContainer} ${styles.codeContainerEmbedded}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </div>
      </>
    );
  }

  return (
    <div
      className={`${styles.container} ${variant === "manual" ? styles.manual : ""}`}
      data-tsx={
        language === "tsx" || displayTitle.includes(".tsx") ? "true" : undefined
      }
    >
      <div className={styles.header}>
        <span className={styles.title}>{displayTitle}</span>
        <CopyButton className="header-copy-button" code={transformedCode} />
      </div>

      <div className={styles.codeContent}>
        <div
          className={`code-container ${styles.codeContainer} ${styles.codeContainerStandalone}`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
}
