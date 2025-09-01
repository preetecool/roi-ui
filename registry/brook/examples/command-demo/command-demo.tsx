import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/registry/brook/ui/command/command";
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
          <CommandItem icon keyboardShortcut="K">
            <div>
              <Calendar />
            </div>
            Calendar
          </CommandItem>

          <CommandItem icon>
            <div>
              <Smile />
            </div>
            Search Emoji
          </CommandItem>
          <CommandItem icon keyboardShortcut="E">
            <div>
              <Mail />
            </div>
            Email
          </CommandItem>
          <CommandItem icon keyboardShortcut="D">
            <div>
              <FileText />
            </div>
            Documents
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem icon keyboardShortcut="P">
            <div>
              <User />
            </div>
            Profile
          </CommandItem>
          <CommandItem icon keyboardShortcut="B">
            <div>
              <CreditCard />
            </div>
            Billing
          </CommandItem>
          <CommandItem icon keyboardShortcut="T">
            <div>
              <Terminal />
            </div>
            Terminal
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
