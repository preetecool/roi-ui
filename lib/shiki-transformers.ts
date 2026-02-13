import type { ShikiTransformer } from "shiki";

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

export const removePreBackgroundTransformer: ShikiTransformer = {
  name: "remove-pre-background",
  pre(node) {
    if (node.properties.style && typeof node.properties.style === "string") {
      node.properties.style = node.properties.style.replace(/background-color:[^;]+;?/g, "").trim() || undefined;
    }
  },
};

export const transformers = [packageManagerTransformer, lineNumbersTransformer, removePreBackgroundTransformer] as ShikiTransformer[];
