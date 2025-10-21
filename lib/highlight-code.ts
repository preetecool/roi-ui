import type {
  BundledLanguage,
  BundledTheme,
  HighlighterGeneric,
  ShikiTransformer,
} from "shiki";

export const packageManagerTransformer: ShikiTransformer = {
  name: "package-manager",
  code(node) {
    if (node.tagName === "code") {
      const raw = this.source;
      node.properties.__raw__ = raw;

      if (raw.startsWith("npm install")) {
        node.properties.__npm__ = raw;
        node.properties.__yarn__ = raw.replace("npm install", "yarn add");
        node.properties.__pnpm__ = raw.replace("npm install", "pnpm add");
        node.properties.__bun__ = raw.replace("npm install", "bun add");
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
  var __SHIKI_HIGHLIGHTER__:
    | HighlighterGeneric<BundledLanguage, BundledTheme>
    | undefined;
  var __SHIKI_PROMISE__:
    | Promise<HighlighterGeneric<BundledLanguage, BundledTheme>>
    | undefined;
  var __SHIKI_INSTANCE_COUNT__: number;
}

if (typeof globalThis.__SHIKI_INSTANCE_COUNT__ === "undefined") {
  globalThis.__SHIKI_INSTANCE_COUNT__ = 0;
}

async function getHighlighter() {
  if (!globalThis.__SHIKI_HIGHLIGHTER__) {
    if (!globalThis.__SHIKI_PROMISE__) {
      const { createHighlighter } = await import("shiki");

      globalThis.__SHIKI_INSTANCE_COUNT__++;

      globalThis.__SHIKI_PROMISE__ = createHighlighter({
        themes: ["github-light", "github-dark"],
        langs: [
          "tsx",
          "jsx",
          "css",
          "bash",
          "json",
          "typescript",
          "javascript",
        ],
      });
    }
    globalThis.__SHIKI_HIGHLIGHTER__ = await globalThis.__SHIKI_PROMISE__;
  }
  return globalThis.__SHIKI_HIGHLIGHTER__;
}

export async function highlightCode(
  code: string,
  language = "tsx"
): Promise<string> {
  // Use getSingletonHighlighter to ensure we share the same instance globally
  const { getSingletonHighlighter } = await import("shiki");

  const highlighter = await getSingletonHighlighter({
    themes: ["github-light", "github-dark"],
    langs: ["tsx", "jsx", "css", "bash", "json", "typescript", "javascript"],
  });

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

export async function getShikiHighlighter(_options?: unknown) {
  const highlighter = await getHighlighter();

  return highlighter;
}

// Dispose function for cleanup
export function disposeHighlighter() {
  if (globalThis.__SHIKI_HIGHLIGHTER__) {
    globalThis.__SHIKI_HIGHLIGHTER__.dispose();
    globalThis.__SHIKI_HIGHLIGHTER__ = undefined;
    globalThis.__SHIKI_PROMISE__ = undefined;
    globalThis.__SHIKI_INSTANCE_COUNT__ = 0;
  }
}
