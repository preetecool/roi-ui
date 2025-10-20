import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { CodeBlock } from "@/components/code-block/code-block";
import { CodeBlockTabs } from "@/components/code-block-tabs/code-block-tabs";
import { ComponentPreview } from "@/components/component-preview/component-preview";
import { ComponentSource } from "@/components/component-source/component-source";
import { GlobalsCSS } from "@/components/globals-css";
import {
  InstallationTabs,
  InstallationTabsContent,
  InstallationTabsList,
  InstallationTabsTrigger,
} from "@/components/installation-tabs/installation-tabs";
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
  h2: (props: ComponentProps<"h2">) => {
    const id = props.children
      ?.toString()
      .replace(/ /g, "-")
      .replace(/'/g, "")
      .replace(/\?/g, "")
      .toLowerCase();
    return <h2 id={id} style={{ color: "var(--docs-heading)" }} {...props} />;
  },
  h3: (props: ComponentProps<"h3">) => (
    <h3 style={{ color: "var(--docs-heading)" }} {...props} />
  ),
  h4: (props: ComponentProps<"h4">) => (
    <h4 style={{ color: "var(--docs-heading)" }} {...props} />
  ),
  p: (props: ComponentProps<"p">) => (
    <p style={{ color: "var(--foreground)" }} {...props} />
  ),
  a: (props: ComponentProps<"a">) => (
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
  pre: (props: ComponentProps<"pre"> & { icon?: string; title?: string }) => {
    const { icon, title, children, ...rest } = props;

    return (
      <div
        style={
          title
            ? {
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
              }
            : undefined
        }
      >
        {title && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 16px",
              backgroundColor: "var(--card)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: "400",
                fontFamily: "monospace",
                color: "var(--muted-foreground)",
              }}
            >
              {title}
            </span>
            {icon && (
              <div
                dangerouslySetInnerHTML={{ __html: icon }}
                style={{ opacity: "0.6" }}
              />
            )}
          </div>
        )}
        <div
          className="code-container"
          style={{
            maxHeight: "400px",
            boxSizing: "border-box",
            overflow: "auto",
            position: "relative",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <pre {...rest} style={{ margin: 0, padding: "1rem" }}>
            {children}
          </pre>
        </div>
      </div>
    );
  },

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
  CodeBlockTabs,
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
