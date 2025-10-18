"use client";

import { cn } from "@/lib/utils";
import { Select } from "@base-ui-components/react/select";
import { Check, ChevronDown } from "lucide-react";
import styles from "./select.module.css";

const SelectRoot = ({ ...props }: React.ComponentProps<typeof Select.Root>) => <Select.Root {...props} />;

const SelectTrigger = ({ className, children, ...props }: React.ComponentProps<typeof Select.Trigger>) => (
  <Select.Trigger className={cn(styles.trigger, className)} nativeButton {...props}>
    {children}
  </Select.Trigger>
);

const SelectValue = ({ className, children, ...props }: React.ComponentProps<typeof Select.Value>) => (
  <Select.Value className={cn(styles.value, className)} {...props}>
    {children}
  </Select.Value>
);

const SelectIcon = ({ className, children, ...props }: React.ComponentProps<typeof Select.Icon>) => (
  <Select.Icon className={cn(styles.icon, className)} {...props}>
    {children || <ChevronDown size={16} />}
  </Select.Icon>
);

const SelectPortal = ({ ...props }: React.ComponentProps<typeof Select.Portal>) => (
  <Select.Portal {...props} />
);

const SelectOverlay = ({ className, ...props }: React.ComponentProps<typeof Select.Backdrop>) => (
  <Select.Backdrop className={cn(styles.backdrop, className)} {...props} />
);

const SelectPositioner = ({ className, ...props }: React.ComponentProps<typeof Select.Positioner>) => (
  <Select.Positioner className={cn(styles.positioner, className)} {...props} />
);

const SelectScrollUpArrow = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Select.ScrollUpArrow>) => (
  <Select.ScrollUpArrow className={cn(styles.scrollArrow, className)} {...props}>
    {children || <ChevronDown size={16} style={{ transform: "rotate(180deg)" }} />}
  </Select.ScrollUpArrow>
);

const SelectPopup = ({ className, ...props }: React.ComponentProps<typeof Select.Popup>) => (
  <Select.Popup className={cn(styles.popup, className)} {...props} />
);

const SelectArrow = ({ className, ...props }: React.ComponentProps<typeof Select.Arrow>) => (
  <Select.Arrow className={cn(styles.arrow, className)} {...props} />
);

const SelectScrollDownArrow = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Select.ScrollDownArrow>) => (
  <Select.ScrollDownArrow className={cn(styles.scrollArrow, className)} {...props}>
    {children || <ChevronDown size={16} />}
  </Select.ScrollDownArrow>
);

const SelectList = ({ className, ...props }: React.ComponentProps<typeof Select.List>) => (
  <Select.List className={cn(styles.list, className)} {...props} />
);

const SelectItem = ({ className, ...props }: React.ComponentProps<typeof Select.Item>) => (
  <Select.Item className={cn(styles.item, className)} {...props} />
);

const SelectItemText = ({ className, ...props }: React.ComponentProps<typeof Select.ItemText>) => (
  <Select.ItemText className={cn(styles.itemText, className)} {...props} />
);

const SelectGroup = ({ className, ...props }: React.ComponentProps<typeof Select.Group>) => (
  <Select.Group className={cn(styles.selectGroup, className)} {...props} />
);

const SelectGroupLabel = ({ className, ...props }: React.ComponentProps<typeof Select.GroupLabel>) => (
  <Select.GroupLabel className={cn(styles.groupLabel, className)} {...props} />
);

const SelectSeparator = ({ className, ...props }: React.ComponentProps<typeof Select.Separator>) => (
  <Select.Separator className={cn(styles.separator, className)} {...props} />
);

const SelectItemIndicator = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Select.ItemIndicator>) => (
  <Select.ItemIndicator className={cn(styles.indicator, className)} {...props}>
    {children || <Check size={16} />}
  </Select.ItemIndicator>
);

export {
  SelectArrow,
  SelectGroup,
  SelectGroupLabel,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectOverlay,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectRoot,
  SelectScrollDownArrow,
  SelectScrollUpArrow,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
