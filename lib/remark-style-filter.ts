import { visit } from "unist-util-visit";
import type { Root, Code } from "mdast";

export default function remarkStyleFilter() {
  return (tree: Root) => {
    visit(tree, "code", (node: Code) => {
      // Check if this code block has if= meta (for style-based conditional rendering)
      if (node.meta) {
        const match = node.meta.match(/\bif=(\S+)\b/);
        if (match) {
          const condition = match[1];
          // Store the condition in a custom data field that won't be overwritten
          node.data = node.data || {};
          (node.data as any).styleCondition = condition;
        }
      }
    });
  };
}
