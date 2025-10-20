"use client";

import { cn } from "@/lib/utils";
import { Toolbar } from "@base-ui-components/react/toolbar";
import styles from "./toolbar.module.css";

function ToolbarRoot({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof Toolbar.Root>) {
  return (
    <Toolbar.Root
      className={cn(
        styles.root,
        orientation === "vertical" && styles.vertical,
        className,
      )}
      orientation={orientation}
      {...props}
    />
  );
}

function ToolbarButton({
  className,
  ...props
}: React.ComponentProps<typeof Toolbar.Button>) {
  return <Toolbar.Button className={cn(styles.button, className)} {...props} />;
}

function ToolbarLink({
  className,
  ...props
}: React.ComponentProps<typeof Toolbar.Link>) {
  return <Toolbar.Link className={cn(styles.link, className)} {...props} />;
}

function ToolbarInput({
  className,
  ...props
}: React.ComponentProps<typeof Toolbar.Input>) {
  return <Toolbar.Input className={cn(styles.input, className)} {...props} />;
}

function ToolbarGroup({
  className,
  ...props
}: React.ComponentProps<typeof Toolbar.Group>) {
  return <Toolbar.Group className={cn(styles.group, className)} {...props} />;
}

function ToolbarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Toolbar.Separator>) {
  return (
    <Toolbar.Separator className={cn(styles.separator, className)} {...props} />
  );
}

export {
  ToolbarRoot as Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator,
};
