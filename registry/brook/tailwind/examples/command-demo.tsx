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
    <Command className="border border-[var(--color-border)] shadow-[var(--shadow-lg)] bg-[var(--color-background)] [&[cmdk-root]]:p-1">
      <CommandInput
        className="rounded-none px-4 mb-2"
        placeholder="Type a command or search..."
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem className="[&[cmdk-item]]:min-h-10 [&[cmdk-item]]:py-2.5 [&[cmdk-item]]:px-1.5 [&[cmdk-item]]:font-normal [&[cmdk-item]]:border [&[cmdk-item]]:border-transparent [&[cmdk-item]_svg]:text-[var(--color-muted-foreground)] [&[cmdk-item]]:hover:bg-[var(--mix-card-50-bg)] [&[cmdk-item][data-selected=true]]:bg-[var(--mix-card-50-bg)]">
            <Calendar size={16} />
            Calendar
          </CommandItem>

          <CommandItem className="[&[cmdk-item]]:min-h-10 [&[cmdk-item]]:py-2.5 [&[cmdk-item]]:px-1.5 [&[cmdk-item]]:font-normal [&[cmdk-item]]:border [&[cmdk-item]]:border-transparent [&[cmdk-item]_svg]:text-[var(--color-muted-foreground)] [&[cmdk-item]]:hover:bg-[var(--mix-card-50-bg)] [&[cmdk-item][data-selected=true]]:bg-[var(--mix-card-50-bg)]">
            <Smile size={16} />
            Search Emoji
          </CommandItem>
          <CommandItem className="[&[cmdk-item]]:min-h-10 [&[cmdk-item]]:py-2.5 [&[cmdk-item]]:px-1.5 [&[cmdk-item]]:font-normal [&[cmdk-item]]:border [&[cmdk-item]]:border-transparent [&[cmdk-item]_svg]:text-[var(--color-muted-foreground)] [&[cmdk-item]]:hover:bg-[var(--mix-card-50-bg)] [&[cmdk-item][data-selected=true]]:bg-[var(--mix-card-50-bg)]">
            <Mail size={16} />
            Email
          </CommandItem>
          <CommandItem className="[&[cmdk-item]]:min-h-10 [&[cmdk-item]]:py-2.5 [&[cmdk-item]]:px-1.5 [&[cmdk-item]]:font-normal [&[cmdk-item]]:border [&[cmdk-item]]:border-transparent [&[cmdk-item]_svg]:text-[var(--color-muted-foreground)] [&[cmdk-item]]:hover:bg-[var(--mix-card-50-bg)] [&[cmdk-item][data-selected=true]]:bg-[var(--mix-card-50-bg)]">
            <FileText size={16} />
            Documents
          </CommandItem>
        </CommandGroup>
        <CommandSeparator className="[&[cmdk-group]_[cmdk-group-heading]]:normal-case" />
        <CommandGroup
          className="[&[cmdk-group]_[cmdk-group-heading]]:normal-case"
          heading="Settings"
        >
          <CommandItem className="[&[cmdk-item]]:min-h-10 [&[cmdk-item]]:py-2.5 [&[cmdk-item]]:px-1.5 [&[cmdk-item]]:font-normal [&[cmdk-item]]:border [&[cmdk-item]]:border-transparent [&[cmdk-item]_svg]:text-[var(--color-muted-foreground)] [&[cmdk-item]]:hover:bg-[var(--mix-card-50-bg)] [&[cmdk-item][data-selected=true]]:bg-[var(--mix-card-50-bg)]">
            <User size={16} />
            Profile
          </CommandItem>
          <CommandItem className="[&[cmdk-item]]:min-h-10 [&[cmdk-item]]:py-2.5 [&[cmdk-item]]:px-1.5 [&[cmdk-item]]:font-normal [&[cmdk-item]]:border [&[cmdk-item]]:border-transparent [&[cmdk-item]_svg]:text-[var(--color-muted-foreground)] [&[cmdk-item]]:hover:bg-[var(--mix-card-50-bg)] [&[cmdk-item][data-selected=true]]:bg-[var(--mix-card-50-bg)]">
            <CreditCard size={16} />
            Billing
          </CommandItem>
          <CommandItem className="[&[cmdk-item]]:min-h-10 [&[cmdk-item]]:py-2.5 [&[cmdk-item]]:px-1.5 [&[cmdk-item]]:font-normal [&[cmdk-item]]:border [&[cmdk-item]]:border-transparent [&[cmdk-item]_svg]:text-[var(--color-muted-foreground)] [&[cmdk-item]]:hover:bg-[var(--mix-card-50-bg)] [&[cmdk-item][data-selected=true]]:bg-[var(--mix-card-50-bg)]">
            <Terminal size={16} />
            Terminal
          </CommandItem>
        </CommandGroup>
      </CommandList>
      <div className="flex items-center gap-3 px-4 py-3 -mx-1 -mb-1 border-t-[0.5px] border-[oklch(from_var(--color-border)_l_c_h_/_0.5)] bg-[var(--mix-muted-20-trans)]">
        <div className="flex items-center gap-2">
          <Kbd className="text-[0.9375rem]" size="md">
            <EnterArrowIcon />
          </Kbd>
          <span className="text-xs text-[var(--color-muted-foreground)] font-normal">
            to select
          </span>
        </div>
      </div>
    </Command>
  );
}
