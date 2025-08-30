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

export default function CommandDemo() {
  return (
    <Command style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)" }}>
      <CommandInput
        placeholder="Type a command or search..."
        style={{ borderBottom: "1px solid var(--border)", borderRadius: 0 }}
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
