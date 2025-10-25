"use client";

import { Link as LinkIcon } from "lucide-react";
import { type ComponentProps, useState } from "react";
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

export function HeadingAnchor({
  level,
  children,
  ...props
}: ComponentProps<"h2"> & { level: 2 | 3 | 4 }) {
  const [tooltipText, setTooltipText] = useState("Copy URL");
  const [open, setOpen] = useState(false);

  const id =
    children
      ?.toString()
      .replace(/ /g, "-")
      .replace(/'/g, "")
      .replace(/\?/g, "")
      .toLowerCase() || "";

  const Component = `h${level}` as const;

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

  const getIconSize = () => {
    if (level === HEADING_LEVEL_2) {
      return ICON_SIZE_H2;
    }
    if (level === HEADING_LEVEL_3) {
      return ICON_SIZE_H3;
    }
    return ICON_SIZE_H4;
  };

  const iconSize = getIconSize();

  return (
    <Popover onOpenChange={setOpen} open={open} openOnHover>
      <PopoverTrigger
        nativeButton={false}
        render={
          <Component
            className="heading-with-anchor"
            id={id}
            onClick={handleClick}
            {...props}
          />
        }
      >
        {children}
        <LinkIcon
          className="heading-anchor-icon"
          size={iconSize}
          strokeWidth={1.5}
        />
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverPositioner side="top" sideOffset={5}>
          <PopoverPopup>{tooltipText}</PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </Popover>
  );
}
