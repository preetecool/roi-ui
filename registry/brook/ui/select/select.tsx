"use client";

import { Select } from "@base-ui-components/react/select";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./select.module.css";

const SelectRoot = ({ ...props }: React.ComponentProps<typeof Select.Root>) => <Select.Root {...props} />;

const SelectTrigger = ({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof Select.Trigger>) => (
  <Select.Trigger className={cn(styles.trigger, className)} nativeButton {...props}>
    {children}
  </Select.Trigger>
);

const SelectValue = ({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof Select.Value>) => (
  <Select.Value className={cn(styles.value, className)} {...props}>
    {children}
  </Select.Value>
);

const SelectIcon = ({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof Select.Icon>) => (
  <Select.Icon className={cn(styles.icon, className)} {...props}>
    {children || <ChevronDown size={16} />}
  </Select.Icon>
);

const SelectPortal = ({ ...props }: React.ComponentPropsWithoutRef<typeof Select.Portal>) => (
  <Select.Portal {...props} />
);

const SelectPositioner = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Select.Positioner>) => (
  <Select.Positioner className={cn(styles.positioner, className)} {...props} />
);

const SelectPopup = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Select.Popup>) => (
  <Select.Popup className={cn(styles.popup, className)} {...props} />
);

const SelectList = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Select.List>) => (
  <Select.List className={cn(className)} {...props} />
);

const SelectItem = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Select.Item>) => (
  <Select.Item className={cn(styles.item, className)} {...props} />
);

const SelectItemText = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Select.ItemText>) => (
  <Select.ItemText className={cn(styles.itemText, className)} {...props} />
);

const SelectGroup = ({ className, ...props }: React.ComponentProps<typeof Select.Group>) => (
  <Select.Group className={cn(styles.selectGroup, className)} {...props} />
);

const SelectItemIndicator = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Select.ItemIndicator>) => (
  <Select.ItemIndicator className={cn(styles.indicator, className)} {...props}>
    {children || <Check size={16} />}
  </Select.ItemIndicator>
);

export {
  SelectRoot as Select,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectPositioner,
  SelectPopup,
  SelectList,
  SelectItem,
  SelectItemText,
  SelectGroup,
  SelectItemIndicator,
};
