"use client";

import { Toolbar } from "@base-ui-components/react/toolbar";
import { cn } from "@/lib/utils";
import styles from "./toolbar.module.css";

const ToolbarRoot = ({ 
  className, 
  orientation = "horizontal",
  ...props 
}: React.ComponentProps<typeof Toolbar.Root>) => (
  <Toolbar.Root 
    className={cn(styles.root, orientation === "vertical" && styles.vertical, className)} 
    orientation={orientation}
    {...props} 
  />
);

const ToolbarButton = ({ 
  className, 
  ...props 
}: React.ComponentProps<typeof Toolbar.Button>) => (
  <Toolbar.Button className={cn(styles.button, className)} {...props} />
);

const ToolbarLink = ({ 
  className, 
  ...props 
}: React.ComponentProps<typeof Toolbar.Link>) => (
  <Toolbar.Link className={cn(styles.link, className)} {...props} />
);

const ToolbarInput = ({ 
  className, 
  ...props 
}: React.ComponentProps<typeof Toolbar.Input>) => (
  <Toolbar.Input className={cn(styles.input, className)} {...props} />
);

const ToolbarGroup = ({ 
  className, 
  ...props 
}: React.ComponentProps<typeof Toolbar.Group>) => (
  <Toolbar.Group className={cn(styles.group, className)} {...props} />
);

const ToolbarSeparator = ({ 
  className, 
  ...props 
}: React.ComponentProps<typeof Toolbar.Separator>) => (
  <Toolbar.Separator className={cn(styles.separator, className)} {...props} />
);

export {
  ToolbarRoot as Toolbar,
  ToolbarButton,
  ToolbarLink,
  ToolbarInput,
  ToolbarGroup,
  ToolbarSeparator,
};