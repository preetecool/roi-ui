import { highlightCode } from "@/lib/highlight-code";
import {
  getDisplayTitle,
  loadCodeByName,
  loadCodeBySrc,
  transformCode,
} from "./component-source-helpers";
import {
  CollapsibleCodeDisplay,
  EmbeddedCodeDisplay,
  StandardCodeDisplay,
} from "./component-source-renderers";
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

  if (embedded) {
    return (
      <EmbeddedCodeDisplay
        displayTitle={displayTitle}
        transformedCode={transformedCode}
        highlightedCode={highlightedCode}
        language={language}
      />
    );
  }

  if (collapsible) {
    const codeLines = transformedCode.split("\n");
    const hasMoreLines = codeLines.length > previewLines;

    return (
      <CollapsibleCodeDisplay
        displayTitle={displayTitle}
        transformedCode={transformedCode}
        highlightedCode={highlightedCode}
        language={language}
        hasMoreLines={hasMoreLines}
        buttonText={buttonText}
        variant={variant}
      />
    );
  }

  return (
    <StandardCodeDisplay
      displayTitle={displayTitle}
      transformedCode={transformedCode}
      highlightedCode={highlightedCode}
      language={language}
      variant={variant}
    />
  );
}
