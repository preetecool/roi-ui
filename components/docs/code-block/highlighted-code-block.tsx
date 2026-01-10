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
  filename: string;
  language?: string;
  code: string;
  collapsible?: boolean;
  buttonText?: string;
};

export async function HighlightedCodeBlock({
  filename,
  language = "tsx",
  code,
  collapsible = false,
  buttonText = "Show code",
}: HighlightedCodeBlockProps) {
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
