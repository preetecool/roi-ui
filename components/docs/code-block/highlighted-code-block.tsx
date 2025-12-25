import { cacheLife } from "next/cache";
import { highlightCode } from "@/lib/highlight-code";
import {
  CodeBlockActions,
  CodeBlockCollapsible,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockRoot,
  CodeBlockSummary,
} from "./code-block";
import styles from "./code-block.module.css";

type HighlightedCodeBlockProps = {
  /** Filename to display in header. */
  filename: string;
  /** Code language for syntax highlighting. @default "tsx" */
  language?: string;
  /** Raw code string. */
  code: string;
  /** Wrap in collapsible details element. @default false */
  collapsible?: boolean;
  /** Button text for collapsible trigger. @default "Show code" */
  buttonText?: string;
};

/**
 * Async server component that handles syntax highlighting.
 * Convenience wrapper around the composable CodeBlock.
 */
export async function HighlightedCodeBlock({
  filename,
  language = "tsx",
  code,
  collapsible = false,
  buttonText = "Show code",
}: HighlightedCodeBlockProps) {
  "use cache";
  cacheLife("max");

  const highlightedCode = await highlightCode(code, language);

  const codeBlock = (
    <CodeBlockRoot code={code} highlightedCode={highlightedCode}>
      <CodeBlockHeader>
        <CodeBlockFilename>{filename}</CodeBlockFilename>
        <CodeBlockActions>
          <CodeBlockCopyButton />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent />
    </CodeBlockRoot>
  );

  if (collapsible) {
    return (
      <CodeBlockCollapsible>
        <CodeBlockSummary>{buttonText}</CodeBlockSummary>
        <div className={styles.containerCollapsible}>{codeBlock}</div>
      </CodeBlockCollapsible>
    );
  }

  return codeBlock;
}
