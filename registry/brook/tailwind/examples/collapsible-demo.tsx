import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@/registry/brook/tailwind/ui/collapsible";

export default function CollapsibleDemo() {
  return (
    <Collapsible className="overflow-hidden rounded-[var(--radius)] border border-[oklch(from_var(--border)_l_c_h_/_0.5)]">
      <CollapsibleTrigger className="h-full w-full cursor-pointer rounded-none border-none bg-transparent p-4 text-left transition-[background-color] duration-150 hover:bg-[var(--mix-card-50-bg)]">
        <div className="flex flex-col gap-2">
          <span className="font-normal text-[var(--muted-foreground)] text-xs leading-[12px]">Total Revenue</span>
          <span className="font-[550] text-2xl text-[var(--foreground)] leading-[30px] tracking-[-0.02em]">
            $45,231
          </span>
          <span className="font-normal text-[var(--success)] text-xs leading-[12px]">+12.5% from last month</span>
        </div>
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <div className="flex flex-col gap-0 border-[oklch(from_var(--border)_l_c_h_/_0.5)] border-t p-2">
          <div className="flex items-center justify-between rounded-[var(--radius)] px-2 py-3 transition-[background-color] duration-150">
            <span className="text-[var(--muted-foreground)] text-sm leading-5">Product Sales</span>
            <span className="font-medium text-[var(--foreground)] text-sm tabular-nums leading-5">$28,450</span>
          </div>
          <div className="flex items-center justify-between rounded-[var(--radius)] px-2 py-3 transition-[background-color] duration-150">
            <span className="text-[var(--muted-foreground)] text-sm leading-5">Subscriptions</span>
            <span className="font-medium text-[var(--foreground)] text-sm tabular-nums leading-5">$12,340</span>
          </div>
          <div className="flex items-center justify-between rounded-[var(--radius)] px-2 py-3 transition-[background-color] duration-150">
            <span className="text-[var(--muted-foreground)] text-sm leading-5">Services</span>
            <span className="font-medium text-[var(--foreground)] text-sm tabular-nums leading-5">$3,220</span>
          </div>
          <div className="flex items-center justify-between rounded-[var(--radius)] px-2 py-3 transition-[background-color] duration-150">
            <span className="text-[var(--muted-foreground)] text-sm leading-5">Other</span>
            <span className="font-medium text-[var(--foreground)] text-sm tabular-nums leading-5">$1,221</span>
          </div>
        </div>
      </CollapsiblePanel>
    </Collapsible>
  );
}
