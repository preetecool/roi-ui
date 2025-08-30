import type { ShikiTransformer, HighlighterGeneric, BundledLanguage, BundledTheme } from "shiki";

export const packageManagerTransformer: ShikiTransformer = {
  name: "package-manager",
  code(node) {
    if (node.tagName === "code") {
      const raw = this.source;
      node.properties["__raw__"] = raw;

      if (raw.startsWith("npm install")) {
        node.properties["__npm__"] = raw;
        node.properties["__yarn__"] = raw.replace("npm install", "yarn add");
        node.properties["__pnpm__"] = raw.replace("npm install", "pnpm add");
        node.properties["__bun__"] = raw.replace("npm install", "bun add");
      }
    }
  },
};

export const lineNumbersTransformer: ShikiTransformer = {
  name: "line-numbers",
  pre(node) {
    node.properties["data-line-numbers"] = "";
  },
  code(node) {
    node.properties["data-line-numbers"] = "";
  },
  line(node, line) {
    node.properties["data-line"] = "";
    node.properties["data-line-number"] = line;
  },
};

export const transformers = [
  packageManagerTransformer,
  lineNumbersTransformer,
] as ShikiTransformer[];

declare global {
  var highlighterInstance: HighlighterGeneric<BundledLanguage, BundledTheme> | undefined;
}

async function getHighlighter() {
  if (!globalThis.highlighterInstance) {
    const { createHighlighter } = await import("shiki");
    globalThis.highlighterInstance = await createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["tsx", "jsx", "css", "bash", "json", "typescript", "javascript"],
    });
  }
  return globalThis.highlighterInstance;
}

export async function highlightCode(
  code: string,
  language: string = "tsx"
): Promise<string> {
  const highlighter = await getHighlighter();

  const html = highlighter.codeToHtml(code, {
    lang: language,
    themes: {
      dark: "github-dark",
      light: "github-light",
    },
    defaultColor: false,
    transformers,
  });

  return html;
}

export async function getShikiHighlighter() {
  return await getHighlighter();
}
