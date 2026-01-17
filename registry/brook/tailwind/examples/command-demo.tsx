"use client";

import { Calendar, CreditCard, FileText, Mail, Smile, Terminal, User } from "lucide-react";
import { useCallback, useState } from "react";
import { EnterArrowIcon } from "@/registry/brook/ui/arrow-icon/arrow-icon";
import {
  Command,
  CommandCollection,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/registry/brook/tailwind/ui/command";
import { Kbd } from "@/registry/brook/tailwind/ui/kbd";

type CommandItemData = {
  id: string;
  label: string;
  icon: React.ReactNode;
  group: string;
};

const suggestions: CommandItemData[] = [
  { id: "calendar", label: "Calendar", icon: <Calendar size={16} />, group: "Suggestions" },
  { id: "emoji", label: "Search Emoji", icon: <Smile size={16} />, group: "Suggestions" },
  { id: "email", label: "Email", icon: <Mail size={16} />, group: "Suggestions" },
  { id: "documents", label: "Documents", icon: <FileText size={16} />, group: "Suggestions" },
];

const settings: CommandItemData[] = [
  { id: "profile", label: "Profile", icon: <User size={16} />, group: "Settings" },
  { id: "billing", label: "Billing", icon: <CreditCard size={16} />, group: "Settings" },
  { id: "terminal", label: "Terminal", icon: <Terminal size={16} />, group: "Settings" },
];

const allItems = [...suggestions, ...settings];

export default function CommandDemo() {
  const [inputValue, setInputValue] = useState("");

  const handleValueChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const itemToStringValue = useCallback(
    (item: unknown) => (item && typeof item === "object" && "label" in item ? (item as CommandItemData).label : ""),
    []
  );

  const filteredSuggestions = suggestions.filter((item) =>
    item.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const filteredSettings = settings.filter((item) =>
    item.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Command
      className="h-[440px] bg-[var(--background)] shadow-[0_0_0_1px_oklch(from_var(--border)_l_c_h_/_0.4),var(--shadow-lg)] [&_[data-slot=command-group-label]]:normal-case"
      items={allItems}
      itemToStringValue={itemToStringValue}
      onValueChange={handleValueChange}
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="flex-[1_1_0%] min-h-0 max-h-none">
        {filteredSuggestions.length === 0 && filteredSettings.length === 0 && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}

        {filteredSuggestions.length > 0 && (
          <CommandGroup items={filteredSuggestions}>
            <CommandGroupLabel>Suggestions</CommandGroupLabel>
            <CommandCollection>
              {(item: CommandItemData) => (
                <CommandItem key={item.id} value={item}>
                  {item.icon}
                  {item.label}
                </CommandItem>
              )}
            </CommandCollection>
          </CommandGroup>
        )}

        {filteredSuggestions.length > 0 && filteredSettings.length > 0 && <CommandSeparator />}

        {filteredSettings.length > 0 && (
          <CommandGroup items={filteredSettings}>
            <CommandGroupLabel>Settings</CommandGroupLabel>
            <CommandCollection>
              {(item: CommandItemData) => (
                <CommandItem key={item.id} value={item}>
                  {item.icon}
                  {item.label}
                </CommandItem>
              )}
            </CommandCollection>
          </CommandGroup>
        )}
      </CommandList>
      <CommandFooter>
        <div className="flex items-center gap-2">
          <Kbd className="text-[0.9375rem] max-sm:text-base" size="md">
            <EnterArrowIcon />
          </Kbd>
          <span className="text-xs leading-4 font-normal text-[var(--muted-foreground)] max-sm:text-[0.8125rem]">
            to select
          </span>
        </div>
      </CommandFooter>
    </Command>
  );
}
