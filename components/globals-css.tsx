import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CodeBlock } from "./code-block/code-block";

export function GlobalsCSS() {
  const cssContent = readFileSync(
    join(process.cwd(), "styles/globals.css"),
    "utf8",
  );

  return <CodeBlock code={cssContent} filename="globals.css" language="css" />;
}
