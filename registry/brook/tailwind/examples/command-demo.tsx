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
} from "@/registry/brook/tailwind/ui/command";
import { Kbd } from "@/registry/brook/tailwind/ui/kbd";
import { EnterArrowIcon } from "@/registry/brook/ui/arrow-icon/arrow-icon";

export default function CommandDemo() {
  return (
    <Command className="h-[440px] border border-[var(--border)] shadow-[var(--shadow-lg)] bg-[var(--background)] [&_[cmdk-root]]:px-1 [&_[cmdk-root]]:!h-full [&_[cmdk-root]]:flex [&_[cmdk-root]]:flex-col [&_[cmdk-item]]:min-h-[2.5rem] [&_[cmdk-item]]:!py-[0.625rem] [&_[cmdk-item]]:!px-[0.375rem] [&_[cmdk-item]]:font-normal [&_[cmdk-item]]:border [&_[cmdk-item]]:border-transparent [&_[cmdk-item]_svg]:text-[var(--muted-foreground)] [&_[cmdk-item]:hover]:bg-[var(--mix-card-50-bg)] [&_[cmdk-item][data-selected=true]]:bg-[var(--mix-card-50-bg)] [&_[cmdk-group]_[cmdk-group-heading]]:!normal-case [&_[cmdk-list]]:flex-1 [&_[cmdk-list]]:overflow-y-auto [&_[cmdk-list]]:scrollbar-thin [&_[cmdk-list]]:scrollbar-track-transparent [&_[cmdk-list]]:scrollbar-thumb-[var(--mix-border-50-trans)] hover:[&_[cmdk-list]]:scrollbar-thumb-[var(--mix-border-70-trans)] [&_[cmdk-list]]:scrollbar-thumb-rounded">
      <CommandInput
        className="[&[cmdk-input]]:rounded-none [&[cmdk-input]]:px-4 [&[cmdk-input]]:mb-2"
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
      <div className="flex items-center gap-3 px-4 py-3 mt-auto -mx-1 -mb-1 border-t-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.5)] bg-[var(--mix-muted-20-trans)]">
        <div className="flex items-center gap-2">
          <Kbd className="text-[0.9375rem]" size="md">
            <EnterArrowIcon />
          </Kbd>
          <span className="text-xs text-[var(--muted-foreground)] font-normal">
            to select
          </span>
        </div>
      </div>
    </Command>
  );
}
