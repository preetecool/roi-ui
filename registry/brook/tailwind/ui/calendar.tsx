"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { type DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";
import { cn } from "@/lib/utils-tailwind";

interface CalendarDayButtonProps extends React.ComponentProps<typeof DayButton> {}

function CalendarDayButton({ className, day, modifiers, ...props }: CalendarDayButtonProps) {
  const defaultClassNames = getDefaultClassNames();
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) {
      buttonRef.current?.focus();
    }
  }, [modifiers.focused]);

  return (
    <button
      className={cn(
        "flex aspect-square h-auto w-full min-w-8 flex-col items-center justify-center gap-1",
        "cursor-pointer rounded-[var(--radius)] border-none bg-transparent font-normal text-foreground text-sm leading-none",
        "transition-colors duration-150",
        "hover:not-data-[selected-single=true]:not-data-[range-start=true]:not-data-[range-end=true]:bg-accent",
        "[&_span]:text-xs [&_span]:opacity-70",
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground",
        "data-[range-start=true]:rounded-[var(--radius)] data-[range-start=true]:rounded-l-[var(--radius)] data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground",
        "data-[range-end=true]:rounded-[var(--radius)] data-[range-end=true]:rounded-r-[var(--radius)] data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground",
        "data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground",
        defaultClassNames.day,
        className
      )}
      data-day={day.date.toLocaleDateString()}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      data-range-start={modifiers.range_start}
      data-selected-single={
        modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
      }
      ref={buttonRef}
      type="button"
      {...props}
    />
  );
}

type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  formatters,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      captionLayout={captionLayout}
      className={cn("w-fit bg-popover p-3 [--cell-size:2rem]", className)}
      classNames={{
        root: cn("w-fit bg-popover p-3 [--cell-size:2rem]", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn("absolute top-0 right-0 left-0 flex w-full items-center justify-between gap-1", defaultClassNames.nav),
        button_previous: cn(
          "inline-flex h-[var(--cell-size)] w-[var(--cell-size)] items-center justify-center p-0",
          "select-none rounded-[var(--radius)] border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.8)]",
          "cursor-pointer bg-popover text-foreground transition-all duration-150",
          "hover:border-accent hover:bg-accent",
          "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
          "aria-disabled:pointer-events-none aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          "inline-flex h-[var(--cell-size)] w-[var(--cell-size)] items-center justify-center p-0",
          "select-none rounded-[var(--radius)] border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.8)]",
          "cursor-pointer bg-popover text-foreground transition-all duration-150",
          "hover:border-accent hover:bg-accent",
          "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
          "aria-disabled:pointer-events-none aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-[var(--cell-size)] w-full items-center justify-center px-[var(--cell-size)]",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-[var(--cell-size)] w-full items-center justify-center gap-1.5 font-medium text-sm",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative rounded-[var(--radius)] border border-border shadow-xs",
          "has-[:focus]:border-ring has-[:focus]:shadow-[0_0_0_3px_oklch(from_var(--ring)_l_c_h_/_0.5)]",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("absolute inset-0 bg-popover opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-medium text-sm",
          captionLayout !== "label" &&
            "flex h-8 items-center gap-1 rounded-[var(--radius)] pr-1 pl-2 text-sm [&_svg]:h-3.5 [&_svg]:w-3.5 [&_svg]:text-muted-foreground",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 select-none rounded-[var(--radius)] text-center font-normal text-[0.8rem] text-muted-foreground",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn("w-[var(--cell-size)] select-none", defaultClassNames.week_number_header),
        week_number: cn("select-none text-[0.8rem] text-muted-foreground", defaultClassNames.week_number),
        day: cn(
          "relative flex-1 select-none p-0 text-center",
          props.showWeekNumber
            ? "nth-[2]:data-[selected=true]:[&_button]:rounded-l-[var(--radius)]"
            : "data-[selected=true]:[&_button]:rounded-l-[var(--radius)]",
          "last:data-[selected=true]:[&_button]:rounded-r-[var(--radius)]",
          defaultClassNames.day
        ),
        range_start: cn("rounded-l-[var(--radius)] bg-accent", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-[var(--radius)] bg-accent", defaultClassNames.range_end),
        today: cn("", defaultClassNames.today),
        outside: cn("text-muted-foreground aria-selected:text-muted-foreground", defaultClassNames.outside),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className: rootClassName, rootRef, ...rootProps }) => (
          <div className={cn(rootClassName)} data-slot="calendar" ref={rootRef} {...rootProps} />
        ),
        Chevron: ({ className: chevronClassName, orientation, ...chevronProps }) => {
          if (orientation === "left") {
            return <ChevronLeft className={cn("h-4 w-4", chevronClassName)} {...chevronProps} />;
          }
          return <ChevronRight className={cn("h-4 w-4", chevronClassName)} {...chevronProps} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...weekNumberProps }) => (
          <td {...weekNumberProps}>
            <div className="flex h-[var(--cell-size)] w-[var(--cell-size)] items-center justify-center text-center">
              {children}
            </div>
          </td>
        ),
        ...components,
      }}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      showOutsideDays={showOutsideDays}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
