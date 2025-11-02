import rehypeShiki from "@shikijs/rehype";
import { rehypeToc, remarkNpm } from "fumadocs-core/mdx-plugins";
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { getSingletonHighlighter } from "shiki";
import { z } from "zod";
import { transformers } from "@/lib/highlight-code";
import remarkStyleFilter from "./lib/remark-style-filter";
import rehypeCodeStyleFilter from "./lib/rehype-code-style-filter";

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkStyleFilter, remarkNpm],
    rehypePlugins: [
      rehypeToc,
      [
        rehypeShiki,
        {
          getHighlighter: () =>
            getSingletonHighlighter({
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
            }),
          themes: {
            dark: "github-dark",
            light: "github-light",
          },
          transformers,
          defaultLang: "tsx",
          inline: "tailing-curly-colon",
        },
      ],
      rehypeCodeStyleFilter,
    ],
  },
});

export const docs = defineDocs({
  dir: "./content",
  docs: {
    schema: frontmatterSchema.extend({
      links: z
        .object({
          doc: z.string().optional(),
          api: z.string().optional(),
        })
        .optional(),
      components: z.array(z.string()).optional(),
      motion: z.boolean().optional(),
    }),
  },
});
