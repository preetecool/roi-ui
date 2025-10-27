import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/registry/brook/tailwind/ui/collapsible";

export default function CollapsibleDemo() {
  return (
    <Collapsible className="border border-[color:oklch(from_var(--color-border)_l_c_h_/_0.5)] rounded-[var(--radius)] overflow-hidden" defaultOpen={false}>
      <CollapsibleTrigger className="w-full h-full p-4 cursor-pointer border-none rounded-none bg-transparent text-left transition-colors duration-150 hover:bg-[color:var(--mix-card-50-bg)]">
        <div className="flex flex-col gap-2">
          <span className="text-xs text-[color:var(--color-muted-foreground)] font-normal">Total Revenue</span>
          <span className="text-2xl font-[550] tracking-[-0.02em] text-[color:var(--color-foreground)]">$45,231</span>
          <span className="text-xs font-normal text-[color:var(--color-success)]">+12.5% from last month</span>
        </div>
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <div className="flex flex-col gap-0 border-t border-[color:oklch(from_var(--color-border)_l_c_h_/_0.5)] p-2">
          <div className="flex justify-between items-center py-3 px-2 rounded-[var(--radius)] transition-colors duration-150 hover:bg-[color:var(--mix-card-50-bg)]">
            <span className="text-sm text-[color:var(--color-muted-foreground)]">Product Sales</span>
            <span className="text-sm font-medium text-[color:var(--color-foreground)] tabular-nums">$28,450</span>
          </div>
          <div className="flex justify-between items-center py-3 px-2 rounded-[var(--radius)] transition-colors duration-150 hover:bg-[color:var(--mix-card-50-bg)]">
            <span className="text-sm text-[color:var(--color-muted-foreground)]">Subscriptions</span>
            <span className="text-sm font-medium text-[color:var(--color-foreground)] tabular-nums">$12,340</span>
          </div>
          <div className="flex justify-between items-center py-3 px-2 rounded-[var(--radius)] transition-colors duration-150 hover:bg-[color:var(--mix-card-50-bg)]">
            <span className="text-sm text-[color:var(--color-muted-foreground)]">Services</span>
            <span className="text-sm font-medium text-[color:var(--color-foreground)] tabular-nums">$3,220</span>
          </div>
          <div className="flex justify-between items-center py-3 px-2 rounded-[var(--radius)] transition-colors duration-150 hover:bg-[color:var(--mix-card-50-bg)]">
            <span className="text-sm text-[color:var(--color-muted-foreground)]">Other</span>
            <span className="text-sm font-medium text-[color:var(--color-foreground)] tabular-nums">$1,221</span>
          </div>
        </div>
      </CollapsiblePanel>
    </Collapsible>
  );
}
