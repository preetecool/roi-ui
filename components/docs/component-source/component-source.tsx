import {
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockRoot,
} from "@/components/docs/code-block/code-block";
import { CodeBlockCollapse } from "@/components/docs/code-block-collapse/code-block-collapse";
import { highlightCode } from "@/lib/highlight-code";
import { cn } from "@/lib/utils";
import styles from "./component-source.module.css";
import { ComponentSourceClient } from "./component-source-client";
import { getDisplayTitle, loadAllVariants, loadCodeByName, loadCodeBySrc } from "./helpers/file-loaders";
import { processVariants, transformCode } from "./helpers/process-files";

type ComponentSourceProps = {
  name?: string;
  src?: string;
  title?: string;
  language?: string;
  embedded?: boolean;
};

export async function ComponentSource({ name, src, title, language = "tsx", embedded = false }: ComponentSourceProps) {
  if (!(name || src)) {
    return null;
  }

  if (name) {
    const processedVariants = await processVariants(await loadAllVariants(name));

    if (processedVariants.length > 0) {
      return <ComponentSourceClient variants={processedVariants} />;
    }
  }

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
    <CodeBlockRoot
      className={cn(styles.container, embedded && styles.embedded)}
      code={transformedCode}
      highlightedCode={highlightedCode}
    >
      <CodeBlockHeader>
        <CodeBlockFilename>{displayTitle}</CodeBlockFilename>
        <CodeBlockActions>
          <CodeBlockCopyButton />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockCollapse>
        <CodeBlockContent className={styles.codeContainer} />
      </CodeBlockCollapse>
    </CodeBlockRoot>
  );
}
