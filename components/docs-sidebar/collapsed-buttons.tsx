import { SidebarTrigger, useSidebar } from "@/registry/brook/ui/sidebar/sidebar";
import {
  Tooltip,
  TooltipPopup,
  TooltipPortal,
  TooltipPositioner,
  TooltipTrigger,
} from "@/registry/brook/ui/tooltip/tooltip";
import { Button } from "@/registry/brook/ui/button/button";
import { Kbd } from "@/registry/brook/ui/kbd/kbd";
import styles from "./collapsed-buttons.module.css";

type CollapsedButtonsProps = {
  isMac: boolean;
};

export function CollapsedButtons({ isMac }: CollapsedButtonsProps) {
  const { state } = useSidebar();

  const triggerSearch = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  };

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

  const searchTooltipContent = (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span style={{ color: "var(--secondary-foreground)" }}>Search</span>
      <div style={{ display: "flex", gap: "0.25rem" }}>
        <Kbd size="sm">{isMac ? "⌘" : "Ctrl"}</Kbd>
        <Kbd size="sm">K</Kbd>
      </div>
    </div>
  );

  if (state !== "collapsed") {
    return null;
  }

  return (
    <div className={styles.collapsedButtons}>
      <div className={styles.collapsedButtonsInner}>
        <Tooltip>
          <TooltipTrigger
            render={
              <SidebarTrigger
                aria-label="Toggle sidebar"
                className={`${styles.collapsedButton} hit-area-extend`}
                render={<div />}
              >
                <svg
                  aria-hidden="true"
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
            <TooltipPositioner side="bottom">
              <TooltipPopup>{tooltipContent}</TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                aria-label="Search"
                className={`${styles.collapsedButton} hit-area-extend`}
                onClick={triggerSearch}
                render={<div />}
                size="icon"
                variant="ghost"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="18"
                  viewBox="0 0 16 16"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M14 14L10.5 10.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </Button>
            }
          />
          <TooltipPortal>
            <TooltipPositioner side="bottom">
              <TooltipPopup>{searchTooltipContent}</TooltipPopup>
            </TooltipPositioner>
          </TooltipPortal>
        </Tooltip>
      </div>
    </div>
  );
}
