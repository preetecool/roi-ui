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
    <Command className="h-[440px] border border-[var(--border)] bg-[var(--background)] shadow-[var(--shadow-lg)] [&[cmdk-root]]:flex [&[cmdk-root]]:flex-col [&[cmdk-root]]:pb-1 [&[cmdk-root]]:pt-0 max-sm:[&[cmdk-root]]:p-0 [&_[cmdk-item]]:!min-h-[2.5rem] [&_[cmdk-item]]:!px-[0.375rem] [&_[cmdk-item]]:!py-[0.625rem] [&_[cmdk-item]]:!border [&_[cmdk-item]]:!border-solid [&_[cmdk-item]]:!border-transparent [&_[cmdk-item]]:font-normal [&_[cmdk-item]]:!leading-[1.15] max-sm:[&_[cmdk-item]]:min-h-[2.75rem] max-sm:[&_[cmdk-item]]:px-2.5 max-sm:[&_[cmdk-item]]:py-3 max-sm:[&_[cmdk-item]]:text-[0.9375rem] [&_[cmdk-item]_svg]:text-[var(--muted-foreground)] [&_[cmdk-item]:hover]:bg-[var(--mix-card-50-bg)] [&_[cmdk-item][data-selected=true]]:bg-[var(--mix-card-50-bg)] [&_[cmdk-group]_[cmdk-group-heading]]:!normal-case max-sm:[&_[cmdk-group]_[cmdk-group-heading]]:px-2.5 max-sm:[&_[cmdk-group]_[cmdk-group-heading]]:text-[0.8125rem] [&_[cmdk-list]]:!flex-[1_1_0%] [&_[cmdk-list]]:!min-h-0 [&_[cmdk-list]]:!max-h-none [&_[cmdk-list]]:overflow-y-auto [&_[cmdk-list]]:pb-0 [&_[cmdk-list]]:scrollbar-thin [&_[cmdk-list]]:scrollbar-track-transparent [&_[cmdk-list]]:scrollbar-thumb-[var(--mix-border-50-trans)] [&_[cmdk-list]]:scrollbar-thumb-rounded-[3px] hover:[&_[cmdk-list]]:scrollbar-thumb-[var(--mix-border-70-trans)]">
      <CommandInput
        className="mb-2 rounded-none px-4 max-sm:text-[0.9375rem]"
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
      <div className="-mx-1 -mb-1 flex shrink-0 items-center gap-3 border-t-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.5)] bg-[var(--mix-muted-20-trans)] px-4 py-3 max-sm:m-0 max-sm:px-4 max-sm:py-2.5">
        <div className="flex items-center gap-2">
          <Kbd className="text-[0.9375rem] max-sm:text-base" size="md">
            <EnterArrowIcon />
          </Kbd>
          <span className="text-xs font-normal leading-4 text-[var(--muted-foreground)] max-sm:text-[0.8125rem]">
            to select
          </span>
        </div>
      </div>
    </Command>
  );
}
