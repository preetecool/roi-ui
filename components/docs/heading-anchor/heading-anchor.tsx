"use client";

import { Link as LinkIcon } from "lucide-react";
import { type ComponentProps, useMemo, useState } from "react";
import {
  Popover,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverTrigger,
} from "@/registry/brook/ui/popover/popover";
import "./heading-anchor.css";

const COPIED_DISPLAY_DURATION = 800;
const TEXT_RESET_DELAY = 200;
const ICON_SIZE_H2 = 18;
const ICON_SIZE_H3 = 16;
const ICON_SIZE_H4 = 14;
const HEADING_LEVEL_2 = 2;
const HEADING_LEVEL_3 = 3;

const ICON_SIZE_BY_LEVEL: Record<2 | 3 | 4, number> = {
  2: ICON_SIZE_H2,
  3: ICON_SIZE_H3,
  4: ICON_SIZE_H4,
};

export function HeadingAnchor({
  level,
  children,
  ...props
}: ComponentProps<"h2"> & { level: 2 | 3 | 4 }) {
  const [tooltipText, setTooltipText] = useState("Copy URL");
  const [open, setOpen] = useState(false);

  const id = useMemo(() => {
    const text = children?.toString() || "";
    return text
      .split(" ")
      .join("-")
      .split("'")
      .join("")
      .split("?")
      .join("")
      .toLowerCase();
  }, [children]);

  const Component = `h${level}` as const;
  const iconSize = ICON_SIZE_BY_LEVEL[level];

  const handleClick = async () => {
    setOpen(false);

    const url = `${window.location.origin}${window.location.pathname}#${id}`;

    try {
      await navigator.clipboard.writeText(url);
      setTooltipText("Copied!");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        setTimeout(() => {
          setTooltipText("Copy URL");
        }, TEXT_RESET_DELAY);
      }, COPIED_DISPLAY_DURATION);
    } catch {
      // Silently fail if clipboard is unavailable
    }

    window.history.pushState(null, "", `#${id}`);
  };

  return (
    <Popover onOpenChange={setOpen} open={open} openOnHover>
      <Component className="heading-with-anchor" id={id} {...props}>
        <PopoverTrigger
          aria-label={tooltipText}
          className="heading-anchor-trigger"
          onClick={handleClick}
        >
          {children}
          <LinkIcon
            className="heading-anchor-icon"
            size={iconSize}
            strokeWidth={1.5}
          />
        </PopoverTrigger>
      </Component>
      <PopoverPortal>
        <PopoverPositioner side="top" sideOffset={5}>
          <PopoverPopup>{tooltipText}</PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  );
}
