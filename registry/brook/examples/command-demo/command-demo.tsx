import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/registry/brook/ui/command/command";
import { Kbd } from "@/registry/brook/ui/kbd/kbd";
import { Mail, Calendar, CreditCard, FileText, User, Smile, Terminal } from "lucide-react";
import styles from "./command-demo.module.css";

export default function CommandDemo() {
  return (
    <Command className={styles.command}>
      <CommandInput
        placeholder="Type a command or search..."
        className={styles.commandInput}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar size={16} />
            Calendar
          </CommandItem>

          <CommandItem>
            <Smile size={16} />
            Search Emoji
          </CommandItem>
          <CommandItem>
            <Mail size={16} />
            Email
          </CommandItem>
          <CommandItem>
            <FileText size={16} />
            Documents
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User size={16} />
            Profile
          </CommandItem>
          <CommandItem>
            <CreditCard size={16} />
            Billing
          </CommandItem>
          <CommandItem>
            <Terminal size={16} />
            Terminal
          </CommandItem>
        </CommandGroup>
      </CommandList>
      <div className={styles.commandFooter}>
        <div className={styles.commandFooterItem}>
          <Kbd size="md" className={styles.commandFooterKbd}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 10 4 15 9 20" />
              <path d="M20 4v7a4 4 0 0 1-4 4H4" />
            </svg>
          </Kbd>
          <span className={styles.commandFooterText}>to select</span>
        </div>
      </div>
    </Command>
  );
}
