"use client";

import { ToggleGroup, ToggleGroupItem } from "@/registry/brook/ui/toggle-group/toggle-group";
import { Toolbar, ToolbarLink, ToolbarSeparator } from "@/registry/brook/ui/toolbar/toolbar";
import {
  Tooltip,
  TooltipArrow,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/brook/ui/tooltip/tooltip";
import styles from "./toolbar-demo.module.css";

function BoldIcon() {
  return (
    <svg fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16">
      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </svg>
  );
}

function ItalicIcon() {
  return (
    <svg fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16">
      <line x1="19" x2="10" y1="4" y2="4" />
      <line x1="14" x2="5" y1="20" y2="20" />
      <line x1="15" x2="9" y1="4" y2="20" />
    </svg>
  );
}

function UnderlineIcon() {
  return (
    <svg fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16">
      <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
      <line x1="4" x2="20" y1="21" y2="21" />
    </svg>
  );
}

function AlignLeftIcon() {
  return (
    <svg fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16">
      <line x1="21" x2="3" y1="6" y2="6" />
      <line x1="15" x2="3" y1="12" y2="12" />
      <line x1="17" x2="3" y1="18" y2="18" />
    </svg>
  );
}

function AlignCenterIcon() {
  return (
    <svg fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16">
      <line x1="18" x2="6" y1="6" y2="6" />
      <line x1="21" x2="3" y1="12" y2="12" />
      <line x1="18" x2="6" y1="18" y2="18" />
    </svg>
  );
}

function AlignRightIcon() {
  return (
    <svg fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16">
      <line x1="21" x2="9" y1="6" y2="6" />
      <line x1="21" x2="3" y1="12" y2="12" />
      <line x1="21" x2="7" y1="18" y2="18" />
    </svg>
  );
}

export default function ToolbarDemo() {
  return (
    <TooltipProvider delay={300}>
      <div className={styles.scrollContainer}>
        <Toolbar>
          <ToggleGroup aria-label="Text formatting" multiple>
            <Tooltip>
              <TooltipTrigger
                aria-label="Bold"
                render={
                  <ToggleGroupItem aria-label="Bold" value="bold">
                    <BoldIcon />
                  </ToggleGroupItem>
                }
              />
              <TooltipPortal>
                <TooltipPositioner side="top" sideOffset={8}>
                  <TooltipPopup>
                    <TooltipArrow />
                    Bold
                  </TooltipPopup>
                </TooltipPositioner>
              </TooltipPortal>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                aria-label="Italic"
                render={
                  <ToggleGroupItem aria-label="Italic" value="italic">
                    <ItalicIcon />
                  </ToggleGroupItem>
                }
              />
              <TooltipPortal>
                <TooltipPositioner side="top" sideOffset={8}>
                  <TooltipPopup>
                    <TooltipArrow />
                    Italic
                  </TooltipPopup>
                </TooltipPositioner>
              </TooltipPortal>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                aria-label="Underline"
                render={
                  <ToggleGroupItem aria-label="Underline" value="underline">
                    <UnderlineIcon />
                  </ToggleGroupItem>
                }
              />
              <TooltipPortal>
                <TooltipPositioner side="top" sideOffset={8}>
                  <TooltipPopup>
                    <TooltipArrow />
                    Underline
                  </TooltipPopup>
                </TooltipPositioner>
              </TooltipPortal>
            </Tooltip>
          </ToggleGroup>

          <ToolbarSeparator />

          <ToggleGroup aria-label="Text alignment">
            <Tooltip>
              <TooltipTrigger
                aria-label="Align left"
                render={
                  <ToggleGroupItem aria-label="Align left" value="left">
                    <AlignLeftIcon />
                  </ToggleGroupItem>
                }
              />
              <TooltipPortal>
                <TooltipPositioner side="top" sideOffset={8}>
                  <TooltipPopup>
                    <TooltipArrow />
                    Align left
                  </TooltipPopup>
                </TooltipPositioner>
              </TooltipPortal>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                aria-label="Align center"
                render={
                  <ToggleGroupItem aria-label="Align center" value="center">
                    <AlignCenterIcon />
                  </ToggleGroupItem>
                }
              />
              <TooltipPortal>
                <TooltipPositioner side="top" sideOffset={8}>
                  <TooltipPopup>
                    <TooltipArrow />
                    Align center
                  </TooltipPopup>
                </TooltipPositioner>
              </TooltipPortal>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                aria-label="Align right"
                render={
                  <ToggleGroupItem aria-label="Align right" value="right">
                    <AlignRightIcon />
                  </ToggleGroupItem>
                }
              />
              <TooltipPortal>
                <TooltipPositioner side="top" sideOffset={8}>
                  <TooltipPopup>
                    <TooltipArrow />
                    Align right
                  </TooltipPopup>
                </TooltipPositioner>
              </TooltipPortal>
            </Tooltip>
          </ToggleGroup>

          <ToolbarSeparator />

          <ToolbarLink aria-label="Help" className={styles.helpLink} href="#">
            Help
          </ToolbarLink>
        </Toolbar>
      </div>
    </TooltipProvider>
  );
}
