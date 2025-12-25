"use client";

import { createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/registry/brook/ui/copy-button/copy-button";
import styles from "./code-block.module.css";

type CodeBlockContextValue = {
  code: string;
  highlightedCode: string;
};

const CodeBlockContext = createContext<CodeBlockContextValue | null>(null);

function useCodeBlock() {
  const context = useContext(CodeBlockContext);
  if (!context) {
    throw new Error("CodeBlock components must be used within CodeBlock.Root");
  }
  return context;
}

export type CodeBlockRootProps = React.ComponentProps<"div"> & {
  /** Raw code string for copying. */
  code: string;
  /** Pre-highlighted HTML from Shiki. */
  highlightedCode: string;
};

/** Root component. Provides context with code and highlighted output. */
function Root({ code, highlightedCode, className, children, ...props }: CodeBlockRootProps) {
  return (
    <CodeBlockContext.Provider value={{ code, highlightedCode }}>
      <div className={cn(styles.container, className)} data-slot="code-block" {...props}>
        {children}
      </div>
    </CodeBlockContext.Provider>
  );
}

export type CodeBlockHeaderProps = React.ComponentProps<"div">;

/** Header bar. Contains filename and actions. */
function Header({ className, children, ...props }: CodeBlockHeaderProps) {
  return (
    <div className={cn(styles.header, className)} data-slot="code-block-header" {...props}>
      {children}
    </div>
  );
}

export type CodeBlockFilenameProps = React.ComponentProps<"span">;

/** Displays the filename or title. */
function Filename({ className, children, ...props }: CodeBlockFilenameProps) {
  return (
    <span className={cn(styles.filename, className)} data-slot="code-block-filename" {...props}>
      {children}
    </span>
  );
}

export type CodeBlockCopyButtonProps = Omit<React.ComponentProps<typeof CopyButton>, "code">;

/** Copy button. Automatically uses code from context. */
function CopyBtn({ className, ...props }: CodeBlockCopyButtonProps) {
  const { code } = useCodeBlock();
  return (
    <div className={cn(styles.copyButtonWrapper, className)}>
      <CopyButton code={code} {...props} />
    </div>
  );
}

export type CodeBlockContentProps = Omit<React.ComponentProps<"div">, "children">;

/** Code content. Renders the highlighted code. */
function Content({ className, ...props }: CodeBlockContentProps) {
  const { highlightedCode } = useCodeBlock();
  return (
    <div
      className={cn(styles.content, "code-container", className)}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Shiki syntax highlighting
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
      data-slot="code-block-content"
      {...props}
    />
  );
}

export type CodeBlockCollapsibleProps = React.ComponentProps<"details">;

/** Collapsible wrapper. Uses native details/summary. */
function Collapsible({ className, children, ...props }: CodeBlockCollapsibleProps) {
  return (
    <details className={cn(styles.details, className)} data-slot="code-block-collapsible" {...props}>
      {children}
    </details>
  );
}

export type CodeBlockSummaryProps = React.ComponentProps<"summary">;

/** Summary trigger for collapsible. */
function Summary({ className, children, ...props }: CodeBlockSummaryProps) {
  return (
    <summary className={cn(styles.summary, className)} data-slot="code-block-summary" {...props}>
      {children}
    </summary>
  );
}

export type CodeBlockActionsProps = React.ComponentProps<"div">;

/** Actions container. Wraps copy button and other actions. */
function Actions({ className, children, ...props }: CodeBlockActionsProps) {
  return (
    <div className={cn(styles.actions, className)} data-slot="code-block-actions" {...props}>
      {children}
    </div>
  );
}

/**
 * Composable code block component with syntax highlighting support.
 *
 * Required: CodeBlock.Root (with pre-highlighted code)
 * Structure: CodeBlock.Header, CodeBlock.Filename, CodeBlock.Actions, CodeBlock.CopyButton, CodeBlock.Content
 * Optional: CodeBlock.Collapsible, CodeBlock.Summary
 *
 * @example
 * ```tsx
 * <CodeBlock.Root code={code} highlightedCode={highlighted}>
 *   <CodeBlock.Header>
 *     <CodeBlock.Filename>button.tsx</CodeBlock.Filename>
 *     <CodeBlock.Actions>
 *       <CodeBlock.CopyButton />
 *     </CodeBlock.Actions>
 *   </CodeBlock.Header>
 *   <CodeBlock.Content />
 * </CodeBlock.Root>
 * ```
 */
export const CodeBlock = {
  Root,
  Header,
  Filename,
  CopyButton: CopyBtn,
  Content,
  Collapsible,
  Summary,
  Actions,
};

// Named exports for server component compatibility
export {
  Root as CodeBlockRoot,
  Header as CodeBlockHeader,
  Filename as CodeBlockFilename,
  CopyBtn as CodeBlockCopyButton,
  Content as CodeBlockContent,
  Collapsible as CodeBlockCollapsible,
  Summary as CodeBlockSummary,
  Actions as CodeBlockActions,
  useCodeBlock,
};
