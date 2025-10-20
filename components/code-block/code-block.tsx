import { highlightCode } from "@/lib/highlight-code";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import styles from "./code-block.module.css";

type CodeBlockProps = {
  filename: string;
  language?: string;
  code: string;
  collapsible?: boolean;
  buttonText?: string;
};

export async function CodeBlock({
  filename,
  language = "tsx",
  code,
  collapsible = false,
  buttonText = "Show code",
}: CodeBlockProps) {
  const highlightedCode = await highlightCode(code, language);

  const codeContent = (
    <>
      <div className={styles.header}>
        <span className={styles.filename}>{filename}</span>
        <div className={styles.copyButtonWrapper}>
          <CopyButton className="header-copy-button" code={code} />
        </div>
      </div>

      <div
        className={`${styles.content} code-container`}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Shiki syntax highlighting
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </>
  );

  if (collapsible) {
    return (
      <details className={styles.details}>
        <summary className={styles.summary}>{buttonText}</summary>

        <div className={styles.container} style={{ marginTop: "1rem" }}>
          {codeContent}
        </div>
      </details>
    );
  }

  return <div className={styles.container}>{codeContent}</div>;
}
