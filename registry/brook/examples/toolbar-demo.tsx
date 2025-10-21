"use client";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/brook/ui/toggle-group/toggle-group";
import {
  Toolbar,
  ToolbarLink,
  ToolbarSeparator,
} from "@/registry/brook/ui/toolbar/toolbar";

function BoldIcon() {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: Icon is decorative, parent has aria-label
    <svg
      fill="none"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="16"
    >
      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </svg>
  );
}

function ItalicIcon() {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: Icon is decorative, parent has aria-label
    <svg
      fill="none"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="16"
    >
      <line x1="19" x2="10" y1="4" y2="4" />
      <line x1="14" x2="5" y1="20" y2="20" />
      <line x1="15" x2="9" y1="4" y2="20" />
    </svg>
  );
}

function UnderlineIcon() {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: Icon is decorative, parent has aria-label
    <svg
      fill="none"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="16"
    >
      <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
      <line x1="4" x2="20" y1="21" y2="21" />
    </svg>
  );
}

function AlignLeftIcon() {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: Icon is decorative, parent has aria-label
    <svg
      fill="none"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="16"
    >
      <line x1="21" x2="3" y1="6" y2="6" />
      <line x1="15" x2="3" y1="12" y2="12" />
      <line x1="17" x2="3" y1="18" y2="18" />
    </svg>
  );
}

function AlignCenterIcon() {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: Icon is decorative, parent has aria-label
    <svg
      fill="none"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="16"
    >
      <line x1="18" x2="6" y1="6" y2="6" />
      <line x1="21" x2="3" y1="12" y2="12" />
      <line x1="18" x2="6" y1="18" y2="18" />
    </svg>
  );
}

function AlignRightIcon() {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: Icon is decorative, parent has aria-label
    <svg
      fill="none"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="16"
    >
      <line x1="21" x2="9" y1="6" y2="6" />
      <line x1="21" x2="3" y1="12" y2="12" />
      <line x1="21" x2="7" y1="18" y2="18" />
    </svg>
  );
}

export default function ToolbarDemo() {
  return (
    <Toolbar>
      <ToggleGroup aria-label="Text formatting" multiple>
        <ToggleGroupItem aria-label="Bold" value="bold">
          <BoldIcon />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Italic" value="italic">
          <ItalicIcon />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Underline" value="underline">
          <UnderlineIcon />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToolbarSeparator />

      <ToggleGroup aria-label="Text alignment">
        <ToggleGroupItem aria-label="Align left" value="left">
          <AlignLeftIcon />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Align center" value="center">
          <AlignCenterIcon />
        </ToggleGroupItem>
        <ToggleGroupItem aria-label="Align right" value="right">
          <AlignRightIcon />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToolbarSeparator />

      <ToolbarLink aria-label="Help" href="#">
        Help
      </ToolbarLink>
    </Toolbar>
  );
}
