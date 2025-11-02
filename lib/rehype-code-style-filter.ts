import type { Element, ElementContent, Parent, Properties, Root } from "hast";
import { visit } from "unist-util-visit";

export default function rehypeCodeStyleFilter() {
  return (tree: Root) => {
    visit(
      tree,
      "element",
      (node: Element, index?: number | null, parent?: Parent) => {
        const firstChild = node.children?.[0];
        if (
          node.tagName === "pre" &&
          firstChild &&
          "tagName" in firstChild &&
          firstChild.tagName === "code"
        ) {
          const code = firstChild as Element;

          // Wrap pre in .code-container div
          const wrapperProperties: Properties = {
            className: ["code-container"],
          };

          // Extract text content from code block
          let textContent = "";
          if (code.children && code.children.length > 0) {
            const extractText = (children: any[]): string =>
              children
                .map((child) => {
                  if (child.type === "text") return child.value;
                  if (child.type === "element" && child.children) {
                    return extractText(child.children);
                  }
                  return "";
                })
                .join("");
            textContent = extractText(code.children);
          }

          // Check for style condition from remark plugin (if= meta attribute)
          // The remark plugin sets styleCondition on the code block node (which becomes <pre>)
          const styleCondition =
            (node.data as any)?.styleCondition ||
            (code.data as any)?.styleCondition;
          if (styleCondition) {
            wrapperProperties["data-if"] = styleCondition;
          } else {
            // Fallback: Detect style based on command content
            if (textContent.includes("shadcn@latest add")) {
              if (textContent.includes("-tailwind")) {
                wrapperProperties["data-if"] = "tailwind";
              } else if (textContent.match(/@roiui\/\w+(?!-tailwind)/)) {
                wrapperProperties["data-if"] = "css-modules";
              }
            }
          }

          const wrapper: Element = {
            type: "element",
            tagName: "div",
            properties: wrapperProperties,
            children: [node],
          };

          if (parent && typeof index === "number") {
            parent.children[index] = wrapper as ElementContent;
          }
        }
      }
    );
  };
}
