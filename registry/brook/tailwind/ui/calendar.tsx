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
        "flex aspect-square w-full min-w-8 h-auto flex-col items-center justify-center gap-1",
        "leading-none font-normal text-sm rounded-[var(--radius)] border-none bg-transparent text-foreground cursor-pointer",
        "transition-colors duration-150",
        "hover:not-data-[selected-single=true]:not-data-[range-start=true]:not-data-[range-end=true]:bg-accent",
        "[&_span]:text-xs [&_span]:opacity-70",
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground",
        "data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-start=true]:rounded-[var(--radius)] data-[range-start=true]:rounded-l-[var(--radius)]",
        "data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-end=true]:rounded-[var(--radius)] data-[range-end=true]:rounded-r-[var(--radius)]",
        "data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-middle=true]:rounded-none",
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
      className={cn("[--cell-size:2rem] p-3 bg-popover w-fit", className)}
      classNames={{
        root: cn("[--cell-size:2rem] p-3 bg-popover w-fit", defaultClassNames.root),
        months: cn("flex flex-col gap-4 relative md:flex-row", defaultClassNames.months),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 left-0 right-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          "inline-flex items-center justify-center w-[var(--cell-size)] h-[var(--cell-size)] p-0",
          "select-none rounded-[var(--radius)] border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.8)]",
          "bg-popover text-foreground cursor-pointer transition-all duration-150",
          "hover:bg-accent hover:border-accent",
          "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
          "aria-disabled:opacity-50 aria-disabled:pointer-events-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          "inline-flex items-center justify-center w-[var(--cell-size)] h-[var(--cell-size)] p-0",
          "select-none rounded-[var(--radius)] border-[0.5px] border-[oklch(from_var(--border)_l_c_h_/_0.8)]",
          "bg-popover text-foreground cursor-pointer transition-all duration-150",
          "hover:bg-accent hover:border-accent",
          "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
          "aria-disabled:opacity-50 aria-disabled:pointer-events-none",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-[var(--cell-size)] w-full px-[var(--cell-size)]",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-[var(--cell-size)] gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative border border-border rounded-[var(--radius)] shadow-xs",
          "has-[:focus]:border-ring has-[:focus]:shadow-[0_0_0_3px_oklch(from_var(--ring)_l_c_h_/_0.5)]",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("absolute inset-0 opacity-0 bg-popover", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-medium text-sm",
          captionLayout !== "label" &&
            "rounded-[var(--radius)] pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&_svg]:text-muted-foreground [&_svg]:w-3.5 [&_svg]:h-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-[var(--radius)] flex-1 font-normal text-[0.8rem] select-none text-center",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn("select-none w-[var(--cell-size)]", defaultClassNames.week_number_header),
        week_number: cn("text-[0.8rem] select-none text-muted-foreground", defaultClassNames.week_number),
        day: cn(
          "relative flex-1 p-0 text-center select-none",
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
            return <ChevronLeft className={cn("w-4 h-4", chevronClassName)} {...chevronProps} />;
          }
          return <ChevronRight className={cn("w-4 h-4", chevronClassName)} {...chevronProps} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...weekNumberProps }) => (
          <td {...weekNumberProps}>
            <div className="flex w-[var(--cell-size)] h-[var(--cell-size)] items-center justify-center text-center">
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
