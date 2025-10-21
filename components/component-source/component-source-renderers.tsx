import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import styles from "./component-source.module.css";

type CodeDisplayProps = {
  displayTitle: string;
  transformedCode: string;
  highlightedCode: string;
  language: string;
};

export function EmbeddedCodeDisplay({
  displayTitle,
  transformedCode,
  highlightedCode,
}: CodeDisplayProps) {
  return (
    <>
      <div className={styles.header}>
        <span className={styles.title}>{displayTitle}</span>
        <CopyButton className={"header-copy-button"} code={transformedCode} />
      </div>

      <div className={styles.codeContent}>
        <div
          className={`code-container ${styles.codeContainer} ${styles.codeContainerEmbedded}`}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Shiki syntax highlighting
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </>
  );
}

export function CollapsibleCodeDisplay({
  displayTitle,
  transformedCode,
  highlightedCode,
  language,
  hasMoreLines,
  buttonText,
  variant,
}: CodeDisplayProps & {
  hasMoreLines: boolean;
  buttonText: string;
  variant: string;
}) {
  const RADIX_36 = 36;
  const SUBSTRING_START = 2;
  const SUBSTRING_END = 11;
  const toggleId = `code-toggle-${Math.random().toString(RADIX_36).substring(SUBSTRING_START, SUBSTRING_END)}`;

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
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Shiki syntax highlighting
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

export function StandardCodeDisplay({
  displayTitle,
  transformedCode,
  highlightedCode,
  language,
  variant,
}: CodeDisplayProps & { variant: string }) {
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
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Shiki syntax highlighting
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
}
