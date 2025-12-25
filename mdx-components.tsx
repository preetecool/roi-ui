import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { HighlightedCodeBlock as CodeBlock } from "@/components/docs/code-block/highlighted-code-block";
import { CodeTabs, CodeTabsContent, CodeTabsList, CodeTabsTrigger } from "@/components/docs/code-tabs/code-tabs";
import { PackageManagerCodeTabs } from "@/components/docs/code-tabs/package-manager-code-tabs";
import { ComponentPreview } from "@/components/docs/component-preview/component-preview";
import { ComponentSource } from "@/components/docs/component-source/component-source";
import { ComponentsGrid } from "@/components/docs/components-grid/components-grid";
import { GlobalsCSS } from "@/components/docs/globals-css";
import { HeadingAnchor } from "@/components/docs/heading-anchor/heading-anchor";
import { PropTable } from "@/components/docs/prop-table/prop-table";
import { Button } from "@/registry/brook/ui/button/button";
import { Tabs as CustomTabs, TabsContent, TabsList, TabsTrigger } from "@/registry/brook/ui/tabs/tabs";

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

export const mdxComponents = {
  h1: (props: ComponentProps<"h1">) => <h1 style={{ color: "var(--docs-heading)" }} {...props} />,
  h2: (props: ComponentProps<"h2">) => <HeadingAnchor level={2} {...props} />,
  h3: (props: ComponentProps<"h3">) => <HeadingAnchor level={3} {...props} />,
  h4: (props: ComponentProps<"h4">) => <HeadingAnchor level={4} {...props} />,
  p: (props: ComponentProps<"p">) => <p style={{ color: "var(--foreground)" }} {...props} />,
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
  blockquote: (props: ComponentProps<"blockquote">) => <blockquote {...props} />,
  code: (props: ComponentProps<"code">) => {
    if (typeof props.children === "string") {
      return <code {...props} />;
    }
    return <code {...props} />;
  },

  Button,
  CodeBlock,
  ComponentPreview,
  ComponentSource,
  ComponentsGrid,
  PropTable,
  GlobalsCSS,

  // Installation tabs (CLI/Manual)
  InstallationTabs: (props: ComponentProps<typeof CodeTabs>) => <CodeTabs variant="installation" {...props} />,
  InstallationTabsList: CodeTabsList,
  InstallationTabsTrigger: CodeTabsTrigger,
  InstallationTabsContent: CodeTabsContent,

  // Package manager tabs (npm/pnpm) - synced with PackageManagerProvider
  CodeBlockTabs: PackageManagerCodeTabs,

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
  CodeBlockTab: CodeTabsContent,
  CodeBlockTabsList: CodeTabsList,
  CodeBlockTabsTrigger: CodeTabsTrigger,
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
