import { transformers } from "./shiki-transformers";

/**
 * Highlights code using Shiki.
 */
export async function highlightCode(code: string, language = "tsx"): Promise<string> {

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
