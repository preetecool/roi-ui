import {
  Calendar,
  CreditCard,
  FileText,
  Mail,
  Smile,
  Terminal,
  User,
} from "lucide-react";
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
import styles from "./command-demo.module.css";

export default function CommandDemo() {
  return (
    <Command className={styles.command}>
      <CommandInput
        className={styles.commandInput}
        placeholder="Type a command or search..."
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
          <Kbd className={styles.commandFooterKbd} size="md">
            <svg
              aria-hidden="true"
              fill="none"
              height="14"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="14"
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
