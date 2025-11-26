import type { source } from "./source";

export type Source = typeof source;
export type PageTree = Source["pageTree"];
export type Page = ReturnType<Source["getPage"]>;

export namespace PageTree {
  export type Root = Source["pageTree"];
  export type Node = Root["children"][number];
  export type Item = Extract<Node, { type: "page" }>;
  export type Folder = Extract<Node, { type: "folder" }>;
}
