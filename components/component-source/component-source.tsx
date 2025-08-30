import { highlightCode } from "@/lib/highlight-code";
import { readFile } from "fs/promises";
import { join } from "path";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import styles from "./component-source.module.css";

interface ComponentSourceProps {
  name?: string;
  src?: string;
  title?: string;
  language?: string;
  embedded?: boolean;
}

export async function ComponentSource({ name, src, title, language = "tsx", embedded = false }: ComponentSourceProps) {
  let code: string | undefined;

  if (name) {
    try {
      const filePath = join(process.cwd(), "apps", "www", "registry", "brook", "examples", `${name}.tsx`);
      code = await readFile(filePath, "utf-8");
    } catch (error) {
      console.error(`Error reading component ${name}:`, error);
      code = `Component source not found: ${name}.tsx`;
    }
  }

  if (src) {
    try {
      const filePath = join(process.cwd(), src);
      code = await readFile(filePath, "utf-8");
    } catch (error) {
      console.error(`Error reading file ${src}:`, error);
      code = `File not found: ${src}`;
    }
  }

  if (!code) {
    return <div className={styles.noSourceText}>No source code available</div>;
  }

  const transformedCode = code.replace(/@\/registry\/brook\/ui\/([^"']+)/g, "@/components/ui/$1");

  const highlightedCode = await highlightCode(transformedCode, language);
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

  if (embedded) {
    return (
      <>
        <div className={styles.header}>
          <span className={styles.title}>{displayTitle}</span>
          <CopyButton code={transformedCode} className={`header-copy-button`} />
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
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>{displayTitle}</span>
        <CopyButton code={transformedCode} className="header-copy-button" />
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
