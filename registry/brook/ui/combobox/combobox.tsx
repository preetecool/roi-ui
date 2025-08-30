"use client";

import { forwardRef, useState, useRef } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/brook/ui/button/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/brook/ui/command/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/brook/ui/popover/popover";
import styles from "./combobox.module.css";

interface ComboboxOption {
  value: string;
  label: string;
  [key: string]: unknown;
}

interface ComboboxProps {
  options: Array<ComboboxOption>;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  disabled?: boolean;
  renderOption?: (option: ComboboxOption, isSelected: boolean) => React.ReactNode;
  renderTrigger?: (selectedOption: ComboboxOption | undefined) => React.ReactNode;
  contentWidth?: string | number;
}

const ComboboxRoot = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = "Select option...",
      searchPlaceholder = "Search...",
      emptyText = "No option found.",
      className,
      renderOption,
      renderTrigger,
      contentWidth,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const selectedOption = options.find((option) => option.value === value);

    const handleSelect = (currentValue: string) => {
      onValueChange?.(currentValue === value ? "" : currentValue);
      setOpen(false);

      setTimeout(() => {
        triggerRef.current?.blur();
      }, 0);
    };

    const handleOpenChange = (newOpen: boolean) => {
      setOpen(newOpen);

      if (!newOpen) {
        setTimeout(() => {
          triggerRef.current?.blur();
        }, 0);
      }
    };

    return (
      <div ref={ref} className={cn(styles.root, className)} {...props}>
        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger className={styles.trigger} render={<Button variant="outline" ref={triggerRef} />}>
            {renderTrigger && selectedOption
              ? renderTrigger(selectedOption)
              : selectedOption
                ? selectedOption.label
                : placeholder}
            <ChevronsUpDown className={styles.chevron} />
          </PopoverTrigger>
          <PopoverContent
            className={styles.content}
            style={contentWidth ? { padding: 0, width: contentWidth, minWidth: contentWidth } : { minWidth: "200px" }}
          >
            <Command>
              <CommandInput
                placeholder={searchPlaceholder}
                className={styles.input}
                style={{ borderBottom: "1px solid var(--border)", borderRadius: "0" }}
              />

              <CommandList>
                <CommandEmpty>{emptyText}</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => {
                    const isSelected = value === option.value;
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={() => handleSelect(option.value)}
                        className={styles.item}
                      >
                        {renderOption ? renderOption(option, isSelected) : option.label}
                        <Check className={cn(styles.checkIcon, isSelected ? styles.visible : styles.hidden)} />
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);

ComboboxRoot.displayName = "Combobox";

export { ComboboxRoot as Combobox };
export type { ComboboxProps, ComboboxOption };
