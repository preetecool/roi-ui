import type { Element, ElementContent, Parent, Properties, Root } from "hast";
import { visit } from "unist-util-visit";

const CSS_MODULES_INSTALL = /@roiui\/\w+(?!-tailwind)/;

type StyleData = { styleCondition?: string } | undefined;

function extractText(children: ElementContent[]): string {
  return children
    .map((child) => {
      if (child.type === "text") {
        return child.value;
      }
      if (child.type === "element") {
        return extractText(child.children);
      }
      return "";
    })
    .join("");
}

export default function rehypeCodeStyleFilter() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index?: number | null, parent?: Parent) => {
      const firstChild = node.children?.[0];
      if (node.tagName === "pre" && firstChild && "tagName" in firstChild && firstChild.tagName === "code") {
        const code = firstChild as Element;

        // Wrap pre in .code-container div
        const wrapperProperties: Properties = {
          className: ["code-container"],
        };

        const textContent = extractText(code.children);

        // Check for style condition from remark plugin (if= meta attribute)
        // The remark plugin sets styleCondition on the code block node (which becomes <pre>)
        const styleCondition = (node.data as StyleData)?.styleCondition || (code.data as StyleData)?.styleCondition;
        if (styleCondition) {
          wrapperProperties["data-if"] = styleCondition;
        } else if (textContent.includes("shadcn@latest add")) {
          // Fallback: Detect style based on command content
          if (textContent.includes("-tailwind")) {
            wrapperProperties["data-if"] = "tailwind";
          } else if (CSS_MODULES_INSTALL.test(textContent)) {
            wrapperProperties["data-if"] = "css-modules";
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
    });
  };
}
