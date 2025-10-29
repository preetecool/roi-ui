import { Kbd } from "@/registry/brook/ui/kbd/kbd";
import {
  SidebarTrigger,
  useSidebar,
} from "@/registry/brook/ui/sidebar/sidebar";
import {
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "@/registry/brook/ui/tooltip/tooltip";
import styles from "./sidebar-collapse-button.module.css";

type SidebarCollapseButtonProps = {
  isMac: boolean;
};

export function SidebarCollapseButton({ isMac }: SidebarCollapseButtonProps) {
  const { state } = useSidebar();

  const tooltipContent = (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span style={{ color: "var(--secondary-foreground)" }}>
        Toggle sidebar
      </span>
      <div style={{ display: "flex", gap: "0.25rem" }}>
        <Kbd size="sm">{isMac ? "⌘" : "Ctrl"}</Kbd>
        <Kbd size="sm">B</Kbd>
      </div>
    </div>
  );

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <SidebarTrigger
            aria-label="Collapse sidebar"
            className="hit-area-extend"
            id={styles.collapseButton}
            render={<div />}
          >
            <svg
              aria-hidden="true"
              className={styles.collapseIcon}
              fill="none"
              height="18"
              viewBox="0 0 24 24"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                fill="none"
                height="18"
                rx="2"
                ry="2"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                width="18"
                x="3"
                y="3"
              />
              <path
                d="M9 3L9 21"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <rect
                className={`${styles.collapseIconFill} ${state === "collapsed" ? styles.collapseIconFillActive : ""}`}
                fill="currentColor"
                height="18"
                rx="2"
                ry="2"
                width="6"
                x="3"
                y="3"
              />
            </svg>
          </SidebarTrigger>
        }
      />
      <TooltipPortal>
        <TooltipPositioner side="right">
          <TooltipPopup>{tooltipContent}</TooltipPopup>
        </TooltipPositioner>
      </TooltipPortal>
    </Tooltip>
  );
}
