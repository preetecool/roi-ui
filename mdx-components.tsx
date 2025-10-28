import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { CodeBlock } from "@/components/code-block/code-block";
import { CodeBlockTabs } from "@/components/code-block-tabs/code-block-tabs";
import { ComponentPreview } from "@/components/component-preview/component-preview";
import { ComponentSource } from "@/components/component-source/component-source";
import { GlobalsCSS } from "@/components/globals-css";
import { HeadingAnchor } from "@/components/heading-anchor/heading-anchor";
import {
  InstallationTabs,
  InstallationTabsContent,
  InstallationTabsList,
  InstallationTabsTrigger,
} from "@/components/installation-tabs/installation-tabs";
import { MdxPre } from "@/components/mdx-pre/mdx-pre";
import { PropTable } from "@/components/prop-table/prop-table";
import { Button } from "@/registry/brook/ui/button/button";
import {
  Tabs as CustomTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/brook/ui/tabs/tabs";

type TabProps = {
  value: string;
  children: ReactNode;
  [key: string]: unknown;
};

type TabsProps = {
  items?: string[];
  children: ReactNode;
  [key: string]: unknown;
};

type CodeBlockTabProps = {
  value: string;
  children: ReactNode;
  [key: string]: unknown;
};

type CodeBlockTabsListProps = {
  children: ReactNode;
  [key: string]: unknown;
};

type CodeBlockTabsTriggerProps = {
  value: string;
  children: ReactNode;
  [key: string]: unknown;
};

export const mdxComponents = {
  h1: (props: ComponentProps<"h1">) => (
    <h1 style={{ color: "var(--docs-heading)" }} {...props} />
  ),
  h2: (props: ComponentProps<"h2">) => <HeadingAnchor level={2} {...props} />,
  h3: (props: ComponentProps<"h3">) => <HeadingAnchor level={3} {...props} />,
  h4: (props: ComponentProps<"h4">) => <HeadingAnchor level={4} {...props} />,
  p: (props: ComponentProps<"p">) => (
    <p style={{ color: "var(--foreground)" }} {...props} />
  ),
  a: (props: ComponentProps<"a">) => (
    // biome-ignore lint/nursery/useAnchorHref: href is provided via props in MDX
    <a
      style={{
        fontWeight: "500",
        textDecoration: "underline",
        textUnderlineOffset: "4px",
      }}
      {...props}
    />
  ),
  ul: (props: ComponentProps<"ul">) => <ul {...props} />,
  ol: (props: ComponentProps<"ol">) => <ol {...props} />,
  li: (props: ComponentProps<"li">) => <li {...props} />,
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote {...props} />
  ),
  code: (props: ComponentProps<"code">) => {
    if (typeof props.children === "string") {
      return <code {...props} />;
    }
    return <code {...props} />;
  },
  pre: MdxPre,

  Button,
  CodeBlock,
  ComponentPreview,
  ComponentSource,
  PropTable,
  GlobalsCSS,
  InstallationTabs,
  InstallationTabsList,
  InstallationTabsTrigger,
  InstallationTabsContent,

  Tab: ({ value, children, ...props }: TabProps) => (
    <TabsContent value={value} {...props} className="">
      {children}
    </TabsContent>
  ),
  Tabs: ({ items, children, ...props }: TabsProps) => (
    <CustomTabs defaultValue={items?.[0]} {...props}>
      <TabsList>
        {items?.map((item: string) => (
          <TabsTrigger key={item} value={item}>
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </CustomTabs>
  ),
  CodeBlockTab: ({ value, children, ...props }: CodeBlockTabProps) => (
    <TabsContent
      value={value}
      {...props}
      style={{
        margin: 0,
        padding: 0,
        border: "none",
        borderRadius: 0,
        backgroundColor: "transparent",
        position: "relative",
      }}
    >
      {children}
    </TabsContent>
  ),
  CodeBlockTabs: (props: ComponentProps<typeof CodeBlockTabs>) => (
    <CodeBlockTabs {...props} />
  ),
  CodeBlockTabsList: ({ children, ...props }: CodeBlockTabsListProps) => (
    <TabsList {...props}>{children}</TabsList>
  ),
  CodeBlockTabsTrigger: ({
    value,
    children,
    ...props
  }: CodeBlockTabsTriggerProps) => (
    <TabsTrigger value={value} {...props}>
      {children}
    </TabsTrigger>
  ),
  Link: (props: ComponentProps<typeof Link>) => (
    <Link
      style={{
        fontWeight: "500",
        textDecoration: "underline",
        textUnderlineOffset: "4px",
      }}
      {...props}
    />
  ),
};
