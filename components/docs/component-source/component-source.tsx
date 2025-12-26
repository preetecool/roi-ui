import { cacheLife } from "next/cache";
import { CodeBlock } from "@/components/docs/code-block/code-block";
import { highlightCode } from "@/lib/highlight-code";
import { cn } from "@/lib/utils";
import styles from "./component-source.module.css";
import { ComponentSourceClient } from "./component-source-client";
import { getCachedVariants } from "./helpers/cached-processors";
import { getDisplayTitle, loadCodeByName, loadCodeBySrc } from "./helpers/file-loaders";
import { transformCode } from "./helpers/process-files";

type ComponentSourceProps = {
  name?: string;
  src?: string;
  title?: string;
  language?: string;
  embedded?: boolean;
  collapsible?: boolean;
};

export async function ComponentSource({ name, src, title, language = "tsx", embedded = false }: ComponentSourceProps) {
  "use cache";
  cacheLife("max");
  if (!(name || src)) {
    return null;
  }

  if (name) {
    const processedVariants = await getCachedVariants(name);

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
    <CodeBlock.Root
      className={cn(styles.container, embedded && styles.embedded)}
      code={transformedCode}
      highlightedCode={highlightedCode}
    >
      <CodeBlock.Header>
        <CodeBlock.Filename>{displayTitle}</CodeBlock.Filename>
        <CodeBlock.Actions>
          <CodeBlock.CopyButton />
        </CodeBlock.Actions>
      </CodeBlock.Header>
      <CodeBlock.Content className={styles.codeContainer} />
    </CodeBlock.Root>
  );
}
