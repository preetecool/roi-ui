import { readFileSync } from 'fs';
import { join } from 'path';
import { CodeBlock } from './code-block/code-block';

export function GlobalsCSS() {
  const cssContent = readFileSync(join(process.cwd(), 'styles/globals.css'), 'utf8');
  
  return (
    <CodeBlock
      filename="globals.css"
      language="css"
      code={cssContent}
    />
  );
}