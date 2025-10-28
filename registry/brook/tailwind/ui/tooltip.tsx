"use client";

import { Tooltip } from "@base-ui-components/react/tooltip";
import { cn } from "@/lib/tw-utils";

function TooltipProvider({
  ...props
}: Tooltip.Provider.Props) {
  return <Tooltip.Provider {...props} />;
}

function TooltipRoot({ ...props }: Tooltip.Root.Props) {
  return <Tooltip.Root {...props} />;
}

function TooltipTrigger({
  ...props
}: Tooltip.Trigger.Props) {
  return <Tooltip.Trigger {...props} />;
}

const TooltipPortal = Tooltip.Portal;

function TooltipPositioner({
  className,
  ...props
}: Tooltip.Positioner.Props) {
  return (
    <Tooltip.Positioner data-slot="tooltip-positioner" className={cn("z-[9999]", className)} {...props} />
  );
}

function TooltipPopup({
  className,
  ...props
}: Tooltip.Popup.Props) {
  return (
    <Tooltip.Popup
      className={cn(
        "max-w-[20rem] px-3 py-2 text-[var(--primary)] text-sm",
        "rounded-[var(--radius)] bg-[var(--mix-card-33-bg)]",
        "shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)]",
        "transition-[transform_0.125s_ease-out,opacity_0.125s_ease-out]",
        "relative mb-1 origin-[var(--transform-origin)] break-words",
        "border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.7)]",
        "data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0",
        "data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0",
        "data-[instant]:transition-none",
        className
      )}
      {...props}
    />
  );
}

function TooltipArrow({
  className,
  ...props
}: Tooltip.Arrow.Props) {
  return (
    <Tooltip.Arrow
      data-slot="tooltip-arrow"
      className={cn(
        "absolute z-[1] h-[10px] w-5",
        "data-[side=top]:-bottom-2 data-[side=top]:rotate-180",
        "data-[side=bottom]:-top-2 data-[side=bottom]:rotate-0",
        "data-[side=left]:right-2 data-[side=left]:rotate-90",
        "data-[side=right]:-left-2 data-[side=right]:-rotate-90",
        "[&_svg]:block [&_svg]:h-full [&_svg]:w-full",
        className
      )}
      {...props}
    >
      <ArrowSvg />
    </Tooltip.Arrow>
  );
}

function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="10"
      viewBox="0 0 20 10"
      width="20"
      {...props}
    >
      <path
        className="fill-[var(--mix-card-33-bg)]"
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
      />
      <path
        className="fill-[oklch(from_var(--border)_l_c_h_/_0.6)] stroke-[0.5px]"
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
      />
      <path
        className="fill-[oklch(from_var(--border)_l_c_h_/_0.1)]"
        d="M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z"
      />
    </svg>
  );
}

export {
  ArrowSvg,
  TooltipRoot as Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
};
