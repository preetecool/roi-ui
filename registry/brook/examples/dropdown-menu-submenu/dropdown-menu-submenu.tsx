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
import styles from "./dropdown-menu-submenu.module.css";

export default function DropdownMenuSubmenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline">Open Menu</Button>}
      />
      <DropdownMenuPortal>
        <DropdownMenuPositioner sideOffset={8}>
          <DropdownMenuPopup>
            <div className={styles.spacer} />
            <DropdownMenuItem>
              <span className={styles.menuItemText}>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className={styles.menuItemText}>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSubmenuRoot>
              <DropdownMenuSubmenuTrigger>
                <span className={styles.menuItemText}>More Options</span>
              </DropdownMenuSubmenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuPositioner
                  align="start"
                  alignOffset={-4}
                  side="right"
                  sideOffset={-4}
                >
                  <DropdownMenuPopup>
                    <div className={styles.spacer} />
                    <DropdownMenuItem>
                      <span className={styles.menuItemText}>Export</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className={styles.menuItemText}>Import</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span className={styles.menuItemText}>Share</span>
                    </DropdownMenuItem>
                    <div className={styles.spacer} />
                  </DropdownMenuPopup>
                </DropdownMenuPositioner>
              </DropdownMenuPortal>
            </DropdownMenuSubmenuRoot>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span className={styles.menuItemText}>Logout</span>
            </DropdownMenuItem>
            <div className={styles.spacer} />
          </DropdownMenuPopup>
        </DropdownMenuPositioner>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
