import type { PageTree } from "fumadocs-core/server";
import type { SearchGroup, SearchPage } from "./search";

/**
 * Formats a heading by capitalizing words appropriately
 * Special case: "ui" -> "UI"
 */
export const formatHeading = (text: string): string =>
  text
    .split(" / ")
    .map((part) => {
      if (part.toLowerCase() === "ui") {
        return "UI";
      }
      return part
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    })
    .join(" / ");

/**
 * Builds a hierarchical path for headings
 */
export const buildHeadingPath = (
  parentName: string,
  nodeName: string
): string => (parentName ? `${parentName} / ${nodeName}` : nodeName);

/**
 * Extracts page nodes from children array
 */
export const extractPagesFromChildren = (
  children: PageTree.Node[]
): SearchPage[] => {
  const pages: SearchPage[] = [];

  for (const child of children) {
    if (child.type === "page" && child.url) {
      pages.push({
        name: child.name?.toString() || "",
        url: child.url,
      });
    }
  }

  return pages;
};

/**
 * Recursively collects groups from child folders
 */
const collectChildFolderGroups = (
  children: PageTree.Node[],
  currentPath: string
): SearchGroup[] => {
  const groups: SearchGroup[] = [];

  for (const child of children) {
    if (child.type === "folder") {
      const childGroups = collectGroups(child, currentPath);
      groups.push(...childGroups);
    }
  }

  return groups;
};

/**
 * Recursively collects all groups from the page tree
 */
export const collectGroups = (
  node: PageTree.Node,
  parentName = ""
): SearchGroup[] => {
  const groups: SearchGroup[] = [];

  if (node.type !== "folder" || !node.children) {
    return groups;
  }

  const nodeName = node.name?.toString() || "";
  const pages = extractPagesFromChildren(node.children);

  if (pages.length > 0) {
    const rawHeading = buildHeadingPath(parentName, nodeName);
    const heading = formatHeading(rawHeading);
    groups.push({ heading, pages });
  }

  const currentPath = buildHeadingPath(parentName, nodeName);
  const childGroups = collectChildFolderGroups(node.children, currentPath);
  groups.push(...childGroups);

  return groups;
};

/**
 * Flattens the entire page tree into search groups
 */
export const buildSearchGroups = (
  treeChildren: PageTree.Node[]
): SearchGroup[] => treeChildren.flatMap((topLevel) => collectGroups(topLevel));
