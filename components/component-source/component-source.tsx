import { highlightCode } from "@/lib/highlight-code";
import styles from "./component-source.module.css";
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
        highlightedCode={highlightedCode}
        language={language}
        transformedCode={transformedCode}
      />
    );
  }

  if (collapsible) {
    const codeLines = transformedCode.split("\n");
    const hasMoreLines = codeLines.length > previewLines;

    return (
      <CollapsibleCodeDisplay
        buttonText={buttonText}
        displayTitle={displayTitle}
        hasMoreLines={hasMoreLines}
        highlightedCode={highlightedCode}
        language={language}
        transformedCode={transformedCode}
        variant={variant}
      />
    );
  }

  return (
    <StandardCodeDisplay
      displayTitle={displayTitle}
      highlightedCode={highlightedCode}
      language={language}
      transformedCode={transformedCode}
      variant={variant}
    />
  );
}
