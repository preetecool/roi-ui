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
} from "@/registry/brook/ui/command/command";
import { Kbd } from "@/registry/brook/ui/kbd/kbd";
import styles from "./command-demo.module.css";

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
      className={styles.command}
      items={allItems}
      itemToStringValue={itemToStringValue}
      onValueChange={handleValueChange}
    >
      <CommandInput className={styles.commandInput} placeholder="Type a command or search..." />
      <CommandList>
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
        <div className={styles.commandFooterItem}>
          <Kbd className={styles.commandFooterKbd} size="md">
            <EnterArrowIcon />
          </Kbd>
          <span className={styles.commandFooterText}>to select</span>
        </div>
      </CommandFooter>
    </Command>
  );
}
