import { ChevronDown } from "lucide-react";
import { Button } from "@/registry/brook/ui/button/button";
import {
  NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuContent,
  NavigationMenuIcon,
  NavigationMenuItem,
  NavigationMenuLinkItem,
  NavigationMenuList,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/registry/brook/ui/navigation-menu/navigation-menu";
import styles from "./navigation-sub-menu.module.css";

export default function NavigationSubMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            render={
              <Button variant="ghost">
                Open
                <NavigationMenuIcon>
                  <ChevronDown size={16} />
                </NavigationMenuIcon>
              </Button>
            }
          />
          <NavigationMenuViewport>
            <NavigationMenuArrow />
            <NavigationMenuContent>
              <div className={styles.mainGrid}>
                <NavigationMenuLinkItem
                  description="Interactive button component"
                  href="#"
                  title="Button"
                />
                <NavigationMenuLinkItem
                  description="Form input controls"
                  href="#"
                  title="Input"
                />

                <NavigationMenu>
                  <NavigationMenuItem className={styles.subMenuItem}>
                    <NavigationMenuTrigger
                      nativeButton={false}
                      render={
                        <div className={styles.triggerContainer}>
                          <NavigationMenuLinkItem
                            className={styles.linkItemWithIcon}
                            description="Form input controls"
                            title="Input"
                          >
                            <NavigationMenuIcon>
                              <ChevronDown size={16} />
                            </NavigationMenuIcon>
                          </NavigationMenuLinkItem>
                        </div>
                      }
                    />

                    <NavigationMenuContent>
                      <div className={styles.subMenuList}>
                        <NavigationMenuLinkItem
                          description="Modal dialogs"
                          href="#"
                          title="Dialog"
                        />
                        <NavigationMenuLinkItem
                          description="Floating content"
                          href="#"
                          title="Popover"
                        />
                        <NavigationMenuLinkItem
                          description="Helpful hints"
                          href="#"
                          title="Tooltip"
                        />
                        <NavigationMenuLinkItem
                          description="Collapsible sections"
                          href="#"
                          title="Accordion"
                        />
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuPortal>
                    <NavigationMenuPositioner
                      alignOffset={-50}
                      side="right"
                      sideOffset={8}
                    >
                      <NavigationMenuViewport>
                        <NavigationMenuArrow />
                      </NavigationMenuViewport>
                    </NavigationMenuPositioner>
                  </NavigationMenuPortal>
                </NavigationMenu>

                <NavigationMenuLinkItem
                  description="Data tables and grids"
                  href="#"
                  title="Table"
                />
              </div>
            </NavigationMenuContent>
          </NavigationMenuViewport>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
