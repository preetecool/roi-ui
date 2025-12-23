"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { type DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";
import { cn } from "@/lib/utils";
import type { Button } from "@/registry/brook/ui/button/button";
import styles from "./calendar.module.css";

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
      className={cn(styles.dayButton, defaultClassNames.day, className)}
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

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      captionLayout={captionLayout}
      className={cn(styles.root, className)}
      classNames={{
        root: cn(styles.root, defaultClassNames.root),
        months: cn(styles.months, defaultClassNames.months),
        month: cn(styles.month, defaultClassNames.month),
        nav: cn(styles.nav, defaultClassNames.nav),
        button_previous: cn(styles.navButton, defaultClassNames.button_previous),
        button_next: cn(styles.navButton, defaultClassNames.button_next),
        month_caption: cn(styles.monthCaption, defaultClassNames.month_caption),
        dropdowns: cn(styles.dropdowns, defaultClassNames.dropdowns),
        dropdown_root: cn(styles.dropdownRoot, defaultClassNames.dropdown_root),
        dropdown: cn(styles.dropdown, defaultClassNames.dropdown),
        caption_label: cn(
          styles.captionLabel,
          captionLayout !== "label" && styles.captionLabelDropdown,
          defaultClassNames.caption_label
        ),
        table: styles.table,
        weekdays: cn(styles.weekdays, defaultClassNames.weekdays),
        weekday: cn(styles.weekday, defaultClassNames.weekday),
        week: cn(styles.week, defaultClassNames.week),
        week_number_header: cn(styles.weekNumberHeader, defaultClassNames.week_number_header),
        week_number: cn(styles.weekNumber, defaultClassNames.week_number),
        day: cn(styles.day, props.showWeekNumber ? styles.dayWithWeekNumber : styles.dayDefault, defaultClassNames.day),
        range_start: cn(styles.rangeStart, defaultClassNames.range_start),
        range_middle: cn(styles.rangeMiddle, defaultClassNames.range_middle),
        range_end: cn(styles.rangeEnd, defaultClassNames.range_end),
        today: cn(styles.today, defaultClassNames.today),
        outside: cn(styles.outside, defaultClassNames.outside),
        disabled: cn(styles.disabled, defaultClassNames.disabled),
        hidden: cn(styles.hidden, defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className: rootClassName, rootRef, ...rootProps }) => (
          <div className={cn(rootClassName)} data-slot="calendar" ref={rootRef} {...rootProps} />
        ),
        Chevron: ({ className: chevronClassName, orientation, ...chevronProps }) => {
          if (orientation === "left") {
            return <ChevronLeft className={cn(styles.chevron, chevronClassName)} {...chevronProps} />;
          }
          return <ChevronRight className={cn(styles.chevron, chevronClassName)} {...chevronProps} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...weekNumberProps }) => (
          <td {...weekNumberProps}>
            <div className={styles.weekNumberCell}>{children}</div>
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
