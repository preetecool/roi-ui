import { defineConfig, defineDocs, frontmatterSchema } from "fumadocs-mdx/config";
import { rehypeToc } from "fumadocs-core/mdx-plugins";
import rehypePrettyCode from "rehype-pretty-code";
import { transformers, getShikiHighlighter } from "@/lib/highlight-code";
import { z } from "zod";

export default defineConfig({
  mdxOptions: {
    rehypePlugins: [
      rehypeToc,
      [
        rehypePrettyCode,
        {
          getHighlighter: getShikiHighlighter,
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
          transformers,
          defaultLang: "tsx",
        },
      ],
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
    }),
  },
});
