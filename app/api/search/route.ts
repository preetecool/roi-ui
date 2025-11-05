import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

export const { GET } = createFromSource(
  source,
  (page) => {
    // Custom page indexing function
    // Since body is not loaded in getPages(), we index based on metadata only
    return {
      id: page.url,
      title: page.data.title || "",
      description: page.data.description || "",
      url: page.url,
      structuredData: {
        headings: [],
        contents: [
          {
            heading: page.data.title || "",
            content: page.data.description || "",
          },
        ],
      },
    };
  },
  {
    language: "english",
  }
);
