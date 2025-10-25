import { ChevronRight } from "lucide-react";
import { Button } from "@/registry/brook/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuPopup,
  DropdownMenuPortal,
  DropdownMenuPositioner,
  DropdownMenuSeparator,
  DropdownMenuSubmenuRoot,
  DropdownMenuSubmenuTrigger,
  DropdownMenuTrigger,
} from "@/registry/brook/ui/dropdown-menu/dropdown-menu";

export default function DropdownMenuSubmenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline">Open Menu</Button>}
      />
      <DropdownMenuPortal>
        <DropdownMenuPositioner sideOffset={8}>
          <DropdownMenuPopup>
            <div style={{ height: "4px", width: "100%" }} />
            <DropdownMenuItem>
              <span style={{ marginLeft: "4px" }}>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span style={{ marginLeft: "4px" }}>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSubmenuRoot>
              <DropdownMenuSubmenuTrigger
                style={{ justifyContent: "space-between" }}
              >
                <span style={{ marginLeft: "4px" }}>More Options</span>
                <ChevronRight size={16} />
              </DropdownMenuSubmenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuPositioner align="start" side="right">
                  <DropdownMenuPopup>
                    <div style={{ height: "4px", width: "100%" }} />
                    <DropdownMenuItem>
                      <span style={{ marginLeft: "4px" }}>Export</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span style={{ marginLeft: "4px" }}>Import</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span style={{ marginLeft: "4px" }}>Share</span>
                    </DropdownMenuItem>
                    <div style={{ height: "4px", width: "100%" }} />
                  </DropdownMenuPopup>
                </DropdownMenuPositioner>
              </DropdownMenuPortal>
            </DropdownMenuSubmenuRoot>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span style={{ marginLeft: "4px" }}>Logout</span>
            </DropdownMenuItem>
            <div style={{ height: "4px", width: "100%" }} />
          </DropdownMenuPopup>
        </DropdownMenuPositioner>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
