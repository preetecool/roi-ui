import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

export function withCodeTabsStyle<P extends object>(
  Component: ComponentType<P & { className?: string }>,
  additionalClassName?: string
) {
  return function StyledComponent(props: P & { className?: string }) {
    return <Component {...props} className={cn(additionalClassName, props.className)} />;
  };
}
