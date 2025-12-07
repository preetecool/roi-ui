import { cacheLife } from "next/cache";
import { transformers } from "./shiki-transformers";

/**
 * Highlights code using Shiki with caching.
 * Cache is based on code content + language.
 */
export async function highlightCode(
  code: string,
  language = "tsx"
): Promise<string> {
  "use cache";
  cacheLife("max");

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
