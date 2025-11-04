import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

/**
 * Higher Order Component that adds code-specific styling to tab components
 *
 * @example
 * import codeTabsStyles from "@/components/code-tabs/code-tabs-shared.module.css"
 * const CodeTabsList = withCodeTabsStyle(TabsList, codeTabsStyles.header)
 * const CodeTabsContent = withCodeTabsStyle(TabsContent, codeTabsStyles.content)
 */
export function withCodeTabsStyle<P extends object>(
  Component: ComponentType<P & { className?: string }>,
  additionalClassName?: string
) {
  return function StyledComponent(props: P & { className?: string }) {
    return (
      <Component
        {...props}
        className={cn(additionalClassName, props.className)}
      />
    );
  };
}
